# Eclipse Forge — Utility & Social Imagery Prompts

Промпты для дополнительных изображений (OG, favicon, brand plates, social
banners) под лендинг
[pavelhopson.github.io/Eclipse-forge-website](https://pavelhopson.github.io/Eclipse-forge-website/).

Эти ассеты добивают то, что 17 project covers (`docs/cover-prompts.md`)
не покрывают: social-sharing, technical hygiene (favicon, OG),
section illustrations, social channels.

**Стиль зафиксирован** под текущие covers v2 (luxury cinematic poster,
gold-on-black). Используй те же принципы: pure black backdrop, gold dust,
warm cinematic light, эклиптика-метафора.

---

## STYLE LOCK — utility imagery (короче чем для covers)

> Используй как преамбулу к каждому промпту ниже.

```
Eclipse Forge brand utility image. Style continuity with existing
project covers in this kit:
- Pure deep black background (#000000), warm gold dust grain texture
- Brand mark: black sphere with thin warm-gold corona ring (#D4AF37)
- Color palette: black, gold #D4AF37 / #C9A96E, soft warm white
  #F5F5F0. Subtle red-orange accent allowed only for technical brand
  callouts (Rust orange #B7410E)
- Cinematic depth, soft bloom, NO neon, NO cyberpunk magenta,
  NO anime, NO photorealistic faces unless specified
- Mood: premium, calm, technological, deliberate

Each prompt below specifies exact dimensions, content brief, and any
text strings that MUST be rendered verbatim.
```

---

# 🟢 Tier A — must-have (closes technical hygiene)

## 1. OG / Social Sharing Image

**Файл:** `public/og-image.png`
**Размер:** **1200 × 630 px** (стандарт OpenGraph)
**Зачем:** Появляется как preview когда сайт шарят в Telegram, LinkedIn,
Twitter, Slack, FB. Сейчас стоит SVG не в новом стиле.
**Уникальная нота:** Самый «парадный» asset во всей линейке — должен
читаться даже на маленьком thumbnail'е (~300px wide).

```
Eclipse Forge brand OG image, 1200×630 horizontal landscape, 16:9-ish.

Composition:
- Pure deep black background (#000000) with fine warm gold dust
  particle grain texture across the whole frame, denser at corners.
- Top center: small "ECLIPSE FORGE" wordmark in refined gold caps
  sans-serif, letter-spacing wide. To its LEFT, a tiny eclipse
  silhouette (black sphere + thin warm-gold corona ring), scaled
  ~14px tall. A thin warm-gold hairline (1px) above the wordmark.
- Center stage, BIG: render exactly the text "AI SYSTEMS
  ENGINEERING" in large elegant gold serif (Cinzel / Cormorant
  Garamond / Playfair Display Black aesthetic), rendered in warm
  gold #D4AF37 with subtle inner gradient and soft warm shadow.
  Letter-spacing -0.01em, all caps.
- Below it, in soft warm white (#F5F5F0) sans-serif, render exactly:
  "Pavel Hopson · Калининград"
- Right side of frame: a cinematic black sphere fully eclipsed by
  warm gold corona (Eclipse Forge brand mark scaled large), with
  faint volumetric light scattering. Sphere occupies right 30-35%
  of frame, slightly cropped at right edge.
- Lower strip: a thin row of faded tech-stack icon glyphs in
  monochrome — React, TypeScript, Rust, Python, Postgres, Tauri —
  rendered as soft mono pictograms at low opacity (0.45). Below
  them, a thin warm-gold hairline matching the top divider.

NO neon, NO faces, NO photo of the laptop/screen. Pure brand poster.
Render Russian text "Pavel Hopson · Калининград" exactly as written.
```

---

## 2. Brand Mark — high-res square (drives favicon + Apple Touch Icon)

**Файлы:**
- `public/favicon.png` (32×32 + 64×64, downsample from this)
- `public/apple-touch-icon.png` (180×180 directly)
- `public/favicon.svg` (vector — re-trace from this если нужен)

**Размер для генерации:** **1024 × 1024 px** (потом downsample)
**Зачем:** Текущая favicon — generic оранжевая «E», вообще не Eclipse
Forge. iOS bookmark / browser tabs / PWA icon — все из этого одного
ассета.
**Уникальная нота:** Должен читаться при 32×32 (≈ 16 пикселей с antialiasing).
Простота и контраст важнее деталей.

```
Eclipse Forge brand mark — single icon, 1024×1024 square, 1:1.

Pure black background, slightly rounded corners (12% radius — for
later iOS / PWA cropping flexibility, leave full square render).

Centered glyph: a perfectly circular black sphere occupying ~62%
of the canvas, fully eclipsed by a thin warm-gold corona ring
(#D4AF37) of even thickness — no rays, no flares, just a clean
luminous halo around the sphere. The corona ring should be
~1.4% of canvas width thick, with a soft subtle bloom outward
(blur ~12px equivalent), and a tiny brighter highlight on the
upper-left arc of the ring suggesting light source from upper-
left.

NO wordmark text. NO ornaments. The mark must read clearly when
rendered at 32×32 pixels. High contrast, minimal noise. Same
silhouette as the corner brand mark on the OG image and project
covers, just without the "ECLIPSE FORGE" wordmark beside it.

Background should be solid deep black, no dust grain, no nebula —
this needs to anti-alias cleanly at small sizes.
```

**После получения:** конвертировать в favicon-набор. Способы:
- [realfavicongenerator.net](https://realfavicongenerator.net/) — берёт PNG, отдаёт ICO + favicon-32, favicon-16, apple-touch-icon, manifest.json
- Или вручную в Figma / Photoshop: 180×180 для apple-touch, 32×32 для favicon.png

---

# 🟡 Tier B — сильное усиление дизайна

## 3. Hero Brand Plate v2 (landscape)

**Файл:** `public/images/projects/eclipse-forge-cover.png` (заменить existing)
**Размер:** **600 × 220 px** (узкий landscape ~3:1.1)
**Зачем:** Маленькая карточка справа от портрета в Hero
(`brandAssets.heroPlate`). Текущий файл остался от старой версии до
redesign'а — landscape под new luxury gold язык.
**Уникальная нота:** Этот ассет ВНУТРИ карточки, не самостоятельный
poster — поэтому wordmark должен быть скромнее, но композиция
кинематографичнее.

```
Eclipse Forge hero brand plate, 600×220 horizontal landscape (~3:1.1).

Pure deep black background with fine gold dust grain. Atmospheric
warm gold ambient light from the upper-left edge.

Center-left: a small "ECLIPSE FORGE" wordmark in gold caps
sans-serif (~9% canvas height), letter-spacing wide. Below it in
small soft warm white sans-serif, render exactly the text
"AI Systems Engineering" lowercase. A tiny eclipse silhouette
(black sphere + gold corona ring) sits to the LEFT of the wordmark.

Right 40% of frame: a cinematic close-up of the eclipse
silhouette — black sphere with thin warm-gold corona ring, edge-lit
from behind. Subtle gold dust particles drift across this region.
A faint horizon glow at the lower-right edge.

NO additional text, NO HUD overlays, NO photographic content.
Pure atmospheric brand plate that works as a small ambient card
inside a larger hero composition.
```

---

## 4. Hero Portrait v2 *(опционально, если хочется усилить sci-fi)*

**Файл:** `public/images/projects/founder-portrait.png` (заменить existing)
**Размер:** **800 × 1100 px** portrait (~4:5.5)
**Зачем:** Текущий портрет ОК, но он сидячий-нейтральный. Если
хочется чтобы hero ощущался как «оператор за пультом», нужна
постановка с gold rim-light + командной комнатой на фоне.
**Уникальная нота:** Это РЕАЛЬНОЕ фото-стилизованное изображение
человека (не абстракция). ChatGPT image-gen может сейчас рендерить
людей хорошо при чёткой постановке.

```
Cinematic portrait of a male tech founder/operator, 800×1100 vertical.

Subject: man in his 30s, short dark hair, trimmed dark beard,
sharp focused gaze toward camera, three-quarters profile, dark
sophisticated attire (charcoal suit jacket over black turtleneck
or just a dark shirt, no tie). Calm professional expression, not
smiling — operator authority, not corporate cheer.

Lighting: dramatic side-light from upper-right with warm gold
rim catching the right edge of the face, jaw, and shoulder.
Subtle key light from lower-left in soft warm white. Deep shadow
on the left side of the face. Cinematic film grain.

Background: deeply out-of-focus dark control room — faint
silhouettes of rack equipment, soft gold ambient glow from a
hidden monitor on the lower-left, gold dust particles drifting.
Background should be ~85% darker than the subject, in pure deep
black to muted navy gradient.

Mood: a private command desk at midnight. Not corporate
headshot, not glamour. The man behind the systems, calm and
in control.

NO logos, NO product placement, NO visible computer screen text,
NO photo studio backdrop. Looks like a still from a tech
documentary, not a marketing photo.
```

---

## 5. SystemsNotSites — 4 glyph icons

**Файлы:**
- `public/images/glyphs/operator.png`
- `public/images/glyphs/automation.png`
- `public/images/glyphs/pipeline.png`
- `public/images/glyphs/execution.png`

**Размер:** **240 × 240 px** каждый (1:1)
**Зачем:** В блоке «Я не делаю сайты, я строю системы» 4 карточки
сейчас имеют inline-SVG глифы. Простые, геометрические. Можно поднять
до small isometric instrument illustrations (опционально — текущие
SVG работают, это polish).
**Уникальная нота:** 4 разных глифа, ОДИНАКОВЫЙ стилевой ключ.
Нужно сгенерировать ВСЕ 4 в одной сессии, чтобы они выглядели как набор.

```
Eclipse Forge system glyph icons — set of 4 matching square
illustrations, 240×240 each, 1:1.

Common style for all four:
- Pure black background, thin gold ring border (1px equivalent)
- Centered isometric instrument illustration in warm gold line
  art (#D4AF37) over dark navy haze, NO fill — just precise gold
  outlines and tiny gold dot markers at key joints
- Tiny eclipse mark (black sphere + gold corona) embedded in the
  upper-right corner at 12% size as a watermark
- Faint gold particle drift across each canvas (subtle, not loud)

Glyph 01 — "AI Operator":
A central node with three radiating tool arms (terminal prompt
glyph, microphone glyph, file folder glyph) connected by thin
gold lines. Rendered as a control hub topology.

Glyph 02 — "Automation Engine":
A horizontal flow of three connected gears arranged left-to-right,
each gear in line-art gold, connected by data-flow arrows.
Subtle motion-line indicators on the leftmost gear.

Glyph 03 — "Data Pipeline":
A series of three stacked horizontal pipes/channels with small
dot-particles flowing through them left-to-right. ETL-style
visual: input on left, processing nodes in middle, dashboard
node on right.

Glyph 04 — "Execution System":
A target/crosshair shape with a single vertical action arrow
piercing through it from top, surrounded by 4 small status
indicator dots. Conveys: detect → decide → act → record loop.

All 4 glyphs must use IDENTICAL line weight, color palette, and
composition rhythm so they read as a coherent set. NO text labels
inside the glyphs (labels live outside in the card UI).
```

---

## 6. HowItWorks Hero Illustration

**Файл:** `public/images/how-it-works.png`
**Размер:** **1400 × 600 px** wide cinematic (~7:3)
**Зачем:** В секции «Хаос на входе. Решение на выходе.» сейчас
CSS-flow diagram (input → core → output). Один сильный atmospheric
illustration сверху flow'а оживит секцию визуально и даст ей вес.
**Уникальная нота:** Это иллюстрация DATA → CORE → OUTPUT процесса в
кинематографичной форме.

```
Eclipse Forge "how the system works" cinematic illustration,
1400×600 wide horizontal panorama (~7:3).

Pure deep black with warm gold dust grain. Soft volumetric light
beams from upper edges.

Composition reads left-to-right as a 3-act sequence:

LEFT THIRD — INPUT (chaos):
Tangled streams of code fragments, signal lines, JSON brackets,
chat-bubble silhouettes drift inward, rendered in faded reddish-
grey + dim cyan, visually noisy and chaotic. Subtle motion blur
on the streams (they ARE moving rightward).

CENTER THIRD — CORE (decision):
A large luminous black sphere (eclipse) fully eclipsed by a thick
warm-gold corona, occupying ~28% of total canvas width. Around it
two thin gold orbital rings at slight tilt, 3-4 small gold orbital
dot-particles. The chaos from the left enters the corona zone and
visibly clarifies — strands of input become structured ordered
gold beams as they pass through.

RIGHT THIRD — OUTPUT (action):
Clean structured horizontal gold lines emerge in disciplined
parallel formation, each line tipped with a tiny dot-marker.
Three labels (rendered as small sub-2-pixel-tall markers, no
actual text needed) suggest endpoints. Soft horizon glow at the
lower-right edge.

A continuous thin gold horizontal axis runs across the entire
panorama at the vertical center, like a process timeline. Three
small dot-markers sit on it at 1/3 and 2/3 marks, suggesting
checkpoints between stages.

NO text labels, NO UI screens, NO HUD overlays. Pure atmospheric
data-flow metaphor. Cinematic mass-effect / Tron-like, but
restrained, no neon overload.
```

---

# ⚪ Tier C — polish (если останется запал)

## 7. Footer Brand Watermark

**Файл:** `public/images/footer-mark.png`
**Размер:** **1200 × 400 px** (3:1)
**Зачем:** Большой faded gold eclipse silhouette за footer'ом — даёт
последний бренд-аккорд при выходе со страницы.
**Уникальная нота:** Очень faded (opacity 0.05 при использовании),
лежит ПОД текстом контактов в footer'е. Не должен забирать внимание.

```
Eclipse Forge footer watermark, 1200×400 horizontal.

Mostly empty pure-black canvas. In the right 40%, a single very
faded eclipse silhouette: black sphere with thin warm-gold
corona ring, rendered at very low overall opacity (the asset
itself should look like 35% opacity already baked in). Sphere
diameter ~280px tall, positioned bottom-right with edges cropping
slightly off the canvas right edge.

NO wordmark text. NO orbital rings. NO additional decoration.
Just a quiet brand mark watermark for layered footer use. The
asset will be additionally CSS-faded to ~5% opacity in production,
so output should be visible-but-soft, not solid.
```

---

## 8. Mobile Hero Alternative

**Файл:** `public/images/hero-mobile.png`
**Размер:** **800 × 1200 px** vertical (2:3)
**Зачем:** На мобайле массивный «FORGE» wordmark скрыт (`@media max-width: 768px`).
Mobile hero сейчас остаётся «спокойным». Сильная вертикальная hero-illustration
дала бы mobile-experience такой же ощутимый punch как desktop.
**Уникальная нота:** Должна работать ВЕРТИКАЛЬНО, eclipse в верхних
40%, центрирование по вертикали для одинокого использования.

```
Eclipse Forge mobile hero atmosphere, 800×1200 vertical (2:3).

Pure deep black with warm gold dust grain. Gentle warm gold
volumetric light from upper-left edge.

Upper 40% of canvas: a centered cinematic eclipse — black sphere
with thick warm-gold corona ring, 2 thin orbital rings, 3 small
orbital dot-particles, soft bloom around the corona. The eclipse
diameter occupies ~55% of canvas width.

Middle 30%: drifting gold particles + 2-3 thin horizontal data-
flow lines fading left-to-right across the canvas at low opacity.

Lower 30%: a soft warm horizon glow + faint silhouette of a
distant mountain ridge or city skyline at the very bottom edge,
rendered in deepest navy. Very subtle, almost invisible — just
suggests "we are at altitude looking out".

NO text, NO wordmark, NO UI elements. Pure mobile hero
atmospheric backdrop that the React UI overlays on top of.
```

---

# 🔵 Tier D — внешние каналы (когда сайт продаёт)

## 9. Telegram Channel Banner

**Файл:** не в репо — для `@EclipseForgeEngine` channel header
**Размер:** **640 × 320 px** (Telegram channel header standard)
**Зачем:** Когда люди заходят в твой канал из реферальной ссылки —
banner это первое что видят. Должен рифмоваться с сайтом.

```
Telegram channel banner for @EclipseForgeEngine, 640×320
horizontal (2:1).

Pure black background with warm gold dust grain. Centered
horizontally:

LEFT 55%: render exactly the text "ECLIPSE FORGE" in big elegant
gold caps serif, letter-spacing wide. Below it in soft warm
white sans-serif, render exactly: "AI Systems Engineering ·
Notes from the Forge". A tiny eclipse mark (black sphere + gold
corona ring) sits to the LEFT of the wordmark.

RIGHT 45%: a cinematic edge-cropped eclipse — black sphere with
warm-gold corona, partially visible from the right edge,
suggesting depth beyond the frame. Subtle gold dust drifts.

Bottom-center: a thin warm-gold hairline horizontal divider with
a single small gold dot in the middle.

NO additional decorative elements. Render Russian-friendly Latin
characters. The banner crops to circular avatar slot on the upper-
left in Telegram UI, so keep the upper-left corner clean (no
critical content there).
```

---

## 10. LinkedIn Personal Header

**Файл:** не в репо — для LinkedIn profile of Pavel Hopson
**Размер:** **1584 × 396 px** (LinkedIn cover photo standard, 4:1)
**Зачем:** В HR-просмотре LinkedIn header — твоя визуальная подпись.
Должен сообщать «I build serious systems», не «random freelancer».

```
LinkedIn personal cover header for Pavel Hopson, 1584×396
horizontal panorama (4:1).

Pure deep black with warm gold dust grain. Volumetric gold light
from upper-left edge.

Composition:
- LEFT 30%: a large cinematic eclipse silhouette (black sphere
  + warm-gold corona ring) positioned slightly off-canvas at the
  left edge, only ~70% visible. 2 thin orbital rings.
- CENTER-LEFT 30%: render exactly the text "ECLIPSE FORGE" in
  big gold caps serif. Below it in warm white sans-serif:
  "Pavel Hopson · AI Systems Engineering". Below that, a thin
  warm-gold hairline. Below the hairline, a small line in muted
  warm white sans-serif: "Калининград · Available for hire"
- RIGHT 40%: a faded constellation pattern — small gold dot-stars
  connected by thin gold lines, suggesting a system map. Drifts
  off the right edge. Three or four nodes in the constellation
  highlighted with slightly brighter gold dots.

LinkedIn crops the avatar circle from the lower-left corner, so
keep that area clean (no critical content in the lower-left 25%).
Render Russian "Калининград" exactly as written.

NO neon, NO photo, NO 3D models. Pure brand panorama.
```

---

## 11. Instagram Square Post Template

**Файл:** не в репо — для @PavelHopson posts about projects
**Размер:** **1080 × 1080 px** (1:1)
**Зачем:** Когда постишь обновление по проекту в IG, square post должен
рифмоваться с сайтом. Это template — реальный текст внутри подменяется
на каждом посте (project name, status и т.д.).
**Уникальная нота:** Это template-вариант, но генерируется как один
конкретный пример. При создании реальных постов в Figma/Canva — берёшь
этот образец и меняешь wordmark на actual project name.

```
Instagram post template for Eclipse Forge project announcements,
1080×1080 square (1:1). This serves as a master template — text
will be swapped per-post in editing software.

Composition matches the project covers (docs/cover-prompts.md
v2.0 style):

- Pure deep black with warm gold dust grain
- Top center: small "ECLIPSE FORGE" wordmark in refined gold
  caps with tiny eclipse mark to its left. Thin warm-gold
  hairline above
- Center stage: large gold elegant serif wordmark — for this
  template render exactly "[ PROJECT NAME ]" in square brackets
  as a placeholder. Below it in warm white sans-serif:
  "[ tagline goes here ]"
- Glassmorphism stat capsule: render exactly
  "STATUS · STACK · METRIC" with gold-dot separators between
- Lower 35% of canvas: subject area for project photography
  (for this template, render a generic atmospheric instrument
  panel with gold ambient light, faint silhouette of sleek
  hardware at the bottom)
- Bottom: thin tech-stack icon row + thin warm-gold hairline

NO actual project name baked in — keep "[ PROJECT NAME ]" as
literal placeholder text. Same color palette as project covers.
```

---

## После генерации — implementation checklist

### Tier A
- [ ] `og-image.png` → положить в `public/`. Обновить `index.html`:
      `<meta property="og:image" content="/Eclipse-forge-website/og-image.png">`
      и `<meta name="twitter:image">` (сейчас оба указывают на `og-image.svg`).
- [ ] `apple-touch-icon.png` → положить в `public/`. Добавить в `index.html`:
      `<link rel="apple-touch-icon" sizes="180x180" href="/Eclipse-forge-website/apple-touch-icon.png">`
- [ ] `favicon.png` → положить в `public/`. Опционально оставить SVG как fallback.
      Заменить favicon link в `index.html` на PNG-вариант.

### Tier B
- [ ] `eclipse-forge-cover.png` → переписать существующий файл в
      `public/images/projects/`. Никаких изменений в коде.
- [ ] `founder-portrait.png` → переписать существующий. Никаких
      изменений в коде.
- [ ] 4 glyph PNG → положить в `public/images/glyphs/` (новая папка).
      Требует правки в [SystemsNotSitesSection.tsx](../src/components/sections/SystemsNotSitesSection.tsx) — заменить
      4 inline SVG на `<img src=...>`. Скажи если будем делать — напишу патч.
- [ ] `how-it-works.png` → положить в `public/images/`. Требует правки в
      [HowItWorksSection.tsx](../src/components/sections/HowItWorksSection.tsx) — добавить hero illustration сверху flow.
      Скажи если будем делать.

### Tier C
- [ ] `footer-mark.png` → положить в `public/images/`. Требует правки в
      [App.tsx](../src/app/App.tsx) (footer block) — добавить позиционированный
      `<img>` с opacity 0.05.
- [ ] `hero-mobile.png` → положить в `public/images/`. Требует
      `@media (max-width: 768px)` ветку в HeroSection.

### Tier D
- [ ] `telegram-banner.png` → загрузить через `@EclipseForgeEngine`
      → Manage Channel → Channel Photo. Не лежит в репо.
- [ ] `linkedin-cover.png` → залить на LinkedIn profile.
- [ ] `instagram-template.png` → сохранить локально как Figma/Canva
      template для будущих постов.

---

## Минимальный набор который реально стоит сделать

Если делать всё лень — **минимум-минимум** который даёт 80% impact'а:

1. **OG image** (Tier A #1) — ОДНА генерация в ChatGPT, сразу же
   обновить `<meta>` в `index.html`. Сразу даёт правильный preview
   при шаринге.
2. **Brand mark square** (Tier A #2) — ОДНА генерация даёт основу для
   favicon + apple-touch-icon. Обновить `index.html`.

Эти двое + замена `<meta>` тегов = **полная technical hygiene + бренд-консистентность**.

Tier B — когда захочется design polish.
Tier C+D — отдельная сессия.

---

_Generated 2026-05-06. Style derived from `docs/cover-prompts.md` v2.0
+ existing covers in `public/images/projects/`. ChatGPT GPT-Image-1 /
DALL·E 3 compatible._

---

# 🔥 Tier E — Brutal Sci-Fi OS Pivot (signature asset + system panels)

> **Direction note:** Tier A-D выше = luxury cosmic landing (warm
> gold + soft cinematic). Tier E = пивот в направлении **brutal sci-fi
> operating system** (black steel, molten metal, orange heat, sharp
> technical glyphs). Они НЕ противоречат друг другу:
> luxury cosmic = backdrop, brutal sci-fi OS = «техническое лицо»
> бренда (signature asset, section panels, glyphs).
>
> Палитра расширяется: pure black + warm gold #D4AF37 + **molten
> orange #FF6A18** + carbon texture overlay + sharp metal bevels.

---

## STYLE LOCK — brutal sci-fi OS layer

> Используй как преамбулу для всех промптов Tier E.

```
Eclipse Forge brutal sci-fi OS visual layer. Combines luxury
cosmic backdrop with hard technical industrial aesthetic.

Material palette:
- Pure black background, optional carbon-fiber texture (very fine
  cross-weave grain, low contrast)
- Black steel surface — matte dark, subtle bevel highlights, faint
  micro-scratches at oblique angles
- Forged metal outer frames with crisp 45° corner bevels
- MOLTEN ACCENT: orange heat glow #FF6A18 / #FF8A2A inside grooves,
  cracks, or core slits — small, surgical, never overwhelming
- Warm gold #D4AF37 / #C9A96E for thin precision lines, orbital
  marks, and corona rings — sparingly
- Cool tech blue accent ALLOWED only as faint signal indicators
  (status dots on panels)

Forms:
- Sharp angles, hexagonal motifs, orthogonal precision
- Small orbital dot-markers (4 per element minimum) at precise
  positions
- Thin technical hairlines, NOT decorative ornament
- Eclipse silhouette + thin gold corona ring as recurring brand
  mark in upper-left or upper-right corners

NO neon overload, NO cyberpunk magenta, NO chrome reflective
mirror surfaces, NO glossy plastic. Think: declassified Lockheed
specs sheet × NASA mission control × Tron Legacy interfaces ×
Tarkov UI. Brutal but precise.
```

---

## 12. ⭐ Forge Core — Signature Asset (master)

**Файлы (одна master-генерация → 3 варианта применения):**
- `public/images/forge-core/master.png` (1024×1024 — master, для downscale)
- `public/images/forge-core/icon-128.png` (128×128 — для UI кнопок, header logo)
- `public/images/forge-core/stamp-64.png` (64×64 — для card corners, status badges)

**Размер для генерации:** **1024 × 1024 px** (потом downsample)
**Зачем:** **Это signature element всего бренда.** Должен повторяться
везде — в логотипе, кнопках, иконках, углах карточек, section headers.
Один узнаваемый «модуль» = моментальная brand recognition.
**Уникальная нота:** Это НЕ logo и НЕ иконка — это самостоятельный
**эмблем-модуль**, как hex-патч на форме космонавта или печать на
declassified документе. Должен работать в любом контексте.

```
Forge Core — Eclipse Forge signature emblem module. 1024×1024
square (1:1).

Pure black background. Centered: a hexagonal forged-metal module
occupying ~78% of canvas width. The hex has 6 sharp 45° bevels at
its corners with subtle metallic rim-light catching the upper-left
edges (warm gold) and a thin orange-hot crack running along the
lower-right bevel (molten heat #FF6A18 glow visible in the crack
seam).

Inside the hexagonal frame, at the center: a small black sphere
fully eclipsed by a thin warm-gold corona ring (Eclipse Forge
brand mark), occupying ~38% of the hex's inner space. The eclipse
has a tiny hot-orange CORE pinpoint at its dead center — a single
glowing dot of molten heat suggesting the forge is burning inside.

Around the central eclipse, INSIDE the hex: 4 small orbital
dot-markers at precise N/S/E/W positions, in warm gold. Between
them, 4 thin technical hairlines connecting the orbital dots
diagonally through the center, forming a fine cross.

Material treatment:
- Hex frame: matte black steel with subtle carbon weave texture
  visible at high res. Faint micro-scratches at 30° angles on
  the upper face. Crisp bevel highlights in dim warm gold.
- Frame thickness: ~6% of hex width
- Inner negative space: deep velvet black, slight inner shadow
  from the hex frame depth

NO text, NO wordmark, NO additional ornaments. The asset must
read clearly at 64×64 (any further detail beyond what's described
will be lost at small sizes — keep it surgical).

Mood: a heat-stamped Forge Module from a sci-fi operations dock.
Tarkov × NASA × Lockheed × molten metal forge.
```

**Использование после генерации:**
- В коде: импортировать как `<img src="/images/forge-core/icon-128.png" />` в header вместо текущего eclipse-dot
- В CSS: использовать как `background-image` на primary-кнопках вместо текущей золотой точки слева
- Поверх card corners: вставлять как маленький watermark-stamp
- На section panel headers (см. ниже Tier E #15): integrated в левый угол каждой панели

---

## 13. Logo v3 — Brutal Square Emblem (alt to Tier A #2)

**Файл:** `public/favicon-brutal.png` (1024×1024 master) →
конвертировать в favicon-набор как Tier A #2
**Размер:** **1024 × 1024 px**
**Зачем:** Альтернатива «soft cosmic» favicon из Tier A #2. Если
выбираешь brutal direction — этот заменяет Tier A #2 полностью.
Эта версия = **eclipse + forge rune + molten metal**, как сказал GPT.

```
Eclipse Forge brutal logo v3 — square emblem, 1024×1024 (1:1).

Pure black background, slight carbon weave texture barely visible.

Centered composition: a square forged-steel plate occupying ~76%
of canvas, with sharp 45° bevel corners that have been struck/
hammered (subtle dent variations on each corner, asymmetric).
The plate's edges are slightly heat-darkened to charcoal-black,
suggesting it was forged.

Top of the plate: a small "forge rune" — a stylized angular glyph
combining a downward arrow (forge stamp direction) with a
horizontal line (anvil), rendered in warm gold engraved into the
steel. ~10% of plate height.

Center of the plate, dominant: a black sphere fully eclipsed by
a thin warm-gold corona ring (the brand mark). The sphere has a
single glowing molten-orange core pinpoint at center (#FF6A18
heat glow), suggesting the forge IS the eclipse — a star being
forged.

Bottom of the plate: a faint horizontal molten-metal seam line
running across the lower 12%, with subtle orange heat glow
escaping through micro-cracks in the seam. This visualizes
metal that just cooled from being poured.

Material treatment:
- Plate surface: matte black steel with very subtle carbon weave,
  uneven micro-scratches at varied angles (forged surface, not
  polished)
- Bevel rims: thin warm-gold light catches at upper-left edges
- Heat seam at bottom: blurred orange-red glow visible in the
  crack, ~3px wide, low intensity
- Forge rune at top: deeply engraved, gold-filled

NO additional text, NO wordmark "ECLIPSE FORGE". Just the emblem.
Must read at 32×32 (so keep forge rune simple, eclipse silhouette
high-contrast).

Mood: a forged badge welded onto a starship hull. Hard, precise,
hot, deliberate.
```

---

## 14. Technical Glyphs v2 (brutal sci-fi, 4 icons)

**Файлы:** заменяют Tier B #5 если выбран brutal direction
- `public/images/glyphs/operator.png` (240×240)
- `public/images/glyphs/automation.png`
- `public/images/glyphs/pipeline.png`
- `public/images/glyphs/execution.png`

**Размер:** **240 × 240 px** каждый (1:1)
**Зачем:** brutal альтернатива cosmic glyphs из Tier B #5. Эти
выглядят как часть HUD космической станции, не как декоративные
иконки.
**Уникальная нота:** Все 4 в **одной сессии**, общий стиль critical.
Каждый glyph должен иметь **молотый orange core glow** в центре —
это якорь Forge Core's "heat" signature.

```
Eclipse Forge technical glyphs — set of 4 matching square sci-fi
HUD icons, 240×240 each, 1:1.

Common style for all four (CRITICAL — must be identical):
- Pure black background, very subtle carbon weave texture
- Each glyph framed by a thin warm-gold square outline (1px equiv),
  with 4 tiny gold orbital dot-markers at corner exteriors (just
  outside the frame)
- Central illustration in warm gold technical line-art (#D4AF37)
  with NO fill — only precise lines, sharp angles, hexagonal joints
- A small molten-orange CORE glow (#FF6A18) at the heart of each
  glyph — single dot ~6% of canvas, with subtle outward bloom
- NO photographic content, NO 3D rendering, pure technical schematic

Glyph 01 — "Operator":
A central hexagonal node radiates 3 thin gold tool-arms outward
(terminal prompt symbol >_, microphone wedge, file folder bracket),
each arm terminating in a small orbital dot-marker. Hot-orange
core inside the central hex. Mood: command HQ topology.

Glyph 02 — "Automation Engine":
A horizontal sequence of 3 hexagonal gears connected by thin gold
data-flow arrows (left → right). Each gear shows internal cog
detail in fine line-art. The middle gear has a hot-orange core
glow. Subtle motion-line indicators on the leftmost gear.

Glyph 03 — "Data Pipeline":
3 stacked horizontal pipe-channels with small gold dot-particles
flowing through them left-to-right (frozen mid-flow). The middle
channel widens into a small hexagonal processor node with hot-
orange core. Suggests ETL flow with pressure.

Glyph 04 — "Execution Loop":
A circular target/crosshair shape with a single vertical gold
action arrow piercing through from top, surrounded by 4 hexagonal
status indicator nodes at N/S/E/W. The center of the target has
a hot-orange core. Conveys: detect → decide → act → record loop.

ALL 4 glyphs share IDENTICAL line weight, color palette, frame
thickness, orbital marker size, and core-glow intensity. They
must read as one HUD icon set, like the bridge controls on a
starship.

NO text labels inside glyphs. Mood: declassified instrument
schematics × Tarkov inventory icons × Mass Effect HUD.
```

---

## 15. Section Panel Headers (4 — system OS panels)

**Файлы:**
- `public/images/panels/core-modules.png` — для блока "Я не делаю сайты"
- `public/images/panels/ai-operators.png` — для блока "Услуги / Точки входа"
- `public/images/panels/interface-layers.png` — для блока "Кейсы"
- `public/images/panels/forge-protocol.png` — для блока "Процесс"

**Размер:** **1400 × 120 px** wide, narrow strip (~12:1)
**Зачем:** Заменяют типичные section eyebrows на маленькие OS-style
panel headers — каждая секция выглядит как **модуль интерфейса**, не
как обычная веб-секция. GPT's exact recommendation.
**Уникальная нота:** Эти 4 файла идут как фоновые headers поверх
section'ов, через CSS. На них есть baked-in technical text + status
indicators.

```
Eclipse Forge OS-style section panel header — 1400×120 horizontal
strip (~12:1 narrow band), 4 variants in matching style.

Common style for all four (must be identical structurally):
- Black steel surface with subtle carbon weave background
- Thin warm-gold hairline running across the top edge AND bottom
  edge of the panel
- LEFT 25%: a small Forge Core hexagonal emblem (~80px tall)
  rendered in matte black steel + warm gold rim + tiny molten-
  orange core
- LEFT 25-50%: large monospace technical title text in warm-white
  uppercase (rendered EXACTLY as specified per variant), with
  thin warm-gold subtitle line below in smaller monospace
- CENTER 50-75%: 5 thin vertical hairline marks suggesting signal
  amplitude readouts (faint warm-gold), with one taller "active"
  bar in molten orange
- RIGHT 75-100%: status indicator block — 3 small status dots
  (one solid gold = "active", two faded = "standby") with
  monospace tech labels exactly: "STATUS · ONLINE"

Variant 01 — Core Modules:
Title text exactly: "CORE MODULES"
Subtitle exactly: "// 04 active modules · system uptime 99.7%"

Variant 02 — AI Operators:
Title exactly: "AI OPERATORS"
Subtitle exactly: "// 05 entry points · execution layer"

Variant 03 — Interface Layers:
Title exactly: "INTERFACE LAYERS"
Subtitle exactly: "// 17 surfaces deployed · live"

Variant 04 — Forge Protocol:
Title exactly: "FORGE PROTOCOL"
Subtitle exactly: "// 04 phases · production discipline"

Render text characters EXACTLY as specified. Use monospace
typography (think JetBrains Mono / Space Mono / Berkeley Mono
aesthetic). No decorative serifs.

NO photographic backgrounds, NO neon, NO 3D models. Pure flat
HUD strip. Mood: software panel header inside a sci-fi command
deck UI.
```

---

## 16. Hero Plate v3 — Brutal Variant (alt to Tier B #3)

**Файл:** `public/images/projects/eclipse-forge-cover-brutal.png`
(новый файл, не заменяет — даёт выбор между двумя направлениями)
**Размер:** **600 × 220 px** landscape
**Зачем:** Brutal-альтернатива hero brand plate. Если переключаешь
сайт на brutal direction, в HeroSection.tsx меняешь ссылку на этот
файл вместо `eclipse-forge-cover.png`.
**Уникальная нота:** Жёстче, материальнее текущего hero plate.

```
Eclipse Forge brutal hero plate, 600×220 horizontal landscape
(~3:1.1).

Black steel surface with subtle carbon weave texture, micro-
scratches at oblique 30° angles on the upper third. Faint
orange-hot crack runs diagonally across the lower-right
quadrant, pulse glow (#FF6A18) visible inside the crack seam.

LEFT 55% of plate:
- Top: small monospace label exactly: "// FORGE_CORE :: ACTIVE"
  in faded warm-white
- Center: render exactly the text "ECLIPSE FORGE" in hard
  geometric sans-serif uppercase, warm-gold, slightly extruded
  with subtle bevel-shadow depth
- Below: thin warm-gold hairline divider with small orbital
  dot-marker at midpoint
- Below the line: small monospace text exactly:
  "Systems > Interfaces · 047.3°"

RIGHT 45% of plate:
- A Forge Core hexagonal emblem (matte black steel + warm-gold
  rim + tiny molten-orange core glow at center) takes up the
  full height of the right side
- Behind it, a faded eclipse silhouette in deep navy as a
  background texture only
- 4 small gold orbital dots at the hex's exterior corners
- Faint scrolling data-stream lines drift behind the hex (very
  low opacity, just subtle motion implication)

NO additional decorative elements. The plate must look like a
metal panel HUD card pulled from a forge dashboard.
```

---

## 17. Brutal Material Sample Pack (CSS textures)

**Файлы:**
- `public/textures/black-steel.png` (1024×1024 tileable)
- `public/textures/carbon-weave.png` (1024×1024 tileable)
- `public/textures/molten-cracks.png` (1024×1024 with transparent alpha)

**Размер:** **1024 × 1024 px** каждый
**Зачем:** Textures для CSS-наложения. Можно применять как
`background-image` поверх существующих секций (e.g. card-shells,
section atmosphere) для material depth. Не самостоятельный visual
element — accessory к остальной системе.
**Уникальная нота:** Эти 3 файла используются ИСКЛЮЧИТЕЛЬНО как
overlays поверх существующих фонов через `mix-blend: overlay /
multiply` в CSS. Не должны иметь композиции — только material grain.

```
Eclipse Forge brutal material texture pack — 3 files, 1024×1024
each, all designed to TILE seamlessly (left edge matches right,
top matches bottom).

Texture 01 — Black Steel:
Pure matte dark surface, slight uneven darkness variation
(forged not polished). Subtle micro-scratches at 30° and -30°
angles, randomly distributed. Few small dents/pits scattered.
Very low contrast — when viewed at 100% it should look like a
dark metal plate close-up. NO gradient, NO single light source —
this is ambient material grain.

Texture 02 — Carbon Weave:
Fine cross-weave pattern of carbon fiber, very low contrast,
near-black with subtle horizontal/vertical hatching at 0.5px
equivalent line width. The weave should be tight and precise,
suggesting industrial composite. NO color, just black-on-darker-
black tonal variation.

Texture 03 — Molten Cracks:
Mostly TRANSPARENT background (alpha channel). Network of
irregular thin cracks across the canvas, with faint warm-orange
glow (#FF6A18) visible inside each crack — as if heated metal
is still cooling. Cracks should be sparse (10-15% canvas
coverage), distributed organically, like a dried mud pattern but
much thinner and more linear. Outside the cracks: alpha
transparent. This will be layered with mix-blend-mode: screen
in CSS.

ALL 3 textures must tile seamlessly — ensure left/right and
top/bottom edges match without visible seam lines.
```

---

## 18. Strip-down Hero Mode *(не imagery — note для кода)*

GPT прав: hero сейчас перегружен (eyebrow, title 2 строки, description,
2 CTA, 3 metric chips, status pill, telemetry HUD, portrait card,
brand plate, FORGE wordmark, 5 parallax слоёв).

Brutal strip-down вариант:

```
[ECLIPSE FORGE]   [ tiny eclipse mark ]

ECLIPSE FORGE
Systems > Interfaces

[ Обсудить задачу ]   [ Смотреть проекты ]

(всё. ни metrics chips, ни status, ни portrait card.
только eclipse + forge core + 1 заголовок + 2 кнопки)
```

Это **код-изменение**, не imagery. Если хочешь — отдельной задачей
сделаю минималистичный hero variant поверх существующего, с toggle.
Не делал в этом проходе чтобы не разрушить текущую композицию без
твоего подтверждения.

---

# Финальная карта Tier'ов

| Tier | Что это | Когда делать |
|---|---|---|
| **A** (3 prompt) | Technical hygiene: OG, favicon, Apple Touch | СРАЗУ — закрывает social-share + browser tabs |
| **B** (4 prompt) | Усиление существующих ассетов | После Tier A, если нужен design polish |
| **C** (2 prompt) | Polish: footer mark, mobile hero | Когда есть запал |
| **D** (3 prompt) | Внешние каналы: Telegram / LinkedIn / IG | Когда сайт начинает ШАРИТЬСЯ |
| **E** (7 prompt) | **🔥 Brutal sci-fi OS pivot** + Forge Core signature asset | Как только готов сделать stylistic-shift |

**Рекомендация если делать ВСЕ за один заход:**

1. **Forge Core master** (Tier E #12) — это THE element всего бренда. Без него нет brand language.
2. **Logo v3 brutal** (Tier E #13) → конвертировать в favicon + apple-touch
3. **OG image** (Tier A #1) — обновить под brutal direction если есть Forge Core
4. **4 technical glyphs** (Tier E #14) — в ОДНОЙ сессии
5. **4 section panel headers** (Tier E #15) — в ОДНОЙ сессии

Это даёт полный brutal sci-fi OS набор за **5 ChatGPT сессий**. Дальше
material textures + footer + social — если есть запал.

Скажи когда готов — я напишу патчи в код для:
- Wiring Forge Core в header instead of plain dot
- Заменить glyphs в SystemsNotSitesSection на новые PNG
- Положить section panel headers поверх section eyebrows
- Toggle минималистичного hero (опционально)
