from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health_check_success() -> None:
    """Verify that the health check endpoint returns status 200 OK and valid JSON."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_health_check_invalid_method() -> None:
    """Verify that sending a POST method to /health returns 405 Method Not Allowed."""
    response = client.post("/health")
    assert response.status_code == 405


def test_not_found_route() -> None:
    """Verify that an unknown route returns 404 Not Found."""
    response = client.get("/health/unknown")
    assert response.status_code == 404
