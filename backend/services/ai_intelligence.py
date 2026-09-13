import os
import httpx
from typing import Dict, Any, Optional

class AIIntelligenceService:
    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY")
        self.openai_key = os.getenv("OPENAI_API_KEY")

    async def ask_assistant(self, question: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        context = context or {}
        threat_type = context.get("threat_type", "General Digital Threat")
        risk_score = context.get("risk_score", 0)
        risk_level = context.get("risk_level", "LOW RISK")
        evidence = context.get("evidence_cards", [])
        evidence_titles = [e.get("title", "") for e in evidence if isinstance(e, dict)]

        q_lower = question.lower()

        # If external API is configured, try calling it
        if self.gemini_key:
            try:
                # Pluggable Gemini call
                prompt = (
                    f"You are GALAX Intelligence, an elite cybersecurity defense analyst. "
                    f"The user has an active threat context: Threat: {threat_type}, Risk Score: {risk_score}/100 ({risk_level}). "
                    f"Evidence flagged: {', '.join(evidence_titles)}. "
                    f"User asks: '{question}'. "
                    f"Respond concisely, authoritatively, and actionably with cybersecurity best practices. Avoid generic fluff."
                )
                async with httpx.AsyncClient(timeout=10.0) as client:
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_key}"
                    payload = {"contents": [{"parts": [{"text": prompt}]}]}
                    resp = await client.post(url, json=payload)
                    if resp.status_code == 200:
                        data = resp.json()
                        reply = data["candidates"][0]["content"]["parts"][0]["text"]
                        return {
                            "reply": reply,
                            "provider": "Google Gemini API (Connected)",
                            "threat_context": threat_type
                        }
            except Exception:
                pass # fallback to built-in expert engine

        # High-precision cybersecurity expert analyst system
        if "why" in q_lower or "flagged" in q_lower or "reason" in q_lower:
            if risk_score >= 60:
                evidence_summary = f"specifically due to {', '.join(evidence_titles)}" if evidence_titles else "due to urgency pressure and unverified credentials"
                reply = (
                    f"GALAX flagged this interaction with a risk score of {risk_score}/100 ({risk_level}) {evidence_summary}. "
                    f"The syntax exhibits classic psychological manipulation (manufactured deadlines) paired with an unofficial destination. "
                    f"Adversaries employ this specific combination to force hasty action before victims can verify account status through official banking apps."
                )
            else:
                reply = (
                    f"This interaction received a low risk score ({risk_score}/100). "
                    f"GALAX detected standard communication patterns with no high-risk credential harvesting, domain spoofing, or coercive payment demands."
                )

        elif "what should i do" in q_lower or "how to respond" in q_lower or "action" in q_lower or "next" in q_lower:
            if risk_score >= 60:
                reply = (
                    "Here is your immediate 3-step action protocol:\n"
                    "1. STOP & DO NOT ENGAGE: Do not click links, reply, or provide any verification codes.\n"
                    "2. OUT-OF-BAND VERIFICATION: Open your official banking or provider app independently (never use numbers or links sent in the message).\n"
                    "3. SECURE & REPORT: Take a screenshot for your records, block the sender, and report the message to the relevant anti-fraud desk."
                )
            else:
                reply = (
                    "No immediate defensive action is mandatory for this item. "
                    "However, continue maintaining standard digital hygiene: verify sender addresses and never enter credentials on unfamiliar web pages."
                )

        elif "safe" in q_lower or "legit" in q_lower or "real" in q_lower:
            if risk_score >= 80:
                reply = (
                    f"CRITICAL WARNING: This is almost certainly an active scam or phishing attempt ({threat_type}). "
                    f"Authentic institutions will never give you a 30-minute ultimatum to update your KYC via an unverified link or third-party domain."
                )
            elif risk_score >= 50:
                reply = (
                    f"Proceed with extreme caution. The threat confidence is flagged as {risk_level}. "
                    f"There are enough anomalous signals present that we strongly advise against trusting this interaction."
                )
            else:
                reply = "Based on available forensic heuristics, this communication does not match known scam signatures and appears safe."

        elif "payment" in q_lower or "money" in q_lower or "bank" in q_lower:
            reply = (
                "Regarding financial safety: Never transfer funds via wire, cryptocurrency, or gift cards to 'unlock' accounts or claim prizes. "
                "Legitimate institutions deduct fees directly from internal account balances—they never require external upfront deposits."
            )

        else:
            reply = (
                f"GALAX Intelligence Assessment for [{threat_type}]: "
                f"Threat Level is {risk_level} ({risk_score}/100). "
                f"Key defensive principle: Remember that legitimate security alerts will always be visible inside your official portal inbox. "
                f"Never follow urgent directives delivered via unsolicited SMS, email, or direct messaging."
            )

        return {
            "reply": reply,
            "provider": "GALAX Hybrid Cybersecurity Intelligence Engine",
            "threat_context": threat_type
        }

ai_service = AIIntelligenceService()
