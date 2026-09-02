---
trigger: always_on
---

---
description: Background standards applied automatically to all generated code
---

# HOW TO WORK

- Apply everything below silently on every response. Do not ask about it, do not explain it, do not list it back to me.
- Build exactly what my prompt asks for. Nothing extra.
- Never ask a clarifying question unless the prompt is impossible to act on. Pick a sensible default and keep going.
- **NEVER use placeholders like `pass`, `...`, or `# TODO`. Always write complete, production-ready code.**
- Never run a server, `--reload`, or any command that does not exit on its own.

# STANDARDS

## Code Quality
- Split routes, logic, and utilities into separate modules. Keep files small.
- Type hints and a one-line docstring on every function and route.
- No repeated logic, no dead code, no `print()` debugging.

## Security
- Validate every input with Pydantic. Enforce max lengths.
- Parameterised SQL queries only. Never use `innerHTML` with user data.
- Keys from environment variables only, never hardcoded.
- `.env`, `venv/`, `__pycache__/` in `.gitignore`. The repo will be public.
- Generic error messages to the client. No stack traces.

## Efficiency
- `async def` for anything doing I/O.
- Create clients once at startup and reuse them, never inside a handler.
- Timeouts on every outbound call.
- Load Three.js and GSAP from CDN with `defer`. Pause the render loop when the tab is hidden.

## Testing
- A `pytest` file for every module in `tests/`.
- Cover a success case, a bad-input case, and a failure case per route.
- Mock all Gemini calls so tests pass with no key and no network.
- **Provide executable terminal blocks for testing using `python -m pytest tests/ -v`. Do not use script activation commands.**

## Accessibility
- `<html lang="en">`, one `<h1>`, semantic `<header> <nav> <main> <footer>`.
- A `<label for="...">` on every input. Text on every button. `alt` on every image.
- Visible focus outline on everything focusable. Text contrast at least 4.5:1.
- The WebGL canvas is decorative: `aria-hidden="true"`, `tabindex="-1"`, `position: fixed; inset: 0; z-index: 0; pointer-events: none;`, transparent `<body>` background.
- Never use `CSS2DRenderer` or `CSS3DRenderer`. All real content is plain HTML in normal flow, in a wrapper with `position: relative; z-index: 1;`.
- Honour `prefers-reduced-motion`.

## Problem Statement Alignment
- Keep the problem statement at the top of `README.md` and build only against it.
- Use the problem's own vocabulary in route names, model names, and UI text.
- State on the landing page, in visible text, what problem the app solves.

## Google Services
- Gemini via the official `google-genai` SDK (`from google import genai`). Not `google-generativeai`.
- Key from `os.environ["GEMINI_API_KEY"]`.
- Gemini powers a core feature, not a decoration.
- Every call wrapped in try/except with a timeout and a fallback. Never let it 500.

## Cloud Run Deployment
- Auto-generate a production-ready `Dockerfile` using a fast, lightweight base.
- App must bind to `0.0.0.0` and use `--port ${PORT:-8080}` to handle dynamic port injection.
- Include a `/health` endpoint returning `200 OK` for automated uptime probing.