# Eclipse Design Gate — first-wave profiles

## Shared demonstration flow

The first wave must demonstrate one real path rather than three disconnected redesigns:

```text
Objective in Chat
  -> bounded run in AI Hub
  -> sourced evidence in Library
  -> reviewed artifact back in Chat
```

## Eclipse AI Hub — Agent Office

- Profile: `product`.
- Three-second test: current objective, working agents, budget and the next safe action are
  visible immediately.
- Desktop anchor: a central Mission Core with Research, Design, Build, Review and Dispatch
  rooms. Light routes represent actual run events, never decorative random traffic.
- Mobile fallback: a vertical run timeline and room list; no miniature floor plan.
- One ambient anchor is allowed in the empty/discovery state. Active runs prioritize
  progress, cost, cancellation and failures.
- Required states: empty, planning, waiting approval, running, paused, partial failure,
  budget exhausted, completed and cancelled.

## Eclipse Chat — Mission Control

- Profile: `operational`.
- Three-second test: conversation/objective, agent activity, pending approval and the next
  action are distinguishable without instructions.
- The activity stream shows sanitized action, source, result, time and cost; it never
  exposes hidden reasoning.
- The main actions are state-dependent: review plan, pause, refocus, stop or review
  artifact. Only one is visually primary at a time.
- No cursor trails, scroll parallax or card tilt near messages, forms, approvals and logs.
- Existing dirty local artifacts are outside this rollout until their owner classifies
  them; the design gate must not overwrite them.

## Eclipse Library — verified knowledge

- Profile: `product`.
- Three-second test: search, source quality and the selected artifact are primary.
- Citation, provenance, snapshot version and contradictions are visible without hover.
- Knowledge rows are denser and quieter than marketing cards. One editorial anchor is
  allowed for empty or first-run states.
- Search loading, no-results, source failure, stale snapshot and conflict states are
  required.

## Acceptance for each repository

1. Copy the versioned tokens and gate snapshot locally.
2. Add a repository-owned evidence manifest and visual QA document.
3. Verify the primary path at desktop and mobile widths.
4. Verify keyboard focus and all applicable product states.
5. Capture normal and reduced-motion evidence.
6. Record bundle/performance delta and dependency provenance.
7. Complete the 25-signal review.
8. Change status to `adopted` only after all evidence is committed and CI is green.
