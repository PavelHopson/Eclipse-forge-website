# Eclipse Forge OS business model

## Decision

Eclipse Forge OS is not a bundle of unrelated projects and not a marketplace of
uncontrolled autonomous agents. It is an **observable AI work platform** where a
person defines an outcome, approves a bounded plan and budget, watches specialist
agents produce evidence-backed artifacts, and remains the only authority for external
actions.

The business thesis is:

> Teams will pay for useful AI work when the system makes evidence, cost, permissions,
> progress and human decisions visible enough to trust.

The first commercial wedge is evidence-led growth and product research. It uses assets
Eclipse Forge already owns: Growth Command Room in Eclipse Chat, bounded workflows in
AI Hub, verified knowledge in Library, reviewed outputs in Media and public conversion
surfaces on Landing.

This document defines hypotheses to validate. It does not claim customers, revenue,
retention or product-market fit that have not been observed.

## Product category and position

Working category: **human-controlled AI operations workspace**.

Positioning:

> Eclipse Forge OS turns a business objective into an observable run by a bounded AI
> team. Every material claim keeps its evidence, every external action requires an
> exact human approval, and every accepted artifact has a measurable next step.

The product competes neither on maximum agent count nor maximum generated content. Its
defensible qualities are:

- evidence and provenance attached to work, not added after generation;
- visible agent roles, handoffs, budgets and run state;
- deny-by-default capabilities and action-specific approvals;
- reusable office templates backed by owned product workflows;
- one audit trail across planning, execution, review and measurement;
- deployable components that can remain independent instead of one fragile monolith.

## Customer map

| Segment | High-cost problem | First job to be done | First proof | Buying path |
| --- | --- | --- | --- | --- |
| Technical founders and product owners | AI experiments do not become controlled business workflows | Turn a public product question into a cited, prioritized decision | Accepted positioning or opportunity audit | Express audit -> implementation pilot |
| Small product and marketing teams | Research, claims, drafts and results are fragmented | Run one evidence-led campaign workflow with review gates | One measured content-to-CTA experiment | Growth Office pilot -> recurring workspace |
| Agencies and consultants | Repetitive research and production are hard to standardize without quality loss | Reuse a client-safe office template with explicit scope | Faster accepted artifact with unchanged evidence quality | Template setup -> managed or self-hosted workspace |
| Engineering teams | Agent tools can leak data, overspend or act without sufficient review | Add bounded research, review or build workflows | Reproducible run with budget and permission receipts | Technical audit -> integration project |
| Security- and privacy-sensitive teams | SaaS agents create unclear data and authorization boundaries | Keep sensitive capabilities local and expose only approved receipts | Local Sentinel capability with exact approval and rollback | Architecture review -> self-hosted deployment |

The initial ICP is the first two segments. Enterprise governance, a broad agent
marketplace and arbitrary local execution are later markets, not MVP scope.

## Product model: one platform, several offices

The ecosystem becomes one commercial story through shared primitives, not by hiding
every project inside one UI.

| Layer | Owned product | Customer value |
| --- | --- | --- |
| Control plane | Eclipse Chat | Objectives, rooms, live run events, reviews and approvals |
| Execution plane | Eclipse AI Hub | Agent definitions, model routing, budgets, cancellation and policies |
| Evidence plane | Eclipse Library | Sources, claims, contradictions and approved snapshots |
| Local capability plane | Hopson Sentinel | Explicitly approved work on a paired user-owned node |
| Artifact plane | Eclipse Media, Shotforge, HyperFrames workflows | Previewed demonstrations and reusable media artifacts |
| Acquisition plane | Eclipse Forge Landing and product pages | Proof, lead magnets, demos and qualified conversion |

Office templates package these primitives around one measurable outcome:

