# Eclipse Forge control-plane roadmap

This roadmap covers ecosystem discovery and shared contracts. Product-specific delivery remains in each repository's own roadmap.

## Current status

- [x] Establish Eclipse Forge OS and Agent Office as the flagship product program.
- [x] Publish a machine-readable ecosystem manifest.
- [x] Validate project identities, data ownership and integration references in CI.
- [x] Add a read-only portfolio health auditor.
- [x] Document security, release and repository-lifecycle rules.
- [x] Establish Eclipse Growth OS positioning, operating model and registry contracts.
- [x] Add the Landing crawlability and AI-discovery foundation.
- [x] Close the Teamly no-plan evaluation without payment or integrations.
- [x] Implement the first Growth Command Room review workflow in Eclipse Chat.
- [x] Implement the bounded five-role Growth executor in Eclipse AI Hub.
- [x] Define the Eclipse Forge OS business model and office expansion gates.
- [x] Define the platform operating plan, provisional risk register and Security Invariant Registry.
- [ ] Move secret-bearing local files into an encrypted vault and rotate exposed credentials.
- [ ] Review all dirty repositories manually; do not bulk-commit them.

## Flagship: Eclipse Forge OS

- **Product:** Eclipse Forge OS.
- **Primary experience:** Agent Office.
- **First office template:** Eclipse Growth OS.
- **First workflow:** public URL or product question -> verified positioning audit ->
  human-reviewed artifact -> measurable next experiment.
- **Architecture:** Eclipse Chat control plane + Eclipse AI Hub execution + Eclipse
  Library evidence + Sentinel local capabilities + Eclipse Media artifacts.
- **Current claim:** internal product program. Do not market it as shipped until the
  flagship readiness definition in `docs/eclipse-forge-os/README.md` is satisfied.

### P0: first observable run

- [x] Define the `agents.v1` contract, threat model and data ownership invariants.
- [x] Build the first tenant-scoped Growth Command Room review surface.
- [x] Implement bounded one-step execution, cancellation and per-user budget policy.
- [x] Add Researcher, Strategist, Writer, Claim Auditor and Editor roles.
- [ ] Demonstrate one evidence-backed positioning audit with human acceptance and metrics.
- [x] Add `security.invariant.v1` and the draft public-only Growth Office fixture.
- [ ] Map each Growth invariant to verified runtime regression-test evidence.

## Eclipse Growth OS sequence

### P0: evidence and conversion foundation

- [x] Define audiences, positioning, project priority and success metrics.
- [x] Version the Evidence Card, Content Item and Growth Experiment contracts.
- [x] Document the Teamly data boundary, roles, approvals and rollback.
- [x] Publish `robots.txt`, `sitemap.xml`, `llms.txt`, canonical metadata and JSON-LD.
- [ ] Capture the analytics baseline and establish UTM naming.

### P1: first validated funnel

- [ ] Create the AI Project Production Readiness Checklist.
- [ ] Build and measure its landing funnel.
- [ ] Package AI Opportunity Audit, Research Agent and MCP Server offers.
- [ ] Calibrate Teamly agents on three public Eclipse Forge artifacts.

### P2: owned orchestration

- [x] Add the Growth Command Room review queue to Eclipse Chat.
- [x] Add bounded Researcher, Strategist, Writer, Claim Auditor and Editor workflows to AI Hub.
- [ ] Add the weekly decision log and qualified-action metrics to Eclipse Chat.
- [ ] Route human-reviewed demo renders through Eclipse Media.

### P3: business expansion

- [ ] Validate one positioning promise against five real Eclipse Forge artifacts.
- [x] Add a manual metadata-only `threads.signal.batch.v1` contract and safety test.
- [ ] Add a reviewed fixture and local import preview for `threads.signal.batch.v1`.
- [ ] Package the AI Opportunity Audit with explicit scope, exclusions and acceptance criteria.
- [ ] Publish one sanitized observable-run demonstration after human acceptance.
- [ ] Choose Research Office or Builder Office as the second commercial wedge from paid demand.
- [ ] Add connector distribution only after capability pinning, poisoning/SSRF review and re-approval rules.

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

## Changelog

### 2026-08-07 — documentation hub

- Consolidated the flagship overview, operating plan, business model, architecture,
  security/release runbook, Growth OS and Security Registry under the single
  `docs/eclipse-forge-os/` source-of-truth directory. Updated internal references and
  test paths; no contracts, policies or runtime behavior changed.

### 2026-08-07

- Added the unified Eclipse Forge OS operating plan: current state, complete product and
  customer journeys, workstreams, NIST-inspired risk model, provisional EF-R01–EF-R06
  register, four delivery stages, exit gates, scoreboard, responsibility model and the
  exact first 72-hour sequence.
- Added `security.invariant.v1`, a draft Growth Office fixture and regression tests. The
  schema forces `executionAllowed=false` when private-data access, untrusted-content
  access and agent-directed external communication coexist; approval requires an
  independent reviewer and timestamp. No runtime permission, connector or external
  action was added.

### 2026-08-06

- Defined the Eclipse Forge OS business model: initial ICP, office portfolio, progressive
  revenue ladder, validation scorecard and stage gates from owned proof to recurring
  platform. The acquisition loop keeps observable stages from high-volume content
  workflows but explicitly rejects mass accounts, anti-detect tooling, unauthorized
  scraping and autonomous publication.
- Added a security boundary for future MCP/connectors: untrusted metadata, version/hash
  pinning, approval invalidation on change, SSRF controls, scoped authentication and
  toxic-flow review. No connector, OAuth scope or external action was enabled.
- Added the bounded `threads.signal.batch.v1` JSON Schema and regression test. It accepts
  at most twenty manually observed public signals, fixes the initial profile to Pavel's
  personal engineering profile and intentionally has no post-body, credential or private
  analytics field.

### 2026-08-03

- Declared Eclipse Forge OS and its Agent Office the ecosystem flagship product program.
  Growth OS becomes the first office template; Chat, AI Hub, Library, Sentinel and Media
  remain independently deployable services connected by versioned contracts.
- Established Eclipse Growth OS positioning, audience and project priorities, a
  public-data-only Teamly pilot contract, three machine-readable registry schemas and
  a weekly review template.
- Added the Landing crawlability foundation: canonical and social metadata, WebSite
  and Person JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt` and regression tests.
- Validated Teamly's no-plan boundary: profile and one research agent can be configured,
  but specialist execution is locked behind the USD 6 intro week. No payment,
  organization, integration or external action was initiated.
