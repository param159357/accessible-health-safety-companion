import os
from typing import Dict
from fastapi import FastAPI, HTTPException, status
from fastapi.staticfiles import StaticFiles
from models.schemas import IncidentReport, SafetyProtocol, SOSPayload, SOSResponse
from services.gemini_client import analyze_hazard
from services.sos_service import dispatch_emergency_alert

app = FastAPI(
    title="Accessible Multimodal Health & Safety Companion",
    description="Emergency rapid-response health & safety companion API for campus emergencies.",
    version="1.0.0",
)


@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check() -> Dict[str, str]:
    """Return health status of the application."""
    return {"status": "ok"}


@app.post(
    "/api/analyze-hazard",
    response_model=SafetyProtocol,
    status_code=status.HTTP_200_OK,
)
async def analyze_hazard_endpoint(report: IncidentReport) -> SafetyProtocol:
    """Analyze emergency incident reports and return rapid safety protocols."""
    try:
        return await analyze_hazard(report)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while processing the incident report.",
        )


@app.post(
    "/api/sos-alert",
    response_model=SOSResponse,
    status_code=status.HTTP_200_OK,
)
async def trigger_sos_alert(payload: SOSPayload) -> SOSResponse:
    """Process and dispatch emergency SOS alerts to campus responders."""
    try:
        return dispatch_emergency_alert(payload)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while dispatching the emergency SOS alert.",
        )


# Mount static files directory for frontend UI
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR, exist_ok=True)

app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
