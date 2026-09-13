from typing import List, Dict, Any

class IntegrationService:
    def __init__(self):
        self.integrations = {
            "gmail": {
                "id": "gmail",
                "name": "Google Gmail Shield",
                "icon": "Mail",
                "status": "connected",
                "account": "user.alex@gmail.com",
                "connected_at": "2026-09-10 14:22:00",
                "scope_level": "Strict Least-Privilege (Read-Only Threat Inspection)",
                "allowed_permissions": [
                    "Inspect incoming message headers and text snippets for threat patterns",
                    "Calculate risk scores on suspicious sender addresses and links",
                    "Dispatch real-time warning alerts to GALAX Security Center"
                ],
                "prohibited_permissions": [
                    "Send emails on your behalf",
                    "Delete, archive, or modify your emails",
                    "Access your personal contact list or Google Drive",
                    "Share your email contents with third-party advertisers"
                ],
                "threats_blocked": 14,
                "messages_scanned": 472
            },
            "browser": {
                "id": "browser",
                "name": "GALAX Web Sentinel",
                "icon": "Compass",
                "status": "connected",
                "account": "Active on Chrome & Edge",
                "connected_at": "2026-09-08 09:15:00",
                "scope_level": "Local Heuristic URL Checker",
                "allowed_permissions": [
                    "Check visited URLs against high-risk typosquatting registry",
                    "Warn prior to entering credentials on unverified domains"
                ],
                "prohibited_permissions": [
                    "Track browsing history",
                    "Read keystrokes or input form contents",
                    "Sell analytics or search data"
                ],
                "threats_blocked": 8,
                "messages_scanned": 1289
            },
            "drive": {
                "id": "drive",
                "name": "Cloud Drive Attachment Guard",
                "icon": "HardDrive",
                "status": "disconnected",
                "account": "Not connected",
                "connected_at": None,
                "scope_level": "SHA-256 Hash Scanner",
                "allowed_permissions": [
                    "Compute SHA-256 signatures of newly synced files to match known malware hashes"
                ],
                "prohibited_permissions": [
                    "Read document body contents",
                    "Modify, delete, or share personal files"
                ],
                "threats_blocked": 0,
                "messages_scanned": 0
            },
            "messaging": {
                "id": "messaging",
                "name": "SMS & Chat Gateway",
                "icon": "MessageSquare",
                "status": "disconnected",
                "account": "Not connected",
                "connected_at": None,
                "scope_level": "On-Device Spam Filter",
                "allowed_permissions": [
                    "Analyze flagged spam SMS messages via platform notification hooks"
                ],
                "prohibited_permissions": [
                    "Read private unflagged conversations",
                    "Access address book contacts"
                ],
                "threats_blocked": 0,
                "messages_scanned": 0
            }
        }

        # Simulated live incoming emails for Gmail integration demonstration
        self.mock_inbox_items = [
            {
                "id": "inbox-msg-1",
                "sender": "Chase Alerts <no-reply@chase-auth-service.xyz>",
                "subject": "CRITICAL: Urgent Action Required on your Chase Account #4912",
                "snippet": "We detected unauthorized attempts on your debit card. Verify your identity within 60 minutes to avoid permanent suspension. Click to confirm KYC.",
                "date": "10 mins ago",
                "risk_score": 94,
                "threat_type": "Phishing / Banking Impersonation",
                "severity": "HIGH",
                "action_recommended": "DO NOT CLICK. Chase never uses .xyz domains."
            },
            {
                "id": "inbox-msg-2",
                "sender": "GitHub <notifications@github.com>",
                "subject": "[GitHub] A personal access token has expired",
                "snippet": "Your token 'Vercel Deployment' has expired today. You can regenerate it in your developer settings.",
                "date": "2 hours ago",
                "risk_score": 8,
                "threat_type": "Legitimate Notification",
                "severity": "LOW",
                "action_recommended": "Verified clean. Authentic GitHub notification."
            },
            {
                "id": "inbox-msg-3",
                "sender": "USPS Package Update <tracking@usps-parcel-redelivery.top>",
                "subject": "Incomplete Address - Your parcel could not be delivered",
                "snippet": "Parcel #94001000000000000000 is awaiting redelivery fee payment of $1.85. Update postal address and pay to release package.",
                "date": "Yesterday",
                "risk_score": 91,
                "threat_type": "Postal Smishing / Payment Fraud",
                "severity": "HIGH",
                "action_recommended": "USPS never demands redelivery fees via .top domains."
            }
        ]

    def get_all(self) -> List[Dict[str, Any]]:
        return list(self.integrations.values())

    def update_status(self, integration_id: str, new_status: str) -> Dict[str, Any]:
        if integration_id in self.integrations:
            self.integrations[integration_id]["status"] = new_status
            if new_status == "connected":
                self.integrations[integration_id]["connected_at"] = "Just now"
                self.integrations[integration_id]["account"] = "user.alex@gmail.com"
            else:
                self.integrations[integration_id]["connected_at"] = None
                self.integrations[integration_id]["account"] = "Not connected"
            return self.integrations[integration_id]
        return {}

    def get_inbox_threats(self) -> List[Dict[str, Any]]:
        return self.mock_inbox_items

integration_service = IntegrationService()
