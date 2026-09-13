from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from backend.routers import analyze, threats, dashboard, integrations, privacy

app = FastAPI(
    title="GALAX AI Scam, Fraud & Digital Threat Shield",
    description="High-performance cybersecurity command center backend for threat detection and fraud prevention.",
    version="1.0.0"
)

# Enable CORS for local React/Vite development and production preview
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router)
app.include_router(threats.router)
app.include_router(dashboard.router)
app.include_router(integrations.router)
app.include_router(privacy.router)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "GALAX Cyber Threat Engine",
        "shield_version": "v1.4-production",
        "engine": "Hybrid Heuristics + Pluggable LLM"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
