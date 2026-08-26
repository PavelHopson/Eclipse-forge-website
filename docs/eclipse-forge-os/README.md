# Eclipse Forge OS

## Documentation hub

This directory is the single documentation source of truth for Eclipse Forge OS:

| Document | Purpose |
| --- | --- |
| [README](README.md) | Flagship product decision, Agent Office contract and readiness definition |
| [Operating plan](operating-plan.md) | Delivery stages, owners, risk register, metrics and the current starting sequence |
| [Business model](business-model.md) | Audiences, office portfolio, revenue ladder and commercial validation gates |
| [Architecture](architecture.md) | Federated product topology, ownership and integration contracts |
| [Security and release runbook](security-and-release-runbook.md) | Release, rollback, secret and repository lifecycle rules |
| [Eclipse Design Gate](design/README.md) | Shared visual quality, anti-slop evidence, motion tiers and first-wave product profiles |
| [Growth OS](growth-os/README.md) | First Office template, Teamly record, metrics and machine-readable Growth contracts |
| [Security Registry](security/README.md) | Security invariants, lethal-trifecta gate, risks and reviewed fixtures |
| [Stage 0 execution packet](execution/stage-0/README.md) | First bounded objective, public evidence, analytics baseline, risk review and decision gate |
| [Project documentation registry](projects/README.md) | Complete portfolio, canonical documents, Git baseline and consolidated P0-P3 backlog |

All new cross-project Eclipse Forge OS plans, decisions, registries and contracts belong
in this tree. Product-specific runtime documentation remains in the repository that
owns the implementation and is discoverable through the project registry.

## Product decision

**Eclipse Forge OS is the flagship product of the Eclipse Forge ecosystem.** It is a
single, understandable product surface for assembling human-controlled AI teams,
observing their work, reviewing evidence and approving outcomes.

The primary experience inside Eclipse Forge OS is **Agent Office**. It is not a new
technical monolith and does not replace the existing products. It composes them through
versioned contracts:

| Product | Role in Eclipse Forge OS |
| --- | --- |
| Eclipse Chat | User-facing control plane, rooms, membership, approvals and realtime activity |
| Eclipse AI Hub | Agent registry, orchestration, model routing, tool policies, budgets and run state |
| Eclipse Library | Verified knowledge, source provenance and approved snapshots |
| Hopson Sentinel | Explicitly approved local capabilities on a paired user-owned node |
| Eclipse Media | Human-reviewed media jobs, previews and delivery artifacts |
| Eclipse Forge Landing | Public positioning, demonstrations, lead magnets and conversion |

Eclipse Chat remains an independently usable product. No immediate rename or monolithic
database migration is implied by this decision.

## Promise

> Describe an outcome, review the plan and budget, watch a team of agents produce
> evidence-backed work, then approve or reject the result.

The product does not promise autonomous employees, guaranteed income or error-free AI.
Its differentiator is observable, bounded and reversible execution.

The commercial model, customer sequence, office portfolio and validation gates are
defined in [Eclipse Forge OS business model](business-model.md). The
platform expands through proven office templates and productized implementation, not by
presenting all repositories as one undifferentiated “mega service”.

The ordered implementation program, risk register, stage gates and “start here” sequence
are maintained in the [Eclipse Forge OS operating plan](operating-plan.md).

## Core audience

The first audience is a technical founder, product owner or small team that wants to
apply AI to research and operational work but needs control over evidence, cost, data
and external actions.

The initial job to be done:

> Given a public URL or product question, produce a reviewable positioning audit with
> traceable sources, rejected claims and a prioritized next action.

## Agent Office experience

The three-second test for the first screen:

1. The user sees the current objective.
2. The user sees which agents are working and what each is doing.
3. The user sees cost, progress and pending approvals.
4. The next safe action is obvious: `Review plan`, `Pause`, `Refocus`, `Stop` or
   `Review artifact`.

Example information hierarchy:

```text
Eclipse Growth Office                     Budget: $0.17 / $2.00

Coordinator            Researcher          Claim Verifier
Working                 Reading sources     Checking evidence

Current objective
Audit Eclipse Forge positioning

Activity
12:41  Researcher opened official product documentation
12:42  Seven candidate claims were recorded
12:43  Claim Verifier rejected two unsupported claims
12:44  Audience map artifact is ready for review

[Pause] [Refocus] [Stop run]                [Review artifact]
```

The activity stream exposes action summaries, tool use, sources, outcomes, duration and
cost. It must never expose hidden model chain-of-thought. Users receive concise,
purpose-written explanations instead.

## First vertical slice

One office, one Coordinator and four specialists:

| Agent | Responsibility | Allowed output |
| --- | --- | --- |
| Market Researcher | Collect public market and audience evidence | Evidence cards |
| Claim Verifier | Validate claims, contradictions and confidence | Claim decisions |
| Content Strategist | Convert verified evidence into a funnel-aware brief | Reviewable content artifact |
| Metrics Analyst | Define measurement and assess observed results | Weekly decision record |

First workflow:

```text
Objective
  -> human reviews plan, tools and budget
  -> Coordinator starts bounded run
  -> Researcher creates evidence cards
  -> Claim Verifier accepts, downgrades or rejects claims
  -> Strategist produces the positioning audit
  -> human reviews and accepts the artifact
  -> Metrics Analyst defines the next measurable experiment
```

The MVP ends at a reviewed internal artifact. It cannot publish, send outreach, change
advertising, initiate payments or modify production.

