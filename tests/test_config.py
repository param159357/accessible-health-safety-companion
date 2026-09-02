"""Unit tests for typed Pydantic configuration settings."""

from core.config import Settings, get_settings


def test_settings_initialization_defaults() -> None:
    """Verify that settings initialize with expected defaults."""
    settings = Settings()
    assert settings.APP_NAME == "Accessible Multimodal Health & Safety Companion"
    assert settings.APP_VERSION == "1.0.0"
    assert settings.PORT == 8080
    assert settings.EMERGENCY_WHATSAPP_PHONE == "918250666852"
    assert settings.EMERGENCY_HELPLINE == "112"


def test_get_settings_cached_singleton() -> None:
    """Verify that get_settings() returns the same cached singleton instance."""
    instance_1 = get_settings()
    instance_2 = get_settings()
    assert instance_1 is instance_2
