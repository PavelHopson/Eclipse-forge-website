# Eclipse Forge — Кворки / Услуги под marketplace-профиль

17 service-offerings, каждый основан на реальном проекте из портфолио.
Подходит под:
- **kwork.ru** (используй колонку «На kwork.ru — MVP», 3 tier'а в самом интерфейсе)
- **profi.ru / yclients / avito.услуги** (используй «Полный проект»)
- **Прямые контракты** через сайт / Telegram (используй «Полный проект»)

> Цены в формате «На kwork — MVP» — это уменьшенная версия под лимиты
> kwork.ru (там реалистичен потолок ~50k₽). Цены «Полный проект»
> совпадают с прайс-листом на сайте.

Под каждый кворк — реальный пример из портфолио, ссылка на демо или GitHub.

---

# 🟢 Tier A — флагманские кворки

## 01. Personal Discipline OS / Habit Tracker

**Заголовок (для kwork title, ≤60 символов):**
`Создам приложение-трекер привычек с AI-коучингом и геймификацией`

**Описание:**

Создам мульти-платформенное приложение для дисциплины, фокуса и
выполнения личных целей — как Eclipse Valhalla. Вместо обычного
to-do листа клиент получает поведенческий движок с AI, квестами,
streak'ами, восстановлением и синхронизацией между устройствами.

**Что вы получите:**
- Web + Windows desktop приложение (Electron)
- Опционально: мобильная версия (Capacitor)
- AI-ассистент для планирования и анализа (multi-provider)
- Система квестов / задач с приоритетами и подзадачами
- Streak-механика, XP, achievement'ы
- Календарь и трекинг времени
- Местные сохранения + опциональный sync через Supabase
- Инсталлер под Windows (.exe) и portable версия

**Технологии:** React 19 · TypeScript · Vite · Tailwind · Electron ·
Capacitor · Zustand · Vitest · Playwright

**Срок:** 6–12 недель (зависит от объёма)

**Цены:**
- На kwork.ru (MVP — web only, без AI): **от 35 000 ₽**
- Полный проект (web + desktop + AI): **от 350 000 ₽**

**Реальный пример:** Eclipse Valhalla
- Web: https://pavelhopson.github.io/Eclipse-Valhalla/
- GitHub: https://github.com/PavelHopson/Eclipse-Valhalla
- 128 тестов, 5 AI-провайдеров, multi-platform delivery

---

## 02. Локальный AI-оператор с голосом и terminal-интеграцией

**Заголовок:**
`Создам локального AI-оператора (voice + terminal + automation)`

**Описание:**

Создам персонального AI-оператора, который живёт локально на машине
пользователя — как Eclipse Hopson Sentinel. Это не chatbot в браузере,
а исполнительный слой: voice runtime, terminal tooling, integration
с локальными API, автоматизация задач без отправки данных в облако.

**Что вы получите:**
- Local-first AI-агент с CLI и API
- Voice layer (TTS + STT)
- Terminal-tooling: команды через AI
- Bridge API для внешних клиентов
- OpenAI-compatible: подключение GPT-4, Claude, Gemini, Ollama, NVIDIA NIM
- Backup discipline + config health checks
- Windows installer + portable

**Технологии:** TypeScript · Bun · Rust · Python · WebSocket · Voice
(TTS/STT) · OpenAI-compatible API

**Срок:** 8–16 недель

**Цены:**
- На kwork.ru (MVP — CLI без voice): **от 50 000 ₽**
- Полный проект (с voice + Windows installer): **от 350 000 ₽**

**Реальный пример:** Eclipse Hopson Sentinel
- GitHub: https://github.com/PavelHopson/eclipse-hopson-sentinel
- 207K строк, 244 теста, 3 runtime'а: TypeScript, Rust, Python

---

## 03. Premium booking-сайт для luxury услуг

**Заголовок:**
`Создам premium booking-сайт для luxury услуг (аренда, отель, спа)`

**Описание:**

Создам premium booking-сайт с продуктовой логикой — как Eclipse
Premium Rent. Не «обычный лендинг», а конверсионный контур: визуальная
авторитетность, логика выбора, направляемый сценарий брони,
интеграция с CRM.

**Что вы получите:**
- Премиум-визуальный язык (тёмная тема, полноэкранные hero,
  плавные анимации)
- Каталог + фильтры + детальные карточки
- Booking flow с валидацией и подтверждением
- Адаптив под mobile + tablet + desktop
- Форма заявки с интеграцией в CRM / Telegram
- SEO-оптимизация + Core Web Vitals зелёные
- Cloudflare Pages деплой (быстро + дёшево)

**Технологии:** React 19 · TypeScript · Vite · Tailwind · Framer
Motion · Zustand · Cloudflare Pages

**Срок:** 4–8 недель

**Цены:**
- На kwork.ru (MVP — single page): **от 30 000 ₽**
- Полный проект (multi-step booking + admin): **от 250 000 ₽**

**Реальный пример:** Eclipse Premium Rent
- Live: https://eclipse-premiumrent.pages.dev
- GitHub: https://github.com/PavelHopson/Eclipse-PremiumRent

---

## 04. Высокопроизводительный web-scraper на Rust для AI-агентов

**Заголовок:**
`Сделаю Rust-scraper для AI-агентов (TLS fingerprint, low tokens)`

**Описание:**

Сделаю production-grade web-scraper на Rust — как Eclipse Claw.
Решает две главные проблемы AI-агентов: 403/блокировки на враждебных
сайтах И избыточные токены на сыром HTML. Output оптимизирован под LLM
(на 67% меньше токенов чем в стандартных scraping стеках).

**Что вы получите:**
- CLI и MCP-сервер
- TLS-fingerprinting уровня Chrome (не headless, не Selenium)
- Очистка noise: nav, scripts, ads, footers
- Структурированный markdown output с метаданными
- Docker compose + REST API
- Опционально: интеграция с локальной Ollama для post-processing
- Тесты (450+ тестовых маркеров в эталонном проекте)

**Технологии:** Rust · Axum · Tokio · MCP · Docker · TLS Fingerprinting

**Срок:** 3–8 недель

**Цены:**
- На kwork.ru (минимальный — CLI без MCP): **от 40 000 ₽**
- Полный проект (CLI + MCP + Docker): **от 150 000 ₽**

**Реальный пример:** Eclipse Claw
- GitHub: https://github.com/PavelHopson/Eclipse-Claw
- 22K строк Rust, MCP-сервер, npm-скрипт `npx create-eclipse-claw`

---

## 05. ETL-платформа с monitoring и dashboard'ами

**Заголовок:**
`Построю ETL-платформу с FastAPI, Grafana и observability stack`

**Описание:**

Построю production-уровень ETL-платформу — как Business Data Platform.
Парсинг внешних данных (FNS, открытые реестры, marketplace'ы),
periodic jobs, observability stack, dashboard для аналитиков.

**Что вы получите:**
- ETL-engine с cron-планировщиком
- Парсеры для нужных источников
- PostgreSQL для хранения + Redis для кэша / очередей
- Prometheus + Grafana + Loki для monitoring
- Dashboard для анализа (Next.js)
- Docker compose, всё локально или на VPS
- Health-checks + alerting (Telegram / Email)
- Нагрузочное тестирование + отчёт производительности

**Технологии:** FastAPI · PostgreSQL · Redis · Prometheus · Grafana ·
Loki · Next.js · Docker Compose

**Срок:** 6–12 недель

**Цены:**
- На kwork.ru (MVP — ETL без dashboard): **от 50 000 ₽**
- Полный проект (с monitoring): **от 250 000 ₽**

**Реальный пример:** Business Data Platform
- GitHub: https://github.com/PavelHopson/business-data-platform-mvp
- ETL + 7-сервисная архитектура на Docker Compose

---

## 06. Personal Action OS / Desktop-app для финансов и здоровья

**Заголовок:**
`Создам Windows desktop-app для финансов, здоровья и задач`

**Описание:**

Создам desktop-приложение для управления личными процессами — как
Smart Life Assistant. Финансы, подписки, здоровье, ежедневные задачи —
всё превращается в action items с напоминаниями и направляемыми
решениями.

**Что вы получите:**
- Windows-приложение (Electron)
- Подключение к банковским API (TrueLayer, OpenBanking)
- Платежи через Stripe / ЮKassa
- Database + sync (Prisma + SQLite или PostgreSQL)
- Tray icon с notification flow
- Action generation (AI выдаёт «следующее действие» сам)
- Auto-update через GitHub Releases

**Технологии:** Next.js · Electron · TypeScript · Prisma · TrueLayer ·
Stripe · GitHub Releases

**Срок:** 8–14 недель

**Цены:**
- На kwork.ru (MVP — без banking): **от 50 000 ₽**
- Полный проект (banking + Stripe): **от 350 000 ₽**

**Реальный пример:** Smart Life Assistant
- GitHub: https://github.com/PavelHopson/SmartLifeAssistant
- Desktop app, banking API, платежи и AI action-generation

---

# 🟡 Tier B — AI-продукты и инструменты

## 07. AI-workspace с несколькими инструментами и провайдерами

**Заголовок:**
`Создам AI-workspace (chat + arena + RAG + review + generation)`

**Описание:**

Создам AI-platform с несколькими модулями в одном интерфейсе — как
Eclipse AI Hub. Клиент один раз подключает свою модель (локальную
или облачную), и все 6+ модулей работают через неё.

**Что вы получите:**
- 6 модулей: chat, arena (compare), RAG (PDF Q&A),
  code review, copywriter, security scanner
- Поддержка Ollama (локально), Gemini, OpenAI, Claude, OpenRouter,
  NVIDIA NIM
- Локальное хранение истории
- Адаптив + dark mode
- Cloudflare Pages деплой

**Технологии:** React 19 · TypeScript · Vite · Tailwind · Ollama ·
Gemini · OpenAI · NVIDIA NIM

**Срок:** 5–10 недель

**Цены:**
- На kwork.ru (MVP — 2 модуля): **от 30 000 ₽**
- Полный проект (6 модулей): **от 200 000 ₽**

**Реальный пример:** Eclipse AI Hub
- Live: https://eclipse-ai-hub.pages.dev
- GitHub: https://github.com/PavelHopson/eclipse-ai-hub

---

## 08. AI-агент с Function Calling для бронирования / заказов

**Заголовок:**
`Создам AI-агента (бронирование, заказы) через Function Calling`

**Описание:**

Создам AI-агента, который реально исполняет действия через Function
Calling — как Smart Fitness Booking Agent. Не chatbot, а агент с
доступом к API, retry-safe запросами, валидацией и транзакционными
операциями.

**Что вы получите:**
- Natural language understanding (даты, нечёткие выражения)
- Function calling в Gemini / OpenAI / Claude
- Tool definitions (getSchedule, bookSlot, checkAvailability и т.д.)
- Retry с exponential backoff + jitter
- Rate limit handling (429)
- Mock-database или интеграция с вашей CRM/API

**Технологии:** React 19 · TypeScript · Vite · Gemini AI · Function
Calling · Zustand · Vitest

**Срок:** 3–6 недель

**Цены:**
- На kwork.ru (MVP — 1 tool): **от 25 000 ₽**
- Полный проект (3-5 tools + integration): **от 120 000 ₽**

**Реальный пример:** Smart Fitness Booking Agent
- Live: https://fitness-booking-agent.pages.dev
- GitHub: https://github.com/PavelHopson/Smart-Fitness-Booking-Agent

---

## 09. Tauri Desktop Copilot с realtime-AI и hotkeys

**Заголовок:**
`Создам desktop-копайлот на Tauri 2 с realtime-AI и hotkeys`

**Описание:**

Создам нативное desktop-приложение на Tauri 2 — как InterviewForge.
В отличие от Electron: минимальный размер бинарника (~100MB), низкое
потребление памяти, нативные API. Подходит для приложений с realtime-
AI, screen capture, hotkey'ями и stealth-режимом.

**Что вы получите:**
- Кросс-платформенный desktop (Windows / macOS / Linux)
- Realtime-AI через Gemini Live API (< 200ms latency)
- Screen capture + OCR
- Глобальные hotkeys
- Stealth mode (полупрозрачный / hidden)
- E2E защита: всё в RAM, никаких логов

**Технологии:** React 18 · Tauri 2 · Rust · Gemini Live · Web Audio
API · TypeScript

**Срок:** 6–10 недель

**Цены:**
- На kwork.ru (MVP — без screen capture): **от 40 000 ₽**
- Полный проект (с realtime + hotkeys): **от 250 000 ₽**

**Реальный пример:** InterviewForge
- Live: https://interviewforge-3pf.pages.dev
- 100MB binary, < 200ms latency, stealth mode

---

## 10. AI-фотостудия с генерацией и стилизацией

**Заголовок:**
`Создам AI-фотостудию (AI photographer, face fusion, style transfer)`

**Описание:**

Создам AI-фотостудию с тремя режимами — как Shotforge. AI Photographer
(стиль + параметры → пакет фото), Face Fusion (свое фото + одежда =
композит), Style Transfer (референс → перенос стиля).

**Что вы получите:**
- 3 режима генерации в одном UI
- 21+ стилевой пресет
- Multi-provider routing (Gemini, Flux.1 Pro, DALL-E)
- Локальная история генераций
- Cloudflare Pages деплой
- Bring-your-own API key flow

**Технологии:** React 19 · TypeScript · Gemini · Flux.1 Pro · Tailwind ·
Cloudflare Pages

**Срок:** 4–8 недель

**Цены:**
- На kwork.ru (MVP — 1 режим): **от 25 000 ₽**
- Полный проект (3 режима): **от 150 000 ₽**

**Реальный пример:** Shotforge
- Live: https://shotforge.pages.dev
- GitHub: https://github.com/PavelHopson/shotforge

---

## 11. AI-инструмент: PDF/текст → интерактивный квест/тест

**Заголовок:**
`Создам AI-инструмент: PDF в квиз или escape-room за 60 секунд`

**Описание:**

Создам AI-платформу для геймификации обучения — как Questify
(Educator AI). Загружается любой текст или PDF — Gemini AI мгновенно
превращает его в интерактивный квиз или escape room с сюжетом,
персонажами и ветвлением.

**Что вы получите:**
- 2 режима: Quiz + Escape Room
- PDF / TXT upload + парсинг
- Gemini AI structured output
- Animated UI с переходами
- EN/RU локализация
- Сохранение прогресса (localStorage)

**Технологии:** React 19 · TypeScript · Vite · Gemini AI ·
Framer Motion · Tailwind

**Срок:** 3–6 недель

**Цены:**
- На kwork.ru (MVP — quiz only): **от 25 000 ₽**
- Полный проект (quiz + escape room): **от 120 000 ₽**

**Реальный пример:** Questify (Educator AI)
- Live: https://educator-ai.pages.dev
- GitHub: https://github.com/PavelHopson/Educator-AI

---

## 12. Multi-provider студия генерации изображений

**Заголовок:**
`Создам студию AI-генерации изображений (multi-provider, 10 стилей)`

**Описание:**

Создам платформу генерации изображений с улучшением промптов и
multi-provider routing — как Text2Image Studio. Один UI, любой
провайдер, история, шаблоны.

**Что вы получите:**
- 10+ стилей (photo, anime, cyberpunk, watercolor и т.д.)
- 5 соотношений сторон
- Prompt enhancement (AI улучшает промпт перед генерацией)
- Каталог шаблонов
- Локальная история
- Поддержка: Gemini, OpenAI, OpenRouter, Ollama

**Технологии:** React 19 · TypeScript · Vite · Gemini · DALL-E ·
OpenRouter · Ollama

**Срок:** 3–5 недель

**Цены:**
- На kwork.ru (MVP — 1 провайдер): **от 20 000 ₽**
- Полный проект (4 провайдера): **от 100 000 ₽**

**Реальный пример:** Text2Image Studio
- Live: https://text2image-studio.pages.dev
- GitHub: https://github.com/PavelHopson/Text2Image

---

## 13. Торговый терминал с AI-аналитикой

**Заголовок:**
`Создам торговый терминал (crypto / forex / futures) с AI-аналитикой`

**Описание:**

Создам terminal для мониторинга рынков и симуляции трейдинга — как
CryptoPulse 2077. Реальные данные (CoinGecko и др), AI-аналитика
по любому активу, симулятор трейдинга с виртуальным балансом, парсер
новостей с тегированием источников.

**Что вы получите:**
- Котировки (crypto / forex / futures) в реальном времени
- AI-аналитик с источниковым тегированием
- Симулятор трейдинга (paper trading)
- 3 темы: Cyberpunk / Midnight / Light
- Recharts графики с indicators
- Cloudflare Workers для парсинга новостей

**Технологии:** React 19 · TypeScript · Vite · Tailwind · Recharts ·
Cloudflare Workers · NVIDIA NIM

**Срок:** 6–12 недель

**Цены:**
- На kwork.ru (MVP — без AI): **от 35 000 ₽**
- Полный проект (с AI + симулятор): **от 200 000 ₽**

**Реальный пример:** CryptoPulse 2077
- Live: https://cryptopulse-1d0.pages.dev
- 76 тестов, 6 AI-провайдеров, ARCHITECTURE.md

---

## 14. Fullstack менеджер задач / внутренняя платформа

**Заголовок:**
`Сделаю fullstack менеджер задач (JWT auth, роли, PostgreSQL)`

**Описание:**

Сделаю production-ready внутреннюю платформу — как Task Manager.
JWT-авторизация, роли, пагинация, защита от XSS, всё под Docker.

**Что вы получите:**
- Backend: Express 5 + Prisma + PostgreSQL
- Frontend: React 18 + Redux Toolkit
- JWT auth + admin роль
- Пагинация + сортировка
- XSS защита
- Synchronization logout между табами
- Docker Compose
- API docs

**Технологии:** React 18 · Express 5 · Prisma · PostgreSQL · Docker ·
JWT · Redux Toolkit

**Срок:** 3–6 недель

**Цены:**
- На kwork.ru (MVP — basic CRUD): **от 25 000 ₽**
- Полный проект (с auth + ролями + Docker): **от 100 000 ₽**

**Реальный пример:** Task Manager
- Live: https://task-manager-eclipse.pages.dev
- GitHub: https://github.com/PavelHopson/task-manager

---

## 15. Self-hosted скачиватель медиа (1000+ источников)

**Заголовок:**
`Создам self-hosted сервис скачивания медиа (yt-dlp + web UI)`

**Описание:**

Создам self-hosted веб-сервис для скачивания видео и аудио с YouTube,
TikTok, Instagram, Twitter и 1000+ других источников — как Eclipse
Media. Без рекламы, локально, контролируемо.

**Что вы получите:**
- Web UI (React 19) с paste-and-go flow
- Backend FastAPI + yt-dlp
- Real-time progress через SSE
- Массовая загрузка нескольких URL'ов
- MP4 (любое качество) и MP3
- Auto-cleanup через 1 час (TTL)
- Docker compose — деплой за 5 минут

**Технологии:** React 19 · FastAPI · yt-dlp · Docker · SSE ·
TypeScript

**Срок:** 2–4 недели

**Цены:**
- На kwork.ru (MVP — single URL): **от 15 000 ₽**
- Полный проект (с массовой + Docker): **от 80 000 ₽**

**Реальный пример:** Eclipse Media
- Live: https://eclipse-media.pages.dev
- GitHub: https://github.com/PavelHopson/eclipse-media

---

# 🆕 Tier C — engineering-tools (узкие задачи)

## 16. Reliability модуль (retry / backoff) для вашего проекта

**Заголовок:**
`Сделаю reliability-модуль (retry + exponential backoff) для проекта`

**Описание:**

Сделаю production-grade retry-модуль для HTTP/любых async-операций —
как @pavelhopson/retry-http. Zero dependencies, TypeScript-first,
полная покрытие тестами. Можно использовать standalone или
интегрировать в ваш существующий код.

**Что вы получите:**
- Configurable max attempts, initial delay, max delay, factor
- Jitter (±50%) против thundering herd
- shouldRetry predicate (custom условия)
- onRetry callback (для метрик)
- AbortSignal cancellation
- 26+ тестов (Vitest)
- npm-публикация (опционально)
- Документация README + JSDoc

**Технологии:** TypeScript · ESM · Vitest · npm

**Срок:** 1–2 недели

**Цены:**
- На kwork.ru (basic): **от 10 000 ₽**
- Полный проект (с npm publish + docs): **от 50 000 ₽**

**Реальный пример:** @pavelhopson/retry-http
- npm: https://www.npmjs.com/package/@pavelhopson/retry-http
- GitHub: https://github.com/PavelHopson/retry-http

---

## 17. Telegram-бот для автоматической раздачи VPN/конфигов

**Заголовок:**
`Создам Telegram-бот для автоматической раздачи VPN-конфигов`

**Описание:**

Создам Telegram-бот для self-hosted VPN — как WireGuard Telegram Bot.
Автоматическая генерация конфигов, отправка QR-кодов прямо в чат,
поддержка iOS / Android / Windows / Linux / macOS, systemd-сервис
для автозапуска.

**Что вы получите:**
- Telegram-бот на Python + aiogram
- WireGuard сервер настройка (Ubuntu 22.04+)
- Команды `/start`, `/getvpn`
- Авто-генерация ключей + конфигов через bash-скрипт
- QR-код через qrencode для мобильных устройств
- Systemd-сервис для автозапуска бота
- Документация по deploy

**Технологии:** Python · aiogram 2.x · WireGuard · Bash · systemd

**Срок:** 2–3 недели

**Цены:**
- На kwork.ru (MVP — без QR): **от 12 000 ₽**
- Полный проект (с QR + systemd): **от 60 000 ₽**

**Реальный пример:** WireGuard Telegram Bot
- GitHub: https://github.com/PavelHopson/wireguard-telegram-bot
- 2+ stars, реальный production-deployment

---

# 📋 Сводная таблица для marketplace-профиля

| # | Кворк | Срок | На kwork (MVP) | Полный проект |
|---|---|---|---|---|
| 01 | Personal Discipline OS | 6–12 нед | 35 000 ₽ | 350 000 ₽ |
| 02 | Локальный AI-оператор | 8–16 нед | 50 000 ₽ | 350 000 ₽ |
| 03 | Premium booking-сайт | 4–8 нед | 30 000 ₽ | 250 000 ₽ |
| 04 | Rust web-scraper | 3–8 нед | 40 000 ₽ | 150 000 ₽ |
| 05 | ETL-платформа + observability | 6–12 нед | 50 000 ₽ | 250 000 ₽ |
| 06 | Personal Action OS | 8–14 нед | 50 000 ₽ | 350 000 ₽ |
| 07 | AI-workspace (multi-tool) | 5–10 нед | 30 000 ₽ | 200 000 ₽ |
| 08 | AI Function Calling agent | 3–6 нед | 25 000 ₽ | 120 000 ₽ |
| 09 | Tauri desktop copilot | 6–10 нед | 40 000 ₽ | 250 000 ₽ |
| 10 | AI-фотостудия | 4–8 нед | 25 000 ₽ | 150 000 ₽ |
| 11 | PDF → квест/тест | 3–6 нед | 25 000 ₽ | 120 000 ₽ |
| 12 | Multi-provider image gen | 3–5 нед | 20 000 ₽ | 100 000 ₽ |
| 13 | Торговый терминал с AI | 6–12 нед | 35 000 ₽ | 200 000 ₽ |
| 14 | Fullstack менеджер задач | 3–6 нед | 25 000 ₽ | 100 000 ₽ |
| 15 | Self-hosted media-downloader | 2–4 нед | 15 000 ₽ | 80 000 ₽ |
| 16 | Reliability модуль | 1–2 нед | 10 000 ₽ | 50 000 ₽ |
| 17 | Telegram VPN-бот | 2–3 нед | 12 000 ₽ | 60 000 ₽ |

---

# 🎯 Какие кворки выкладывать первыми

Если на marketplace лимит на N кворков — приоритизируй так:

**Уровень 1 — выложить сразу (highest-volume / clearest demand):**
- 03 Premium booking-сайт
- 14 Fullstack менеджер задач
- 17 Telegram VPN-бот
- 16 Reliability модуль

Эти 4 — короткие сроки, чёткая ценность, низкий порог входа клиента.

**Уровень 2 — middle premium (после получения первых отзывов):**
- 08 AI Function Calling agent
- 12 Multi-provider image gen
- 11 PDF → квест/тест
- 15 Self-hosted media-downloader

**Уровень 3 — premium / flagship (когда есть портфолио на маркетплейсе):**
- 02 Локальный AI-оператор
- 01 Personal Discipline OS
- 06 Personal Action OS
- 13 Торговый терминал

Эти — высокий чек, длинный срок, лучше после установления авторитета.

---

# ⚠️ Важно для kwork.ru

1. **Минимальная цена 500₽**, но реалистичная нижняя планка для
   серьёзной работы — 5000–10 000₽. Ниже = демпинг, бьёт по
   reputation.

2. **kwork.ru берёт ~30% комиссии** — учитывай в цене. Если хочешь
   чистыми 50k₽, ставь ~70k₽.

3. **3-tier структура** (Базовый / Стандарт / Премиум) в одном кворке
   работает лучше чем 3 отдельных кворка. Я выше дал пары
   «MVP / полный проект» — на kwork разверни их как Базовый/Премиум,
   а Стандарт = что-то посередине.

4. **5+ примеров в портфолио** — у тебя 17 проектов на лендинге,
   используй скриншоты cover-постеров (`public/images/projects/*.png`).

5. **Ответ ≤ 24 часа** на kwork критичен — это влияет на ranking.

6. **Никогда не выходи на прямой контакт** через kwork-чат — это
   нарушение правил и блокировка. Все сделки через kwork-эскроу.

---

_Generated 2026-05-07. Source: 17 проектов на pavelhopson.github.io/Eclipse-forge-website
+ docs/cover-prompts.md style + цены из landing modal `priceList`._
