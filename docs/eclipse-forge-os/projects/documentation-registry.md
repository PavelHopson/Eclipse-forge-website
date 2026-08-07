# Eclipse Forge documentation registry

Repository paths are relative to `E:\projects`. The registry records canonical entry
points; it does not duplicate runtime-owned documentation.

## Flagship and shared platform

| Repository | Canonical entry points | Documentation decision |
| --- | --- | --- |
| `EclipseForgeLanding` | `README.md`, `ROADMAP.md`, `DESIGN.md`, `CLAUDE.md`, `docs/eclipse-forge-os/` | Owns portfolio strategy, Growth OS, business model, public registry and conversion |
| `eclipse-chat` | `README.md`, `ROADMAP.md`, `SECURITY.md`, `CLAUDE.md`, `docs/COMMAND-FABRIC.md`, `docs/contracts/agents-v1.md`, `docs/contracts/growth-run-v1.md`, `docs/SECURITY-GATE.md`, `docs/DEVELOPMENT.md` | Owns workspace, approval, review, identity and realtime-control documentation |
| `eclipse-ai-hub` | `README.md`, `ROADMAP.md`, `AGENTS.md`, `CLAUDE.md`, `docs/growth-os-contract.md`, `docs/chat-gateway-slo.md`, `docs/builder-project-v1.md`, `docs/builder-files-v1.md` | Owns model routing, bounded execution, budget and artifact-generation contracts |
| `eclipse-library` | `README.md`, `ROADMAP.md` | Owns catalog, editorial verification and source-snapshot roadmap; security/architecture docs are missing |
| `eclipse-hopson-sentinel` | `README.md`, `SECURITY.md`, `docs/sentinel-roadmap.md`, `docs/hybrid-architecture.md`, `docs/sentinel-integrations.md`, `docs/sentinel-windows-doctor.md`, `docs/adr/` | Owns local runtime, typed capability, install and local-security documentation |
| `Eclipse-webclaw` | `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `CLAUDE.md`, `examples/README.md`, `benchmarks/README.md` | Owns extraction, MCP and release documentation; central architecture records only its integration boundary |
| `eclipse-media` | `README.md`, `ROADMAP.md`, `frontend/public/studio/eclipse-release/README.md` | Owns media intake, job and artifact workflow; architecture/security entry points are missing |
| `retry-http` | `README.md` | Owns package API and release usage; add changelog/security policy only when maintenance requires them |

## Verticals and media clients

| Repository | Canonical entry points | Documentation decision |
| --- | --- | --- |
| `eclipse-dnd-forge` | `README.md`, `ROADMAP.md`, `CLAUDE.md`, `bff/README.md` | Owns campaign runtime and BFF behavior |
| `finflow` | `README.md` | Roadmap, security/privacy model and architecture are missing |
| `Educator-AI` | `README.md`, `ROADMAP.md`, `AGENTS.md`, `CLAUDE.md` | Owns learning workflow and reviewed deck handoff |
| `CryptoPulse` | `README.md`, `ARCHITECTURE.md`, `AGENTS.md`, `CLAUDE.md` | Architecture exists; current product roadmap is missing |
| `VALHALLA` | `README.md`, `docs/ROADMAP.md`, `docs/ARCHITECTURE_DEEP.md`, `docs/SECURITY.md` | Strong owned set; promotion claims still require current release evidence |
| `Smart Life Assistant` | `README.md`, `CLAUDE.md` | Roadmap, architecture and security/data model are missing |
| `InterviewForge` | `README.md` | Add privacy/threat model before any capture-related public release |
| `Smart-Fitness-Booking-Agent` | `README.md`, `AGENTS.md`, `CLAUDE.md` | Roadmap and explicit function-calling security contract are missing |
| `shotforge` | `README.md`, `AGENTS.md`, `CLAUDE.md` | Roadmap and Media integration contract are missing |
| `Text2Image` | `README.md`, `AGENTS.md`, `CLAUDE.md` | Roadmap, gateway boundary and Media integration contract are missing |

## Infrastructure, data and portfolio applications

| Repository | Canonical entry points | Documentation decision |
| --- | --- | --- |
| `ai-setup` | `README.md` | Add safe-write/rollback contract before broader distribution |
| `eclipse-vpn` | `README.md`, `docs/ROADMAP.md`, `docs/ARCHITECTURE.md` | Private infrastructure docs; never copy credentials or topology secrets here |
| `business-data-platform-mvp` | `README.md` | Architecture, security and current roadmap are missing |
| `task-manager` | `README.md` | Architecture, security and current roadmap are missing |
| `AdService` | `README.md` | Add roadmap only if promoted into an active productized service |
| `KmlApiApp` | `README.md` | Add security and validation notes before promotion |
| `Lead-Sniper-CAT-Analytics` | `README.md` | Add data provenance and mock-data disclosure before reuse |
| `wireguard-telegram-bot` | `README.md` | Add authorization, secret lifecycle and current roadmap before promotion |
| `Eclipse-PremiumRent` | `README.md` | Add product boundary/roadmap or label explicitly as a front-end case |
| `RentKldRedesign` | `README.md`, `DESIGN.md` | README is template-level and must be replaced before portfolio promotion |
| `AI-Face-Fusion-Pro` | `README.md` | Add consent, biometric/privacy and output-provenance policy |
| `ModelForge` | `README.md` | Add consent, provenance and real-vs-mock disclosure |
| `StreamForge-AI` | `README.md` | Remove unsupported market numbers or attach current primary evidence |
| `cinemate-movie-finder` | `README.md` | Sufficient for a maintained learning project; not a flagship source |
| `modern-2048` | `README.md` | Sufficient for a maintained learning project; not a flagship source |
| `dark_roast_coffee` | `README.md` | Treat as a design/marketing case, not platform proof |
| `zefir-gift-landing` | `README.md`, `DESIGN.md` | Owns small-business landing implementation and verified deploy instructions |
| `oh-my-claudecode` | Upstream README and license/provenance files | Upstream-derived internal tooling; provenance has priority over portfolio packaging |

## Documentation completeness gates

### Required before runtime-graph promotion

- owner and product boundary;
- README with current, testable capabilities;
- roadmap with next release gate;
- architecture and data ownership;
- security/privacy model proportional to the data and actions;
- release, rollback and support path;
- evidence for every public maturity or result claim.

### Required before archive

- archive rationale and replacement, if any;
- last supported version;
- migration/export guidance for user-owned data;
- public status update without deleting historical evidence.
