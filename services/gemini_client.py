"""Gemini client service for multimodal hazard analysis and safety protocol generation."""

import asyncio
import base64
import os
import traceback
from typing import Any, List, Optional
from google import genai
from google.genai import types
from models.schemas import IncidentReport, SafetyProtocol

AI_MODEL_NAME = "gemini-3.7-flash"
REQUEST_TIMEOUT_SECONDS = 10.0


def _load_env_fallback() -> None:
    """Load environment variables from .env file if not already present in os.environ."""
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    if os.path.exists(env_path):
        try:
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    stripped = line.strip()
                    if stripped and not stripped.startswith("#") and "=" in stripped:
                        key, val = stripped.split("=", 1)
                        key = key.strip()
                        val = val.strip().strip("'\"")
                        if key and key not in os.environ:
                            os.environ[key] = val
        except Exception:
            pass


_load_env_fallback()

# Initialize client once at module level using environment variable with fallback for test imports
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY") or "PLACEHOLDER_KEY")

FALLBACK_SAFETY_PROTOCOL = SafetyProtocol(
    severity_level="High",
    first_aid_steps=[
        "Ensure personal safety and evacuate the immediate hazard area.",
        "Alert nearby campus security or building emergency personnel.",
        "Call campus emergency dispatch or dial national emergency helpline 112.",
        "Do not touch hazardous materials or enter compromised structures.",
        "Wait for professional first responders at an external assembly point.",
    ],
    translated_warning="Emergency warning: Move away from the hazard immediately and contact campus emergency services or dial 112.",
)


def _clean_json_string(text: str) -> str:
    """Strip markdown code blocks and surrounding whitespace from JSON response strings."""
    cleaned = text.strip()
    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]
    elif cleaned.startswith("```"):
        cleaned = cleaned[3:]
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]
    return cleaned.strip()


def _extract_image_part(image_base64: str) -> Optional[types.Part]:
    """Decode base64 image data and construct a types.Part instance."""
    try:
        mime_type = "image/jpeg"
        data_str = image_base64.strip()
        if "data:" in data_str and ";base64," in data_str:
            header, data_str = data_str.split(";base64,", 1)
            mime_type = header.replace("data:", "").strip() or "image/jpeg"
        image_bytes = base64.b64decode(data_str)
        return types.Part.from_bytes(data=image_bytes, mime_type=mime_type)
    except Exception:
        return None


async def analyze_hazard(report: IncidentReport) -> SafetyProtocol:
    """Analyze emergency incident reports and generate structured safety protocols."""
    try:
        prompt_text = (
            f"You are an emergency medical and safety response assistant for campus hazards.\n"
            f"Analyze this campus emergency or safety hazard.\n"
            f"Incident Description: {report.description or 'No text description provided. Inspect visual evidence.'}\n"
            f"Target Language: {report.language}\n\n"
            f"Instructions:\n"
            f"1. Evaluate severity level (Low, Medium, High, or Critical).\n"
            f"2. Provide clear, chronological rapid first-aid and safety steps.\n"
            f"3. Translate the urgent safety warning directly into {report.language}.\n"
            f"4. If referencing emergency helpline numbers in any advice or warning, always use 112 (national emergency number) or campus security, NEVER 911."
        )

        contents: List[Any] = [prompt_text]
        if report.image_base64:
            image_part = _extract_image_part(report.image_base64)
            if image_part is not None:
                contents.append(image_part)

        config = types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=SafetyProtocol,
            temperature=0.2,
        )

        response = await asyncio.wait_for(
            client.aio.models.generate_content(
                model=AI_MODEL_NAME,
                contents=contents,
                config=config,
            ),
            timeout=REQUEST_TIMEOUT_SECONDS,
        )

        if response.text:
            cleaned_json = _clean_json_string(response.text)
            return SafetyProtocol.model_validate_json(cleaned_json)

        return FALLBACK_SAFETY_PROTOCOL
    except Exception:
        traceback.print_exc()
        return FALLBACK_SAFETY_PROTOCOL
