from unittest.mock import patch
from fastapi.testclient import TestClient
from main import app
from models.schemas import SOSPayload
from services.sos_service import dispatch_emergency_alert

client = TestClient(app)


def test_sos_alert_success() -> None:
    """Verify that a valid emergency SOS alert is dispatched with 200 OK and ticket details."""
    payload = {
        "hazard_type": "Chemical Spill",
        "location": "Science Hall Block B, Lab 401",
        "timestamp": "2026-09-02T10:30:00Z",
        "contact_group": "Campus Hazmat & EMS",
    }
    response = client.post("/api/sos-alert", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "dispatched"
    assert data["alert_id"].startswith("SOS-")
    assert data["hazard_type"] == "Chemical Spill"
    assert data["location"] == "Science Hall Block B, Lab 401"
    assert data["contact_group"] == "Campus Hazmat & EMS"


def test_sos_alert_bad_input_missing_field() -> None:
    """Verify that an SOS payload missing required fields returns 422 validation error."""
    payload = {
        "hazard_type": "Fire",
        # missing location and timestamp
    }
    response = client.post("/api/sos-alert", json=payload)
    assert response.status_code == 422


def test_sos_alert_bad_input_exceeded_max_length() -> None:
    """Verify that an SOS payload exceeding field length constraints returns 422 error."""
    payload = {
        "hazard_type": "Overheat",
        "location": "L" * 201,
        "timestamp": "2026-09-02T10:30:00Z",
    }
    response = client.post("/api/sos-alert", json=payload)
    assert response.status_code == 422


def test_sos_alert_server_failure_500() -> None:
    """Verify that internal dispatch exceptions trigger a generic 500 error without stack traces."""
    with patch("routers.sos_router.dispatch_emergency_alert", side_effect=RuntimeError("Dispatch gateway failure")):
        payload = {
            "hazard_type": "Medical Emergency",
            "location": "Library 2nd Floor",
            "timestamp": "2026-09-02T10:30:00Z",
        }
        response = client.post("/api/sos-alert", json=payload)
        assert response.status_code == 500
        assert response.json() == {
            "detail": "An unexpected error occurred while dispatching the emergency SOS alert."
        }


def test_sos_service_direct_execution() -> None:
    """Verify direct invocation of dispatch_emergency_alert service generates valid ticket."""
    payload = SOSPayload(
        hazard_type="Thermal Burn",
        location="Cafeteria Kitchen",
        timestamp="2026-09-02T10:30:00Z",
    )
    result = dispatch_emergency_alert(payload)
    assert result.status == "dispatched"
    assert result.alert_id.startswith("SOS-")
    assert result.location == "Cafeteria Kitchen"
