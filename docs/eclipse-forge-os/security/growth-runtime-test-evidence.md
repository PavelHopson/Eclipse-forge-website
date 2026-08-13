# Growth Office runtime test evidence

**Assessment date:** 2026-08-13

**Scope:** Eclipse Chat `f1336b7`, Eclipse AI Hub `09661be`

**Decision:** mapped with gaps; this record does not authorize v4 or production deployment.

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
| `MISSING-CHAT-GROWTH-BUDGET-001` | `INV-002` | missing | `eclipse-chat/apps/server/src/lib/growthBudget.ts` | Add a concurrent exhaustion test proving the daily limit cannot be exceeded during create/update races. |
| `MISSING-CHAT-GROWTH-CONCURRENCY-001` | `INV-002` | missing | `eclipse-chat/apps/server/src/routes/growthRuns.ts` | Add a route-level test proving two simultaneous clicks produce at most one provider request. |
| `CHAT-GROWTH-IMPORT-001` | `INV-003` | covered | `eclipse-chat/apps/server/tests/growth-runs.test.ts` — `normalizes safe links and removes the source approval claim` | Upstream approval is discarded at the Chat trust boundary. |
| `CHAT-GROWTH-ROUTE-AUTH-001` | `INV-003` | partial | `eclipse-chat/apps/server/tests/growth-runs.test.ts` — `guards every endpoint and bounds imports and review mutations` | Every route has JWT and rate-limit guards; it does not prove database membership denial. |
| `MISSING-CHAT-GROWTH-MEMBERSHIP-001` | `INV-003` | missing | `eclipse-chat/apps/server/src/routes/growthRuns.ts` | Add injected-route tests for non-member denial and cross-workspace run IDs on every mutation path. |
| `MISSING-CHAT-GROWTH-APPROVAL-001` | `INV-003` | missing | `eclipse-chat/apps/server/src/routes/growthRuns.ts` | Add negative tests for missing `TASK_APPROVE`, stale version and absent `humanConfirmed`. |

## Invariant result

| Invariant | Result | Residual risk | Exit condition |
| --- | --- | --- | --- |
| `INV-001` | covered | Low: adversarial corpus depth can grow, but both execution and storage fail closed today | Keep the four named tests green on prompt/schema changes. |
| `INV-002` | partial | Moderate: implementation has budget and in-process duplicate guards, but their race boundaries lack focused tests | Close both `MISSING-CHAT-GROWTH-*` tests before v4. |
| `INV-003` | partial | Moderate: approval reset and JWT are tested; tenant membership and human approval need route-level negative proof | Close membership and approval tests before v4. |

The Growth Office fixture remains `draft`. No invariant record may move to `approved` while
one of its referenced IDs starts with `MISSING-`.
