# Eclipse Growth OS

Eclipse Growth OS is the evidence-led operating system for promoting Eclipse Forge,
Pavel Hopson's engineering brand, public repositories, products and commercial
services. Its goal is qualified traffic and actions, not content volume.

Growth OS is the first internal operating workflow for the ecosystem's flagship
product program: [Eclipse Forge OS and its Agent Office](../README.md).
Eclipse Forge OS is the product; Eclipse Growth OS is one office template running
inside it.

## Positioning

Working proposition:

> Pavel Hopson designs and ships AI systems that perform real work under human
> control: research agents, MCP integrations, automation and production-ready
> products.

Every public claim must be linked to a verifiable source. Estimates, hypotheses and
future plans must never be presented as delivered results.

## Priority audiences

| Audience | Problem | First offer | Target action |
| --- | --- | --- | --- |
| Product owners and SMB teams | They want to apply AI but cannot assess scope, risk or ROI | AI opportunity audit | Request an express audit |
| Founders and technical leads | They need a reliable agent or integration, not a demo | Research Agent or MCP Server | Request a technical discovery call |
| Developers | They struggle to move AI prototypes into production | Production Readiness Checklist | Download the checklist |
| Engineering hiring teams | They need evidence of senior-level delivery | Build-in-public case studies | Review a relevant repository |
| AI practitioners | Tools are hard to compare on privacy, licensing and maturity | Eclipse Library | Subscribe or save a verified collection |

## Promotion priority

- **P0:** Eclipse Forge Landing, Research Agent, MCP services, Eclipse Chat.
- **P1:** Eclipse AI Hub, Eclipse Library, Eclipse DnD Forge, Eclipse Media.
- **P2:** Hopson Sentinel after provenance and licensing gates are closed.
- **P3:** Shotforge, Text2Image and CryptoPulse as supporting demonstrations.

Priority is reassessed in the weekly review using evidence, not posting frequency.

## Operating architecture

1. **Evidence layer:** public product artifacts, documentation, release notes and
   anonymized aggregate analytics.
2. **Claim Registry:** sources, confidence, contradictions and allowed use.
3. **Strategy:** audiences, positioning, offers and channel hypotheses.
4. **Content Registry:** one structured record for every proposed material.
5. **Production:** Teamly pilot or Eclipse AI Hub produces reviewable drafts.
6. **Human approval:** a person verifies claims, assets, CTA and destination.
7. **Distribution:** manual during the pilot; every link uses the agreed UTM taxonomy.
8. **Measurement:** qualified actions feed the weekly review and backlog.

For social discovery, the system adopts the useful part of “content factory” workflows:
clear stages and measurable feedback. It rejects account farms, anti-detect browsers,
unauthorized scraping and autonomous publishing. The first Threads loop uses manually
reviewed public signals, no more than three approved drafts per week and one personal
engineering profile; an official read-only API adapter is a later, separately reviewed
capability.

System ownership:

| Component | Responsibility |
| --- | --- |
| Eclipse Forge Landing | Central conversion surface and landing funnels |
| Eclipse Library | Research, educational discovery and reusable evidence |
| Eclipse Chat | Growth Command Room, review queue, decisions and audit trail |
| Eclipse AI Hub | Controlled research, writing and claim-audit workflows |
| Teamly.to | Replaceable public-data-only pilot sandbox |
| Eclipse Media / HyperFrames | Human-reviewed demo and repurposing renders |
| Sentinel | Read-only monitoring of public links and aggregate anomalies |
| Kwork and contact surfaces | Conversion endpoints |

## Content pillars and voice

1. Build in public with architecture, failures, fixes and measured deployment facts.
2. Educational explanations of AI tools, security, privacy and agent systems.
3. Product demonstrations with a concrete problem and reproducible workflow.
4. Pavel's engineering decisions and honest lessons from experiments.
5. Productized commercial offers with explicit scope and CTA.

Voice is direct, technical and calm. Avoid hype, fake urgency, unsupported comparisons
and claims that AI replaces an employee or guarantees income.

## 30-day implementation

### Days 1-3: foundation

- Establish positioning, audience map and project priority.
- Add Claim, Content and Experiment registry contracts.
- Capture the available measurement baseline.
- Configure Teamly without integrations after a workspace inventory and approval.
- Add crawlability and machine-readable brand context to the Landing.

### Days 4-7: calibration

- Test agents on three public Eclipse Forge artifacts.
- Score citation coverage, hallucinations, editing time and policy compliance.
- Reject outputs without sufficient evidence.
- Approve one repeatable release-to-content workflow.

### Days 8-14: conversion assets

- Produce the AI Project Production Readiness Checklist.
- Build its landing funnel and measurement contract.
- Package the AI Opportunity Audit offer.
- Prepare three evidence-backed content packs.

### Days 15-21: controlled distribution

- Review previews for selected channels.
- Publish manually only after explicit approval.
- Use consistent campaign, content and CTA identifiers.
- Collect anonymized aggregate results.

### Days 22-27: optimization

- Compare Teamly with the manual process and Eclipse AI Hub.
- Measure human editing time, source quality and unit cost.
- Stop weak formats and CTA paths.
- Finalize the Growth Command Room implementation specification.

### Days 28-30: decision

- Complete security, privacy and export review.
- Export prompts, evidence records and deliverables.
- Decide to stop, extend or migrate the workflows into AI Hub.
- Do not renew or increase spend automatically.

## 90-day direction

- **Days 1-30:** evidence, baseline, first funnel and Teamly pilot.
- **Days 31-60:** Growth Command Room, AI Hub workflows and analytics ingestion.
- **Days 61-90:** scale only channels and offers that generate qualified actions;
  introduce narrowly scoped read-only integrations only after a separate review.

The wider commercial thesis and office portfolio are documented in
[Eclipse Forge OS business model](../business-model.md).

## Metrics

Primary business outcomes:

- qualified conversations and discovery requests;
- demo or express-audit requests;
- lead-magnet conversion;
- landing CTA conversion;
- GitHub profile-to-repository and repository-to-star conversion;
- qualified Kwork inquiries and paid orders.

Quality and safety guardrails:

- zero fabricated claims, customers, testimonials or results;
- at least 90% of used factual claims backed by a primary or official source;
- zero external actions by Teamly during the pilot;
- zero secrets, private repositories or personal data shared with Teamly;
- 100% of publication, messaging, payment and production actions require a person;
- target human editing time of 20 minutes or less per content pack.

Content volume, impressions without a target audience and raw AI output are not success
metrics.

## Weekly review

Every review answers five questions:

1. Which qualified action changed and by how much?
2. Which source, audience, offer and CTA contributed to it?
3. Which claims or assets failed verification?
4. What should stop, iterate or scale next week?
5. What is the single highest-value next action, with owner and deadline?

Use [weekly-review.md](weekly-review.md) for the decision record. Machine-readable
contracts live in [schemas](schemas), including the bounded, metadata-only
[`threads.signal.batch.v1`](schemas/threads-signal-batch.schema.json) contract for the
manual channel pilot.
