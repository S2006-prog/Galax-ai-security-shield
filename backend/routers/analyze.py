from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uuid

from backend.services.risk_engine import risk_engine
from backend.services.url_intelligence import url_service
from backend.services.ocr_service import ocr_service
from backend.services.ai_intelligence import ai_service
from backend.data.store import data_store

router = APIRouter(prefix="/api/analyze", tags=["Analyze"])

class TextAnalysisRequest(BaseModel):
    text: str
    source_type: Optional[str] = "text"

class URLAnalysisRequest(BaseModel):
    url: str

class AssistantRequest(BaseModel):
    question: str
    context: Optional[Dict[str, Any]] = None

@router.post("/text")
def analyze_text_endpoint(payload: TextAnalysisRequest):
    if not payload.text or not payload.text.strip():
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")

    result = risk_engine.analyze_text(payload.text, source_type=payload.source_type)
    
    # Record to threat history
    threat_item = {
        "id": f"th-{uuid.uuid4().hex[:6]}",
        "date": "Just now",
        "timestamp": "2026-09-13T18:30:00",
        "input_type": payload.source_type or "text",
        "title": payload.text[:48] + ("..." if len(payload.text) > 48 else ""),
        "snippet": payload.text[:120] + ("..." if len(payload.text) > 120 else ""),
        "risk_score": result["risk_score"],
        "risk_level": result["risk_level"],
        "threat_type": result["threat_type"],
        "status": "Blocked" if result["risk_score"] >= 80 else ("Flagged" if result["risk_score"] >= 60 else "Safe"),
        "confidence": result["confidence"],
        "short_explanation": result["explanation"][:140] + "...",
        "full_result": result
    }
    data_store.add_threat(threat_item)

    return {
        "id": threat_item["id"],
        **result
    }

@router.post("/url")
def analyze_url_endpoint(payload: URLAnalysisRequest):
    if not payload.url or not payload.url.strip():
        raise HTTPException(status_code=400, detail="URL cannot be empty.")

    result = url_service.scan_url(payload.url)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    threat_item = {
        "id": f"th-{uuid.uuid4().hex[:6]}",
        "date": "Just now",
        "timestamp": "2026-09-13T18:30:00",
        "input_type": "url",
        "title": result.get("domain", payload.url),
        "snippet": payload.url,
        "risk_score": result["risk_score"],
        "risk_level": result["risk_level"],
        "threat_type": result["threat_type"],
        "status": "Blocked" if result["risk_score"] >= 80 else ("Flagged" if result["risk_score"] >= 60 else "Safe"),
        "confidence": result["confidence"],
        "short_explanation": result["explanation"][:140] + "...",
        "full_result": result
    }
    data_store.add_threat(threat_item)

    return {
        "id": threat_item["id"],
        **result
    }

@router.post("/image")
async def analyze_image_endpoint(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No screenshot file uploaded.")

    content = await file.read()
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    result = ocr_service.extract_and_analyze(content, filename=file.filename or "screenshot.png")
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    analysis = result["analysis"]
    threat_item = {
        "id": f"th-{uuid.uuid4().hex[:6]}",
        "date": "Just now",
        "timestamp": "2026-09-13T18:30:00",
        "input_type": "screenshot",
        "title": f"Screenshot: {file.filename or 'Capture'}",
        "snippet": f"OCR text: {result.get('extracted_text', '')[:100]}...",
        "risk_score": analysis["risk_score"],
        "risk_level": analysis["risk_level"],
        "threat_type": analysis["threat_type"],
        "status": "Blocked" if analysis["risk_score"] >= 80 else ("Flagged" if analysis["risk_score"] >= 60 else "Safe"),
        "confidence": analysis["confidence"],
        "short_explanation": analysis["explanation"][:140] + "...",
        "full_result": analysis
    }
    data_store.add_threat(threat_item)

    return {
        "id": threat_item["id"],
        "image_metadata": result["image_metadata"],
        "extracted_text": result["extracted_text"],
        "ocr_confidence": result["ocr_confidence"],
        **analysis
    }

@router.post("/assistant")
async def ask_assistant_endpoint(payload: AssistantRequest):
    if not payload.question or not payload.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty.")
    
    response = await ai_service.ask_assistant(payload.question, payload.context)
    return response
