from fastapi import APIRouter
from backend.data.store import data_store

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("")
def get_dashboard_summary():
    return {
        "user": data_store.user,
        "stats": data_store.stats,
        "recent_threats": data_store.threat_history[:5],
        "alerts": data_store.alerts
    }

@router.post("/alerts/{alert_id}/dismiss")
def dismiss_alert(alert_id: str):
    data_store.dismiss_alert(alert_id)
    return {"status": "success", "alert_id": alert_id, "remaining_alerts": len(data_store.alerts)}
