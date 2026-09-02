"""AI multimodal hazard triage routing module."""

import logging
from fastapi import APIRouter, HTTPException, status
from models.schemas import IncidentReport, SafetyProtocol
from services.gemini_client import analyze_hazard

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["AI Hazard Triage"])


@router.post(
    "/analyze-hazard",
    response_model=SafetyProtocol,
    status_code=status.HTTP_200_OK,
)
async def analyze_hazard_endpoint(report: IncidentReport) -> SafetyProtocol:
    """Analyze emergency incident reports with Gemini 3.7 Flash and return structured first-aid protocols."""
    try:
        return await analyze_hazard(report)
    except Exception as exc:
        logger.error("Unhandled exception during hazard analysis: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while processing the incident report.",
        )
