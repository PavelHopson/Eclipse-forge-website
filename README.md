# Eclipse Forge Landing

Премиальный статический лендинг студии Eclipse Forge на `React + Vite + Tailwind CSS + Framer Motion`.

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

```bash
npm run build
```
