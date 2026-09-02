"""FastAPI application initialization with modular routers, compression, and static asset caching."""

import os
from fastapi import FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.gzip import GZipMiddleware
from core.config import get_settings
from routers import hazard_router, health_router, sos_router
from services.gemini_client import analyze_hazard
from services.sos_service import dispatch_emergency_alert

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    description="Emergency rapid-response health & safety companion API for campus emergencies.",
    version=settings.APP_VERSION,
)


class StaticCacheMiddleware(BaseHTTPMiddleware):
    """Attach Cache-Control headers to static asset responses."""

    async def dispatch(self, request: Request, call_next):
        """Process incoming requests and append caching headers for static resources."""
        response: Response = await call_next(request)
        path = request.url.path
        if any(path.startswith(prefix) for prefix in ("/css/", "/js/", "/data/")):
            response.headers["Cache-Control"] = "public, max-age=3600"
        return response


# Add GZip compression and static asset caching middlewares
app.add_middleware(GZipMiddleware, minimum_size=500)
app.add_middleware(StaticCacheMiddleware)

# Include modular application routers
app.include_router(health_router)
app.include_router(hazard_router)
app.include_router(sos_router)

# Mount static files directory
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR, exist_ok=True)

app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")

__all__ = ["app", "analyze_hazard", "dispatch_emergency_alert"]
