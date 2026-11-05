import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".env"))

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://n8n:n8n_password@localhost:5432/agency_prod")

# Convert psycopg2 URL to asyncpg URL for async engine
DATABASE_URL_ASYNC = DATABASE_URL.replace("postgresql+psycopg2://", "postgresql+asyncpg://").replace("postgresql://", "postgresql+asyncpg://")

async_engine = create_async_engine(DATABASE_URL_ASYNC, echo=True)

AsyncSessionLocal = async_sessionmaker(
    bind=async_engine,
    expire_on_commit=False,
)

async def get_async_db():
    async with AsyncSessionLocal() as session:
        yield session