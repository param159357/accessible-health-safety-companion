"""Routers package."""

from routers.hazard_router import router as hazard_router
from routers.health_router import router as health_router
from routers.sos_router import router as sos_router

__all__ = ["hazard_router", "health_router", "sos_router"]
