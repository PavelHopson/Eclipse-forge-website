# Stage 0 decision record

## Current decision

| Field | Value |
| --- | --- |
| Decision ID | `growth-stage-0-decision-v3` |
| Date prepared | 2026-08-10 |
| Owner / approver | Pavel Hopson |
| Status | `v3_failed_validation` |
| External action authorized | no |
| Production change authorized | no |
| Teamly/OAuth/payment authorized | no |

The evidence packet, baseline, risk review and draft positioning audit were accepted for
one bounded run. Five local role calls completed on 2026-08-10; the resulting v1 artifact
was not accepted and has not been published. The owner requested the documented changes
and authorized one separate v2 run under the same no-action boundary.

## Decision options

- `accept`: approve the objective and evidence boundary for one bounded internal run;
- `request_changes`: identify the exact audience, problem, claim or limit to change;
- `reject`: stop the positioning-audit experiment and record the reason.

## Accepted run decision

The public-data-only internal run was accepted with the limits in
[objective.md](objective.md). The execution result and quality decision are separate:
[run-review.md](run-review.md) currently recommends `request_changes` for the artifact.

## Approval record

- **Decision:** `accept`
- **Decided by:** Pavel Hopson
- **Decision date:** 2026-08-10
- **Reason:** Proceed with the smallest public-data-only proof using the existing five-role Growth executor and the prepared evidence allowlist.
- **Requested changes:** none recorded
- **Accepted residual risks:** none recorded

An approval is valid only for `growth-stage-0-positioning-audit-v1` and the evidence
allowlist in [public-evidence.md](public-evidence.md). Any scope or capability change
invalidates it.

## Artifact review record

- **Artifact:** `growth-stage-0-positioning-audit-v1`
- **Decision:** `request_changes`
- **Decided by:** Pavel Hopson
- **Decision date:** 2026-08-10
- **Reason:** The Claim Auditor output was incomplete and the final artifact retained
  unsupported or ambiguous wording, an unvalidated pain stated as fact, an internal CTA
  and a KPI that could not yet be measured.
- **Required changes:** preserve uncertainty, use the exact AI Opportunity Audit offer and
  CTA, keep the first funnel baseline `not_available`, complete the material-claim audit,
  and make the final positioning proposition directly reviewable.
- **Publication authorized:** no

## V2 run authorization

- **Run:** `growth-stage-0-positioning-audit-v2`
- **Decision:** `accept_for_bounded_run`
- **Decided by:** Pavel Hopson
- **Decision date:** 2026-08-10
- **Ceiling:** five local model requests, 15 wall-clock minutes, production prompt-builder
  token ceilings of 1,600 tokens per role and 2,000 tokens for Editor
- **Capabilities:** no tools, URL fetching, OAuth, secrets, private data, external actions,
  payment, publication or production writes
- **Acceptance:** v2 remains unapproved until deterministic checks and human review finish

## Next owner action

Review the preserved [v3 attempt](run-v3-attempt.json) and [v3 review](run-v3-review.md).
There is no artifact to accept or publish. The next decision is whether to design an
additive typed Evidence Card input with Eclipse Chat compatibility review; a v4 model
ceiling is a later, separate decision.

## V3 run record

- **Run:** `growth-stage-0-positioning-audit-v3`
- **Authorization:** one bounded local typed-role calibration after the AI Hub `master`
  implementation was approved
- **Outcome:** `failed_validation`
- **Model calls:** four attempted; three artifacts accepted
- **Stopped at:** Claim Auditor source URL outside the allowlist
- **Editor called:** no
- **External action / publication:** no / no

## Rollback

Cancel the run, retain only the review record and mark the experiment `stopped`. Because
Stage 0 has no connected apps, production writes or publication, rollback requires no
external data deletion or account revocation.
