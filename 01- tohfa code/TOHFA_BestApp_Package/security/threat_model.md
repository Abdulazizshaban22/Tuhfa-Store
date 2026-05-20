# STRIDE Threat Model (High level)
- Spoofing: Auth tokens theft → Mitigation: HTTPS, SameSite, rotate, device binding.
- Tampering: Order amount manipulation → Mitigation: server-authoritative pricing, HMAC webhooks.
- Repudiation: Audit trails for payments/NFT mints.
- Information Disclosure: PII → Mitigation: field-level encryption, least-privilege IAM.
- Denial of Service: rate limits, WAF, autoscale.
- Elevation of Privilege: RBAC, admin isolation, MFA.
