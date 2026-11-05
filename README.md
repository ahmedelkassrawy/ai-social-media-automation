# Shutter Agency - AI-Driven Social Media Backend

Shutter Agency (agency_prod) is an AI-driven social media management backend designed for restaurant clients. Each client has a unique PR voice profile and tone. The platform automates content scheduling, caption generation, comment replies, and publishing to Meta (Facebook and Instagram) via the Meta Graph API and n8n workflows.

---

## Backend System Architecture

The backend consists of the following integrated systems:

### Tech Stack
- **Languages/Frameworks:** Python 3.10+, FastAPI, Streamlit
- **Database:** PostgreSQL 16, SQLAlchemy, Alembic
- **Automation:** n8n (Dockerized)
- **AI Models:** Google Gemini, OpenRouter API
- **Infrastructure:** Docker, ngrok
- **External Integration:** Meta Graph API (Instagram & Facebook)

1. FastAPI Backend: Exposes metadata endpoints (served by src/backend/api.py on port 8000) for scheduled media, webhook callbacks, static serving of videos/images via /videos static mount, and brand guidelines updates.
2. Streamlit Admin Dashboard: Located in src/backend/n8n_streamlit.py, this provides an administrative view to monitor the database state, manually trigger workflows, upload media, and manage client brand guidelines.
3. n8n Orchestration: An automated workflow engine (port 5678) running inside Docker that handles AI caption generation, scheduled publication to Meta Graph API, and automatic Instagram comment replies based on brand voice.
4. PostgreSQL Database: A persistent Postgres 16 database running inside Docker (port 5432) that stores account profiles, uploaded media assets, and the publishing schedule.
5. ngrok Tunneling: Maps external requests from Meta webhooks to the local backend. A dual-tunnel configuration exposes n8n (for webhooks) and FastAPI (for serving media files to Meta) concurrently.

The interaction between backend services is shown below:

```mermaid
graph TD
    User["Admin User"] -->|Upload / Manage| Streamlit["Streamlit Admin Panel (Port 8501)"]
    Streamlit -->|HTTP API Requests| FastAPI["FastAPI Backend (Port 8000)"]
    Streamlit -->|Trigger Webhook| n8n["n8n Workflow Engine (Port 5678)"]
    FastAPI -->|Static Media Server /videos| Meta["Meta Graph API"]
    FastAPI -->|Query/Save Data| Postgres["PostgreSQL (Port 5432)"]
    FastAPI -->|HTTP Webhook POST| n8n
    n8n -->|Retrieve Metadata & Guidelines| Postgres
    n8n -->|Multimodal Gemini Analysis| Gemini["Google Gemini / OpenRouter API"]
    n8n -->|Upload & Publish Media| Meta
    Meta -->|New Comments Webhooks| ngrok["ngrok Tunnel"]
    ngrok -->|Forward Webhook| n8n
    n8n -->|Reply to Comments| Meta
```

---

## Database Schemas

The system uses PostgreSQL, managed via SQLAlchemy and Alembic. The primary tables are:

### 1. Accounts Table (`accounts`)
Stores client information, social media tokens, and brand definitions.
- `id`: UUID (Primary Key)
- `name`: String (Restaurant Name)
- `account_handle`: String (Social Media Handle)
- `brand_guidelines`: JSONB (Defines PR voice, tone, and visual style rules)
- `page_access_token`: String (Meta API token)
- `fb_page_id`: String
- `ig_business_id`: String
- `timezone`: String

