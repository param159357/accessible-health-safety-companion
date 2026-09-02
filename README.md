# Accessible Multimodal Health & Safety Companion

## Problem Statement
During campus emergencies, individuals face critical communication barriers, panic, and language gaps that delay urgent medical care and safety hazard management. This application provides rapid first-aid protocols, translates warnings into 7 local languages (English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati), and simulates alerting emergency contacts to protect students, faculty, and campus staff.

## Architecture
- **Backend:** FastAPI, Uvicorn, Pydantic, Google GenAI SDK (`google-genai`)
- **Deployment:** Google Cloud Run containerized via Docker (`python:3.11-slim`)
- **Endpoints:**
  - `GET /health` - Automated uptime probing and health verification (200 OK)

## Quickstart

### 1. Environment Setup
```bash
python -m venv venv
```

### 2. Install Dependencies
```bash
python -m pip install -r requirements.txt
```

### 3. Run Tests
```bash
python -m pytest tests/ -v
```
