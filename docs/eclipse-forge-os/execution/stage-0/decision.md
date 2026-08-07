# Stage 0 decision record

## Current decision

| Field | Value |
| --- | --- |
| Decision ID | `growth-stage-0-decision-v1` |
| Date prepared | 2026-08-07 |
| Owner / approver | Pavel Hopson |
| Status | `ready_for_human_review` |
| External action authorized | no |
| Production change authorized | no |
| Teamly/OAuth/payment authorized | no |

The evidence packet, baseline, risk review and draft positioning audit are complete
enough for a human decision. The Growth Office AI run itself has not been executed and
no artifact has been published.

## Decision options

- `accept`: approve the objective and evidence boundary for one bounded internal run;
- `request_changes`: identify the exact audience, problem, claim or limit to change;
- `reject`: stop the positioning-audit experiment and record the reason.

## Recommended decision

`accept` the public-data-only internal run with the limits in
[objective.md](objective.md). This creates the smallest useful proof while keeping
private data, tools, external communication and production outside the execution path.

## Approval record

- **Decision:** `pending`
- **Decided by:** `pending`
- **Decision date:** `pending`
- **Reason:** `pending`
- **Requested changes:** none recorded
- **Accepted residual risks:** none recorded

An approval is valid only for `growth-stage-0-positioning-audit-v1` and the evidence
allowlist in [public-evidence.md](public-evidence.md). Any scope or capability change
invalidates it.

## Next action after approval

Run one five-role internal Growth workflow, preserve each role output and model cost,
then compare the resulting audit with [positioning-audit.md](positioning-audit.md).
Record human editing time and an `accept`, `request_changes` or `reject` artifact
decision. Do not publish.

## Rollback

Cancel the run, retain only the review record and mark the experiment `stopped`. Because
Stage 0 has no connected apps, production writes or publication, rollback requires no
external data deletion or account revocation.
