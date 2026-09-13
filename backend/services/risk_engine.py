import re
from typing import List, Dict, Any, Optional

class RiskEngine:
    def __init__(self):
        # 1. Urgency / Coercion triggers
        self.urgency_patterns = [
            (r"\b(within|in)\s+(\d{1,2}\s*(hours?|hrs?|minutes?|mins?))\b", "Immediate time limit countdown", 25),
            (r"\b(immediately|urgent|urgently|right away|asap|at once)\b", "Aggressive urgency pressure", 15),
            (r"\b(account.*(suspend|block|freeze|terminate|disable|lock)|service.*disconnect)\b", "Threat of account suspension or service loss", 28),
            (r"\b(last\s+chance|final\s+notice|action\s+required|warning:)\b", "Coercive final notice language", 20),
            (r"\b(legal\s+action|arrest|warrant|lawsuit|penalt(y|ies)|court)\b", "Extortion / legal intimidation cues", 30),
        ]

        # 2. Banking / Financial / KYC harvesting
        self.credential_patterns = [
            (r"\b(verify|update|confirm)\s+(your\s+)?(kyc|pan|ssn|identity|card|account)\b", "Unsolicited KYC / Identity verification demand", 30),
            (r"\b(otp|one[-\s]?time\s*password|security\s*code|pin|cvv|cvc)\b", "Direct request or manipulation involving OTP / CVV / PIN", 35),
            (r"\b(net[-\s]?banking|login\s+credentials|master\s+password|secret\s+keys?|recovery\s+phrase|seed\s+phrase)\b", "Harvesting of sensitive credentials or crypto keys", 40),
            (r"\b(click\s+(here|this\s+link)|follow\s+this\s+link|tap\s+to\s+verify|visit\s+the\s+link)\b", "Call-to-action redirecting to external link", 15),
        ]

        # 3. Financial demands / Prize / Investment / Job scam patterns
        self.fraud_offer_patterns = [
            (r"\b(lottery|won\s+\$|claim\s+your\s+prize|jackpot|inheritance|congratulations.*winner)\b", "Classic lottery or unearned windfall lure", 35),
            (r"\b(guaranteed\s+(return|profit)|100%\s*profit|double\s+your\s+money|crypto\s+investment|forex\s+trading)\b", "High-yield investment fraud / Ponzi indicators", 32),
            (r"\b(registration\s+fee|processing\s+fee|refundable\s+deposit|pay\s+first|advance\s+fee|wire\s+transfer)\b", "Advance fee or registration payment request", 35),
            (r"\b(work\s+from\s+home.*(\$\d{3,5}|salary)|hired\s+immediately|part[-\s]?time\s+task.*earn)\b", "Fake employment / task-based scam characteristics", 28),
            (r"\b(gift\s*card|apple\s*gift\s*card|steam\s*card|crypto\s+voucher)\b", "Irreversible payment method demand", 35),
        ]

        # 4. Impersonation of major trusted institutions
        self.impersonation_entities = [
            (r"\b(chase|wells\s*fargo|bank\s*of\s*america|citibank|hdfc|icici|sbi|barclays|hsbc)\b", "Banking / Financial Institution"),
            (r"\b(paypal|venmo|zelle|cashapp|revolut|stripe)\b", "Payment Processing Platform"),
            (r"\b(irs|tax\s*department|hmrc|department\s+of\s+revenue|social\s*security)\b", "Tax or Government Authority"),
            (r"\b(fedex|ups|usps|dhl|amazon\s+delivery|package\s+pending)\b", "Courier / Postal Delivery Service"),
            (r"\b(apple\s+support|microsoft\s+support|google\s+security|netflix\s+billing|geek\s*squad)\b", "Tech / Digital Subscription Service"),
        ]

    def analyze_text(self, text: str, source_type: str = "text") -> Dict[str, Any]:
        if not text or not text.strip():
            return {
                "risk_score": 0,
                "risk_level": "LOW RISK",
                "confidence": "High",
                "threat_type": "Clean / Safe Content",
                "evidence_cards": [],
                "explanation": "No text or suspicious signals detected.",
                "recommended_actions": ["No action needed."],
                "signals_breakdown": {}
            }

        cleaned = text.strip()
        lower = cleaned.lower()

        evidence_cards = []
        raw_score = 0
        signals_count = 0

        # Check Urgency
        urgency_hits = []
        urgency_subscore = 0
        for pattern, desc, weight in self.urgency_patterns:
            matches = re.findall(pattern, lower)
            if matches:
                urgency_hits.append(desc)
                urgency_subscore = max(urgency_subscore, weight)
                raw_score += weight
                signals_count += 1

        if urgency_hits:
            evidence_cards.append({
                "id": "urgency-signal",
                "icon": "AlertTriangle",
                "title": "Urgency & Psychological Coercion",
                "severity": "high" if urgency_subscore >= 25 else "medium",
                "description": f"Detected artificial urgency designed to bypass critical thinking: {', '.join(urgency_hits[:2])}."
            })

        # Check Credential / KYC Harvesting
        credential_hits = []
        credential_subscore = 0
        for pattern, desc, weight in self.credential_patterns:
            matches = re.findall(pattern, lower)
            if matches:
                credential_hits.append(desc)
                credential_subscore = max(credential_subscore, weight)
                raw_score += weight
                signals_count += 1

        if credential_hits:
            evidence_cards.append({
                "id": "credential-harvesting",
                "icon": "KeyRound",
                "title": "Credential & KYC Harvesting Vector",
                "severity": "high" if credential_subscore >= 30 else "medium",
                "description": f"Demands verification or exposure of sensitive identity or financial information: {', '.join(credential_hits[:2])}."
            })

        # Check Financial / Scams / Windfall
        fraud_hits = []
        fraud_subscore = 0
        for pattern, desc, weight in self.fraud_offer_patterns:
            matches = re.findall(pattern, lower)
            if matches:
                fraud_hits.append(desc)
                fraud_subscore = max(fraud_subscore, weight)
                raw_score += weight
                signals_count += 1

        if fraud_hits:
            evidence_cards.append({
                "id": "financial-fraud-indicators",
                "icon": "Coins",
                "title": "Unrealistic Financial or Payment Scheme",
                "severity": "high",
                "description": f"Signals of advance fees, fake windfalls, or high-risk schemes detected: {', '.join(fraud_hits[:2])}."
            })

        # Check Brand / Institution Impersonation
        impersonation_hits = []
        for pattern, entity_type in self.impersonation_entities:
            if re.search(pattern, lower):
                impersonation_hits.append(entity_type)
        
        if impersonation_hits and (urgency_hits or credential_hits or fraud_hits):
            raw_score += 25
            signals_count += 1
            evidence_cards.append({
                "id": "brand-impersonation",
                "icon": "Building2",
                "title": "Suspected Authority / Brand Impersonation",
                "severity": "high",
                "description": f"References {', '.join(set(impersonation_hits))} alongside coercion or credential requests."
            })

        # Embedded URL detection heuristics
        urls_in_text = re.findall(r"https?://[^\s<>\"']+|www\.[^\s<>\"']+", cleaned)
        if urls_in_text:
            has_suspicious_tld = any(re.search(r"\.(xyz|top|ru|cn|buzz|cc|cfd|sbs|work|fit)\b", u.lower()) for u in urls_in_text)
            has_ip = any(re.search(r"https?://\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}", u) for u in urls_in_text)
            if has_suspicious_tld or has_ip or credential_hits:
                raw_score += 25
                evidence_cards.append({
                    "id": "suspicious-link-structure",
                    "icon": "ExternalLink",
                    "title": "Deceptive URL Routing Detected",
                    "severity": "high",
                    "description": f"Found embedded link ({urls_in_text[0][:32]}...) leading to an unverified or potentially spoofed domain."
                })

        # Normalize score into 0 - 100 range
        # Synergistic risk: if multiple major vectors collide, boost the risk score
        if urgency_hits and credential_hits:
            raw_score += 15
        if impersonation_hits and credential_hits:
            raw_score += 15

        final_score = min(100, raw_score)

        # Baseline clamp if minimal indicators
        if not evidence_cards:
            final_score = min(15, len(cleaned) // 80)

        # Classify Level
        if final_score >= 80:
            risk_level = "HIGH RISK"
            confidence = "High"
        elif final_score >= 60:
            risk_level = "SUSPICIOUS"
            confidence = "High" if signals_count >= 2 else "Moderate"
        elif final_score >= 30:
            risk_level = "CAUTION"
            confidence = "Moderate"
        else:
            risk_level = "LOW RISK"
            confidence = "High"

        # Determine Threat Classification
        threat_type = self._classify_threat(urgency_hits, credential_hits, fraud_hits, impersonation_hits, final_score)

        # Action Recommendations
        recommended_actions = self._generate_recommendations(risk_level, threat_type, credential_hits, fraud_hits)

        # AI Explanation
        explanation = self._generate_explanation(threat_type, risk_level, evidence_cards)

        return {
            "risk_score": final_score,
            "risk_level": risk_level,
            "confidence": confidence,
            "threat_type": threat_type,
            "evidence_cards": evidence_cards,
            "explanation": explanation,
            "recommended_actions": recommended_actions,
            "signals_breakdown": {
                "urgency_score": min(100, urgency_subscore * 2),
                "credential_risk": min(100, credential_subscore * 2),
                "financial_anomaly": min(100, fraud_subscore * 2),
                "impersonation_risk": 90 if impersonation_hits else 10
            }
        }

    def _classify_threat(self, urgency, credentials, fraud, impersonation, score: int) -> str:
        if score < 30:
            return "Benign / Normal Communication"
        if credentials and impersonation:
            return "Phishing / Banking Impersonation"
        if credentials:
            return "Credential Harvesting Attack"
        if fraud and "lottery" in str(fraud).lower():
            return "Advance-Fee / Lottery Scam"
        if fraud and "job" in str(fraud).lower():
            return "Employment / Task Advance-Fee Scam"
        if fraud and "crypto" in str(fraud).lower():
            return "High-Yield Investment / Ponzi Scheme"
        if urgency and impersonation:
            return "Authority Coercion / Impersonation"
        if fraud:
            return "Payment Fraud Attempt"
        return "Suspicious Social Engineering Interaction"

    def _generate_recommendations(self, risk_level: str, threat_type: str, credentials, fraud) -> List[str]:
        if risk_level == "LOW RISK":
            return [
                "Content displays standard conversational markers.",
                "Always verify unexpected attachments or payment links independently.",
                "Maintain standard digital hygiene."
            ]

        actions = [
            "DO NOT click any links, download attachments, or scan QR codes provided in this message.",
            "DO NOT share one-time passwords (OTP), banking PINs, or identity numbers under any circumstance."
        ]

        if "Banking" in threat_type or "Impersonation" in threat_type:
            actions.append("Directly navigate to the organization's verified official portal or call the number on the back of your card.")
        elif "Job" in threat_type:
            actions.append("Legitimate corporate recruiters never require payment for registration, training equipment, or vetting.")
        elif "Investment" in threat_type or "Lottery" in threat_type:
            actions.append("Cease all contact immediately. Report the profile or sender to the hosting platform.")

        actions.append("Block and report the sender to prevent further social-engineering attempts.")
        return actions

    def _generate_explanation(self, threat_type: str, risk_level: str, evidence: List[Dict[str, Any]]) -> str:
        if risk_level == "LOW RISK":
            return "GALAX analyzed this content and detected no coercive language, credential solicitation, or deceptive routing indicators. It conforms to standard communications."
        
        evidence_points = [f"• {e['title']}: {e['description']}" for e in evidence]
        joined_evidence = "\n".join(evidence_points)
        
        return (
            f"Based on GALAX multi-signal evaluation, this interaction presents strong characteristics of a {threat_type}. "
            f"Adversaries commonly combine artificial time pressure with brand spoofing to prevent careful verification.\n\n"
            f"Key Forensic Signals:\n{joined_evidence}"
        )

risk_engine = RiskEngine()
