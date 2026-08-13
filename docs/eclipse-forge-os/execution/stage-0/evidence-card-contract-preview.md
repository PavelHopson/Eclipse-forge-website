# Evidence Card runtime contract preview

## Decision state

The additive Evidence Card transport contract is implemented and pushed. This record is
the reviewable preview of the change; it is not authorization for a v4 model run,
production deployment, OAuth connection, publication or any other external action.
The repository automation produced one unplanned consequence: AI Hub `master` auto-deployed
the original contract because its workflow had no manual production gate. This is recorded
below and must not be confused with owner approval. The gap was closed in `09661be`.

| Surface | Branch | Commit | State |
| --- | --- | --- | --- |
| Eclipse AI Hub | `master` | `07dcd1b` | Runtime validation and typed role outputs implemented |
| Eclipse Chat | `master` | `512239c` | Input validation, forwarding and artifact import checks implemented |

## Automation outcome after push

- AI Hub CI passed and workflow run `31380068268` automatically deployed `07dcd1b` to its
  configured VPS. No manual approval was requested or given.
- Chat's first CI/security/deploy validations stopped before deployment on an existing High
  `nanoid < 3.3.17` advisory.
- Chat commit `7a859cb` upgraded the transitive lockfile package to `3.3.17`; local and
  GitHub audit, CI, CodeQL, Gitleaks and SBOM gates passed.
- Chat deploy run `31380980795` was not approved and was later cancelled after waiting.
- AI Hub commit `09661be` bound deploys to the protected `production` environment, added
  PavelHopson as required reviewer, limited the deployment branch to `master` and added a
  regression test. CI run `31686020409` passed; deploy run `31686020404` is waiting and
  was not approved in this work session.

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

Code rollback is a reviewed revert of `07dcd1b`, `512239c` and, only if dependency risk is
accepted again, `7a859cb`; legacy inputs remain available even without rollback. AI Hub
production rollback remains applicable because the original workflow auto-deployed. Any
future deploy or rollback now waits at the protected environment gate; preview the target
SHA, health checks and expected downtime before approval. Do not approve waiting production
deployments as part of this record.

## Next separate gates

The reviewed Eclipse Chat editor was implemented in `f1336b7`. It defaults new cards to
`hypothesis`, restricts `verified` provenance to the run's allowlisted HTTPS sources,
requires a second action before removal and exposes no connector access. Desktop and
390 px browser QA passed without horizontal overflow.

1. Pavel or another designated reviewer records a decision against the
   [independent-review packet](../../security/growth-invariant-review-packet.md); test coverage
   alone does not change the fixture from `draft`.
2. Ask the owner for separate authorization before preparing or executing v4.