## `agents.v1` contract

The first owned contract contains:

- `AgentDefinition`: identity, role, version and system-policy reference;
- `AgentCapability`: one explicitly scoped tool or data permission;
- `RunPlan`: objective, ordered steps, agents, sources, budget and approval gates;
- `AgentRun`: lifecycle, owner, workspace and current state;
- `RunEvent`: sanitized observable activity with timing and cost;
- `EvidenceCard`: claim, source, confidence, contradictions and allowed use;
- `Artifact`: versioned reviewable output with provenance;
- `ApprovalRequest`: exact proposed mutation, data, destination and rollback;
- `BudgetPolicy`: token, currency, duration and tool-call ceilings.

Lifecycle:

```text
DRAFT -> PLANNED -> WAITING_START_APPROVAL -> RUNNING
      -> WAITING_ACTION_APPROVAL -> RUNNING
      -> COMPLETED | FAILED | CANCELLED
```

Every state transition is idempotent and authorized against the current workspace,
membership and run ownership.

## Data ownership

- Chat owns workspace membership, rooms, human approvals and presentation state.
- AI Hub owns agent definitions, run execution, budgets and model/tool telemetry.
- Library owns verified knowledge records and approved immutable snapshots.
- Media owns render jobs and generated media artifacts.
- Sentinel owns paired-node capabilities and local execution receipts.

Products exchange identifiers and versioned events. They do not share credentials or
write directly into another product's database.

## Security and privacy baseline

- Public-data-only egress in the first vertical slice.
- Tool calls use deny-by-default capability allowlists.
- Web pages and retrieved documents are untrusted data, never instructions.
- Each source and artifact preserves provenance and workspace visibility.
- Mutating tools require action-specific human approval; timeout means denial.
- Pause and stop must interrupt future tool dispatch, not merely hide UI progress.
- Every run has cost, token, duration and tool-call ceilings plus a kill switch.
- No primary accounts, private repositories, personal data or production secrets in MVP.
- Audit events contain sanitized operation, outcome, source reference, timing and cost;
  they do not log credentials, cookies or hidden reasoning.
- Critical and High failures receive focused regression tests before release.

## UX states required before release

- empty office with one obvious objective input;
- plan generation and plan-review loading states;
- running, paused, waiting approval and stopping states;
- partial failure with retry or continue-without-agent decision;
- exhausted budget and unavailable model/tool states;
- evidence conflict and unsupported-claim states;
- completed artifact with accept, request changes and reject actions;
- no-access, offline and reconnecting states;
- keyboard focus, reduced motion and responsive layouts.

## Metrics

Primary product metrics:

- time from objective submission to first useful evidence card;
- percentage of runs that produce an accepted artifact;
- primary-source coverage and rejected unsupported claims;
- human editing time after agent completion;
- cost per accepted artifact;
- approval wait time and cancellation rate;
- weekly retained offices that complete a second run;
- qualified demo, audit or implementation requests generated by the flagship.

Agent count, token volume and the amount of generated text are not success metrics.

## Delivery roadmap

| Priority | Size | Deliverable | Main dependency | Main risk | Next action |
| --- | --- | --- | --- | --- | --- |
| P0 | M | `agents.v1` contract and threat model | Chat/AI Hub ownership agreement | Cross-tenant event leakage | Define schemas and authorization invariants |
| P0 | L | Read-only Agent Office UI | Stable run-event fixture | Activity stream becomes decorative | Prototype the first vertical slice with fixtures |
| P0 | L | AI Hub bounded run engine | `agents.v1`, model gateway | Unbounded cost or stuck runs | Implement budgets, cancellation and idempotency first |
| P1 | M | Coordinator and four Growth agents | Evidence schemas | Agents duplicate or contradict work | Add deterministic handoff and claim states |
| P1 | M | Evidence and artifact review | Library snapshot contract | Sources lose provenance | Reuse Evidence Card and immutable source IDs |
| P1 | M | Pause, refocus, stop and approvals | Realtime state machine | UI says stopped while tools continue | Verify dispatch cancellation end to end |
| P1 | S | Cost and token telemetry | AI Hub aggregates | Sensitive content enters telemetry | Store bounded aggregates and sanitized events |
| P2 | L | Reusable office templates | Proven first workflow | Marketplace slop | Require owner, version, tests and capability manifest |
| P2 | L | Media production office | Eclipse Media contract | Unreviewed generated media | Keep preview and human approval mandatory |
| P2 | M | Reviewed connector packaging | Capability manifest and pinning | Tool poisoning, rug pulls, SSRF or toxic flows | Invalidate approval whenever tool metadata or schema changes |
| P3 | XL | External and Sentinel capabilities | Isolation and scoped identities | Account or local-machine compromise | Introduce one read-only connector at a time |

## Product boundaries

- Agent Office is inspired by the observable team metaphor, not a copy of Teamly's
  interface, text, agents, assets or proprietary implementation.
- Existing Eclipse products remain independently deployable and reversible.
- The flagship launches with one excellent workflow before expanding into a generic
  agent marketplace.
- Marketing may demonstrate actual run events and artifacts only; synthetic metrics or
  simulated customer outcomes must be labeled clearly.

## Definition of flagship readiness

Eclipse Forge OS becomes the public flagship when a new user can complete the first
positioning-audit workflow without instructions, see why every material claim was
accepted or rejected, stop execution reliably, understand the cost and export a
reviewed artifact. Until then it is an internal product program, not a shipped claim.
