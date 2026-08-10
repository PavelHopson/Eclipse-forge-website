# Eclipse Forge OS Stage 0

This packet starts the first public-data-only Growth Office proof. It is an internal
execution and decision record, not a publication plan or authorization for external
action.

| Document | Purpose |
| --- | --- |
| [Objective](objective.md) | Audience, problem, offer, CTA, role assignments, ceilings and acceptance criteria |
| [Public evidence](public-evidence.md) | Complete source allowlist, claim decisions and evidence gaps |
| [Analytics baseline](analytics-baseline.md) | Honest `not_available` baseline, UTM v1 and future instrumentation gate |
| [Risk review](risk-review.md) | NIST SP 800-30 assessment, threat events, treatments and residual risk |
| [Positioning audit](positioning-audit.md) | Evidence-backed draft position, message hierarchy and first experiment |
| [Decision](decision.md) | Human accept, request-changes or reject gate and rollback |
| [Run v1 input](run-input.json) | Exact public evidence, model ceiling and no-action policy used for v1 |
| [Run v1 output](run-output.json) | Five preserved v1 role artifacts in `growth.run.v1` format |
| [Run v1 review](run-review.md) | V1 runtime baseline, truncation and quality findings |
| [Run v2 input](run-v2-input.json) | Owner-requested corrections and production token ceilings |
| [Run v2 output](run-v2-output.json) | Exact second five-role result, preserved without human edits |
| [Run v2 review](run-v2-review.md) | Deterministic checks, role-contamination finding and next gate |
| [Run v3 input](run-v3-input.json) | Evidence-only input for the first typed-role calibration |
| [Run v3 attempt](run-v3-attempt.json) | Three accepted typed artifacts and the fail-closed Claim Auditor error |
| [Run v3 review](run-v3-review.md) | Security result, semantic findings and Evidence Card gate |
| [Evidence Card contract preview](evidence-card-contract-preview.md) | Implemented additive runtime contract, compatibility, verification and next separate gates |

Current state: two local five-role runs are preserved. The owner requested changes to v1;
v2 completed but its review also recommends `request_changes` because shared DATA caused
cross-role output contamination. V3 validated typed role isolation, then failed closed at
Claim Auditor on an out-of-allowlist URL; no final artifact exists. The additive Evidence
Card runtime contract is now implemented in AI Hub and Chat, but no v4 run is authorized.
Nothing is approved.
No publication, connector, OAuth, payment or production change is authorized by this packet.
