from fastapi import FastAPI, Request, HTTPException, Depends, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from datetime import datetime
from typing import Annotated
from uuid import UUID
import json
import os
import shutil
import httpx

from database.models import MediaState, MediaType, MediaAssets, Account, Scheduled
from database.db import get_async_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

class BrandGuidelinesRequest(BaseModel):
    account_handle: str
    brand_guidelines: str

app = FastAPI()
webhook_url = "http://localhost:5678/webhook/7b01cc19-f3be-46b9-965a-98358a438ce2"
upload_dir = r"D:\me\agency_prod\videos"

# Mount static files to serve saved videos/images
app.mount("/videos", StaticFiles(directory=upload_dir), name="videos")

# Get the ngrok tunnel URL that routes to FastAPI (port 8000) for serving media files.
# IMPORTANT: We must filter by local port because the port-5678 tunnel goes to n8n,
# and its URL would serve n8n's index.html instead of the actual media file.
async def get_ngrok_url() -> str:
    FASTAPI_PORT = "8000"
    # Each ngrok instance binds to a different inspector port (4040, 4041, ...)
    inspector_ports = [4040, 4041, 4042]

    async with httpx.AsyncClient() as client:
        for port in inspector_ports:
            try:
                response = await client.get(f"http://127.0.0.1:{port}/api/tunnels", timeout=2.0)
                if response.status_code != 200:
                    continue

                tunnels = response.json().get("tunnels", [])

                for tunnel in tunnels:
                    if tunnel.get("proto") != "https":
                        continue
                    # Check config.addr (e.g. "http://localhost:8000")
                    local_addr = tunnel.get("config", {}).get("addr", "")
                    if local_addr.endswith(f":{FASTAPI_PORT}") or f":{FASTAPI_PORT}" in local_addr:
                        return tunnel.get("public_url")

            except Exception:
                continue

    return os.getenv("NGROK_MEDIA_URL", f"http://localhost:{FASTAPI_PORT}")

@app.get("/")
async def root():
    return {
        "message": "hello world"
    }

# Webhook sender
@app.post("/webhook")
async def send_webhook_message(
    file: Annotated[UploadFile, File()],
    media_type: MediaType,
    media_state: MediaState,
    account_handle: str,
    schedule_date: str,
    db: AsyncSession = Depends(get_async_db)
):
    try:
        parsed_schedule_date = datetime.strptime(schedule_date, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        try:
            parsed_schedule_date = datetime.fromisoformat(schedule_date.replace("Z", "+00:00"))
        except ValueError:
            raise HTTPException(status_code=422, detail="Invalid schedule_date format. Expected YYYY-MM-DD HH:MM:SS or ISO 8601 format.")

    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    file_path = os.path.join(upload_dir, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    ngrok_url = await get_ngrok_url()
    public_url = f"{ngrok_url}/videos/{file.filename}"

    result = await db.execute(select(Account.id).where(Account.account_handle == account_handle))
    account_id = result.scalars().one_or_none()

    if account_id is None:
        raise HTTPException(status_code=404, detail=f"Account '{account_handle}' not found")

    new_media_asset = MediaAssets(
        account_id=account_id,
        internal_url=file_path,
        external_url=public_url,
        state=media_state,
        media_type=media_type,
    )
    
    db.add(new_media_asset)
    await db.commit()
    await db.refresh(new_media_asset)

    new_schedule = Scheduled(
        account_id=account_id,
        media_asset_id=new_media_asset.id,
        media_type=media_type,
        scheduled_at=parsed_schedule_date,
        state=media_state,
        status="SCHEDULED"
    )
    db.add(new_schedule)
    await db.commit()
    await db.refresh(new_schedule)

    webhook_data = {
        "media_asset_id": str(new_media_asset.id),
        "filename": file.filename, 
        "status": "Upload successful", 
        "media_type": media_type.value,
        "path": file_path,
        "public_url": public_url,
        "account_id": str(account_id),
        "date": parsed_schedule_date.strftime("%Y-%m-%d %H:%M:%S")
    }

    async with httpx.AsyncClient() as client:
        try:
            webhook_response = await client.post(
                webhook_url,
                json=webhook_data,
            )
            print(f"Webhook response: {webhook_response.status_code}")
        except Exception as e:
            print(f"Webhook request failed: {e}")

    return JSONResponse(
        {
            "message": "file uploaded successfully",
            "media_asset_id": str(new_media_asset.id),
        }
    )

@app.post("/brand_guidelines")
async def edit_brand_guidelines(
    body: BrandGuidelinesRequest,
    db: AsyncSession = Depends(get_async_db)
):
    try:
        result = await db.execute(select(Account).where(Account.account_handle == body.account_handle))
        account = result.scalars().one_or_none()

        if account is None:
            raise HTTPException(status_code=404, 
                                detail=f"Account '{body.account_handle}' not found")

        try:
            parsed = json.loads(body.brand_guidelines) if isinstance(body.brand_guidelines, str) else body.brand_guidelines
        except json.JSONDecodeError:
            parsed = body.brand_guidelines

        account.brand_guidelines = parsed

        await db.commit()
        await db.refresh(account)

        return JSONResponse({"message": "Brand guidelines updated successfully"})
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get_brand_guidelines")
async def get_brand_guidelines(
    account_handle: str,
    db: AsyncSession = Depends(get_async_db)
):
    try:
        result = await db.execute(select(Account).where(Account.account_handle == account_handle))
        account = result.scalars().one_or_none()

        if account is None:
            raise HTTPException(status_code=404, 
                                detail=f"Account '{account_handle}' not found")

        return JSONResponse(
            {
                "brand_guidelines": account.brand_guidelines if account.brand_guidelines is not None else {}
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/caption")
async def get_caption(
    media_asset_id:str,
    db:AsyncSession = Depends(get_async_db)
):
    try:
        result = await db.execute(select(Scheduled.caption).where(Scheduled.media_asset_id == UUID(media_asset_id)))
        caption = result.scalars().one_or_none()

        if caption is None:
            raise HTTPException(status_code=404, 
                                detail=f"Scheduled post for media asset '{media_asset_id}' not found")

        return JSONResponse(
            {
                "caption": caption
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/caption")
async def edit_caption(
    caption:str,
    media_asset_id: str,
    db: AsyncSession = Depends(get_async_db)
):
    try:
        result = await db.execute(update(Scheduled).where(Scheduled.media_asset_id == UUID(media_asset_id)).values(caption = caption))
        
        if result.rowcount == 0:
             raise HTTPException(status_code=404, 
                                detail="Scheduled post not found")
        await db.commit()
        
        return JSONResponse({"message": "Caption updated successfully"})
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))