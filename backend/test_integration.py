import httpx
import json

def test_all():
    # 1. Frontend check
    resp_fe = httpx.get("http://localhost:5173/")
    print("Frontend Status:", resp_fe.status_code)
    assert resp_fe.status_code == 200

    # 2. Health check
    resp_health = httpx.get("http://127.0.0.1:8000/api/health")
    print("Backend Health:", resp_health.json())
    assert resp_health.status_code == 200

    # 3. Dashboard check
    resp_dash = httpx.get("http://127.0.0.1:8000/api/dashboard")
    dash = resp_dash.json()
    print("User:", dash["user"]["name"], "| Stats:", dash["stats"])
    assert dash["stats"]["messages_analyzed"] >= 47

    # 4. Text Analysis check (Prompt example)
    sample_text = "Your bank account will be blocked in 30 minutes. Verify your KYC immediately by clicking this link: http://chase-security-verify.xyz/login"
    resp_text = httpx.post("http://127.0.0.1:8000/api/analyze/text", json={"text": sample_text})
    t_data = resp_text.json()
    print("\n--- TEXT ANALYSIS TEST ---")
    print("Score:", t_data["risk_score"], "/ 100")
    print("Level:", t_data["risk_level"])
    print("Threat:", t_data["threat_type"])
    print("Evidence count:", len(t_data["evidence_cards"]))
    print("Recommended actions:", t_data["recommended_actions"])
    assert t_data["risk_score"] >= 80

    # 5. URL Analysis check (Prompt example)
    resp_url = httpx.post("http://127.0.0.1:8000/api/analyze/url", json={"url": "example-security-login.xyz"})
    u_data = resp_url.json()
    print("\n--- URL ANALYSIS TEST ---")
    print("Domain:", u_data["domain"])
    print("Score:", u_data["risk_score"])
    print("Risk Level:", u_data["risk_level"])
    print("Threat Type:", u_data["threat_type"])
    print("Evidence count:", len(u_data["evidence_cards"]))
    assert u_data["risk_score"] >= 80

    # 6. AI Assistant Contextual check
    resp_ai = httpx.post("http://127.0.0.1:8000/api/analyze/assistant", json={
        "question": "Why was this flagged?",
        "context": {
            "threat_type": t_data["threat_type"],
            "risk_score": t_data["risk_score"],
            "risk_level": t_data["risk_level"],
            "evidence_cards": t_data["evidence_cards"]
        }
    })
    ai_data = resp_ai.json()
    print("\n--- AI ASSISTANT TEST ---")
    print("Engine:", ai_data["provider"])
    print("Reply:", ai_data["reply"][:150] + "...")

    # 7. Integrations check
    resp_int = httpx.get("http://127.0.0.1:8000/api/integrations")
    int_data = resp_int.json()
    print("\n--- INTEGRATIONS TEST ---")
    print("Count:", len(int_data["integrations"]))
    gmail = next(i for i in int_data["integrations"] if i["id"] == "gmail")
    print("Gmail status:", gmail["status"], "| Allowed:", len(gmail["allowed_permissions"]), "| Prohibited:", len(gmail["prohibited_permissions"]))

    # 8. Privacy Center check
    resp_priv = httpx.get("http://127.0.0.1:8000/api/privacy")
    priv_data = resp_priv.json()
    print("\n--- PRIVACY CENTER TEST ---")
    print("Principles count:", len(priv_data["principles"]))
    print("Access logs count:", len(priv_data["access_logs"]))

    print("\n>>> ALL TESTS PASSED SUCCESSFULLY! <<<")

if __name__ == "__main__":
    test_all()
