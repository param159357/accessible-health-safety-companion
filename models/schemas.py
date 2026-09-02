"""Data models and schemas for incident reporting and safety protocols."""

from typing import List, Optional
from pydantic import BaseModel, Field


class IncidentReport(BaseModel):
    """Schema representing an incoming emergency incident report."""

    description: Optional[str] = Field(
        default=None,
        max_length=5000,
        description="Detailed text description of the emergency incident.",
    )
    image_base64: Optional[str] = Field(
        default=None,
        max_length=15000000,
        description="Optional base64 encoded image string of the hazard.",
    )
    language: str = Field(
        default="English",
        max_length=50,
        description="Target local language for warning translation.",
    )


class SafetyProtocol(BaseModel):
    """Schema representing structured rapid safety and first-aid response."""

    severity_level: str = Field(
        description="Assessed severity level (e.g., Low, Medium, High, Critical)."
    )
    first_aid_steps: List[str] = Field(
        description="Step-by-step rapid first-aid and safety actions."
    )
    translated_warning: str = Field(
        description="Urgent safety warning translated into the requested language."
    )
