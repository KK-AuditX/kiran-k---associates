---
id: 9
title: "How to Conduct an Internal Audit: A Practical Guide for Indian Businesses"
summary: "Step-by-step instructions on how to plan and execute an internal audit in compliance with Indian regulations and best practices."
image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80"
---
## How to Conduct an Internal IT Audit: A Practical Checklist for Indian Companies
An internal IT audit is no longer optional for Indian businesses. CERT-In, RBI, and SEBI all mandate it. Here is a practical, step-by-step checklist covering access controls, network security, compliance mapping, and more.
Ask most business owners whether they conduct internal IT audits, and the answer falls into one of two categories: "Yes, our IT team does something like that" or "Not really — should we be?"
The honest answer to the second group is: yes, and the urgency is higher than it has ever been.
In India, mandatory IT audit requirements now exist across CERT-In guidelines (2022/2025), RBI's Cybersecurity Framework, SEBI's CSCRF, and the DPDP Act 2023. Even businesses not directly regulated by these bodies are affected, because enterprise clients and investors increasingly require evidence of IT audit practices as a condition of doing business or providing capital.
Here is a practical checklist — grounded in Indian regulatory requirements and global standards — to help organisations understand what a proper internal IT audit covers.

## Phase 1: Pre-Audit Planning
Before diving into systems and logs, establish the foundation:
### Define the Audit Scope
Which systems, locations, and business processes will be covered? The scope should be linked to your risk profile — higher-risk systems (payment processing, customer data, core operations) take priority.
### Understand the Regulatory Framework
Map the applicable regulations to your business type:
•	All organisations: CERT-In Directions 2022 and 2025 guidelines
•	Banks and NBFCs: RBI Cybersecurity Framework and IT Act
•	SEBI-regulated entities: Cybersecurity and Cyber Resilience Framework (CSCRF)
•	All entities processing personal data: DPDP Act 2023
•	ISO 27001 certified/aspiring organisations: ISO/IEC 27001:2022 controls
### Assemble the Audit Team
Internal IT audits may be conducted by an internal team, an external IS Auditor, or a combination. For credibility and independence — especially when sharing results with investors or regulators — external auditors with DISA/ISA or CISA credentials are preferred.

## Phase 2: Access Control and Identity Management
This is where the majority of security breaches begin.
☐	Is a formal User Access Management policy in place and followed?
☐	Are all user accounts linked to named individuals — no shared or generic logins?
☐	Have privileged access rights (admin accounts) been reviewed in the last 90 days?
☐	Are ex-employee accounts promptly deactivated upon separation?
☐	Is Multi-Factor Authentication (MFA) enabled for all critical systems and remote access?
☐	Are access rights granted on a least privilege basis — users only have what they need?
☐	Are login attempts, especially failed ones, logged and monitored?

## Phase 3: Network Security and Infrastructure
☐	Is the network segmented — are critical systems isolated from general user networks?
☐	Are firewalls, intrusion detection/prevention systems (IDS/IPS) in place and regularly updated?
☐	Have penetration tests been conducted in the last 12 months? (CERT-In 2025 guidelines recommend this as a minimum annual requirement)
☐	Are all devices covered by a patch management programme with defined SLAs?
☐	Is there an inventory of all IT assets — hardware and software — maintained and current?
☐	Is Wi-Fi secured with appropriate encryption (WPA3 or WPA2 minimum), with guest networks separated?

## Phase 4: Data Security and Encryption
☐	Is sensitive data — customer information, financial records, credentials — encrypted at rest and in transit?
☐	Is there a documented data classification policy that categorises data by sensitivity?
☐	Are Data Loss Prevention (DLP) controls in place to prevent unauthorised data exfiltration?
☐	Is there a defined data retention and disposal policy — data is not kept longer than necessary?
☐	For organisations under the DPDP Act: is personal data mapped, is consent documented, and are breach detection mechanisms in place?

