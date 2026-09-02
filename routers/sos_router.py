"""Emergency SOS dispatch routing module."""

import logging
from fastapi import APIRouter, HTTPException, status
from models.schemas import SOSPayload, SOSResponse
from services.sos_service import dispatch_emergency_alert

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["Emergency SOS Dispatch"])


@router.post(
    "/sos-alert",
    response_model=SOSResponse,
    status_code=status.HTTP_200_OK,
)
async def trigger_sos_alert(payload: SOSPayload) -> SOSResponse:
    """Process and dispatch emergency SOS alerts to campus responders and WhatsApp gateway."""
    try:
        response = dispatch_emergency_alert(payload)
        logger.info("Dispatched emergency alert: %s at location: %s", response.alert_id, response.location)
        return response
    except Exception as exc:
        logger.error("Unhandled exception during SOS alert dispatch: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while dispatching the emergency SOS alert.",
        )
