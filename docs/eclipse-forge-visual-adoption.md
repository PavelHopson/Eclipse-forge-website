# Eclipse Forge visual adoption matrix

> Rollout-план для `eclipse-forge.visual-system.v1`. Он не утверждает, что все проекты уже
> синхронизированы: `adopted` ставится только после кода, browser QA и regression evidence.

| Проект | Профиль | Статус | Первый безопасный этап |
|---|---|---|---|
| Eclipse Forge Landing | cinematic | adopted | Канонические tokens, typography, orbit/reveal/parallax |
| Eclipse Library | product | pilot | Tokens, self-hosted fonts, eclipse hero, calm reveal и hover |
| Eclipse Chat | operational | pilot | Tokens, focus/status motion, без постоянного parallax |
| Eclipse AI Hub | product | pilot | Tokens, model states, один ambient anchor в discovery |
| Eclipse DnD Forge | product | pilot | Tokens, world/campaign transitions, mobile-safe atmosphere |
| Hopson Sentinel | operational | pilot | Telemetry, approvals, progress/error states |
| Eclipse Media | product | pilot | Job progress, previews и media transitions |
| Shotforge | product | pilot | Storyboard/shot transitions и gold selection states |
| Text2Image | product | pilot | Generation queue, preview reveal и model status |
| Educator AI | product | planned | Learning progress и calm content transitions |
| Eclipse Webclaw | operational | planned | Fetch/extraction status без декоративного motion |
| Finflow | operational | planned | Risk/ledger states; минимум atmosphere вокруг данных |
| CryptoPulse | operational | planned | Market data остаётся главным; бренд в tokens и signals |

## Gate

Для перевода `planned → adopted` нужны: semantic-token mapping, responsive screenshots,
keyboard/focus pass, reduced-motion pass, performance delta и запись в roadmap проекта.
Нельзя массово импортировать код или animation dependencies из Landing.

## Pilot evidence — 2026-08-12

Chat, AI Hub, DnD Forge, Sentinel, Media, Shotforge and Text2Image now contain local versioned token snapshots and profile-specific code. TypeScript/build checks pass except Sentinel's inherited full-tree TypeScript baseline; its focused contract test and production build pass. Responsive browser screenshots, keyboard walkthrough and measured performance delta remain required before any status becomes `adopted`.
