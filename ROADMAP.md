# Eclipse Forge control-plane roadmap

This roadmap covers ecosystem discovery and shared contracts. Product-specific delivery remains in each repository's own roadmap.

## Current status

- [x] Publish a machine-readable ecosystem manifest.
- [x] Validate project identities, data ownership and integration references in CI.
- [x] Add a read-only portfolio health auditor.
- [x] Document security, release and repository-lifecycle rules.
- [ ] Move secret-bearing local files into an encrypted vault and rotate exposed credentials.
- [ ] Review all dirty repositories manually; do not bulk-commit them.

## Integration sequence

### P0: Eclipse Chat to Eclipse AI Hub

- [x] Define the `ai.v1` OpenAPI contract and dedicated service-token boundary.
- [ ] Add cost, latency, source and fallback telemetry.
- [x] Ship an opt-in canary provider with direct-provider fallback and immediate rollback.
- [ ] Deploy the gateway and complete production health, fallback and token-rotation drills.

### P1: Webclaw to Library to AI Hub

- [ ] Define an untrusted `knowledge.candidate.v1` submission contract.
- [ ] Add duplicate, license, safety and source-verification gates in Library.
- [ ] Publish immutable approved snapshots for AI Hub indexing.

### P1: Eclipse Chat to Hopson Sentinel

- [ ] Pair a local node with a one-time code.
- [ ] Expose typed capabilities and explicit approvals, never arbitrary remote shell strings.
- [ ] Return progress events and artifact references to Chat.

### P2: vertical runtimes

- [ ] Embed DnD campaign and party cards into Chat.
- [ ] Embed privacy-safe Finflow summaries and approvals into Chat.
- [ ] Expose Educator AI learning plans and cited research cards.
- [ ] Route Shotforge and Text2Image jobs through Eclipse Media.

## Portfolio rule

Every repository appears in the portfolio inventory, but only products with a stable owner, contract and release path join the runtime graph. Incubators have 60 days to be promoted, merged or archived.
