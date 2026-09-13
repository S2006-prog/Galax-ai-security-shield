from fastapi import APIRouter
from backend.data.store import data_store

router = APIRouter(prefix="/api/privacy", tags=["Privacy"])

@router.get("")
def get_privacy_center():
    return {
        "principles": [
            {
                "title": "Strict Least Privilege",
                "badge": "Enforced",
                "description": "GALAX only requests minimal scoped read access required to identify scam signatures. No write, send, delete, or management permissions are ever sought."
            },
            {
                "title": "Zero Content Retention",
                "badge": "Active",
                "description": "Text, URLs, and image tokens evaluated in Local Shield are tokenized in volatile RAM and discarded post-analysis."
            },
            {
                "title": "Granular User Control",
                "badge": "1-Click Revoke",
                "description": "Revoke OAuth access to any connected provider at any instant. Scoped access tokens are wiped immediately from memory."
            },
            {
                "title": "Probabilistic Honesty",
                "badge": "No False Claims",
                "description": "GALAX evaluates multiple weighted forensic signals and provides confidence tiers. We never claim '100% scam proof'."
            }
        ],
        "access_logs": data_store.privacy_logs,
        "data_retention_policy": {
            "mode": "Ephemeral In-Memory",
            "retention_hours": 0,
            "export_available": True
        }
    }

@router.post("/purge")
def purge_all_data():
    data_store.clear_history()
    return {
        "status": "success",
        "message": "All session telemetry, cached analysis tokens, and audit events purged successfully."
    }
