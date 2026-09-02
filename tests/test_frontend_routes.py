from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_frontend_index_html() -> None:
    """Verify that root URL serves index.html with 200 OK and accessible elements."""
    response = client.get("/")
    assert response.status_code == 200
    assert "Accessible Multimodal Health & Safety Companion" in response.text
    assert '<main id="main-content"' in response.text
    assert '<canvas id="bg-canvas"' in response.text


def test_protocols_json_static_file() -> None:
    """Verify that protocols.json is served with 200 OK and contains protocol items."""
    response = client.get("/data/protocols.json")
    assert response.status_code == 200
    data = response.json()
    assert "protocols" in data
    assert len(data["protocols"]) >= 5


def test_static_css_and_js_assets() -> None:
    """Verify that style.css and app.js static files are served properly."""
    css_res = client.get("/css/style.css")
    assert css_res.status_code == 200
    assert "--color-emergency-red" in css_res.text

    js_res = client.get("/js/app.js")
    assert js_res.status_code == 200
    assert "Accessible Multimodal Health & Safety Companion" in js_res.text
