# Stage 0 Growth run v3 review

## Outcome

V3 proved that the new typed role boundary works fail-closed. Four local model requests
were attempted; Researcher, Strategist and Writer produced schema-valid artifacts. Claim
Auditor referenced a URL outside the source allowlist, so its output was rejected and
Editor was not called. There is no `growth.run.v1` artifact to approve or publish.

## Execution record

| Field | Result |
| --- | --- |
| Attempt | `growth-stage-0-positioning-audit-v3` |
| Provider / model | local Ollama / `qwen3:8b` |
| Started | 2026-08-10 10:19:21 UTC |
| Stopped | 2026-08-10 10:20:09 UTC |
| Wall-clock | 48,451 ms |
| Model calls | 4 attempted; 3 accepted artifacts |
| Failed step | Claim Auditor |
| Failure | source URL outside the input allowlist |
| Editor call | not executed |
| Tools / URL fetches / connectors | 0 / 0 / 0 |
| External actions / publication | none / none |

The preserved attempt's `completedRequests: 3` counts accepted artifacts, not model calls.
That runner-label ambiguity is documented here and must be corrected before another run.

## What improved

- Research, strategy and draft returned distinct canonical role JSON rather than mixed
  prose sections.
- Previous artifacts were revalidated before entering the next prompt.
- The invalid Claim Auditor source did not become an artifact.
- No fifth call was spent after the fourth call failed validation.
- The gateway exposed only a validation reason; no provider diagnostics or secret data
  were involved.

## Remaining quality findings

1. Researcher treated the planned offer and KPI as verified facts and attached the root
   website even though that claim-to-source relationship was not established.
2. Strategist wrote that Eclipse Forge OS “offers” and “enables” a capability rather than
   keeping the proposition as an explicit experiment.
3. An allowlisted URL proves that a source is permitted, not that it supports a specific
   claim. Unstructured `evidenceNotes` cannot provide deterministic claim-level grounding.
4. The rejected Claim Auditor raw body was intentionally not retained. This protects
   provider content, but future local calibration tooling should record a redacted output
   hash and validation code for diagnosis.

After this attempt, AI Hub's server-owned prompts and validator were strengthened so that
strategy/final propositions must explicitly describe a test, experiment or hypothesis;
planned offer/CTA/KPI are not verified outcome evidence; and source URLs must be copied
exactly from the allowlist. Those post-run controls are covered by regression tests but
have not yet been validated by another model run.

## Next gate

Do not authorize v4 yet. First design an additive typed Evidence Card input that binds a
claim ID, state, source URL and evidence boundary. This requires compatibility review
with Eclipse Chat before changing the public Growth request contract. After that review,
the owner may authorize a new five-call ceiling as a separate run.

## Security review

No new Critical, High, Medium or Low security finding was observed. The attempted
out-of-allowlist reference was blocked as designed. Residual risk is semantic evidence
misattribution inside allowlisted sources; human approval remains mandatory.
