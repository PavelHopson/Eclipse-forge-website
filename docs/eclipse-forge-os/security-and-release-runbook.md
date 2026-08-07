# Ecosystem security and release runbook

## P0: plaintext secrets

Known secret-bearing paths exist outside versioned repositories under `E:\projects`. Do not print or copy their values into issues, logs or AI chats.

1. Inventory each credential by provider and owner without exposing its value.
2. Move credentials to a password manager or encrypted vault.
3. Replace repository values with documented environment-variable names and `.env.example` placeholders.
4. Rotate every credential that has been synchronized, backed up, pasted into chat or committed at any point.
5. Verify Git history with a secret scanner; deleting a file from `HEAD` is not sufficient.
6. Configure provider-side scope, expiry, IP restrictions and spending limits where available.

## Dirty repository triage

Never bulk-commit all repositories.

For each dirty repository:

1. identify the author and purpose of every changed file;
2. separate generated logs, build output and local configuration;
3. run the repository's checks;
4. split product code, tests and documentation into atomic commits;
5. push only to an existing approved branch;
6. archive abandoned experiments only after preserving useful decisions.

Highest-value unresolved repositories: `AdService`, `KmlApiApp`, `ai-setup`, `wireguard-telegram-bot` and the untracked OMC audit runbook.

## Minimum release gate

Every active repository should have:

- reproducible dependency installation;
- typecheck or compiler check;
- unit tests for domain logic;
- one critical-path integration or E2E test;
- production build;
- dependency and secret scanning;
- explicit license decision;
- release notes and rollback instructions;
- health endpoint or runtime smoke test for services;
- signed artifacts for desktop distributions.

Critical and High security findings block release. Medium findings require an owner and deadline. Accepted risks are written down rather than silently ignored.

## Portfolio lifecycle

- **Core:** actively shipped and integrated.
- **Vertical:** domain product built on shared contracts.
- **Shared library:** versioned dependency with compatibility policy.
- **Incubator:** time-boxed experiment with an exit criterion.
- **Archived:** read-only case study with an honest status.

No project remains an incubator indefinitely. After 60 days without a product milestone, decide whether to promote, merge or archive it.
