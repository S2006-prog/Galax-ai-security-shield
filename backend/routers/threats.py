from fastapi import APIRouter, Query
from typing import Optional
from backend.data.store import data_store

router = APIRouter(prefix="/api/threats", tags=["Threats"])

@router.get("")
def list_threats(
    type: Optional[str] = Query(None),
    severity: Optional[str] = Query(None),
    query: Optional[str] = Query(None)
):
    items = list(data_store.threat_history)

    if type and type != "all":
        items = [i for i in items if i.get("input_type", "").lower() == type.lower()]

    if severity and severity != "all":
        if severity == "high":
            items = [i for i in items if i.get("risk_score", 0) >= 80]
        elif severity == "suspicious":
            items = [i for i in items if 60 <= i.get("risk_score", 0) < 80]
        elif severity == "caution":
            items = [i for i in items if 30 <= i.get("risk_score", 0) < 60]
        elif severity == "safe":
            items = [i for i in items if i.get("risk_score", 0) < 30]

    if query and query.strip():
        q = query.strip().lower()
        items = [
            i for i in items
            if q in i.get("title", "").lower()
            or q in i.get("snippet", "").lower()
            or q in i.get("threat_type", "").lower()
        ]

    return {
        "count": len(items),
        "threats": items
    }

@router.post("/clear")
def clear_threats():
    data_store.clear_history()
    return {"status": "success", "message": "All threat history purged"}

@router.get("/export")
def export_threats():
    return {
        "export_date": "2026-09-13T18:30:00Z",
        "user": data_store.user["email"],
        "records": data_store.threat_history
    }
