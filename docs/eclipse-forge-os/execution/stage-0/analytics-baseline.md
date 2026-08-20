# Stage 0 analytics baseline and UTM contract

## Baseline decision

No web analytics SDK or tracker was found in the Landing source on 2026-08-07, and no
authenticated analytics, social or Kwork account was connected for this assessment.
Historical values therefore remain `not_available`; they are not estimated from memory
or substituted with vanity metrics.

| Metric | Baseline | Evidence source | First valid collection method | Owner |
| --- | ---: | --- | --- | --- |
| Landing sessions | `not_available` | No analytics source connected | Privacy-reviewed first-party or low-data web analytics | Growth owner |
| Unique CTA clicks | `not_available` | No event collector found | Explicit `cta_click` event with location and destination class | Landing owner |
| AI Opportunity Audit requests | `not_available` | Offer/funnel not published | Dedicated success event or manually reconciled request log | Pavel |
| Qualified demo requests | `not_available` | No qualified-action register | Manual qualified-action record with source and date | Pavel |
| Lead-magnet downloads | `not_available` | Lead magnet not published | `lead_magnet_download` event; no email gate in first test | Growth owner |
| Lead-magnet conversion | `not_available` | Sessions and downloads absent | Downloads / eligible landing sessions | Metrics Analyst |
| GitHub profile-to-repository clicks | `not_available` | No tracked redirect/event | Landing `repository_click` event with project ID | Landing owner |
| Repository stars attributable to tracked paths | `not_available` | No attribution link or timestamped snapshot | Weekly public snapshot plus tagged landing click path; report as directional | Metrics Analyst |
| Qualified Kwork inquiries | `not_available` | No account analytics supplied | Manual weekly aggregate with no personal message content | Pavel |
| Accepted Growth Office artifact rate | `not_available` | No completed Stage 0 run | Accepted artifacts / completed runs | AI Hub + Chat owners |
| Cost per accepted artifact | `not_available` | No accepted run cost | Model + tool cost / accepted artifacts; report human review separately | AI Hub owner |
| Human editing time | `not_available` | No reviewed artifact | Manual minutes from first artifact to decision | Pavel |

## Event minimum

The first instrumentation proposal should collect only the event name, ISO timestamp,
page path, locale, CTA identifier, project or offer identifier and UTM fields. It should
not collect message bodies, form text, credentials, full IP addresses or fingerprinting
signals.

Proposed events:

- `cta_click`;
- `repository_click`;
- `lead_magnet_download`;
- `audit_request_started`;
- `audit_request_completed`.

The event taxonomy is a specification, not proof that collection is deployed.

## UTM naming v1

Use lowercase ASCII kebab-case. Never encode personal data, message text or user IDs.

| Parameter | Rule | Example |
| --- | --- | --- |
| `utm_source` | distribution surface | `telegram`, `threads`, `github`, `kwork` |
| `utm_medium` | acquisition mechanism | `organic-social`, `profile`, `marketplace`, `referral` |
| `utm_campaign` | stable experiment or launch ID | `growth-os-stage-1` |
| `utm_content` | specific asset and variant | `production-checklist-v1` |
| `utm_term` | omit initially | — |

Canonical example:

```text
https://eclipse-forge.ru/?utm_source=telegram&utm_medium=organic-social&utm_campaign=growth-os-stage-1&utm_content=positioning-audit-demo-v1
```

## First measurement window

- Start only after an instrumentation diff and privacy review are approved.
- Record a seven-day pre-experiment snapshot where a source supports it.
- Run the first proposition for at least fourteen days unless a safety issue or explicit
  stop condition occurs.
- Review qualified actions first; use clicks and sessions as diagnostic metrics.
- Preserve `not_available` when a denominator or attribution source is missing.

## Instrumentation acceptance gate

Before deployment, the owner must preview the exact provider or endpoint, data fields,
retention, cookie behavior, opt-out behavior, deletion path, CSP changes, cost and
rollback. This document neither selects a vendor nor authorizes production changes.
