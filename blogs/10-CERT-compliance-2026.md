---
id: 10
title: "CERT-In Compliance in 2026: What Indian Businesses Need to Know"
summary: "A comprehensive guide to CERT-In compliance requirements for Indian businesses in 2026, including audit obligations, cybersecurity controls, and regulatory expectations."
image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80"
---
## CERT-In Compliance 2026: What the New Cybersecurity Directions Mean for Your Business
CERT-In's cybersecurity directions — strengthened in 2022 and expanded in 2025 — now apply to virtually every business operating digitally in India. Here's what changed, who it applies to, and what you must do to stay compliant.
In April 2022, India's cybersecurity landscape changed in a fundamental way. The Indian Computer Emergency Response Team (CERT-In) — the national nodal agency for cybersecurity under the Ministry of Electronics and Information Technology (MeitY) — issued mandatory cybersecurity directions under Section 70B of the Information Technology Act, 2000.
These were not advisory guidelines or best-practice recommendations. They were legally binding obligations — with penalties under the IT Act for non-compliance.
By 2025, CERT-In went further still. Updated guidelines expanded the scope, tightened the requirements, and made mandatory annual security audits the standard for all organisations operating in India's digital ecosystem.
Here is what every business needs to understand.

## Who Does This Apply To?
This is where many businesses make their first mistake — assuming these rules only apply to large corporations or government entities.
The CERT-In Directions apply to:
•	All service providers operating in India
•	Intermediaries — including platforms, aggregators, and app-based services
•	Data centres and cloud infrastructure providers
•	Body corporates — essentially, any incorporated entity using IT systems
•	Government organisations
•	Cloud and VPN service providers
•	Virtual Asset Service Providers (VASPs) — crypto exchanges, wallet providers, etc.
•	Critically: domestic and international organisations, if they serve Indian users
The 2025 update made this even broader — effectively, any business that operates digitally in India is covered. If you have a website, a mobile app, an ERP system, or cloud infrastructure, these directions are relevant to you.

## Key Requirements: What You Must Do
### 1. Mandatory Incident Reporting — Within 6 Hours
This is the most operationally demanding requirement. If a cybersecurity incident occurs, it must be reported to CERT-In within 6 hours of detection — not 6 hours after you have fully investigated it, but 6 hours after it has been identified.
Incidents that must be reported include:
•	Targeted scanning or probing of critical systems
•	Compromise of critical systems or data
•	Unauthorised access to IT systems and data
•	Website defacement
•	Malware and ransomware deployments
•	Data breaches involving personal or sensitive information
•	Identity theft and phishing attacks targeting the organisation
•	Distributed Denial of Service (DDoS) attacks
For most organisations, meeting this 6-hour window requires having pre-defined incident response procedures, a designated Point of Contact (PoC) for CERT-In communication, and a monitoring capability that can detect incidents quickly — not something most businesses currently have without deliberate preparation.

### 2. Log Retention — 180 Days, Within India
All ICT system logs must be retained for a rolling period of 180 days, and must be stored within Indian jurisdiction.
This covers logs from servers, firewalls, network devices, applications, databases, and security systems. The logs must be maintained in a way that allows CERT-In to access them upon request.
For businesses using international cloud services (AWS, Azure, Google Cloud), this introduces a configuration requirement — ensuring logs are stored in Indian regions, not default global ones.

### 3. VPN and Remote Access Compliance
If your organisation uses VPN services for remote access — as most do since the post-pandemic era normalised remote work — the VPN provider is required to maintain validated user records, including names, email addresses, contact numbers, IP addresses assigned, and the purpose of use, for a period of five years.
This is a significant record-keeping obligation that many organisations, particularly those using consumer-grade VPN products, are not currently meeting.

### 4. Synchronised and Accurate System Clocks
All ICT systems must synchronise their clocks with NTP (Network Time Protocol) servers traceable to the National Physical Laboratory (NPL) in India or the National Informatics Centre (NIC). This may sound technical, but it is critical — inaccurate timestamps make incident reconstruction unreliable and audit evidence questionable.

