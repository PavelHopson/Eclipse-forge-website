# Eclipse Forge Landing

Премиальный статический лендинг студии Eclipse Forge на `React + Vite + Tailwind CSS + Framer Motion`.

Связан с кураторской [Eclipse Library](https://library.eclipse-forge.ru/): переход доступен
из desktop header, mobile menu и footer, а библиотека возвращает пользователя на главный лендинг.

Канонический стиль экосистемы описан в
[`docs/eclipse-forge-visual-system.md`](docs/eclipse-forge-visual-system.md). Versioned tokens
публикуются как `/design-system/eclipse-forge.tokens.json`; downstream-проекты используют
локальный snapshot и один из профилей `cinematic`, `product` или `operational`.
Текущий rollout по проектам ведётся в
[`docs/eclipse-forge-visual-adoption.md`](docs/eclipse-forge-visual-adoption.md).

## Ecosystem control plane

Репозиторий публикует versioned registry экосистемы в `public/ecosystem/manifest.json`.
Он описывает роли продуктов, владение данными и зрелость интеграций, не выдавая запланированные API за готовые.

- Eclipse Forge OS: [`docs/eclipse-forge-os/`](docs/eclipse-forge-os/README.md)
- Архитектура: [`docs/eclipse-forge-os/architecture.md`](docs/eclipse-forge-os/architecture.md)
- Security и releases: [`docs/eclipse-forge-os/security-and-release-runbook.md`](docs/eclipse-forge-os/security-and-release-runbook.md)
- Локальный health report: `docs/portfolio-status.generated.md` (генерируется командой ниже и не коммитится)

```bash
npm run audit:portfolio
npm run validate:ecosystem
npm test
npm run typecheck
npm run build
```

Portfolio audit читает только Git metadata и имена файлов. Он не читает значения секретов и не изменяет соседние репозитории.

## Deploy: Cloudflare Pages

Рекомендуемый хостинг: `Cloudflare Pages`.

Настройки проекта:

- Framework preset: `Vite`
- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: оставить пустым
- Environment variables: не нужны

Порядок деплоя:

1. Создать новый проект в Cloudflare Pages
2. Подключить GitHub-репозиторий `PavelHopson/Eclipse-forge-website`
3. Указать настройки выше
4. Запустить первый deploy
5. После публикации проверить `production URL` и `branch preview`

## Custom domain

Позже можно подключить собственный домен в настройках Cloudflare Pages:

1. Открыть проект в Cloudflare Pages
2. Перейти в `Custom domains`
3. Добавить домен или поддомен
4. Привязать DNS внутри Cloudflare

## Contact flow

Сайт подготовлен к работе без Netlify Forms.

Текущий сценарий связи:

- primary CTA: Telegram
- secondary CTA: email
- Telegram channel block: активен как брендовый trust-layer

Если позже понадобится вернуть форму, лучше подключить отдельный backend endpoint или form provider, который не зависит от Netlify.

## Local development

```bash
npm install
npm run dev
```

## Production build

Outfit и Inter self-hosted в `public/fonts/`; лицензии OFL лежат рядом. Production не зависит
от Google Fonts и не отправляет туда запросы браузера.

```bash
npm run build
```
