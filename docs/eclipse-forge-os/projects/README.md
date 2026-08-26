# Eclipse Forge project documentation registry

This directory is the single portfolio-level index for Eclipse Forge projects. It lets
a person answer four questions without searching the whole workspace:

1. Which projects belong to the portfolio?
2. What role and maturity does each project have?
3. Where is its canonical documentation?
4. What is the next decision or delivery gate?

## Documents

| Document | Purpose |
| --- | --- |
| [Portfolio registry](portfolio-registry.md) | Complete first-party portfolio, role, evidence level and next gate |
| [Documentation registry](documentation-registry.md) | Canonical README, roadmap, architecture, security and operating-document locations |
| [Workspace baseline](workspace-baseline.md) | Read-only Git branch, head and dirty-state snapshot from 2026-08-07 |
| [Consolidated backlog](consolidated-backlog.md) | Portfolio-wide P0-P3 sequence, dependencies, risks and next actions |
| [Governance source map](governance-source-map.md) | Global policies and cross-project sources of truth |
| [Eclipse Design Gate](../design/README.md) | Shared visual quality, anti-slop review and first-wave profiles |

## Source-of-truth rule

Cross-project strategy, portfolio status, shared contracts, Growth OS and program risk
belong under `docs/eclipse-forge-os/`. Runtime-specific implementation documents remain
in the repository that owns the runtime.

This registry links those owned documents; it does not copy them. Copying a Chat
deployment guide or an AI Hub API contract into this directory would create two sources
of truth and make one stale after the next release.

Every registry claim has one of three evidence levels:

- `manifest`: backed by the versioned public ecosystem manifest;
- `repository`: backed by the named repository documentation or current Git snapshot;
- `not_assessed`: present in the workspace, but not recently validated for promotion.

## Inclusion boundary

Included:

- first-party Eclipse Forge products, libraries, portfolio applications and service
  prototypes in `E:\projects`;
- one explicitly labeled upstream-derived orchestration fork used as internal tooling.

Excluded:

- Star CRM and its historical directory;
- secret-bearing directories;
- downloaded `external/` references;
- temporary Eclipse Chat worktrees;
- asset-only and empty duplicate directories.

An entry in this registry is not a claim that a product is live, supported or ready to
sell. Only its explicit maturity and evidence fields may be used externally.
