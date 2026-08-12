# Eclipse Forge visual adoption matrix

> Rollout-план для `eclipse-forge.visual-system.v1`. Он не утверждает, что все проекты уже
> синхронизированы: `adopted` ставится только после кода, browser QA и regression evidence.

| Проект | Профиль | Статус | Первый безопасный этап |
|---|---|---|---|
| Eclipse Forge Landing | cinematic | adopted | Канонические tokens, typography, orbit/reveal/parallax |
| Eclipse Library | product | pilot | Tokens, self-hosted fonts, eclipse hero, calm reveal и hover |
| Eclipse Chat | operational | planned | Tokens, focus/status motion, без постоянного parallax |
| Eclipse AI Hub | product | planned | Tokens, model states, один ambient anchor в discovery |
| Eclipse DnD Forge | product | planned | Tokens, world/campaign transitions, mobile-safe atmosphere |
| Hopson Sentinel | operational | planned | Telemetry, approvals, progress/error states |
| Eclipse Media | product | planned | Job progress, previews и media transitions |
| Shotforge | product | planned | Storyboard/shot transitions и gold selection states |
| Text2Image | product | planned | Generation queue, preview reveal и model status |
| Educator AI | product | planned | Learning progress и calm content transitions |
| Eclipse Webclaw | operational | planned | Fetch/extraction status без декоративного motion |
| Finflow | operational | planned | Risk/ledger states; минимум atmosphere вокруг данных |
| CryptoPulse | operational | planned | Market data остаётся главным; бренд в tokens и signals |

## Gate

Для перевода `planned → adopted` нужны: semantic-token mapping, responsive screenshots,
keyboard/focus pass, reduced-motion pass, performance delta и запись в roadmap проекта.
Нельзя массово импортировать код или animation dependencies из Landing.
