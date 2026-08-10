# Evidence Card runtime contract preview

## Decision state

The additive Evidence Card transport contract is implemented and pushed. This record is
the reviewable preview of the change; it is not authorization for a v4 model run,
production deployment, OAuth connection, publication or any other external action.

| Surface | Branch | Commit | State |
| --- | --- | --- | --- |
| Eclipse AI Hub | `master` | `07dcd1b` | Runtime validation and typed role outputs implemented |
| Eclipse Chat | `master` | `512239c` | Input validation, forwarding and artifact import checks implemented |

## What changed

`run.input.evidenceCards` is optional and accepts 1–20 exact objects:

| Field | Runtime rule |
| --- | --- |
| `id` | Unique, 1–64 characters, bounded identifier alphabet |
| `claim` | 5–500 safe characters |
| `state` | `verified`, `hypothesis`, `planned`, `unknown` or `rejected` |
| `sourceUrl` | `null` or an HTTPS URL already present in `sourceUrls` |
| `evidenceBoundary` | 5–1000 characters describing what the source does and does not prove |

`verified` requires a source. Card-enabled Researcher and Claim Auditor outputs use
`growth.research.v2` and `growth.claims.v2`. A verified output claim must reference a
verified card by `evidenceId` and copy its claim exactly. Foreign role schemas, unknown
IDs, unlisted URLs and mismatched claims fail closed.

## Compatibility

- Existing `growth.run.v1` inputs without `evidenceCards` remain valid.
- Legacy runs continue to use `growth.research.v1` and `growth.claims.v1`.
- Strategy, Draft and Final role schemas remain v1.
- Chat forwards the validated input unchanged and revalidates direct-execution artifacts.
- Historical prose imports remain readable; the stricter typed check applies to new
  direct execution results.

## Registry schema relationship

The existing
[`evidence-card.schema.json`](../../growth-os/schemas/evidence-card.schema.json) is the
long-lived Growth OS registry object. It contains editorial provenance such as source
type, access date, confidence, contradictions and allowed use. The runtime object is a
deliberately smaller transport projection:

| Registry concern | Runtime projection |
| --- | --- |
| `status` and editorial confidence | `state` used by execution policy |
| `sourceUrl` plus provenance metadata | allowlisted `sourceUrl` |
| `sourceNote`, contradictions and allowed use | bounded `evidenceBoundary` |
| Registry identity | runtime `id` |

No silent schema migration was made. A future unification requires its own compatibility
proposal and migration test.

## Verification evidence

- AI Hub: 12 Vitest files / 76 tests plus 45 gateway and script tests passed; typecheck
  and build passed.
- Chat: 52 server test files / 292 tests passed; workspace typecheck and build passed.
- Focused negative tests cover duplicate IDs, unlisted sources, missing verified sources,
  foreign role schemas, secret-field rejection and cross-role artifact rejection.
- No credential was added. The only secret-like string found by the changed-file scan is
  the intentional `must-not-enter-chat` negative-test fixture.

## External-action preview

No external action is approved by this record. A separately proposed v4 run would:

1. use only the preserved Stage 0 public sources and reviewed Evidence Cards;
2. make at most five local model calls with tools, connectors and URL fetching disabled;
3. create an internal artifact for human review only;
4. stop on the first schema, evidence-ID or source-allowlist violation;
5. preserve the attempt and costs without publishing anything.

Rollback for the code contract is a normal revert of `07dcd1b` and `512239c`; legacy
inputs remain available even without rollback. Production rollback is not applicable
because no deployment was authorized or performed in this step.

## Next separate gates

1. Design and review a low-cognitive-load Evidence Card editor in Eclipse Chat with safe
   defaults, inline validation and no connector access.
2. Map every Growth security invariant to a named runtime regression test.
3. Ask the owner for separate authorization before preparing or executing v4.
