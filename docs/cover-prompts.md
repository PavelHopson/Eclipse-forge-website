# Eclipse Forge — Project Cover Prompts (ChatGPT image-gen)

Промпты для генерации обложек проектов под лендинг
[pavelhopson.github.io/Eclipse-forge-website](https://pavelhopson.github.io/Eclipse-forge-website/).

**Эталоны стиля:** Eclipse Premium Rent + Premium Barbershop —
luxury cinematic poster: чёрный фон, золотая пыль-крупа,
big serif wordmark, сюжетная фотография продукта, glass-stat row,
ряд тех-стека внизу, тонкие золотые hairline-разделители.

> Версия 2.0 — обложки, сделанные ранее в стиле "ноутбук с UI на циан-фоне"
> (`valhalla.png`, `cryptopulse.png` v1) перегенерируются по новому канону
> для единства линейки.

---

## STYLE LOCK 2.0 — единое ядро всех 17 обложек

> **Используй этот блок как преамбулу к каждому промпту. Не отклоняйся —
> иначе обложки рассинхронятся с премиум-стилем Premium Rent.**

```
A cinematic luxury cover poster in the Eclipse Forge brand style.
Format: 3:2 horizontal, 1536×1024, ultra-high-quality cinema render.

Background: pure deep black (#000000) saturated with fine warm gold
dust particles (#D4AF37 / #C9A96E) scattered like film grain across
the entire frame, denser near the corners. A subtle radial vignette
keeps focus on the centre. Faint warm gold ambient light glows from
the upper edges. Cinematic film-grade depth, soft bloom, no harsh
contrast.

Top centre: small Eclipse Forge brand mark — a tiny solid black
circular eclipse silhouette with a thin warm-gold corona glow on its
left side, followed by the wordmark "ECLIPSE FORGE" in refined
gold sans-serif caps, letter-spacing wide, ~14% of frame width.
A thin warm-gold hairline (1px equivalent) sits just above the
wordmark, breaking the void.

Centre stage: PROJECT WORDMARK in large elegant serif typeface
(Cinzel / Cormorant Garamond / Playfair Display Black aesthetic),
warm gold (#D4AF37) with a subtle inner gradient and a soft warm
shadow. Below it, a tagline subtitle in soft warm white (#F5F5F0)
sans-serif, 1–2 lines, max 80 chars per line.

Mid layer (engagement): the per-project prompt will specify EXACTLY
one of: (a) a single gold-bordered pill button with project-specific
CTA text, (b) a glassmorphism stat row — a slim translucent glass
capsule with thin warm-gold border, divided by gold dot separators
showing 3 short stats, OR (c) both, stat row above the button.
Do NOT add a button if the prompt only specifies a stat row.
Do NOT invent CTA text — use only what the per-project prompt says.

Lower half: project-specific subject photography integrated into
the same dark gold-particle scene. Cinematic lighting, gold rim
light, no neon, no cyberpunk magenta, no real recognisable brand
products, no human faces. The subject must communicate what the
project IS at a glance.

Bottom strip: optional tech-stack icon row — small stylised
brand-coloured icons followed by tech names in a thin sans serif.
Each icon keeps its native brand colour at low saturation (React
soft cyan, TypeScript blue, Rust red-orange, Python yellow, etc.)
on a near-black backplate. Below the icons, a thin warm-gold
hairline matching the top divider.

Color palette is strict: pure black #000000, premium gold
#D4AF37 / #C9A96E, soft warm white #F5F5F0. ONE single accent
colour from the project's tech may appear sparingly (e.g. Rust
red for Eclipse Claw). NO cool cyan dominance. NO neon. NO
magenta. NO sci-fi clichés.

Mood: a one-sheet luxury cinema poster for a premium engineering
product. Calm, deliberate, expensive, restrained. Like Apple keynote
black + a Bond film title card.
```

---

## Как пользоваться

1. Открыть ChatGPT (с `gpt-image-1` или DALL·E 3).
2. Скопировать **STYLE LOCK 2.0** + **промпт нужного проекта** одним сообщением.
3. Сохранить картинку как `<slug>.png` в `public/images/projects/` —
   путь рядом с каждым промптом.
4. Если ChatGPT уехал в неон / магенту — попросить
   *"Re-render keeping the Eclipse Forge gold-on-black brand style.
   No cyan, no neon."*
5. Кириллица в подзаголовке: GPT-Image-1 рендерит хорошо, DALL·E 3
   может ошибаться — если буквы пляшут, дописать *"render Russian
   text exactly as written"*.

---

# 🟢 Tier A — Pinned, флагманы

---

## 1. Eclipse Valhalla

**Файл:** `public/images/projects/valhalla.png`

```
Project wordmark: "ECLIPSE VALHALLA" in big elegant gold serif
caps. Subtitle: "Персональная операционная система дисциплины"
in soft warm white sans-serif.

Engagement layer: BOTH a glassmorphism stat row AND a button.
Stat row showing three segments separated by gold dots:
"5 платформ · 312+ тестов · 31 достижение".
Below the stat row, ONE gold-bordered pill button labelled exactly
"Открыть систему" — DO NOT use "Записаться", DO NOT use "Live Demo".

Lower-half subject photography: a cinematic dark viking-era great
hall — heavy stone columns receding into deep black, a low fire pit
on the floor casting warm gold ambient light, the silhouette of a
warrior helmet and a sheathed longsword resting on a wooden table
in the foreground. NO people, NO faces. Atmospheric, severe,
restrained. The hall feels like a personal command chamber, not a
medieval reenactment scene.

Bottom tech-stack icon row, left-to-right: React 19, TypeScript,
Vite, Tailwind, Electron, Capacitor. Icons in their native
brand colours at low saturation on a near-black backplate. Thin
warm-gold hairline below the icons.

Mood word: discipline.
```

---

## 2. Eclipse Claw

**Файл:** `public/images/projects/claw.png`

```
Project wordmark: "ECLIPSE CLAW" in big elegant gold serif caps.
Subtitle: "Самый быстрый веб-скрапер для AI-агентов"
in soft warm white.

Engagement layer: stat row ONLY, NO button.
Stat row: "67% меньше токенов · TLS Fingerprinting · 22K строк Rust".

Lower-half subject: an abstract centerpiece — three luminous
metallic talons curving downward, rendered in matte deep red Rust
accent (#B7410E) with warm gold rim light, suspended in the dark
gold-particle space. The talons are slicing through a swirling
chaotic stream of HTML / code text fragments on the LEFT side,
and emerging on the RIGHT side as a clean, ordered horizontal
trail of glowing gold lines (clean structured output). Below the
talons, a soft horizon glow.

Below the centerpiece, a smaller token-counter chip floats:
"4820 → 1590 tokens" with a downward gold arrow.

Bottom tech-stack icon row: Rust, Axum, Tokio, MCP, Docker, CLI.
Native brand colours at low saturation. Rust red (#B7410E) is
allowed as the single accent of the frame. Thin warm-gold hairline
below.

Mood word: surgical.
```

---

## 3. CryptoPulse 2077

**Файл:** `public/images/projects/cryptopulse.png`

```
Project wordmark: "CRYPTOPULSE 2077" in big elegant gold serif
caps with the "2077" rendered slightly thinner / italic for
contrast. Subtitle: italic line "Wake up, Samurai. We have a
market to burn." in soft warm white.

Engagement layer: button ONLY, NO stat row.
ONE gold-bordered pill button labelled exactly "Live Demo".

Lower-half subject: a sophisticated dark trading floor at night —
the silhouette of an executive trader standing with their back
to camera (faceless, no human face) facing a wall of large dark
screens. Each screen displays restrained candlestick charts, price
tickers, and one AI-insight panel — the chart lines are warm
gold (NOT neon green-red), the screens emit a calm warm gold ambient
glow. A wide window in the background shows a faint distant city
night skyline. Cinematic film noir lighting. NO neon pink, NO
cyberpunk magenta — restraint over flash. The "2077" energy comes
from sophistication, not glow sticks.

Bottom tech-stack icon row: React 19, TypeScript, Vite, Tailwind,
Cloudflare Workers, Recharts. Native brand colours at low
saturation. Thin warm-gold hairline below.

Mood word: command.
```

---

## 4. Eclipse Hopson Sentinel

**Файл:** `public/images/projects/sentinel.png`

```
Project wordmark: "ECLIPSE HOPSON SENTINEL" in big elegant gold
serif caps (slightly smaller than other titles to fit the long
name on one line). Subtitle: "Локальный AI-оператор · код,
терминал, голос" in soft warm white.

Engagement layer: stat row ONLY, NO button.
Stat row: "207K LOC · 244 тестов · 3 runtime'а".

Lower-half subject: a dark operator desk at night in a personal
study — a single large terminal screen glowing warm gold with
faint code-line silhouettes (unreadable detail, just rhythm), a
small matte-black voice puck device with a thin gold ring of LEDs
on the desk beside it, a slim over-ear headset hanging on a stand,
and a brass-coloured desk lamp throwing warm gold light across the
wood surface. NO people. The desk feels like a personal command
center, intimate not corporate. A faint cyan hint allowed only on
the LEDs of the voice puck (the "tech soul" trace), all other
warmth is gold.

Bottom tech-stack icon row: TypeScript, Bun, Rust, Python,
WebSocket, Ollama. Native brand colours at low saturation. Thin
warm-gold hairline below.

Mood word: sovereignty.
```

---

## 5. Business Data Platform

**Файл:** `public/images/projects/business-data-platform.png`

```
Project wordmark: "BUSINESS DATA PLATFORM" in big elegant gold
serif caps. Subtitle: "ETL-платформа для анализа компаний с
observability stack" in soft warm white.

Engagement layer: stat row ONLY, NO button.
Stat row: "FastAPI · 7 services · ETL за 5 минут".

Lower-half subject: a dark control room — a dim sleek desk in the
foreground, behind it a curved wall of multiple slim wide monitors
arranged in a 3×2 grid configuration. Each monitor shows abstract
Grafana-style line and bar charts rendered in warm gold tones (not
green-red), with one big numeric "98.7%" panel glowing on the
centre monitor. To the side of the wall, a slim server-rack
silhouette with thin gold LED slits suggests infrastructure. The
ambient lighting is warm gold from above. Atmospheric mission-
control vibe, premium not industrial.

Bottom tech-stack icon row: FastAPI, PostgreSQL, Redis, Prometheus,
Grafana, Loki. Native brand colours at low saturation. Thin
warm-gold hairline below.

Mood word: observability.
```

---

## 6. Smart Fitness Booking Agent

**Файл:** `public/images/projects/smart-fitness-booking-agent.png`

```
Project wordmark: "SMART FITNESS BOOKING" in big elegant gold
serif caps. Subtitle: "AI-агент для записи в зал — голосом, через
Function Calling" in soft warm white.

Engagement layer: button ONLY, NO stat row.
ONE gold-bordered pill button labelled exactly "Live Demo".

Lower-half subject: a luxury boutique gym at night — a calm
yoga / pilates studio with floor-to-ceiling mirrors, a single neat
mat on a polished wooden floor, a brass barre, and gold ambient
spotlights from above casting long shadows. NO people. The space
feels like a private wellness club, not a commercial gym. In the
foreground corner, a faintly visible sleek tablet on a stand glows
warm gold, suggesting the booking interface — but it is small and
ambient, not the focal point.

Bottom tech-stack icon row: React 19, TypeScript, Vite, Tailwind,
Gemini AI, Zustand. Native brand colours at low saturation. Thin
warm-gold hairline below.

Mood word: calm intelligence.
```

---

# 🟡 Tier B — активные

---

## 7. Eclipse AI Hub

**Файл:** `public/images/projects/eclipse-ai-hub.png`

```
Project wordmark: "ECLIPSE AI HUB" in big elegant gold serif caps.
Subtitle: "6 AI-инструментов в одном workspace" in soft warm
white.

Engagement layer: BOTH stat row AND button.
Stat row: "8 провайдеров · Ollama-first · 41 тест".
Below the stat row, ONE gold-bordered pill button labelled
exactly "Live Demo".

Lower-half subject: an abstract architectural arrangement — six
floating dark glass tablets suspended in a 3×2 grid in mid-air
within the gold-particle space, each tablet rim-lit with warm
gold and showing a tiny abstract glyph (a chat bubble, two
opposing arrows, a document, a magnifier, a quill, a shield).
The glyphs glow faintly gold. A connecting hairline of warm gold
runs between adjacent tablets, suggesting the unified workspace.
At the bottom centre, a single small node labelled "OLLAMA · LOCAL"
acts as the gravitational anchor with a soft gold halo.

Bottom tech-stack icon row: React 19, TypeScript, Ollama, Gemini,
OpenAI, OpenRouter. Native brand colours at low saturation. Thin
warm-gold hairline below.

Mood word: modular.
```

---

## 8. Smart Life Assistant

**Файл:** `public/images/projects/smart-life-assistant.png`

```
Project wordmark: "SMART LIFE ASSISTANT" in big elegant gold
serif caps. Subtitle: "Personal Action OS · finances, health,
daily tasks" in soft warm white.

Engagement layer: BOTH stat row AND button.
Stat row: "Windows desktop · banking API · auto-actions".
Below the stat row, ONE gold-bordered pill button labelled
exactly "Скачать".

Lower-half subject: a cozy late-night personal home office — a
dark wooden desk with a closed silver laptop, a ceramic coffee
cup, a small leather notebook, a single brass desk lamp throwing
a warm gold pool of light, and a faint silhouette of a window
showing a city night skyline. A small Windows tray-style icon
glow in the bottom-right corner of the laptop hints at the app.
NO people. The scene feels like the moment before someone sits
down to take control of their week — calm, personal, premium.

Bottom tech-stack icon row: Next.js, Electron, TypeScript, Prisma,
TrueLayer, Stripe. Native brand colours at low saturation. Thin
warm-gold hairline below.

Mood word: control.
```

---

## 9. Text2Image Studio

**Файл:** `public/images/projects/text2image-studio.png`

```
Project wordmark: "TEXT2IMAGE STUDIO" in big elegant gold serif
caps. Subtitle: "AI-студия для генерации изображений · 10 стилей
· 4 провайдера" in soft warm white.

Engagement layer: button ONLY, NO stat row.
ONE gold-bordered pill button labelled exactly "Live Demo".

Lower-half subject: a dark luxury gallery wall — a horizontal row
of five vertical picture frames mounted on a near-black wall, each
frame an ornate slim gold border with abstract gradient art
inside (no recognisable subject, just calm dark gradients with
subtle gold highlights). Above each frame, a small pin-spot light
casts a warm gold cone downward. The floor is polished obsidian.
The aesthetic is contemporary art gallery × Ritz lobby, NOT
neon AI lab.

Bottom tech-stack icon row: React 19, TypeScript, Vite, Gemini,
DALL·E, Ollama. Native brand colours at low saturation. Thin
warm-gold hairline below.

Mood word: curation.
```

---

## 10. InterviewForge

**Файл:** `public/images/projects/interviewforge.png`

```
Project wordmark: "INTERVIEWFORGE" in big elegant gold serif caps.
Subtitle: "Десктоп-копайлот для технических собеседований ·
Tauri 2 + Gemini Live" in soft warm white.

Engagement layer: BOTH stat row AND button.
Stat row: "200ms latency · stealth mode · 100MB binary".
Below the stat row, ONE gold-bordered pill button labelled
exactly "Скачать".

Lower-half subject: a minimalist interview setting at night — two
slim laptop screens facing each other across a dark wooden desk in
a low-lit room. The closer laptop screen shows abstract code lines
glowing warm gold; the further laptop screen shows a faint
silhouette of a face on a video call (NO recognisable face — just
a silhouette outline). A single brass lamp above casts a warm
gold ambient. The scene suggests a high-stakes moment, controlled
and quiet. A subtle faint translucent overlay across the closer
laptop hints at "stealth mode" — visible but ghostlike.

Bottom tech-stack icon row: React 18, Tauri 2, Rust, Gemini Live,
TypeScript, Vite. Native brand colours at low saturation. Thin
warm-gold hairline below.

Mood word: composure.
```

---

## 11. Eclipse Media

**Файл:** `public/images/projects/eclipse-media.png`

```
Project wordmark: "ECLIPSE MEDIA" in big elegant gold serif caps.
Subtitle: "Self-hosted медиа-загрузчик · 1000+ источников"
in soft warm white.

Engagement layer: button ONLY, NO stat row.
ONE gold-bordered pill button labelled exactly "Live Demo".

Lower-half subject: a dark personal cinema room — a large dark
back wall covered with a 4×3 grid of thin glowing tiles, each
tile rim-lit warm gold and showing an abstract gradient
placeholder (no real video frames, no real platform logos —
abstract dark gradients only). In the foreground, a single
silhouette of a high-end sofa angled toward the wall, suggesting
a personal media library curated by hand. A faint sound-wave
hairline glows along the bottom of the wall. Atmosphere of a
private screening room, premium not technical.

Bottom tech-stack icon row: React 19, FastAPI, yt-dlp, Docker,
Python, SSE. Native brand colours at low saturation. Thin
warm-gold hairline below.

Mood word: sovereignty.
```

---

## 12. Shotforge

**Файл:** `public/images/projects/shotforge.png`

```
Project wordmark: "SHOTFORGE" in big elegant gold serif caps.
Subtitle: "AI-фотостудия · профессиональные фотосессии за 3
минуты" in soft warm white.

Engagement layer: BOTH stat row AND button.
Stat row: "21 пресет · 3 режима · Gemini AI".
Below the stat row, ONE gold-bordered pill button labelled
exactly "Live Demo".

Lower-half subject: a dark luxury photography studio — a
professional medium-format camera mounted on a slim tripod in
the foreground, brass-bodied with a polished black lens. Behind
it, two octagonal soft-box lights on stands, each emitting a
warm gold glow. A neutral dark seamless backdrop sweeps from the
floor up. NO model, NO people. The studio feels like a high-end
fashion editorial setup, not a generic photo studio.

Bottom tech-stack icon row: React 19, TypeScript, Gemini AI,
Tailwind, Vite. Native brand colours at low saturation. Thin
warm-gold hairline below.

Mood word: craft.
```

---

## 13. Educator AI / Questify

**Файл:** `public/images/projects/educator-ai.png`

```
Project wordmark: "QUESTIFY" in big elegant gold serif caps.
A small thinner subtitle line above it reads "Educator AI". Below
the wordmark, the main subtitle: "Превращает PDF в интерактивные
квесты за 60 секунд" in soft warm white.

Engagement layer: BOTH stat row AND button.
Stat row: "PDF → Quest · structured AI · EN / RU".
Below the stat row, ONE gold-bordered pill button labelled
exactly "Live Demo".

Lower-half subject: a warm dark library / scholar's chamber — tall
old wooden bookshelves filled with dark leather-bound books
receding into deep black, a single open ancient tome on a dark
wooden lectern in the foreground glowing warm gold from within
(suggesting transformation), three lit candles on the lectern
casting warm gold light, faint scrolls and a quill on the side.
The atmosphere is fantasy library × Hogwarts × Borges, NOT
edtech-bright.

Bottom tech-stack icon row: React 19, TypeScript, Gemini AI,
Framer Motion, Vite. Native brand colours at low saturation.
Thin warm-gold hairline below.

Mood word: revelation.
```

---

## 14. Eclipse Premium Rent

**Файл:** `public/images/projects/premium-rent.png`

> Эта обложка — эталон стиля, уже сгенерирована пользователем.
> Промпт ниже — для регенерации в горизонтальном 3:2 формате
> (текущая версия портретная) под формат-сетку лендинга.

```
Project wordmark: "ECLIPSE PREMIUM RENT" in big elegant gold serif
caps. Subtitle: "Премиальная аренда автомобилей в Калининграде"
in soft warm white.

Engagement layer: button ONLY, NO stat row.
ONE gold-bordered pill button labelled exactly "Live Demo".

Lower-half subject: a dark luxury car gallery at night — two
high-end vehicles parked on polished obsidian floor, the closer
car a black executive sedan with a "PREMIUM" plate badge, the
further car a silver coupe partially in shadow. Both cars have
a strong gold rim light along their underside and a faint
reflection on the floor below. Behind them, a soft warm gold
ambient glow suggests a showroom roof. NO people. The scene is
a luxury rental gallery, restrained editorial photography style.

Bottom tech-stack icon row: React 19, TypeScript, Vite, Tailwind,
Framer Motion, Cloudflare. Native brand colours at low saturation.
Thin warm-gold hairline below.

Mood word: prestige.
```

---

## 15. Task Manager

**Файл:** `public/images/projects/task-manager.png`

```
Project wordmark: "TASK MANAGER" in big elegant gold serif caps.
Subtitle: "Fullstack менеджер задач · JWT, роли, пагинация"
in soft warm white.

Engagement layer: BOTH stat row AND button.
Stat row: "JWT auth · roles · paginated · Docker".
Below the stat row, ONE gold-bordered pill button labelled
exactly "Live Demo".

Lower-half subject: a clean minimalist dark office workspace at
night — a polished dark wooden desk with a slim closed laptop,
a leather portfolio, a brass mechanical pen, a small notepad with
a thin gold edge, and a brass desk lamp throwing warm gold light
across half the desk. Behind the desk, a faint silhouette of a
floor-to-ceiling bookshelf in deep shadow. NO people. The vibe
is "internal admin tool that engineers actually want to use",
not enterprise dashboard.

Bottom tech-stack icon row: React 18, Express 5, Prisma,
PostgreSQL, Docker, JWT. Native brand colours at low saturation.
Thin warm-gold hairline below.

Mood word: discipline.
```

---

## 16. WireGuard Telegram Bot

**Файл:** `public/images/projects/wireguard-telegram-bot.png`

```
Project wordmark: "WIREGUARD VPN BOT" in big elegant gold serif
caps. Subtitle: "Автоматическая раздача VPN через Telegram"
in soft warm white.

Engagement layer: stat row ONLY, NO button.
Stat row: "iOS · Android · Win · Linux · Mac".

Lower-half subject: a dark server room — a single tall slim
server rack silhouette on the left, with three horizontal slits
glowing warm gold suggesting LED activity. On the right, a
floating smartphone in mid-air rendered cleanly, its screen
showing a Telegram chat in dark mode with a single visible bot
message: a stylised geometric QR-code pattern (not scannable, just
artistic) and a small ".conf" file icon below it. A thin warm-
gold data beam connects the server rack to the phone screen,
visualising the provisioning flow.

Bottom tech-stack icon row: Python, aiogram, WireGuard, Bash,
systemd, Telegram. Native brand colours at low saturation. Thin
warm-gold hairline below.

Mood word: hands-off.
```

---

# 🆕 Special — open-source npm package

---

## 17. @pavelhopson/retry-http

**Файл:** `public/images/projects/retry-http.png`

```
Project wordmark: "RETRY-HTTP" in big elegant gold serif caps.
A small thinner line above it reads "@pavelhopson". Below the
wordmark, the main subtitle: "Exponential backoff retry · Zero
deps · TypeScript-first" in soft warm white.

Engagement layer: stat row ONLY, NO button.
Stat row: "26 tests · ESM · published on npm".

Lower-half subject: an abstract conceptual diagram in the dark
gold-particle space — a large luminous warm-gold circular
retry-loop ring composed of four arc segments, each next arc
slightly thicker than the last to suggest exponential growth, with
small gold dot-nodes at each segment join. At the centre of the
ring, a small glowing core node labelled "request". To the right
of the ring, a vertical timeline of three attempts rendered as
short horizontal lines: "attempt 1 · 429" in muted red, "wait
500ms" in faint gold, "attempt 2 · 502" in muted red, "wait
1.2s" in faint gold, "attempt 3 · ✓ 200" in clear gold. Below
the ring, a stylised npm package badge — a glassy gold-trim
pill with the text "npm install @pavelhopson/retry-http". To
the left, a code snippet card floats with monospace text
"await retry(fetchData, { maxAttempts: 3, jitter: true });".

Bottom tech-stack icon row: TypeScript, ESM, Vitest, npm, GitHub.
Native brand colours at low saturation. Thin warm-gold hairline
below.

Mood word: precision.
```

---

## После генерации — чек-лист

- [ ] 17 файлов в `public/images/projects/` (имена по списку)
- [ ] Все 3:2 cinematic landscape, единый палитровый ключ (black + gold)
- [ ] Project wordmark корректно прочитан (особенно кириллица в подзаголовке)
- [ ] `data/content.ts` уже знает эти имена через `projectImage()` хелпер —
      перепрописывать в коде не нужно, просто положить файлы.
- [ ] Локально проверить через `npm run build && vite preview` —
      все картинки 200, ни одной 404.
- [ ] Закоммитить блок одним коммитом
      `feat(images): regenerate project covers in v2 luxury gold style`

---

## История версий

- **v1.0** (deprecated): style "ноутбук с UI на циан-фоне" по образцу
  старого `valhalla.png` / `cryptopulse.png`. 17 промптов.
- **v2.0** (current, 2026-05-04): style "luxury cinematic poster"
  по образцу `Eclipse Premium Rent` + `Premium Barbershop` —
  чёрный + золото, big serif wordmark, сюжетная фотография
  продукта, glass-stat row, ряд тех-стека внизу. 17 промптов
  переписаны с нуля.

---

_Generated 2026-05-04. Style derived from user-provided reference
images (Eclipse Premium Rent + Premium Barbershop). Source data
from `README.md` files in `E:\projects\<repo>` + audit in
`Репозитории_v2.md`._
