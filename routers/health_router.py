"""Health check routing module for automated uptime probes and load balancers."""

from typing import Dict
from fastapi import APIRouter, status

router = APIRouter(tags=["Health & Probing"])


@router.get("/health", status_code=status.HTTP_200_OK)
async def health_check() -> Dict[str, str]:
    """Return operational health status for Cloud Run and automated uptime probes."""
    return {"status": "ok"}