| Office | Outcome | Status and sequence |
| --- | --- | --- |
| Growth Office | Evidence-backed audit, content brief and measured experiment | First commercial wedge; existing owned vertical slice |
| Builder Office | Reviewed brief, blueprint, files and verification evidence | Second wedge; core review artifacts already exist |
| Research Office | Cited market, competitor or technical decision memo | Productized from Growth research after quality calibration |
| Media Office | Approved demo plan, render preview and channel variants | Add only after artifact and rights gates are reliable |
| Operations Office | Read-only health findings and reviewed remediation plan | Later; Sentinel mutations remain separately approved |

Each office must own an objective schema, capabilities, budget policy, approval gates,
artifact contract, evaluation fixture and business metric. A collection of prompts is
not an office.

## Revenue architecture

Use a progressive value ladder so services validate demand before the platform takes
on broad SaaS scope.

### 1. Entry products

- evidence-backed AI opportunity or positioning audit;
- production-readiness checklist and self-assessment;
- public product/repository audit with a prioritized next experiment.

Purpose: qualify the problem and capture baseline evidence. Free assets must lead to a
specific audit, demo or repository action rather than a generic subscription.

### 2. Productized implementation

- Research Agent implementation;
- scoped MCP server or connector;
- Growth Office setup and calibration;
- agent workflow, approval and observability audit.

Purpose: fund development and learn which reusable office capabilities customers will
pay to keep. Scope, exclusions, data boundary, acceptance criteria and rollback are part
of the offer.

### 3. Recurring platform

Pricing is a hypothesis to validate after repeated usage. Candidate components are:

- workspace or office subscription for the control and review plane;
- metered execution with a user-visible hard budget;
- managed deployment/support tier;
- self-hosted license and maintenance for privacy-sensitive teams.

Agent seats alone are a weak pricing metric because they reward decorative complexity.
The value metric should move with accepted runs, active offices or bounded execution,
while retaining predictable spending caps.

### 4. Capability and template ecosystem

Later revenue may include verified office templates, connector packs and implementation
partner services. Before distribution, every package requires an owner, semantic
version, capability manifest, test fixture, provenance, license, security review and
rollback instructions.

No open marketplace launches until owned offices show repeat usage. This avoids an
unreviewed prompt marketplace with unclear permissions and low trust.

## Acquisition and product loop

The safe lesson from high-volume social content factories is pipeline decomposition and
observable feedback, not anti-detect browsers, mass accounts or autonomous publishing.

```text
Official/public signals
  -> human signal review
  -> bounded Growth Office run
  -> claim and artifact review
  -> exact publication preview
  -> manual publication
  -> qualified-action metrics
  -> weekly stop / iterate / scale decision
  -> stronger office template and proof
```

Start with one Pavel Hopson engineering profile and one conversion objective per
experiment. A separate Eclipse Forge account is introduced only if observed audience
behavior proves that product and personal-brand journeys need separation.

Initial Threads experiment:

- three topics: production AI, observable agent teams and honest build-in-public;
- manually record no more than twenty public signals twice per week;
- create at most three reviewed drafts per week;
- publish only after Pavel approves the exact account, text, link and timing;
- measure after 24 hours and 7 days using UTM visits, repository actions, qualified
  replies and demo/audit requests;
- do not use anti-detect tools, account farms, unauthorized scraping or autopublishing.

## Validation scorecard

### Product value

- time to first useful evidence card;
- accepted artifact rate;
- weekly offices completing a second run;
- human editing time per accepted artifact;
- percentage of runs stopped, retried or refocused and why.

### Evidence and safety

- primary-source coverage;
- unsupported claims rejected before external use;
- permission, budget or data-boundary incidents;
- connector/tool metadata changes detected before use;
- external actions executed without a valid human approval: target zero.

### Commercial evidence

- lead-magnet-to-audit conversion;
- qualified audit, demo and implementation requests;
- audit-to-paid-pilot conversion;
- paid-pilot-to-recurring-workspace conversion;
- gross contribution per accepted run after model, infrastructure and review time;
- time from first qualified conversation to a clear buy/no-buy decision.

