# Growth Office invariant independent-review packet

**Prepared:** 2026-08-13

**Prepared by:** implementation session; not an independent reviewer

**Decision status:** `pending_independent_review`

**Fixture status:** `draft`

This packet gives Pavel or another designated reviewer a bounded decision surface. It does
not grant execution, deployment, connector, publication or v4 permission.

## Immutable review target

| Surface | Commit / run | Verified result |
| --- | --- | --- |
| Eclipse Chat runtime and negative tests | `aa56478749246588e4af587584b7fd3b7b17f3dc` | 55 suites / 298 tests, typecheck and build passed |
| Eclipse Chat CI | `31688525137` | success for the exact Chat SHA |
| Eclipse Chat Security Gate | `31688525161` | Gitleaks, dependency audit/SBOM and CodeQL passed; dependency review was skipped because this was a push rather than a PR |
| Eclipse AI Hub protected workflow | `09661beb3db5fd5dfb2ddcad84c82b2f29949c03` | CI `31686020409` passed; deploy `31686020404` remains waiting without approval |
| Runtime evidence map | Landing `8591e19a70ffd720e4b8d87232d0df3ecc897d8e` | `INV-001/002/003` resolve to named tests; no `MISSING-` fixture IDs remain |

## Guard review

- JWT remains attached to every Growth route.
- Membership is checked before workspace data is read or mutated.
- Mutation lookups retain the compound `{ id, serverId }` predicate.
- Review still requires `TASK_APPROVE`, `humanConfirmed=true`, a completed five-role run and
  an optimistic version match.
- One explicit request can reserve only the next fixed role. The lease cannot be released
  by a different controller.
- The database request counter uses an atomic conditional increment and a unique-create retry.
- Tools, publication, external actions and source trust remain fixed to `false`.
- No OAuth, connected app, payment, production mutation or v4 model call was added.

## Findings

### Critical / High

None found in the reviewed change surface. This is not a penetration test or a guarantee that
the wider repositories contain no vulnerability.

### Moderate — process-local execution lease

`GrowthStepLeaseRegistry` prevents duplicate provider calls inside one Chat process. Two Chat
replicas could both reserve the same run before the optimistic database write; only one result
would persist, but both provider requests could consume time or money.

The reviewed repository config `eclipse-chat/deploy/supervisor/eclipse-chat-server.conf` defines
one Supervisor program and no `numprocs`, consistent with the intended single-process topology.
This is repository evidence, not live SSH verification; production drift remains possible.

**Current decision boundary:** do not describe the executor as multi-replica safe. Before a
multi-process deployment or higher-cost provider is enabled, replace the lease with a database
or Redis-backed expiring reservation and add a two-worker regression test.

### Moderate — budget concurrency evidence is not PostgreSQL integration evidence

`CHAT-GROWTH-BUDGET-001` exercises the production algorithm against a Prisma-compatible atomic
store, including the unique-create race. It does not execute simultaneous transactions against
the production PostgreSQL engine.

**Current decision boundary:** retain the hard daily ceiling and low-cost bounded pilot. Before
raising the budget or treating the control as payment-grade, add a disposable PostgreSQL
integration test with concurrent clients.

### Low — queued deployment state

The current Chat production workflow is pending behind an older manually waiting deployment.
No approval or cancellation was performed in this review. The reviewer must inspect the exact
target SHA before acting on either queued run.

## Reviewer checklist

The independent reviewer must verify each item rather than relying only on this summary:

- [ ] The exact Chat and AI Hub SHAs above are still the intended review targets.
- [ ] Chat is intentionally constrained to one execution process for this bounded pilot, or the
      process-local lease finding is accepted explicitly.
- [ ] The daily budget remains low enough that the missing real-PostgreSQL race test is acceptable.
- [ ] No deployment, v4 run, connector or external action is bundled into this decision.
- [ ] The evidence map matches the named tests and no test was weakened or skipped locally.

## Decision record

Choose exactly one and add reviewer name, UTC timestamp and rationale in a separate owner change:

- `request_changes` — keep fixture `draft`; list required changes.
- `reviewed_with_constraints` — recommended only if the reviewer confirms the live deployment is
  still single-process and accepts the low bounded budget until the PostgreSQL test exists; keep
  the fixture non-approved.
- `approved` — not recommended for this packet; approval requires an independent reviewer and a
  separate explicit v4/deployment decision. It must never be inferred from green CI.

Until that owner change exists, the authoritative decision remains `pending_independent_review`.
