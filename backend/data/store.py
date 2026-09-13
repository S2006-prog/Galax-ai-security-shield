import datetime
from typing import List, Dict, Any

class DataStore:
    def __init__(self):
        self.user = {
            "id": "usr_9901",
            "name": "Alex Mercer",
            "email": "alex.mercer@cyber-defense.io",
            "role": "Verified Protected Member",
            "joined": "September 2026",
            "shield_mode": "Hybrid (Local + Default Shield Active)"
        }

        self.stats = {
            "messages_analyzed": 47,
            "urls_scanned": 12,
            "suspicious_items": 3,
            "high_risk_threats": 1,
            "protection_status": "PROTECTED",
            "system_health": "OPTIMAL",
            "last_scan_time": "Just now"
        }

        self.threat_history: List[Dict[str, Any]] = [
            {
                "id": "th-101",
                "date": "Today, 14:15",
                "timestamp": "2026-09-13T14:15:00",
                "input_type": "text",
                "title": "Fake Banking KYC Suspension Notice",
                "snippet": "Your bank account will be blocked in 30 minutes. Verify your KYC immediately...",
                "risk_score": 94,
                "risk_level": "HIGH RISK",
                "threat_type": "Phishing / Banking Impersonation",
                "status": "Blocked",
                "confidence": "High",
                "short_explanation": "Severe urgency manipulation combined with spoofed financial credential request."
            },
            {
                "id": "th-102",
                "date": "Yesterday, 19:40",
                "timestamp": "2026-09-12T19:40:00",
                "input_type": "url",
                "title": "paypal-secure-authorization.xyz",
                "snippet": "https://paypal-secure-authorization.xyz/webapps/mpp/account-recovery",
                "risk_score": 88,
                "risk_level": "HIGH RISK",
                "threat_type": "Typosquatting Phishing Domain",
                "status": "Blocked",
                "confidence": "High",
                "short_explanation": "Impersonates PayPal using unauthorized .xyz high-abuse TLD."
            },
            {
                "id": "th-103",
                "date": "Sep 11, 11:20",
                "timestamp": "2026-09-11T11:20:00",
                "input_type": "text",
                "title": "Suspicious Crypto VIP Telegram Offer",
                "snippet": "Guaranteed 300% weekly returns on automated BTC algorithmic bot...",
                "risk_score": 76,
                "risk_level": "SUSPICIOUS",
                "threat_type": "High-Yield Investment Fraud",
                "status": "Flagged",
                "confidence": "High",
                "short_explanation": "Classic Ponzi structure with promises of impossible guaranteed returns."
            },
            {
                "id": "th-104",
                "date": "Sep 10, 08:35",
                "timestamp": "2026-09-10T08:35:00",
                "input_type": "screenshot",
                "title": "Unverified Package Notification Screenshot",
                "snippet": "OCR Extract: 'Your parcel is waiting at distribution center #4. Pay $2.10...'",
                "risk_score": 52,
                "risk_level": "CAUTION",
                "threat_type": "Unverified Delivery Fee Notice",
                "status": "Caution",
                "confidence": "Moderate",
                "short_explanation": "Possible postal smishing scam requiring external verification."
            },
            {
                "id": "th-105",
                "date": "Sep 09, 16:50",
                "timestamp": "2026-09-09T16:50:00",
                "input_type": "url",
                "title": "github.com/features/security",
                "snippet": "https://github.com/features/security",
                "risk_score": 5,
                "risk_level": "LOW RISK",
                "threat_type": "Benign Official Domain",
                "status": "Safe",
                "confidence": "High",
                "short_explanation": "Authenticated enterprise domain with valid EV SSL certificate."
            }
        ]

        self.alerts: List[Dict[str, Any]] = [
            {
                "id": "alt-01",
                "severity": "HIGH",
                "title": "High-Risk Phishing Email Detected",
                "message": "Incoming message from 'Chase Alerts <no-reply@chase-auth-service.xyz>' mimics financial identity verification.",
                "timestamp": "10 minutes ago",
                "threat_id": "th-101",
                "read": False
            },
            {
                "id": "alt-02",
                "severity": "WARNING",
                "title": "Suspicious Domain Blocked by Sentinel",
                "message": "Prevented navigation to unverified typosquatting destination 'paypal-secure-authorization.xyz'.",
                "timestamp": "Yesterday",
                "threat_id": "th-102",
                "read": False
            }
        ]

        self.privacy_logs: List[Dict[str, Any]] = [
            {
                "id": "priv-1",
                "action": "Threat Signature Match (Local Shield)",
                "details": "Heuristic tokenization executed purely in volatile memory. No text stored.",
                "timestamp": "Just now",
                "status": "Zero Data Retained"
            },
            {
                "id": "priv-2",
                "action": "Gmail Read-Only Threat Evaluation",
                "details": "Scoped snippet scan inspected message #4912. No personal body content copied.",
                "timestamp": "10 mins ago",
                "status": "Least-Privilege Compliant"
            },
            {
                "id": "priv-3",
                "action": "Browser Sentinel URL Hash Check",
                "details": "Queried local bloom filter for suspicious domain structure.",
                "timestamp": "Yesterday",
                "status": "Privacy Preserved"
            }
        ]

    def add_threat(self, threat: Dict[str, Any]):
        self.threat_history.insert(0, threat)
        # Update dashboard stats
        if threat.get("input_type") == "url":
            self.stats["urls_scanned"] += 1
        else:
            self.stats["messages_analyzed"] += 1

        score = threat.get("risk_score", 0)
        if score >= 80:
            self.stats["high_risk_threats"] += 1
            self.stats["protection_status"] = "ACTION REQUIRED"
            # Add an alert
            self.alerts.insert(0, {
                "id": f"alt-{len(self.alerts)+1}",
                "severity": "HIGH",
                "title": f"High-Risk {threat.get('threat_type', 'Threat')} Detected",
                "message": f"Recent scan flagged score {score}/100: {threat.get('title', 'Suspicious item')}",
                "timestamp": "Just now",
                "threat_id": threat.get("id"),
                "read": False
            })
        elif score >= 60:
            self.stats["suspicious_items"] += 1

    def dismiss_alert(self, alert_id: str):
        self.alerts = [a for a in self.alerts if a["id"] != alert_id]

    def clear_history(self):
        self.threat_history = []
        self.stats["messages_analyzed"] = 0
        self.stats["urls_scanned"] = 0
        self.stats["suspicious_items"] = 0
        self.stats["high_risk_threats"] = 0
        self.stats["protection_status"] = "PROTECTED"

data_store = DataStore()
