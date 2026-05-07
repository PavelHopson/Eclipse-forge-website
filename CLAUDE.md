# Eclipse Forge — Project Rules & Context

> Этот файл читается Claude Code автоматически в начале каждой сессии.
> Он описывает контекст проекта, бренд-правила и рабочие соглашения.
> Обновляй при значимых изменениях направления.

---

## 📍 Project Identity

**Eclipse Forge** — портфолио-сайт инженера AI-систем Pavel Hopson (Калининград).

- **Live:** https://pavelhopson.github.io/Eclipse-forge-website/
- **GitHub:** https://github.com/PavelHopson/Eclipse-forge-website
- **Local path:** `E:\projects\EclipseForgeLanding`
- **Telegram:** @EclipseHopson · channel @EclipseForgeEngine

Сайт = lead-gen + bibленый портфолио. Pavel продаёт услуги через kwork.ru
+ direct-сделки. Сайт не для массовой аудитории — для качественных
заказчиков с реальными задачами автоматизации.

---

## 🎨 Brand Language (locked)

**Палитра:** pure black (#000000) + warm gold (#D4AF37 / #C9A96E) +
soft warm white (#F5F5F0). Cool cyan (#6BA3FF) только как ambient
acent в ambient-слоях, не на CTAs.

**Типографика:**
- Display headings: Outfit / Cinzel — большие, italic, gold
- Body text: Inter / system sans — soft warm white
- Mono (HUD labels, telemetry): JetBrains Mono / Space Mono

**Визуальный язык:**
- Cinematic luxury poster (как Eclipse Premium Rent / barbershop banner)
- Black sphere fully eclipsed by thin warm-gold corona ring — brand mark
- Atmospheric: gold dust grain + subtle nebulae + volumetric light beams
- Sci-fi technical labels (telemetry HUD): «ORBITAL SYNC 99.74%»,
  «AZIMUTH 047.3°» — это Eclipse Forge signature.

**ЗАПРЕЩЕНО:**
- ❌ Auto-rotating carousels (UX-катастрофа, ассоциируется с Tilda)
- ❌ Cyberpunk magenta / neon overdose
- ❌ Tilda / WordPress / Bitrix24 шаблонные паттерны
- ❌ Cool cyan на главных CTA (только gold)
- ❌ Photographic film grain heavier than subtle dust

---

## 🛠️ Tech Stack

- **Frontend:** React 19 · TypeScript 5.9 · Vite 7 · Tailwind CSS 4
- **Animation:** Framer Motion 12
- **Deploy:** GitHub Pages (auto from `main` branch)
- **Build:** `npm run build` → `dist/`. `vite preview` для локальной проверки.

`vite.config.ts` имеет `base: '/Eclipse-forge-website/'` — все
относительные ассеты резолвятся через `import.meta.env.BASE_URL`.
**Не пишите** raw `/images/...` пути в JS — используйте `AssetImage`,
который сам прокидывает `BASE_URL`.

---

## 📂 Critical Files

| Файл | Назначение |
|---|---|
| `src/data/content.ts` | Весь content + brandAssets + priceList. Single source of truth. |
| `src/lib/locale.tsx` | RU/EN provider + meta-tags |
| `src/lib/priceModal.tsx` | Context для PriceListModal |
| `src/components/sections/HeroSection.tsx` | Hero с mouse parallax + telemetry HUD |
| `src/components/ui/PriceListModal.tsx` | Модалка прайс-листа (15 услуг, 3 группы) |
| `src/components/ui/EclipseTelemetryHud.tsx` | 6 sci-fi data widgets вокруг eclipse |
| `src/components/ui/CursorLight.tsx` | 3-layer cursor trail (gold halo) |
| `src/styles/index.css` | Все CSS-переменные + section-specific styles |

---

## 📚 Reference Documents

В папке `docs/` лежат ключевые брифы — **читать перед изменениями**:

| Документ | Когда нужен |
|---|---|
| `docs/cover-prompts.md` | Промпты для генерации обложек проектов (17 cover'ов в luxury gold v2 style) |
| `docs/imagery-prompts.md` | Промпты для всей остальной imagery (OG, favicon, signature assets, brutal sci-fi pivot) |
| `docs/kworks.md` | 17 услуг в kwork-формате для marketplace профиля |

---

## 💰 Pricing State (Live in Modal)

15 услуг в `priceList` (data/content.ts), 3 группы:

**Системы и AI** (premium core):
- SaaS-разработка от 350k ⭐
- AI-операторы и автоматизация от 120k ⭐
- CRM / Dashboard-системы от 180k ⭐
- Создание скриптов от 50k

**Сайты:**
- Разработка под ключ от 250k ⭐
- Корпоративный сайт от 250k
- Интернет-магазин от 350k
- Сайт-каталог от 180k
- Информационный сайт от 150k
- Одностраничный лендинг от 150k
- Сайт-визитка от 100k

**Дизайн и поддержка:**
- Редизайн от 150k
- Дизайн в Figma от 100k
- Доработка от 5k/час
- Сопровождение от 30k/мес

⭐ = highlight в модалке (premium gold-tinted).

Эти цены = direct-deals / profi.ru. На kwork.ru используется
**уменьшенная модель** (база 5–15k + допы) — см. `docs/kworks.md`.

---

## 🚦 Recent Major Decisions

1. **Cinematic luxury direction locked** — после ≥2 итераций (early
   cyan-laptop → premium gold-on-black). Tag `pre-cinematic-2026-05-04`
   на коммите `2e0ebae` — точка отката если нужна.

2. **17 project covers regenerated** в gold luxury style — все в
   `public/images/projects/`. Новые добавлены: `retry-http.png`,
   `wireguard-telegram-bot.png`. `eclipse-forge-cover.png` остался
   landscape для hero brand plate.

3. **`founder-operator.png`** — новый портрет в FounderSection
   (operator at command desk). `founder-portrait.png` остался в
   HeroSection. Дубликации нет.

4. **Logo:** `logo.png` — EF monogram (graphic, works at small).
   `logo запасной.png` — gold cinematic (backup, не подключен).
   Используется через `brandAssets.brandLogo`.

5. **Brutal sci-fi OS direction** обсуждалась но НЕ реализована —
   осталась в `docs/imagery-prompts.md` как Tier E (Forge Core
   signature asset, brutal logo, technical glyphs, section panels,
   material textures). Если будем делать — это отдельный пивот.

6. **Mobile parallax disabled** на `(hover: none)` + `prefers-reduced-motion`.
   `useMouseParallax` имеет early bail. CursorLight не рендерится
   ниже 1024px.

---

## 🎯 Where Pavel Was When Session Ended

Pavel был **в процессе постинга kworks** на kwork.ru. Оформлены:
- ✅ Eclipse Valhalla — Personal Discipline OS / habit tracker (форма заполнена)
- ✅ Eclipse Hopson Sentinel — local AI-оператор (форма заполнена)
- ✅ Eclipse Premium Rent — premium booking-лендинг (форма заполнена)

**Следующие в очереди (Tier 1, рекомендованный порядок):**
- Task Manager — fullstack JWT платформа (база 8k)
- WireGuard Telegram bot — VPN provisioning bot (база 5k)
- retry-http — npm reliability модуль (база 8k)

Дальше Tier 2 — AI products (AI Hub / Function Calling agent /
Text2Image / Educator / Shotforge).

`docs/kworks.md` содержит **исходные тексты** под каждый из 17, но
для kwork.ru их нужно адаптировать под формат «база 5–15k + 8–9 допов
с подсказками на ≥30% русского». Я делал это в чате интерактивно
(см. предыдущие сообщения). Если нужно — сразу могу выдавать готовые
шаблоны kwork-формы под любой проект из 17.

---

## ⚙️ Work Style Conventions

1. **Commit messages** — на русском или English, формат
   `тип(scope): что сделано` + body с почему. Footer всегда
   `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.

2. **Push workflow** — после каждой смысловой единицы.
   `git push origin main` сразу. GitHub Pages деплоит автоматически.

3. **TodoWrite** — использовать для трекинга в multi-step тасках.
   Один in-progress за раз.

4. **Mobile-first NOT applied** — desktop-first design, но всегда
   проверять `sm:` (640px) и `lg:` (1024px) breakpoints. Хорошо
   адаптируем но primary canvas = desktop.

5. **TypeScript ошибки** — есть pre-existing в `GlowButton`,
   `EclipseVisuals`, `data/content.ts` (readonly tuples). Они НЕ
   блокируют build (Vite использует esbuild, лояльнее tsc). Не
   пытаться чинить разом — фикс точечный по запросу.

6. **Backup tag protocol** — перед большим re-direction делать
   `git tag pre-<change>-<date>` + push tag на remote. Пример:
   `pre-cinematic-2026-05-04`.

---

## 🚧 Backlog (что осталось из больших разговоров)

**P0 (если вернёмся к design):**
- [ ] WebGL/Three.js eclipse в hero (top-impact из 10-пунктового брифа)
- [ ] Lenis smooth scroll + GSAP ScrollTrigger
- [ ] Полный grid-breaking re-layout секций

**P1 (готовы к работе):**
- [ ] Forge Core signature asset (Tier E #12 в imagery-prompts.md)
  — это ОДНА генерация ChatGPT, потом подключение в header вместо
  текущей gold dot
- [ ] Полный favicon набор (favicon-32, favicon-64, apple-touch-icon)
  через realfavicongenerator.net из brand mark
- [ ] OG image v2 (1200×630) под обновлённый brand language

**P2 (improvement opportunities):**
- [ ] Storytelling rename ВСЕХ секций (3 уже сделано: Hero
  eyebrow / CTA «Открыть канал» / Metrics «Телеметрия»)
- [ ] Footer brand watermark (gold faded eclipse)
- [ ] Mobile hero alternative illustration
- [ ] Section ornaments / corner brackets

**Marketplace (kwork.ru):**
- [ ] Дописать 14 оставшихся kworks по той же интерактивной модели
  (через скриншоты формы)

---

## 🔑 Critical Rules

1. **Никогда не push в `main` без `npm run build`** — проверка что
   проект собирается. Даже doc-only изменения проверяй чтоб
   markdown/YAML не сломал что-то.

2. **`encodeURI` для русско-именных путей** — `AssetImage` уже это
   делает. Если добавляете другие image-loader'ы — не забывайте.

3. **`prefers-reduced-motion` ВСЕГДА уважать** — это в `useMouseParallax`,
   `CursorLight` и в `@media print` уже учтено. Любая новая
   анимация должна иметь bail-out.

4. **`design-backups/` в `.gitignore`** — там Pavel держит локальные
   снапшоты дизайна. Не коммитить случайно через `git add -A`.

---

## 📞 Communication

- Pavel предпочитает **краткость + конкретику** в ответах
- Использует **скриншоты** как основной источник контекста
- Любит **табличные форматы** для structured data
- Тон: технический, без излишней вежливости, прямой
- Pavel читает на русском но ОК с английскими техническими терминами
- Documentation в `docs/` — на русском с английскими тех-терминами

---

_Last updated: 2026-05-07 by Claude Opus 4.7 (1M context)_
