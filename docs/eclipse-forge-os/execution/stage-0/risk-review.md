# Stage 0 risk review

## 1. Purpose, scope and tier

- **Purpose:** decide whether the first Growth Office positioning audit may produce an
  internal review artifact.
- **Scope:** supplied public evidence, the bounded five-role Growth executor and human
  review in Eclipse Chat. Star CRM is out of scope.
- **NIST SP 800-39 tier:** Tier 3 system assessment informing the Tier 2 Eclipse Forge OS
  product mission.
- **Assessment date:** 2026-08-07.
- **Validity:** until a prompt, model, tool, retrieval, connector, memory, data class or
  runtime authorization change.

## 2. Assumptions, constraints and model

- Public web content is untrusted data, even when it comes from an official repository.
- The run receives a human-curated evidence packet; it has no fetch tool or connected app.
- The assessment is based on repository and architecture evidence, not a penetration test.
- Risk factors follow NIST SP 800-30 Rev. 1: threat source, event, vulnerability,
  likelihood, impact and residual risk.
- Scale: Very Low, Low, Moderate, High, Very High using the documented 5x5 qualitative
  matrix.

## 3. Threat sources

| Source | Type | Relevant capability or failure mode |
| --- | --- | --- |
| Malicious public content author | adversarial | Prompt injection or false evidence |
| Unauthorized or cross-tenant actor | adversarial | Forged, stale or replayed approval/artifact |
| Authorized operator | accidental | Publishes a draft or supplies a sensitive source |
| Model/provider/runtime | structural | Hallucination, timeout, unavailable model or cost drift |
| Repository/process drift | structural | Documentation says a control exists after runtime changes |

## 4. Risk register

| ID | Threat event | Predisposing condition | Likelihood | Impact | Inherent risk | Treatment and evidence | Residual risk | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `EF-R01` | Injected content exposes a workspace or service secret | Known plaintext-secret debt elsewhere in the local ecosystem | Moderate | Very High | High | Avoid reachability: public allowlist only, no secret-path reads, no tools or egress; vault and rotation remain separate remediation | Low in this run; **High platform debt remains open** | Pavel / platform |
| `EF-R02` | Supplied content changes role policy or grants a capability | Untrusted source text enters model context | High | High | High | Fixed server-owned roles, no arbitrary tools, no external communication; treat sources as data | Low | AI Hub owner |
| `EF-R04` | A stale or forged artifact reuses approval across a workspace/version boundary | Asynchronous handoff between execution and review | Moderate | Very High | High | Tenant authorization, imported approval reset, exact artifact/version decision; runtime mapping still needs full regression evidence | Moderate | Eclipse Chat owner |
| `EF-R05` | A later change removes a guardrail while documentation remains green | Registry fixture is not itself runtime enforcement | High | High | High | Map every invariant to negative runtime tests before flagship release; reassess on code/policy change | Moderate | Repository owners |
| `EF-R06` | Retry or repeated requests consume uncontrolled model budget | Model failure or repeated operator input | Moderate | Moderate | Moderate | Five role-call, USD 2, 15-minute ceilings; timeout/cancel; no automatic retry expansion | Low | AI Hub owner |
| `GROWTH-R01` | Unsupported product or outcome claim survives into the artifact | Broad portfolio copy and incomplete evidence | High | High | High | Evidence IDs, explicit claim states, independent Claim Auditor, human acceptance | Moderate | Growth owner |
| `GROWTH-R02` | Internal draft is mistaken for approved publication copy | Artifact and channel workflow are conflated | Moderate | High | Moderate | Internal-only label, no publisher, separate preview/diff and approval for any external action | Low | Pavel |
| `GROWTH-R03` | Missing analytics is replaced by invented performance numbers | Pressure to produce a baseline without instrumentation | Moderate | High | Moderate | Mandatory `not_available`, named collection method and source | Low | Metrics Analyst |

## 5. Lethal-trifecta decision

| Signal | Stage 0 value | Enforcement |
| --- | --- | --- |
| Private-data access | false | Public evidence allowlist; secret paths excluded |
| Untrusted-content access | true | Supplied source material is treated as untrusted data |
| Agent-directed external communication | false | No tools, connectors, publication, messaging or fetch capability |

The trifecta is broken by design. `executionAllowed=true` applies only to generation of
the internal artifact within the stated ceilings. It does not authorize external action.

## 6. Top decisions

1. **Proceed only with the public-data-only internal artifact.** The selected workflow
   has no Critical or unowned High residual risk.
2. **Keep `EF-R01` open.** Reachability is removed from Stage 0, but the platform-wide
   secret debt is not remediated until values are vaulted and potentially exposed
   credentials are rotated.
3. **Do not call the Security Registry runtime proof.** `EF-R04` and `EF-R05` remain
   Moderate pending end-to-end negative-test mapping.
4. **Fail closed on scope expansion.** Any OAuth, URL fetch, private source, memory,
   tool, publication or production capability requires reassessment.

## 7. Maintenance and approval

- Review at every Stage gate and at least quarterly while the Office remains active.
- Record owner, evidence, expiry and residual risk for any accepted exception.
- Human approver: Pavel Hopson.
- Current assessment decision: **ready for human review; no external action authorized**.

Reference: [NIST SP 800-30 Rev. 1](https://csrc.nist.gov/pubs/sp/800/30/r1/final).
