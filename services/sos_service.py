"""Service for handling emergency SOS dispatch simulation and ticket logging."""

import uuid
from datetime import datetime, timezone
from models.schemas import SOSPayload, SOSResponse


def dispatch_emergency_alert(payload: SOSPayload) -> SOSResponse:
    """Generate and log a confirmed emergency SOS dispatch ticket."""
    alert_id = f"SOS-{uuid.uuid4().hex[:8].upper()}"
    server_time = datetime.now(timezone.utc).isoformat()

    return SOSResponse(
        status="dispatched",
        alert_id=alert_id,
        timestamp=server_time,
        hazard_type=payload.hazard_type,
        location=payload.location,
        contact_group=payload.contact_group,
    )