Missing data is recorded as `not_available`. Targets become commitments only after a
baseline exists.

## Security and trust as product features

- External content, tool descriptions and connector output are untrusted data.
- Capabilities are allowlisted per office and pinned by version/hash after review.
- A changed tool description or schema invalidates prior approval and blocks execution.
- URL-fetching capabilities require scheme/host validation, redirect limits and SSRF
  controls before private-network access is possible.
- Remote tool endpoints require scoped authentication and tenant isolation.
- Toxic flows are reviewed across combined capabilities, not only one tool at a time.
- Credentials never enter prompts, artifacts, browser storage or cross-product events.
- Publication, messaging, advertising, payment, production and local mutations require
  separate, expiring, action-specific approval; timeout means denial.
- Audit logs contain sanitized intent, destination, outcome, cost and receipt, never
  hidden reasoning or secret values.

These controls apply to owned MCP servers and third-party connectors before they can
join an office template.

## Delivery stages and decision gates

| Stage | Deliverable | Exit evidence | Stop condition |
| --- | --- | --- | --- |
| 0. Owned proof | One Growth Office run from source to accepted artifact | Real artifact, evidence, cost and human decision are reviewable | Stop expansion if cancellation, provenance or tenant isolation is unreliable |
| 1. Demand proof | Three bounded internal/public-product experiments and one conversion funnel | Qualified actions and editing cost can be measured | Stop formats with no attributable action or excessive review cost |
| 2. Service proof | Productized audit and one implementation pilot | Repeatable scope, acceptance criteria and delivery margin | Do not promise SaaS if every delivery remains custom |
| 3. Recurrence proof | The same customer/owner completes repeated office runs | Retained workflow and stable unit cost | Do not add marketplace breadth without repeat use |
| 4. Platform expansion | Second proven office and one reviewed connector | Shared primitives reduce delivery effort without weakening controls | Roll back connector if permissions, provenance or export are unclear |

## Prioritized backlog

| Priority | Size | Item | Dependency | Main risk | Next action |
| --- | --- | --- | --- | --- | --- |
| P0 | S | Align public product narrative around observable AI work | Approved positioning | “Mega service” sounds vague | Test one promise against five real artifacts |
| P0 | M | Capture Growth Office baseline and first conversion experiment | Analytics/UTM contract | No attribution | Record `not_available`, then instrument one funnel |
| P0 | M | Add local `threads.signal.batch.v1` import preview | Metadata-only contract | Copied text or weak sources become “evidence” | Create one reviewed fixture and reject unknown fields |
| P0 | M | Package AI Opportunity Audit | Landing CTA and acceptance criteria | Open-ended consulting scope | Write inclusions, exclusions, output and buy/no-buy CTA |
| P1 | M | Publish an observable run demo | Sanitized real run fixture | Demo implies autonomy or hidden results | Show plan, evidence, rejection, budget and approval |
| P1 | L | Productize Research Office from proven Growth roles | Three calibrated runs | Duplicate office logic | Extract only repeated contracts and evaluations |
| P1 | M | Add official read-only Threads signal/insight adapter | Meta app review and scopes | OAuth/data retention expands risk | Review exact scopes without `threads_content_publish` |
| P2 | L | Add second paid office template | Demand proof | Platform breadth before PMF | Choose Builder or Research by paid pull |
| P2 | L | Add reviewed connector packaging | Tool security gate | Poisoning, rug pull, SSRF, toxic flows | Define manifest, pinning and re-approval contract |
| P3 | XL | Offer self-hosted/private deployment | Stable upgrades and support | Operational burden | Validate willingness to pay before build-out |

## Explicit non-goals

- mass account creation, anti-detect automation or identity evasion;
- unauthorized scraping as the default research layer;
- autonomous publishing, outreach, advertising or financial operations;
- one database shared by every Eclipse product;
- a generic agent marketplace before two owned offices show repeat value;
- promises that AI replaces a salary, guarantees income or creates customers by itself.
