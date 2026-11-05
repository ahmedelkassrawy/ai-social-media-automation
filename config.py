from asyncio import taskgroups
from pydantic_settings import BaseSettings
from pydantic import Extra
from typing import List

class Settings(BaseSettings):
    LANGSMITH_TRACING:bool = True
    LANGSMITH_API_KEY:str
    LANGSMITH_PROJECT:str

    OPENROUTER_API_KEY:str
    GEMINI_API_KEY:str
    GROQ_API_KEY:str

    class Config:
        env_file = ".env"
        env_prefix = ""  # Add this line to remove any prefix for environment variables

def get_settings() -> Settings:
    return Settings()