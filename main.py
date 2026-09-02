from typing import Dict
from fastapi import FastAPI, HTTPException, status
from models.schemas import IncidentReport, SafetyProtocol
from services.gemini_client import analyze_hazard

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
