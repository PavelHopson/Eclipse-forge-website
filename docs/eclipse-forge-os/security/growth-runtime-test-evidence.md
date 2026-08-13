# Growth Office runtime test evidence

**Assessment date:** 2026-08-13

**Scope:** Eclipse Chat `aa56478`, Eclipse AI Hub `09661be`

**Decision:** mapped and covered; this record does not authorize v4 or production deployment.

This map turns the prose `security.invariant.v1` fixture into traceable repository evidence.
`covered` means a named test exercises the negative boundary. `partial` means some enforcement
exists and is tested, but the complete abuse case is not yet a regression test. `missing` is an
explicit backlog item, never evidence that a control passed.

## Evidence map

| Test ID | Invariant | Status | Repository evidence | What the test proves |
| --- | --- | --- | --- | --- |
| `AIH-GROWTH-POLICY-001` | `INV-001` | covered | `eclipse-ai-hub/src/services/growthWorkflowService.test.ts` — `creates a fail-closed run without tools or publishing` | A new run fixes tools, publication, external actions and source trust to `false`. |
| `AIH-GROWTH-DATA-001` | `INV-001` | covered | `eclipse-ai-hub/gateway/tests/growth-output.test.mjs` — `server-owned prompts isolate every role output contract from DATA` | Untrusted role/source data cannot replace the server-owned output contract. |
| `AIH-GROWTH-OUTPUT-001` | `INV-001` | covered | `eclipse-ai-hub/gateway/tests/growth-output.test.mjs` — `fails closed on prose, extra fields, foreign schemas and incomplete roles` | Malformed or cross-role output stops instead of entering the next handoff. |
| `CHAT-GROWTH-SCHEMA-001` | `INV-001` | covered | `eclipse-chat/apps/server/src/lib/growthRunContract.test.ts` — `rejects direct-execution prose and a schema from another role` | Chat independently rejects prose and foreign role schemas before storage. |
| `AIH-GROWTH-ORDER-001` | `INV-002` | covered | `eclipse-ai-hub/gateway/tests/gateway.test.mjs` — `isolates the Growth executor behind its own scope and fixed workflow` | The dedicated scope cannot skip the fixed next role. |
| `CHAT-GROWTH-ORDER-001` | `INV-002` | covered | `eclipse-chat/apps/server/src/lib/growthRunContract.test.ts` — `creates a fail-closed draft and requires the fixed role order` | A direct execution artifact cannot be appended out of order. |
| `CHAT-GROWTH-CANCEL-001` | `INV-002` | covered | `eclipse-chat/apps/server/src/ai/growthHub.test.ts` — `maps an explicit caller abort to a safe cancellation` | Caller cancellation propagates as a bounded safe error. |
| `CHAT-GROWTH-BUDGET-001` | `INV-002` | covered | `eclipse-chat/apps/server/src/lib/growthBudget.test.ts` — `does not exceed the daily limit during concurrent first-use races` | Ten concurrent first-use attempts cannot consume more than the configured limit. |
| `CHAT-GROWTH-CONCURRENCY-001` | `INV-002` | covered | `eclipse-chat/apps/server/src/lib/growthStepLease.test.ts` — `allows at most one provider request reservation per run` | The atomic run lease rejects duplicate provider-request reservations and owner-mismatched release. |
| `CHAT-GROWTH-IMPORT-001` | `INV-003` | covered | `eclipse-chat/apps/server/tests/growth-runs.test.ts` — `normalizes safe links and removes the source approval claim` | Upstream approval is discarded at the Chat trust boundary. |
| `CHAT-GROWTH-ROUTE-AUTH-001` | `INV-003` | covered | `eclipse-chat/apps/server/tests/growth-runs.test.ts` — `guards every endpoint and bounds imports and review mutations` | Every route has JWT and bounded rate-limit guards. |
| `CHAT-GROWTH-MEMBERSHIP-001` | `INV-003` | covered | `eclipse-chat/apps/server/tests/growth-routes-negative.test.ts` — `denies non-members and scopes mutation lookups to the requested workspace` | Non-members fail closed and cross-workspace run IDs cannot bypass the `{id, serverId}` predicate. |
| `CHAT-GROWTH-APPROVAL-001` | `INV-003` | covered | `eclipse-chat/apps/server/tests/growth-routes-negative.test.ts` — `requires approval permission, human confirmation and the current version` | Missing permission or confirmation fails before mutation; stale versions return a conflict. |

## Invariant result

| Invariant | Result | Residual risk | Exit condition |
| --- | --- | --- | --- |
| `INV-001` | covered | Low: adversarial corpus depth can grow, but both execution and storage fail closed today | Keep the four named tests green on prompt/schema changes. |
| `INV-002` | covered | Low: the database remains the cross-process budget authority; the in-process lease intentionally protects only duplicate requests in one Chat process | Keep budget and lease tests green; reassess if execution becomes multi-process. |
| `INV-003` | covered | Low: tenant, permission, confirmation and optimistic-version boundaries are covered at the route layer | Keep route negative tests green on authz or review changes. |

The Growth Office fixture remains `draft`: runtime test coverage is necessary but does not replace
independent review. No invariant record may move to `approved` while one of its referenced IDs starts
with `MISSING-`.
