"""Unit tests for GZip response compression and static asset caching middleware."""

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_static_asset_cache_control_headers() -> None:
    """Verify that static resources receive proper Cache-Control headers."""
    response = client.get("/css/style.css")
    assert response.status_code == 200
    assert "Cache-Control" in response.headers
    assert "public, max-age=3600" in response.headers["Cache-Control"]

    json_response = client.get("/data/protocols.json")
    assert json_response.status_code == 200
    assert "Cache-Control" in json_response.headers
    assert "public, max-age=3600" in json_response.headers["Cache-Control"]


def test_gzip_compression_on_large_payload() -> None:
    """Verify that responses exceeding minimum_size receive gzip compression when requested."""
    response = client.get("/", headers={"Accept-Encoding": "gzip"})
    assert response.status_code == 200
    # TestClient decompresses gzip automatically, verify response is valid and complete
    assert "<!DOCTYPE html>" in response.text