## Phase 5: Log Management and Monitoring
This is directly mandated by CERT-In's 2022 Directions.
☐	Are ICT system logs retained for a minimum of 180 days within Indian jurisdiction?
☐	Are logs from all critical systems — servers, firewalls, applications, databases — being captured?
☐	Is a Security Information and Event Management (SIEM) system in place, or is there a compensating control for log review?
☐	Are anomalies and alerts being reviewed regularly — not just collected and stored?
☐	Is there 24x7 security monitoring capability, either in-house or through a managed Security Operations Centre (SOC)?

## Phase 6: Incident Response and Business Continuity
☐	Is there a documented Cyber Incident Response Plan (CIRP) — covering detection, containment, eradication, recovery, and notification?
☐	Has the CIRP been tested through a tabletop exercise in the last 12 months?
☐	Is the organisation able to report a cybersecurity incident to CERT-In within 6 hours of detection — as mandated by CERT-In's 2022 Directions?
☐	Is there a Business Continuity Plan (BCP) and Disaster Recovery Plan (DRP) in place?
☐	Are data backups performed regularly, stored securely (preferably off-site or on a separate cloud environment), and tested for restorability?
☐	Are Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) defined for critical systems?

## Phase 7: Third-Party and Vendor Risk
Most organisations focus on internal controls but underestimate the risk that comes through their supply chain.
☐	Is there an inventory of all third-party vendors and service providers who have access to your systems or data?
☐	Are vendors assessed for cybersecurity posture before being onboarded?
☐	Do vendor contracts include data security obligations, breach notification requirements, and audit rights?
☐	Are cloud service providers (AWS, Azure, Google Cloud, etc.) reviewed for shared responsibility — understanding what security you own vs. what they manage?
☐	Are Software-as-a-Service (SaaS) tools used by employees reviewed and approved — or is there uncontrolled "shadow IT"?

## Phase 8: Compliance and Regulatory Mapping
☐	Has the organisation mapped its controls to all applicable regulatory frameworks (CERT-In, RBI, SEBI, DPDP Act, sector-specific)?
☐	Are IT policies reviewed and updated at least annually?
☐	Is there evidence of employee security awareness training — phishing simulations, cybersecurity induction for new joiners?
☐	For SEBI-regulated entities: Are biannual internal IT audits being conducted as per SEBI's CSCRF requirements?
☐	For RBI-regulated entities: Are annual IS Audits conducted by RBI-approved auditors, with findings submitted to RBI?
☐	Is the organisation's Software Bill of Materials (SBOM) maintained — documenting all third-party and open-source components in your software? (This is now part of CERT-In's 2025 audit guidelines)

## Phase 9: Audit Reporting and Follow-Through
The audit is only valuable if it drives action.
☐	Has an audit report been prepared with findings rated by severity (Critical / High / Medium / Low)?
☐	Has a management response been obtained for each finding — with responsible owners and target remediation dates?
☐	Are open findings tracked on a regular basis until closure?
☐	Has the audit report been presented to senior management or the Board's Audit Committee?
☐	Is there a plan for a follow-up review to verify that critical and high findings have been addressed?

## A Practical Note on Frequency
CERT-In's 2025 guidelines recommend at least one comprehensive security audit per year as the minimum standard for all organisations operating in India's digital ecosystem. SEBI requires its registered entities to conduct biannual internal IT audits. RBI mandates annual IS Audits for banks and NBFCs.
For organisations with high transaction volumes, large customer databases, or significant regulatory exposure — quarterly vulnerability assessments and continuous monitoring are becoming the norm, not the exception.

## The Bottom Line
An internal IT audit is not a one-time activity. It is a governance rhythm — a regular, structured process of checking that your digital controls are working as intended, that regulatory requirements are met, and that risks are identified before they become incidents.
For organisations doing this for the first time, the checklist above is a solid starting point. For those who want independent assurance — credible to regulators, investors, and clients — engaging a qualified IS Auditor to lead or co-lead the process is the right call.
