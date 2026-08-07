# Eclipse Forge ecosystem architecture

## Product model

Eclipse Forge should be connected as a **federation of autonomous products**, not as one application and not through one shared database.

| Layer | Product | Responsibility |
|---|---|---|
| Discovery | Eclipse Forge Landing | Public product registry, status and entry points |
| Collaboration | Eclipse Chat | Identity, workspaces, communication, tasks, decisions and approvals |
| Intelligence | Eclipse AI Hub | Provider routing, model evaluation, embeddings and RAG queries |
| Knowledge | Eclipse Library | Verified catalog, sources and project recommendations |
| Execution | Hopson Sentinel | Local tools, approvals, runtime diagnostics and artifact production |
| Ingestion | Eclipse Webclaw | Controlled web fetching and structured extraction |
| Vertical runtimes | DnD Forge, Finflow, Educator AI | Domain workflows and domain-owned data |
| Media runtime | Eclipse Media | Shared media jobs for Shotforge and Text2Image |

The public machine-readable registry is `/ecosystem/manifest.json`. It describes ownership and intent. An integration marked `planned` is not a claim that an endpoint already exists.

## Hard boundaries

1. Every product owns its database. Cross-project SQL access is prohibited.
2. Projects exchange versioned API requests or events, never database rows.
3. Eclipse Chat owns people, workspaces and operational collaboration.
4. AI Hub owns provider credentials, routing policy and model evaluation. Browser clients never receive provider secrets.
5. Library owns source verification. AI-generated claims do not silently become verified catalog entries.
6. Sentinel executes locally only after a scoped approval. Chat cannot send arbitrary shell commands.
7. Financial, voice, media and campaign data stay in their domain product unless a user explicitly shares an artifact.

## Shared contracts

All asynchronous events use this envelope:

```json
{
  "eventId": "uuid",
  "type": "execution.completed",
  "version": 1,
  "occurredAt": "2026-07-30T12:00:00Z",
  "producer": "hopson-sentinel",
  "workspaceId": "optional-workspace-id",
  "actor": { "type": "user", "id": "subject-id" },
  "subject": { "type": "execution", "id": "execution-id" },
  "traceId": "cross-service-trace-id",
  "payload": {}
}
```

Rules:

- contracts are versioned and additive within a major version;
- consumers are idempotent by `eventId`;
- retries use bounded exponential backoff;
- events contain references and summaries, not raw secrets or large files;
- every request carries a trace ID and an explicit tenant/workspace context;
- webhooks are signed and protected against replay;
- service accounts receive the minimum required scopes.

## User experience

The ecosystem should feel connected without forcing users to understand service boundaries:

- one app switcher with clear product names and current status;
- deep links return users to the exact workspace, task, campaign or artifact;
- Chat can display domain cards, but editing opens the owning product;
- a shared notification inbox aggregates references while notification settings remain explicit;
- users see what data will be shared before invoking AI or local execution;
- unavailable integrations show a safe next action instead of a generic error.

## Delivery phases

### Phase 0 — portfolio control plane

- publish and validate the ecosystem manifest;
- generate repository health reports;
- classify projects as core, vertical, shared library, incubator or archived;
- remove secrets from the workspace and resolve dirty repositories.

### Phase 1 — Chat ↔ AI Hub (`P0`)

- extract an OpenAI-compatible server-side gateway in AI Hub;
- migrate Chat provider routing behind that gateway;
- add request budgets, source attribution, latency/cost telemetry and fallback tests;
- keep a temporary direct-provider fallback until the gateway has production SLOs.

### Phase 2 — Webclaw → Library → AI Hub (`P1`)

- Webclaw submits untrusted candidates, never verified records;
- Library runs duplicate, license, safety and source checks;
- approved records become a versioned read API;
- AI Hub indexes only approved snapshots and exposes citation-backed retrieval.

### Phase 3 — Chat ↔ Sentinel (`P1`)

- pair a local Sentinel node using a one-time code;
- expose typed capabilities instead of arbitrary command strings;
- require approval for filesystem, process, browser and network actions;
- stream execution status and return artifact references to Chat.

### Phase 4 — vertical modules (`P2`)

- DnD Forge exposes campaign/party cards in Chat;
- Finflow exposes approval-safe budget summaries, never raw account credentials;
- Educator AI exposes learning plans and cited research;
- Eclipse Media becomes the shared job runtime for Shotforge and Text2Image.

## What should remain separate

- DnD campaign storage and Finflow financial storage;
- Library editorial verification and Webclaw collection;
- AI Hub provider credentials and Chat user sessions;
- Sentinel local permissions and cloud workspace roles;
- public Landing metadata and private operational telemetry.

This separation keeps failures contained, makes permissions understandable and allows every product to ship independently.
