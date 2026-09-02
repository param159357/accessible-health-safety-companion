"""Application configuration and environment settings using Pydantic."""

import os
from functools import lru_cache
from typing import Optional
from pydantic import BaseModel, Field

# Automatically load key-value pairs from .env into os.environ if present
_env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
if os.path.exists(_env_path):
    try:
        with open(_env_path, "r", encoding="utf-8") as _f:
            for _line in _f:
                _line = _line.strip()
                if _line and not _line.startswith("#") and "=" in _line:
                    _k, _v = _line.split("=", 1)
                    _k = _k.strip()
                    _v = _v.strip().strip('"').strip("'")
                    if _k:
                        os.environ[_k] = _v
    except Exception:
        pass


class Settings(BaseModel):
    """Strongly typed application environment settings."""

    APP_NAME: str = Field(default="Accessible Multimodal Health & Safety Companion")
    APP_VERSION: str = Field(default="1.0.0")
    ENVIRONMENT: str = Field(default_factory=lambda: os.getenv("ENVIRONMENT", "production"))
    LOG_LEVEL: str = Field(default_factory=lambda: os.getenv("LOG_LEVEL", "INFO"))
    PORT: int = Field(default_factory=lambda: int(os.getenv("PORT", "8080")))
    GEMINI_API_KEY: Optional[str] = Field(default_factory=lambda: os.getenv("GEMINI_API_KEY", "PLACEHOLDER_KEY"))
    EMERGENCY_WHATSAPP_PHONE: str = Field(default_factory=lambda: os.getenv("EMERGENCY_WHATSAPP_PHONE", "918250666852"))
    EMERGENCY_HELPLINE: str = Field(default_factory=lambda: os.getenv("EMERGENCY_HELPLINE", "112"))


@lru_cache()
def get_settings() -> Settings:
    """Retrieve and cache application configuration singleton."""
    return Settings()
