from unittest.mock import AsyncMock, MagicMock, patch
from fastapi.testclient import TestClient
from main import app
from models.schemas import IncidentReport, SafetyProtocol
from services.gemini_client import FALLBACK_SAFETY_PROTOCOL, analyze_hazard

client = TestClient(app)


def test_analyze_hazard_endpoint_success() -> None:
    """Verify that valid incident report returns a structured safety protocol."""
    mock_response = MagicMock()
    mock_response.text = (
        '{"severity_level": "Critical", "first_aid_steps": ["Evacuate laboratory", "Pull fire alarm"], '
        '"translated_warning": "चेतावनी: तुरंत प्रयोगशाला खाली करें।"}'
    )

    with patch("services.gemini_client.client.aio.models.generate_content", new=AsyncMock(return_value=mock_response)):
        payload = {
            "description": "Chemical spill with fumes in Chemistry Lab Room 302",
            "language": "Hindi",
        }
        response = client.post("/api/analyze-hazard", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["severity_level"] == "Critical"
        assert len(data["first_aid_steps"]) == 2
        assert "चेतावनी" in data["translated_warning"]


def test_analyze_hazard_markdown_wrapped_response() -> None:
    """Verify that response wrapped in markdown code fence is cleaned and parsed properly."""
    mock_response = MagicMock()
    mock_response.text = (
        "```json\n"
        '{\n  "severity_level": "High",\n  "first_aid_steps": ["Shut off gas line", "Evacuate area"],\n  '
        '"translated_warning": "Warning: Gas leak detected."\n}\n'
        "```"
    )

    with patch("services.gemini_client.client.aio.models.generate_content", new=AsyncMock(return_value=mock_response)):
        payload = {
            "description": "Smell of natural gas in physics lab",
            "language": "English",
        }
        response = client.post("/api/analyze-hazard", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["severity_level"] == "High"
        assert len(data["first_aid_steps"]) == 2
        assert data["translated_warning"] == "Warning: Gas leak detected."


def test_analyze_hazard_multimodal_image_input() -> None:
    """Verify that multimodal incident report with base64 image is processed successfully."""
    mock_response = MagicMock()
    mock_response.text = (
        '{"severity_level": "Medium", "first_aid_steps": ["Clean burn with cold water", "Apply sterile bandage"], '
        '"translated_warning": "Warning: Treat minor heat burn immediately."}'
    )

    with patch("services.gemini_client.client.aio.models.generate_content", new=AsyncMock(return_value=mock_response)):
        payload = {
            "description": "Hot beaker contact burn on hand",
            "image_base64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            "language": "English",
        }
        response = client.post("/api/analyze-hazard", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["severity_level"] == "Medium"
        assert len(data["first_aid_steps"]) == 2


def test_analyze_hazard_bad_input_max_length_exceeded() -> None:
    """Verify that payload exceeding description max length returns 422 Unprocessable Entity."""
    payload = {
        "description": "A" * 5001,
        "language": "English",
    }
    response = client.post("/api/analyze-hazard", json=payload)
    assert response.status_code == 422


def test_analyze_hazard_gemini_api_failure_fallback() -> None:
    """Verify that network or API failures in Gemini client return safe fallback protocol."""
    with patch("services.gemini_client.client.aio.models.generate_content", new=AsyncMock(side_effect=RuntimeError("API Network Timeout"))):
        payload = {
            "description": "Power generator sparks in basement",
            "language": "Marathi",
        }
        response = client.post("/api/analyze-hazard", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["severity_level"] == FALLBACK_SAFETY_PROTOCOL.severity_level
        assert data["first_aid_steps"] == FALLBACK_SAFETY_PROTOCOL.first_aid_steps
        assert data["translated_warning"] == FALLBACK_SAFETY_PROTOCOL.translated_warning


def test_analyze_hazard_service_direct_execution() -> None:
    """Verify direct service invocation handles empty text response with fallback."""
    mock_response = MagicMock()
    mock_response.text = None

    with patch("services.gemini_client.client.aio.models.generate_content", new=AsyncMock(return_value=mock_response)):
        report = IncidentReport(description="Test hazard", language="Tamil")
        import asyncio
        result = asyncio.run(analyze_hazard(report))
        assert result == FALLBACK_SAFETY_PROTOCOL


def test_analyze_hazard_endpoint_catastrophic_failure_500() -> None:
    """Verify that an unexpected server exception returns generic 500 error without stack traces."""
    with patch("routers.hazard_router.analyze_hazard", new=AsyncMock(side_effect=Exception("Critical system error"))):
        payload = {"description": "Gas leak"}
        response = client.post("/api/analyze-hazard", json=payload)
        assert response.status_code == 500
        assert response.json() == {
            "detail": "An unexpected error occurred while processing the incident report."
        }
