"""Services package."""

from services.gemini_client import FALLBACK_SAFETY_PROTOCOL, analyze_hazard
from services.sos_service import dispatch_emergency_alert

__all__ = [
    "analyze_hazard",
    "FALLBACK_SAFETY_PROTOCOL",
    "dispatch_emergency_alert",
]
