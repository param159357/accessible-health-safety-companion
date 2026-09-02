import os
import re
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_accessibility_landmarks_and_semantics() -> None:
    """Verify that the rendered HTML contains proper semantic HTML5 landmark tags."""
    response = client.get("/")
    assert response.status_code == 200
    html = response.text

    # Landmark verification
    assert '<html lang="en">' in html
    assert '<header class="app-header"' in html
    assert '<nav class="header-nav"' in html
    assert '<main id="main-content"' in html
    assert '<footer class="app-footer"' in html
    assert '<fieldset class="form-fieldset">' in html
    assert '<legend class="form-legend"' in html

    # Heading hierarchy check (Single h1)
    h1_matches = re.findall(r"<h1[^>]*>.*?</h1>", html, re.DOTALL | re.IGNORECASE)
    assert len(h1_matches) == 1


def test_accessibility_interactive_controls_and_labels() -> None:
    """Verify that all inputs, textareas, and selects have associated labels or aria-labels."""
    response = client.get("/")
    assert response.status_code == 200
    html = response.text

    # Labels verification
    assert '<label for="language-select"' in html
    assert '<label for="sos-location-input"' in html
    assert '<label for="hazard-description"' in html
    assert '<label for="hazard-image-input"' in html

    # Button aria labels and descriptors
    assert 'aria-label="Trigger Campus Emergency SOS Dispatch"' in html
    assert 'aria-controls="protocol-viewer"' in html
    assert 'aria-label="Remove uploaded hazard image"' in html


def test_accessibility_decorative_webgl_canvas() -> None:
    """Verify decorative canvas is hidden from assistive technology."""
    response = client.get("/")
    assert response.status_code == 200
    html = response.text

    assert '<canvas id="bg-canvas" aria-hidden="true" tabindex="-1"></canvas>' in html


def test_accessibility_responsive_viewport_and_metadata() -> None:
    """Verify responsive viewport meta tag and SEO description are present."""
    response = client.get("/")
    assert response.status_code == 200
    html = response.text

    assert '<meta name="viewport" content="width=device-width, initial-scale=1.0">' in html
    assert '<meta name="description"' in html


def test_accessibility_multilingual_options_coverage() -> None:
    """Verify all 7 local languages are supported in the language picker."""
    response = client.get("/")
    assert response.status_code == 200
    html = response.text

    expected_languages = [
        'value="English"',
        'value="Hindi"',
        'value="Bengali"',
        'value="Marathi"',
        'value="Telugu"',
        'value="Tamil"',
        'value="Gujarati"',
    ]
    for lang in expected_languages:
        assert lang in html