### 2. Media Assets Table (`media_assets`)
Tracks the raw and analyzed files uploaded to the server.
- `id`: UUID (Primary Key)
- `account_id`: UUID (Foreign Key -> accounts)
- `internal_url`: String (Local disk path)
- `external_url`: String (Public ngrok URL for Meta Graph API)
- `state`: Enum (PENDING, UPLOADING, SUCCESS, FAILED, RAW, ANALYZED, CAPTIONED, APPROVED, SCHEDULED, PUBLISHED)
- `media_type`: Enum (VIDEO, REELS, IMAGE, STORY, POST)
- `ai_vision_summary`: String (Gemini's visual description of the media)

### 3. Scheduled Posts Table (`scheduled`)
Tracks the queue for automated publishing and stores AI-generated captions.
- `id`: UUID (Primary Key)
- `account_id`: UUID (Foreign Key -> accounts)
- `media_asset_id`: UUID (Foreign Key -> media_assets)
- `media_type`: Enum
- `caption`: String (AI-generated or manual text)
- `meta_post_id`: String (Returned by Meta upon publishing)
- `instagram_post_id`: String (Returned by Meta upon publishing)
- `state`: Enum (Mirrors MediaState)
- `status`: String (SCHEDULED, POSTPONED, PUBLISHED)
- `scheduled_at`: DateTime (Naive timestamp treated as local Cairo time)

---

## API Features and Endpoints

The FastAPI application (`api.py`) exposes several critical endpoints for managing data and routing files:

- `POST /webhook`: Handles file uploads from the Streamlit UI. It saves the file to the local disk, registers the `media_assets` and `scheduled` rows in the database, maps the public ngrok URL, and dispatches a secondary webhook to n8n to start the AI caption generation process.
- `POST /brand_guidelines`: Accepts a JSON payload containing `account_handle` and `brand_guidelines`. It looks up the account and safely stores the structured JSON into the `accounts` table.
- `GET /get_brand_guidelines`: Retrieves the current JSON brand guidelines for a specific `account_handle`.
- `/videos (Static Mount)`: Exposes the local file directory for direct media access, required by the Meta Graph API for downloading images and videos.

---

## Issue Bypasses and Technical Solutions

During development, specific challenges were solved with targeted workarounds:

### 1. ngrok Port Confusion (n8n Index Page Issue)
**Issue:** Meta Graph API requires direct links to raw media files (e.g., .jpg, .mp4). Because n8n runs on port 5678 and FastAPI runs on port 8000, passing the n8n tunnel URL resulted in returning the n8n index.html page instead of the file.
**Bypass:** The FastAPI server bypasses hardcoded URLs by running an async function (`get_ngrok_url()`) that queries the local ngrok inspector APIs (`http://127.0.0.1:4040/api/tunnels`). It iterates through the active tunnels, finds the one routing to port 8000, and extracts its public HTTPS URL to ensure Meta receives the exact file path.

### 2. Timezone Desynchronization in PostgreSQL
**Issue:** Scheduling cron queries were executing at the wrong times because PostgreSQL stores `scheduled_at` as a naive timestamp, while the n8n server and Docker containers were operating under the `Africa/Cairo` timezone.
**Bypass:** The application enforces explicit timezone casting in SQL. All selection queries comparing the current time with the scheduled time use `NOW() AT TIME ZONE 'Africa/Cairo'`.

### 3. Dynamic Workflow Routing
**Issue:** Hardcoding target accounts in n8n workflows restricts the system to a single client and breaks when scaling.
**Bypass:** The workflows dynamically select the account context based on the webhook payload. For example, the Instagram Comments reply workflow extracts the `ig_business_id` from the payload and executes a PostgreSQL query to retrieve the specific `brand_guidelines` for that exact account, ensuring the AI agent always responds using the correct persona.

---

## Prerequisites

Before running the services, ensure you have the following installed:
- Python 3.10+
- Docker and Docker Compose
- ngrok CLI
- Google Gemini API Key or OpenRouter API Key

---

## Installation and Configuration

1. Clone the repository and navigate to the project directory:
   cd agency_prod

2. Create a .env file in the root directory based on the following template:
   LANGSMITH_TRACING=true
   LANGSMITH_API_KEY=your_langsmith_key
   LANGSMITH_PROJECT=agency_prod
   OPENROUTER_API_KEY=your_openrouter_key
   GEMINI_API_KEY=your_gemini_key
   DATABASE_URL=postgresql+psycopg2://n8n:n8n_password@localhost:5432/agency_prod
   POSTGRES_USER=n8n
   POSTGRES_PASSWORD=n8n_password
   POSTGRES_DB=n8n
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432

3. Install backend python dependencies in your virtual environment:
   pip install fastapi uvicorn sqlalchemy asyncpg psycopg2 httpx pydantic-settings streamlit streamlit-calendar alembic langchain-google-genai langchain-openrouter

---

## Running the Core Infrastructure

### 1. Docker Containers (Postgres + n8n)
Start the Postgres database and n8n workflow engine using Docker Compose from the root directory:
docker compose up -d

This spins up:
- PostgreSQL on port 5432 (database credentials are based on your environment file).
- n8n Workflow Engine on port 5678.

### 2. ngrok Multi-Tunnel Configuration
Meta APIs require public HTTPS endpoints to download media files and deliver webhooks. Configure ngrok to run two tunnels simultaneously by modifying your ngrok.yml configuration file.

On Windows, the default ngrok.yml location is:
%LOCALAPPDATA%/ngrok/ngrok.yml

Example ngrok.yml structure:
version: "2"
authtoken: your_ngrok_authtoken

tunnels:
  n8n:
    proto: http
    addr: 5678
    hostname: your-custom-n8n-domain.ngrok-free.dev
  fastapi:
    proto: http
    addr: 8000

Run the command to launch both tunnels:
ngrok start --all

---

## Running the Servers

To run the backend servers, start the following components in separate terminal windows:

### 1. FastAPI Server
Provides the media API and handles file uploads. Run the following command from the src/backend directory:
uvicorn api:app --host 0.0.0.0 --port 8000

### 2. Streamlit Admin Dashboard
Provides the management interface. Run the following command from the src/backend directory:
streamlit run n8n_streamlit.py

---

## Database Migrations

Database tables are managed using Alembic. If you modify the database models or need to initialize tables, use the following commands from the root directory:

To run migrations and update the database schema:
alembic upgrade head

To generate a new migration script after changing models:
alembic revision --autogenerate -m "description of changes"

---

## Workflows and Data Flows

### 1. Media Uploading and Captioning
When media is scheduled, a webhook initiates the caption creation workflow. The media content is analyzed using Gemini to write a brand-tailored caption.

```mermaid
sequenceDiagram
    autonumber
    actor User as Admin User
    participant Streamlit as Streamlit Panel (8501)
    participant FastAPI as FastAPI Server (8000)
    participant DB as PostgreSQL DB (5432)
    participant n8n as n8n Webhook (5678)
    participant Gemini as Gemini / OpenRouter API

    User->>Streamlit: Upload Media & Select Account Handle
    Streamlit->>FastAPI: POST /webhook (file + metadata)
    FastAPI->>FastAPI: Save file to local disk (/videos)
    FastAPI->>FastAPI: Request public ngrok URL from local ngrok inspector
    FastAPI->>DB: INSERT into media_assets & scheduled (state = UPLOADING)
    FastAPI->>n8n: POST webhook payload (media_asset_id, external_url)
    FastAPI-->>Streamlit: Return success
    n8n->>DB: SELECT brand_guidelines & external_url
    n8n->>FastAPI: GET media binary via external_url (FastAPI tunnel)
    n8n->>n8n: Route based on mime type (Image vs Video)
    n8n->>Gemini: Analyze media file content (visual description)
    n8n->>DB: UPDATE media_assets (state = ANALYZED, ai_vision_summary)
    n8n->>Gemini: Send prompt (scene description + brand guidelines)
    Gemini-->>n8n: Return brand-aligned caption
    n8n->>DB: INSERT/UPDATE scheduled (state = CAPTIONED, caption)
```

### 2. Scheduled Publishing Workflow
A cron trigger queries PostgreSQL database for items marked as CAPTIONED that have reached their scheduled post time, publishes them to Meta, and logs the returned Instagram Post ID.

```mermaid
sequenceDiagram
    autonumber
    participant n8n as n8n cron (5678)
    participant DB as PostgreSQL DB (5432)
    participant Meta as Meta Graph API

    n8n->>DB: SELECT posts where state = CAPTIONED and scheduled_at <= NOW() AT TIME ZONE 'Africa/Cairo'
    DB-->>n8n: Return post metadata (external_url, caption, access_tokens)
    n8n->>n8n: Branch by Media Type (Image vs Reels/Video)
    n8n->>Meta: POST media container creation (send external_url + caption)
    Meta-->>n8n: Return container creation ID
    n8n->>n8n: Wait 2 minutes for processing
    n8n->>Meta: POST publish media container (send creation ID)
    Meta-->>n8n: Return instagram_post_id
    n8n->>DB: UPDATE scheduled (state = PUBLISHED, instagram_post_id)
```

### 3. Comment Replies Automation
Incoming comments on connected Instagram accounts trigger an n8n webhook event. The original post caption and brand guidelines are queried dynamically in PostgreSQL using the Business ID and Instagram Post ID. A reply is formulated matching the client brand voice.

```mermaid
sequenceDiagram
    autonumber
    participant Meta as Meta Webhook Service
    participant ngrok as ngrok Tunnel
    participant n8n as n8n Webhook (5678)
    participant DB as PostgreSQL DB (5432)
    participant Gemini as Gemini / OpenRouter API
    participant Graph as Meta Graph API

    Meta->>ngrok: POST instagram comments event webhook
    ngrok->>n8n: Forward webhook payload
    n8n->>n8n: Extract payload details
    n8n->>n8n: Filter comment (Skip if author is business account owner)
    n8n->>DB: SELECT brand_guidelines by ig_business_id
    n8n->>DB: SELECT original post caption by instagram_post_id
    n8n->>Gemini: Prompt with comment text, post context, and guidelines
    Gemini-->>n8n: Return brand-aligned response
    n8n->>Graph: POST reply to comment ID using page_access_token
```

## Importing the n8n workflows

The exports in `src/backend/n8n workflows/` contain no credentials. After importing them into n8n:

1. Create your own Gemini, OpenRouter and Postgres credentials and attach them to the nodes that need them.
2. Set the `META_PAGE_ACCESS_TOKEN` environment variable on the n8n container, used by the Instagram comment reply workflow.
3. Activate the workflows. They are exported as inactive.
