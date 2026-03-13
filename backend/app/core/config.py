"""
Core configuration for the Sakshi Coaching backend.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    """Application-wide settings loaded once at startup from environment variables."""

    APP_NAME: str = "Sakshi Coaching API"
    VERSION: str = "1.0.0"
    DEBUG: bool = False

    # CORS – allow the Vite dev servers
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:4173",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
    ]

    # Secret key for JWT (force setting this via env var)
    SECRET_KEY: str = Field(..., description="Secret key for JWT generation")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # Database
    DATABASE_URL: str = Field(..., description="Database connection string")

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
