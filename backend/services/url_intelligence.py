import re
import urllib.parse
from typing import Dict, Any, List

def levenshtein_distance(s1: str, s2: str) -> int:
    if len(s1) > len(s2):
        s1, s2 = s2, s1
    distances = range(len(s1) + 1)
    for i2, c2 in enumerate(s2):
        distances_ = [i2+1]
        for i1, c1 in enumerate(s1):
            if c1 == c2:
                distances_.append(distances[i1])
            else:
                distances_.append(1 + min((distances[i1], distances[i1 + 1], distances_[-1])))
        distances = distances_
    return distances[-1]

class URLIntelligenceService:
    def __init__(self):
        self.monitored_brands = [
            "paypal", "chase", "wellsfargo", "bankofamerica", "citibank", "capitalone",
            "apple", "microsoft", "google", "netflix", "amazon", "binance", "coinbase",
            "instagram", "facebook", "whatsapp", "telegram", "usps", "fedex", "dhl",
            "dropbox", "docusign", "outlook", "icloud"
        ]
        self.suspicious_tlds = {
            "xyz", "top", "buzz", "club", "work", "sbs", "cfd", "fit", "rest", "cam",
            "country", "stream", "gq", "ml", "cf", "ga", "tk", "click", "link", "monster"
        }

    def scan_url(self, raw_url: str) -> Dict[str, Any]:
        if not raw_url or not raw_url.strip():
            return {
                "error": "URL cannot be empty",
                "risk_score": 0,
                "risk_level": "LOW RISK"
            }

        url = raw_url.strip()
        if not re.match(r"^https?://", url, re.IGNORECASE):
            # prepend https for parsing if omitted
            parsed_url = "https://" + url
        else:
            parsed_url = url

        try:
            parsed = urllib.parse.urlparse(parsed_url)
        except Exception:
            return {
                "error": "Invalid URL format",
                "risk_score": 85,
                "risk_level": "HIGH RISK"
            }

        hostname = (parsed.hostname or "").lower()
        protocol = parsed.scheme.lower()
        path = parsed.path
        query = parsed.query

        evidence_cards = []
        heuristics = []
        raw_score = 0

        # 1. Protocol check
        is_https = (protocol == "https")
        if not is_https:
            raw_score += 30
            heuristics.append("Insecure plain HTTP connection")
            evidence_cards.append({
                "id": "insecure-http",
                "icon": "ShieldAlert",
                "title": "Unencrypted HTTP Protocol",
                "severity": "high",
                "description": "Traffic is sent unencrypted over cleartext HTTP, vulnerable to interception and man-in-the-middle tampering."
            })

        # 2. IP as Hostname check
        is_ip_host = bool(re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", hostname))
        if is_ip_host:
            raw_score += 45
            heuristics.append("Host is direct numeric IP address")
            evidence_cards.append({
                "id": "numeric-ip-host",
                "icon": "Server",
                "title": "Direct IP-Based Hostname",
                "severity": "high",
                "description": f"Domain bypassed DNS registration with raw IP address ({hostname}), common in botnet command nodes and phishing kits."
            })

        # 3. TLD evaluation
        parts = hostname.split(".")
        tld = parts[-1] if len(parts) > 1 else ""
        has_suspicious_tld = tld in self.suspicious_tlds
        if has_suspicious_tld:
            raw_score += 35
            heuristics.append(f"High-abuse top-level domain (.{tld})")
            evidence_cards.append({
                "id": "high-abuse-tld",
                "icon": "Globe",
                "title": "High-Abuse Domain Extension",
                "severity": "high",
                "description": f"The '.{tld}' extension is heavily exploited in disposable scam operations due to anonymous registration policies."
            })

        # 4. Typosquatting / Brand Spoofing Check
        # Extract base domain part
        base_domain_name = parts[-2] if len(parts) >= 2 else hostname
        brand_impersonated = None
        typosquat_type = None

        # Direct inclusion in subdomain (e.g. chase.security-verification.com)
        for brand in self.monitored_brands:
            if brand in hostname:
                # If the domain is NOT the official domain
                if not (hostname == f"{brand}.com" or hostname.endswith(f".{brand}.com") or hostname == f"{brand}.org"):
                    brand_impersonated = brand
                    typosquat_type = "Subdomain spoofing / deceptive prefix"
                    raw_score += 50
                    break

            # Distance check on the base domain (e.g., paypa1, amaz0n, gooogle)
            if not brand_impersonated and len(base_domain_name) >= 4:
                dist = levenshtein_distance(base_domain_name, brand)
                if dist == 1 or (dist == 2 and len(brand) >= 7):
                    brand_impersonated = brand
                    typosquat_type = "Typosquatting permutation"
                    raw_score += 55
                    break

        # Check for generic security/bank impersonation phrasing in domain
        if "security" in hostname or "verify" in hostname or "login" in hostname or "support" in hostname or "alert" in hostname:
            if has_suspicious_tld or not is_https or brand_impersonated:
                raw_score += 35
                heuristics.append("Deceptive security/login keyword spoofing")
                evidence_cards.append({
                    "id": "security-impersonation-in-domain",
                    "icon": "ShieldAlert",
                    "title": "Deceptive Security / Auth Phrasing",
                    "severity": "high",
                    "description": "Host registers terms like 'security', 'login', or 'verify' to manufacture unearned credibility."
                })

        if brand_impersonated:
            heuristics.append(f"Spoofing indicator for '{brand_impersonated}' ({typosquat_type})")
            evidence_cards.append({
                "id": "brand-spoofing-detected",
                "icon": "CopyAlert",
                "title": f"Brand Impersonation: {brand_impersonated.capitalize()}",
                "severity": "high",
                "description": f"The host structure mimics official brand '{brand_impersonated.capitalize()}' using deceptive naming ({hostname})."
            })

        # 5. Suspicious structural tokens
        suspicious_keywords = ["login", "verify", "secure", "update", "account", "banking", "wallet", "confirm", "portal", "support"]
        matched_keywords = [kw for kw in suspicious_keywords if kw in hostname or kw in path.lower()]
        if len(matched_keywords) >= 1 and (has_suspicious_tld or brand_impersonated or not is_https):
            raw_score += 20
            heuristics.append(f"Security bait keywords in URL path/host ({', '.join(matched_keywords)})")
            evidence_cards.append({
                "id": "security-bait-path",
                "icon": "KeyRound",
                "title": "Phishing Bait Tokens in Structure",
                "severity": "medium",
                "description": f"URL contains deceptive authentication keywords ({', '.join(matched_keywords)}) designed to instill false legitimacy."
            })

        # 6. Excessive subdomains or hyphens
        if hostname.count("-") >= 3:
            raw_score += 15
            heuristics.append("Excessive hyphens in hostname")
        if len(parts) > 4:
            raw_score += 15
            heuristics.append("Excessive nested subdomains")

        # 7. Punycode / Internationalized spoofing
        if "xn--" in hostname:
            raw_score += 35
            heuristics.append("Punycode homoglyph encoding detected")
            evidence_cards.append({
                "id": "punycode-homoglyph",
                "icon": "AlertOctagon",
                "title": "Punycode Homoglyph Deception",
                "severity": "high",
                "description": "Domain contains encoded internationalized characters that visually mimic Latin letters to deceive human inspection."
            })

        # Normalize score
        final_score = min(100, max(0, raw_score))
        if not evidence_cards and is_https:
            final_score = 5 # clean benign URL

        if final_score >= 80:
            risk_level = "HIGH RISK"
            threat_type = "Malicious Phishing / Spoofed Domain"
            confidence = "High"
        elif final_score >= 60:
            risk_level = "SUSPICIOUS"
            threat_type = "Suspicious Domain Structure"
            confidence = "High"
        elif final_score >= 30:
            risk_level = "CAUTION"
            threat_type = "Unverified / Unusual URL Attributes"
            confidence = "Moderate"
        else:
            risk_level = "LOW RISK"
            threat_type = "Benign Domain"
            confidence = "High"

        # Generate action checklist
        if final_score >= 60:
            actions = [
                "DO NOT enter credentials, billing details, or personal information on this site.",
                f"Verify the authentic portal directly by typing the official brand domain manually.",
                "Close the browser tab immediately and scan your device if any download initiated."
            ]
        elif final_score >= 30:
            actions = [
                "Proceed with caution. Verify that SSL certificate details match the organization claimed.",
                "Avoid submitting sensitive account data until confirmed through a secondary channel."
            ]
        else:
            actions = [
                "Domain displays standard web infrastructure markers and valid HTTPS routing.",
                "Always verify secure padlock and accurate spelling before logging in."
            ]

        explanation = (
            f"GALAX heuristic security analysis examined domain '{hostname}'. "
            f"{'Multiple high-severity anomalies were uncovered including possible brand impersonation and deceptive path structures.' if final_score >= 60 else 'No critical typosquatting or protocol tampering indicators were detected.'} "
            f"Analysis based on static syntax, brand distance indexing, and domain risk heuristics (external live threat API: configured as hybrid heuristic fallback)."
        )

        return {
            "url": raw_url,
            "domain": hostname,
            "protocol": protocol.upper(),
            "https_enabled": is_https,
            "ip_host": is_ip_host,
            "tld": tld,
            "brand_impersonation": brand_impersonated.capitalize() if brand_impersonated else "None detected",
            "typosquatting_detected": bool(brand_impersonated),
            "suspicious_heuristics": heuristics,
            "risk_score": final_score,
            "risk_level": risk_level,
            "confidence": confidence,
            "threat_type": threat_type,
            "evidence_cards": evidence_cards,
            "explanation": explanation,
            "recommended_actions": actions,
            "threat_intelligence_source": "GALAX Hybrid Heuristics & Typosquat Engine"
        }

url_service = URLIntelligenceService()
