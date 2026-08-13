# Eclipse Forge consolidated portfolio backlog

This backlog joins product, Growth, security, documentation and portfolio decisions.
It does not replace a repository runtime roadmap; it records the cross-project sequence
and the gate that moves work between repositories.

## Current program state

| Stage | State | Evidence | Exit decision |
| --- | --- | --- | --- |
| Stage 0 — control foundation | in progress | Typed Evidence Cards now bind claims to allowlisted sources; no accepted artifact or v4 run | Runtime invariants have evidence owners and a separately authorized v4 passes review |
| Stage 1 — prove one useful Office | not started | No accepted measured artifact | One useful artifact plus one attributable qualified action or explicit stop |
| Stage 2 — repeatability and willingness to pay | not started | No repeated paid workflow | Three calibrated runs and one bounded design-partner/pilot signal |
| Stage 3 — second wedge | not started | No demand-based second Office decision | Shared primitives reduce work and the second Office has distinct paid pull |

## P0 — establish truth and execute one bounded proof

| Size | Item | Owner | Dependency | Main risk | Next action |
| --- | --- | --- | --- | --- | --- |
| S | Decide the first Stage 0 artifact | Pavel | [Run review](../execution/stage-0/run-review.md) | `ready_for_approval` is mistaken for accepted | Done: v1 recorded as `request_changes`; not published |
| M | Correct bounded output quality and run v2 | AI Hub + Growth owner | Owner-approved five-call ceiling | Shared DATA causes cross-role output contamination | Done: v2 preserved and reviewed; keep unapproved |
| M | Enforce role-specific Growth output contracts | AI Hub owner | [V2 review](../execution/stage-0/run-v2-review.md) and approved `master` | Model copies other roles or treats planned offers as verified | Done in `da9a602`; v3 proved role isolation and fail-closed source validation |
| L | Add typed Evidence Cards to Growth input | AI Hub + Chat owners | [V3 review](../execution/stage-0/run-v3-review.md) and compatibility decision | Allowlisted URL is mistaken for claim-level proof | Done in AI Hub `07dcd1b` and Chat `512239c`; see the [contract preview](../execution/stage-0/evidence-card-contract-preview.md) |
| M | Design the Evidence Card editor | Chat + Product Design | Implemented transport contract | Users create invalid or overclaimed cards | Done in Chat `f1336b7`: safe hypothesis default, allowlisted verified source, inline validation, two-step removal and desktop/mobile QA |
| M | Resolve `EF-R01` secret debt | Pavel + platform | User-selected encrypted vault and rotation access | Existing credentials remain reachable outside the public slice | Inventory names/locations without values, migrate, rotate and verify revocation |
| M | Map Growth security invariants to runtime negative tests | Chat + AI Hub owners | Current invariant fixture | Paper control diverges from runtime | Done: `INV-001/002/003` map to named tests; four former gaps closed in Chat `aa56478`; fixture remains draft pending independent review |
| S | Gate AI Hub production deploys | AI Hub owner | GitHub production environment protection | A normal `master` push mutates production without the reviewed preview | Done in `09661be`: reviewer protection, `master`-only policy, regression test and waiting deployment verified |
| M | Review fifteen dirty repositories individually | Pavel + repository owner | [Workspace baseline](workspace-baseline.md) | User work is overwritten or bulk-committed | Decide preserve/commit/discard per repository; never bulk-stage |
| S | Reconcile stale April portfolio audit | Portfolio owner | Current registry and repository evidence | Archived/live claims conflict publicly | Label the old audit historical and use this registry for current decisions |

## P1 — package the first buying path

| Size | Item | Owner | Dependency | Main risk | Next action |
| --- | --- | --- | --- | --- | --- |
| M | Package AI Opportunity Audit | Product marketing + Pavel | Accepted Stage 0 artifact | Consulting scope becomes unbounded | Define input, deliverable, exclusions, acceptance, timeline and CTA |
| M | Build Production Readiness checklist lead magnet | Growth owner | Audit offer and claim policy | Generic download attracts the wrong audience | Tie every checklist section to the first ICP and audit CTA |
| M | Add privacy-reviewed Landing instrumentation | Landing owner | [Analytics baseline](../execution/stage-0/analytics-baseline.md) | Tracking collects unnecessary data or has no rollback | Preview provider/endpoint, fields, retention, CSP, consent, cost and removal |
| M | Publish one sanitized observable-run demo | Chat + Media + Growth | Accepted artifact and media preview | Synthetic activity is presented as a result | Label simulation, remove sensitive data and require human publication approval |
| M | Add qualified-action weekly review to Chat | Chat owner | Event taxonomy and decision log | Impressions replace business outcomes | Store source, offer, CTA, decision and next action; avoid message bodies |
| M | Close flagship documentation gaps | Project owners | [Documentation registry](documentation-registry.md) | Marketing outruns product evidence | Add missing security/architecture/roadmap docs only for promoted projects |

## P2 — rationalize and connect the portfolio

| Size | Item | Owner | Dependency | Main risk | Next action |
| --- | --- | --- | --- | --- | --- |
| L | Webclaw -> Library -> AI Hub approved snapshot flow | Three repository owners | Candidate and snapshot contracts | Prompt injection or unverified source promotion | Implement untrusted candidate state and independent approval first |
| L | Chat -> Sentinel typed capability flow | Chat + Sentinel owners | Pairing and authorization contract | Arbitrary remote execution | Start with one read-only capability, receipt and revocation |
| L | Media contract for Shotforge and Text2Image | Media + client owners | Stable job/artifact contract | Generated media bypasses review | Preview-only jobs with provenance and explicit export approval |
| M | Decide second Office from observed demand | Product owner | Stage 2 evidence | Feature enthusiasm creates premature platform breadth | Compare Research and Builder demand using accepted/paid workflow evidence |
| L | Run incubator promotion review | Portfolio owner | Current docs and build evidence | Repository count is mistaken for strength | Assign promote/merge/case-study/archive to every `not_assessed` project |

## P3 — platform and distribution expansion

| Size | Item | Owner | Dependency | Main risk | Next action |
| --- | --- | --- | --- | --- | --- |
| XL | Managed and self-hosted Eclipse Forge OS tiers | Platform + commercial | Repeat use and support economics | Operational burden exceeds revenue | Price accepted runs/offices, not agent seats |
| L | Reviewed read-only connector packaging | Platform + security | Proven workflow need | Tool poisoning, SSRF or permission creep | Pin metadata/schema/hash and invalidate approval on change |
| L | Signed releases and support policy for promoted desktop/local products | Repository owners | Release provenance and keys | Users install stale or tampered artifacts | Start with one signed release and verified rollback path |
| L | Verified Office/template distribution | Platform owner | Two proven Offices | Template marketplace becomes low-quality prompt inventory | Require owner, version, tests, capabilities and security invariant |

## Portfolio operating cadence

### Weekly

- review one qualified business action and one safety/reliability signal;
- decide one `stop`, `iterate` or `scale` action;
- update only projects whose evidence changed;
- keep missing numbers as `not_available`.

### Monthly

- refresh branches, head commits, dirty status and documentation gaps;
- reassess risk on prompt/model/tool/retrieval/connector changes;
- review incubator promotion and archive decisions;
- verify public maturity and production claims against current evidence.

### Quarterly

- reconsider flagship priorities from demand, accepted artifacts and maintenance cost;
- re-score the risk register;
- decide whether a second Office or commercial tier has enough evidence to proceed.
