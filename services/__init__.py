"""Services package."""

from services.gemini_client import analyze_hazard, FALLBACK_SAFETY_PROTOCOL

__all__ = ["analyze_hazard", "FALLBACK_SAFETY_PROTOCOL"]