### 5. Designated Point of Contact
Every organisation must designate a Point of Contact (PoC) responsible for communicating with CERT-In. This individual's details — name, role, contact information — must be registered with CERT-In. The PoC must be reachable 24x7 for incident communication.

### What Changed in 2025
CERT-In's 2025 updates expanded requirements significantly:
•	Mandatory annual security audits — at minimum one comprehensive cybersecurity audit per year for all covered entities
•	CVSS + EPSS scoring — security findings in audit reports must now include both Common Vulnerability Scoring System (CVSS) and Exploit Prediction Scoring System (EPSS) ratings, enabling better risk prioritisation
•	Software Bill of Materials (SBOM) — organisations must maintain a documented inventory of all software components, including open-source and third-party libraries — and include this in audit scope
•	Red Team exercises — organisations managing critical infrastructure must undergo red team simulations — adversarial testing that goes beyond standard penetration testing
•	ICS/OT security — organisations with Industrial Control Systems or Operational Technology environments must include these in their security audit scope
•	Secure coding and infrastructure accountability — organisations are now accountable for secure Software Development Lifecycle (SDLC) practices, not just runtime security

### Penalties for Non-Compliance
Non-compliance with CERT-In's directions carries penalties under the Information Technology Act, 2000. Specifically:
•	Failure to report incidents can attract penalties under Section 70B
•	Non-cooperation with CERT-In investigations or failure to provide requested information can result in legal consequences for the organisation and its officers
Beyond legal penalties, the reputational and operational consequences of being found non-compliant during a regulatory investigation — especially following an incident — can be far more damaging than the fines themselves.

### How to Achieve and Maintain Compliance
Getting CERT-In compliant is not a one-time project. It is an ongoing operational discipline. Here is the structured approach:
#### Step 1: Gap Assessment
Compare your current practices against CERT-In's requirements. Most organisations find meaningful gaps in log retention, incident response procedures, and PoC designation.
#### Step 2: Incident Response Plan
Document a formal Cyber Incident Response Plan (CIRP). Define how incidents are detected, classified, escalated, reported to CERT-In, and resolved. Test it through a tabletop exercise.
#### Step 3: Log Infrastructure
Ensure log collection covers all required systems, retention is configured for 180 days, and storage is within Indian jurisdiction. Implement a SIEM or log management platform if not already in place.
#### Step 4: Designate and Register Your PoC
Formally appoint your CERT-In Point of Contact. Register their details. Ensure they understand the 6-hour reporting obligation and have a clear escalation path.
#### Step 5: Annual Security Audit
Engage a CERT-In empanelled IS Auditor for your annual security audit. The audit report must follow CERT-In's prescribed format, including CVSS and EPSS scoring for identified vulnerabilities. Findings must be tracked and remediated.
#### Step 6: Ongoing Monitoring
Compliance is not an annual event. Log monitoring, vulnerability scanning, and patch management must be continuous operational functions — not activities that happen only before an audit.
#### A Note on CERT-In Empanelment
CERT-In maintains a list of empanelled Information Security Auditing Organisations — firms that have been assessed and approved to conduct IS Audits that are recognised for regulatory purposes. For audits intended to satisfy RBI, SEBI, or CERT-In compliance requirements, working with an empanelled auditor is essential.
Organisations seeking to verify an auditor's empanelment status can check the official CERT-In empanelled organisations list published on the CERT-In website (cert-in.org.in).

### The Bottom Line
India's cybersecurity regulatory framework has matured significantly. CERT-In's directions — now backed by expanded 2025 guidelines — are no longer the concern of only large enterprises or regulated industries. Every digitally active business in India has obligations under this framework.
The cost of preparing — building proper log infrastructure, documenting an incident response plan, conducting annual audits — is far lower than the cost of being caught unprepared when an incident occurs or when a regulator comes asking.
The businesses that treat CERT-In compliance as a governance priority, not a checkbox, will be better protected, better trusted, and better positioned for the digital economy India is building.
