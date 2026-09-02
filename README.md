# Accessible Multimodal Health & Safety Companion

## Problem Statement
During campus emergencies, individuals face critical communication barriers, panic, and language gaps that delay urgent medical care and safety hazard management. This application provides rapid first-aid protocols, translates warnings into 7 local languages (English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati), and simulates alerting emergency contacts to protect students, faculty, and campus staff.

---

## Chosen Vertical
**Health & Safety (Multimodal Campus Emergency Response)**
Focused on immediate, zero-latency first-aid guidance, AI-assisted multimodal triage of complex hazards (chemical spills, burns, electrical risks), and streamlined emergency WhatsApp dispatch routing (+91 8250666852 / 112) for educational and institutional campuses.

---

## Approach & Logic
The solution implements a **3-Tier Hybrid Resilient Architecture**:

1. **Tier 1: Instant Quick-Help (Zero Network Latency)**
   - Hardcoded, verified first-aid protocols for the top 5 campus emergencies (Cuts & Severe Bleeding, Thermal Burns, Chemical Exposure, Electric Shock, and Fainting).
   - Rendered locally in the browser with immediate localized translation support, guaranteeing instant guidance even during intermittent network drops.

2. **Tier 2: AI Hazard Triage (Gemini 3.7 Flash)**
   - When unexpected or multi-factor hazards occur (e.g., chemical spills, burns, laboratory equipment hazards), users can supply photo evidence and incident descriptions.
   - The backend utilizes the official `google-genai` SDK with `gemini-3.7-flash`, enforcing strictly typed structured JSON schemas (`SafetyProtocol`) via `response_schema` in `types.GenerateContentConfig`.
   - Every AI request is wrapped in asynchronous timeouts with a deterministic fallback protocol referencing national emergency helpline 112.

3. **Tier 3: Instant WhatsApp SOS Dispatch Gateway**
   - Direct emergency dispatch trigger binding current campus location coordinates and ISO timestamps to generate tracked emergency tickets (`SOS-XXXXXXXX`) and instant pre-filled WhatsApp emergency alerts to **+91 8250666852**.

---

## How the Solution Works

### User & Interaction Flow
1. **Language Selection:** The user selects their preferred language from the global switcher. The entire interface—including headers, labels, buttons, and first-aid instructions—dynamically translates into the selected language (English, Hindi, Bengali, Marathi, Telugu, Tamil, or Gujarati).
2. **Instant First-Aid Triage:** Clicking any Quick Help category immediately displays structured, numbered action steps, severity levels, and explicit safety precautions.
3. **AI Hazard Triage:** The user uploads a photo of a safety hazard or enters an incident description. Gemini analyzes multimodal context and returns structured first-aid steps along with translated emergency warnings and an instant WhatsApp SOS button.
4. **Emergency SOS Trigger:** Hitting the high-contrast **DISPATCH SOS TO WHATSAPP** button immediately triggers the emergency routing gateway, logging the dispatch ticket and opening WhatsApp with a pre-filled emergency message to **+91 8250666852**.

### API Architecture
| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/` | Accessible Single-Page Application (HTML5 / CSS3 / Vanilla JS) | `200 OK` |
| `GET` | `/health` | Cloud Run Automated Uptime Probing & Health Verification | `200 OK` |
| `POST` | `/api/analyze-hazard` | Multimodal Gemini 3.7 Flash hazard assessment returning structured `SafetyProtocol` JSON | `200 OK` / `422` / `500` |
| `POST` | `/api/sos-alert` | Emergency SOS trigger generating tracked `SOSResponse` tickets | `200 OK` / `422` / `500` |

---

## Any Assumptions Made
1. **Resilience Over Connectivity:** In crisis situations, internet connectivity may be degraded. The core first-aid protocols are hosted locally with zero external network reliance.
2. **Deterministic Fallbacks:** AI systems can occasionally encounter rate limits or network degradation. The backend is designed with strict 10-second timeouts and automatic fallback referencing emergency helpline 112.
3. **Emergency Routing:** Campus security and first responders monitor the designated emergency line (+91 8250666852) and national helpline (112).
4. **Language Inclusivity:** Multilingual support covers the primary languages spoken across diverse Indian university campuses.

---

## Accessibility & Security Standards

### Accessibility (WCAG 2.1 AA Compliant)
- **Semantic Structure:** Proper `<header>`, `<nav>`, `<main>`, `<section>`, `<form>`, `<fieldset>`, `<legend>`, and `<footer>` landmarks.
- **Single Heading Hierarchy:** Exactly one `<h1>` per page with logical descending order.
- **Color Contrast:** All typography achieves ≥ 4.5:1 contrast against surface backgrounds.
- **Keyboard Navigation & Focus:** High-visibility `:focus-visible` outlines (3px solid blue) on all interactive elements with minimum 44×44px tap targets.
- **Screen Reader Announcements:** Active `aria-live="assertive"` and `aria-live="polite"` regions announcing protocol changes, AI processing states, and SOS confirmations.
- **Decorative WebGL Canvas:** The ambient Three.js canvas is non-blocking (`aria-hidden="true"`, `tabindex="-1"`, `pointer-events: none;`) and pauses automatically when the tab is hidden or when `prefers-reduced-motion` is enabled.

### Security & Sanitization
- **Strict Pydantic Validation:** Input models enforce maximum field lengths on all text fields (`description` ≤ 5000 chars, `location` ≤ 200 chars).
- **Payload Bounds:** Base64 image payload is strictly bounded (capped at ~5MB) to prevent memory exhaustion attacks.
- **Safe DOM Injection:** All dynamic data is populated via `textContent` and safe DOM node creation—never via raw `innerHTML` with untrusted data.
- **Zero Stack Trace Leaks:** All API routes are wrapped in global error boundaries returning generic error descriptions on unexpected faults.
- **Credential Safety:** API keys are read exclusively from environment variables (`GEMINI_API_KEY`).

---

## Setup & Execution Instructions

### 1. Environment Initialization
```bash
python -m venv venv
```

### 2. Install Dependencies
```bash
python -m pip install -r requirements.txt
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8080
```

### 4. Run Development Server
```bash
uvicorn main:app --host 0.0.0.0 --port 8080
```
Open `http://localhost:8080` in your web browser.

### 5. Docker Containerization & Cloud Run
Build the container image:
```bash
docker build -t accessible-health-companion .
```
Run container locally:
```bash
docker run -p 8080:8080 -e GEMINI_API_KEY="your_api_key" accessible-health-companion
```

### 6. Run Test Suite
Execute the full automated test suite (mocks all external APIs, passes without live keys or network):
```bash
python -m pytest tests/ -v
```
