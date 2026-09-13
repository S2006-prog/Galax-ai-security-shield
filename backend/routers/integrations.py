from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.integration_service import integration_service

router = APIRouter(prefix="/api/integrations", tags=["Integrations"])

class ToggleIntegrationRequest(BaseModel):
    status: str # "connected" or "disconnected"

@router.get("")
def list_integrations():
    return {
        "integrations": integration_service.get_all()
    }

@router.post("/{integration_id}/toggle")
def toggle_integration(integration_id: str, payload: ToggleIntegrationRequest):
    updated = integration_service.update_status(integration_id, payload.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Integration not found")
    return {"status": "success", "integration": updated}

@router.get("/gmail/inbox")
def get_gmail_inbox_feed():
    return {
        "service": "Google Gmail Threat Sentinel",
        "last_sync": "Just now",
        "messages": integration_service.get_inbox_threats()
    }
