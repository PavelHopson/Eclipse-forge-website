# Eclipse Forge governance source map

## Authority order

When documents conflict, use this order:

1. repository-level `AGENTS.md` or `CLAUDE.md` for implementation constraints;
2. repository-level current `ROADMAP.md` for runtime delivery status;
3. this Eclipse Forge OS hub for portfolio strategy, shared contracts and business gates;
4. root workspace governance for global policies and historical context;
5. old audits and handoff notes as historical evidence only.

## Global workspace documents

These files remain at `E:\projects` because they govern every repository. Their paths
are recorded here so the Eclipse Forge OS folder is the single discovery point.

| Path | Authority | Use |
| --- | --- | --- |
| `E:\projects\AGENTS.md` | mandatory | Business boundaries, workflow, Git and product rules |
| `E:\projects\CONTEXT.md` | reference | Repository and infrastructure map |
| `E:\projects\MEMORY.md` | curated | Confirmed user preferences and decisions |
| `E:\projects\PRODUCT_UX_PRINCIPLES.md` | mandatory | Intuitive product UX baseline |
| `E:\projects\SKILLS.md` | routing | Skill selection for design, SEO and reviews |
| `E:\projects\DEV_PROMPT.md` | mandatory for development | Senior engineering, security and verification mode |
| `E:\projects\ROADMAP.md` | ecosystem status | Cross-repository changelog and current system state |
| `E:\projects\ROLE_PROMPT.md` | optional mode | Hiring and portfolio review perspective |
| `E:\projects\Репозитории_v2.md` | historical | April 2026 portfolio snapshot; not current status authority |

The root `E:\projects\docs\00-context.md` through `07-glossary.md` files are empty legacy
scaffolding and are not sources of truth. They were left untouched to avoid destructive
cleanup without a separate decision.

## Canonical Eclipse Forge OS documents

| Domain | Canonical document |
| --- | --- |
| Product decision and flagship readiness | [Eclipse Forge OS](../README.md) |
| Program stages and risk | [Operating plan](../operating-plan.md) |
| Business model and revenue ladder | [Business model](../business-model.md) |
| Federated ownership and integrations | [Architecture](../architecture.md) |
| Release and rollback | [Security and release runbook](../security-and-release-runbook.md) |
| Growth system | [Growth OS](../growth-os/README.md) |
| Security invariants | [Security Registry](../security/README.md) |
| Current execution gate | [Stage 0](../execution/stage-0/README.md) |

## Change policy

- Update the owning repository document in the same change as behavior.
- Update this registry when a project changes role, maturity, canonical path or priority.
- Record observed Git state as a dated snapshot, never as a permanent project property.
- Do not turn a historical audit into a current claim without repository verification.
- Do not index or quote secret-bearing files.
