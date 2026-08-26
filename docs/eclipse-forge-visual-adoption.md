# Eclipse Forge visual adoption matrix

> Rollout-план для `eclipse-forge.visual-system.v1` и `eclipse-forge.design-gate.v1`.
> `adopted` ставится только после кода, browser QA, regression evidence и полного
> 25-сигнального anti-slop review. Предыдущий visual-only статус не переносится автоматически.

| Проект | Профиль | Статус | Первый безопасный этап |
|---|---|---|---|
| Eclipse Forge Landing | cinematic | pilot | Закрыть live-screenshot, repeated reveal и generic blur findings нового Design Gate |
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
keyboard/focus pass, reduced-motion pass, performance delta, live product evidence,
truthfulness/provenance review, все 25 anti-slop решений и запись в roadmap проекта.
Нельзя массово импортировать код или animation dependencies из Landing.

Канонический gate и первая волна:

- [`Eclipse Design Gate`](eclipse-forge-os/design/README.md);
- [`AI Hub + Chat + Library profiles`](eclipse-forge-os/design/first-wave.md);
- [`Landing evidence`](eclipse-forge-os/design/evidence/eclipse-forge-landing.json).

## Design Gate rollout — 2026-08-26

Landing публикует machine-readable gate, CI validator и первый честный evidence manifest.
Старые несourced hero metrics заменены значениями из public runtime registry; heading
gradients и hover elevation на ключевых неинтерактивных surfaces удалены. Landing остаётся
`pilot`, пока current product screenshots, generic blur cleanup и selective reveal pass не
получат browser evidence.

## Pilot evidence — 2026-08-12

Chat, AI Hub, DnD Forge, Sentinel, Media, Shotforge and Text2Image now contain local versioned token snapshots and profile-specific code. TypeScript/build checks pass except Sentinel's inherited full-tree TypeScript baseline; its focused contract test and production build pass. Responsive browser screenshots, keyboard walkthrough and measured performance delta remain required before any status becomes `adopted`.
