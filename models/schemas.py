"""Data models and schemas for incident reporting, safety protocols, and SOS alerts."""

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
        max_length=7000000,
        description="Optional base64 encoded image string of the hazard (capped at ~5MB).",
    )
    language: str = Field(
        default="English",
        max_length=50,
        description="Target local language for warning translation.",
    )


class SafetyProtocol(BaseModel):
    """Schema representing structured rapid safety and first-aid response."""

    severity_level: str = Field(
        max_length=50,
        description="Assessed severity level (e.g., Low, Medium, High, Critical).",
    )
    first_aid_steps: List[str] = Field(
        description="Step-by-step rapid first-aid and safety actions."
    )
    translated_warning: str = Field(
        max_length=5000,
        description="Urgent safety warning translated into the requested language.",
    )


class SOSPayload(BaseModel):
    """Schema representing an emergency SOS dispatch trigger request."""

    hazard_type: str = Field(
        max_length=100,
        description="Category or description of hazard triggering the alert.",
    )
    location: str = Field(
        max_length=200,
        description="Current campus building, room, or geographical coordinates.",
    )
    timestamp: str = Field(
        max_length=50,
        description="Client-side timestamp of the alert trigger event.",
    )
    contact_group: str = Field(
        default="Campus Security & EMS Dispatch",
        max_length=100,
        description="Emergency team or contact group designated for dispatch.",
    )


class SOSResponse(BaseModel):
    """Schema representing confirmed emergency dispatch status."""

    status: str = Field(
        max_length=50,
        description="Dispatch status acknowledgement.",
    )
    alert_id: str = Field(
        max_length=100,
        description="Unique reference tracking ID for the dispatch ticket.",
    )
    timestamp: str = Field(
        max_length=50,
        description="Server confirmed dispatch timestamp.",
    )
    hazard_type: str = Field(
        max_length=100,
        description="Echoed hazard category.",
    )
    location: str = Field(
        max_length=200,
        description="Echoed campus emergency location.",
    )
    contact_group: str = Field(
        max_length=100,
        description="Designated dispatch team.",
    )
