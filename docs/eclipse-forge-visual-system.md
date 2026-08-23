# Eclipse Forge Visual System v1

> Канонический визуальный и motion-контракт экосистемы. Источник истины — этот репозиторий,
> а machine-readable tokens публикуются из `public/design-system/eclipse-forge.tokens.json`.

## Идея бренда

`Cinematic systems engineering`: глубокая тёмная среда, точная инженерная структура,
тонкая золотая corona и холодный синий signal-light. Космическая метафора показывает
гравитацию, глубину и системность; она не должна превращать продукты в sci-fi декорацию.

## Неподвижные правила

- фон: почти чёрный, без фиолетового AI-клише;
- основной акцент: warm gold; cool blue используется как сигнал и ambient light;
- display: Outfit, body/UI: Inter, technical meta: JetBrains Mono или системный monospace;
- eclipse mark, orbital lines, grid, dust и controlled glow — повторяемые signature primitives;
- длинные горизонтальные ритмы важнее случайной мозаики карточек;
- одно главное действие на экран; motion усиливает hierarchy, а не заменяет её;
- без VFX интерфейс остаётся читаемым и премиальным;
- `prefers-reduced-motion` обязателен, touch/mobile не получают mouse parallax.

## Профили интенсивности

### `cinematic`

Для Landing, project showcase и campaign pages. Разрешены poster hero, parallax глубины,
ambient orbit, kinetic reveal и мягкий cursor light. Одновременно двигаются не более двух
крупных смысловых слоёв.

### `product`

Для Eclipse Library, AI Hub, DnD Forge, Media и пользовательских кабинетов. Сохраняются
tokens, eclipse mark, grid, section reveal, focus/hover feedback и один ambient visual anchor.
Исключаются постоянный cursor trail, сильный 3D tilt и тяжёлый scroll parallax вокруг данных.

### `operational`

Для Chat, Sentinel, CRM/admin и плотных рабочих экранов. Бренд выражается цветом,
типографикой, focus states, telemetry meta и точными переходами 120–240 ms. Постоянная
атмосферная анимация не используется рядом с таблицами, формами и incident surfaces.

## Motion primitives

| Primitive | Назначение | Параметры |
|---|---|---|
| `forge-reveal` | появление новой смысловой поверхности | 16–24 px, 560–800 ms, ease-out |
| `forge-lift` | hover интерактивной карточки | 2–6 px, 180–260 ms |
| `forge-signal` | progress/status line | linear или calm ease, без bounce |
| `forge-orbit` | единственный ambient anchor | 28–80 s, low contrast |
| `forge-focus` | keyboard focus | 2 px blue/gold ring, без задержки |
| `forge-feedback` | success/error/selection | 120–220 ms, без layout shift |

## Tokens

Канонические значения лежат в
[`public/design-system/eclipse-forge.tokens.json`](../public/design-system/eclipse-forge.tokens.json).
Проекты копируют versioned snapshot в собственный build; runtime-import с лендинга запрещён,
чтобы недоступность главного сайта не ломала остальные продукты.

## Rollout gate для каждого проекта

1. Выбрать `cinematic`, `product` или `operational`.
2. Сопоставить существующие semantic tokens, не переписывая продуктовую логику.
3. Добавить только подходящие motion primitives.
4. Проверить loading, empty, error, success, disabled и focus states.
5. Проверить desktop, mobile, keyboard и `prefers-reduced-motion`.
6. Зафиксировать screenshot baseline и performance delta.

Нельзя массово подключать Framer Motion/GSAP только ради единообразия. CSS transitions
остаются предпочтительными для operational surfaces; новые зависимости проходят отдельный
supply-chain и bundle review.

## Reusable guidance для Eclipse Media

Media использует профиль `product`, а не копирует cinematic Landing целиком.

- Главный media artifact остаётся самым контрастным объектом; chrome, очередь и metadata
  визуально отступают назад.
- В одном viewport допускается один signal-light: progress, active job или selected artifact.
  Gold обозначает primary action или подтверждённый результат, blue — состояние и навигацию.
- Карточка artifact обязана без hover показывать имя, формат/источник, состояние и следующий
  доступный action. Hover может усиливать preview, но не раскрывать единственный путь к действию.
- Для длинных списков использовать спокойные горизонтальные строки; poster-композиция уместна
  только для empty state, first-run или финального preview.
- Motion: `forge-reveal`, `forge-focus`, `forge-feedback`; один `forge-orbit` допустим только в
  пустом состоянии. Cursor trails, 3D tilt и scroll parallax вокруг progress/queue запрещены.
- Keyboard focus эквивалентен hover, touch targets не меньше 44×44 px, mobile не зависит от
  pointer position. При `prefers-reduced-motion` и ручной паузе все ambient/transform effects
  становятся статичными без потери информации.
- Любой внешний UI reference сначала проходит provenance, license, dependency/bundle,
  accessibility, keyboard, reduced-motion и mobile gates. Skiper UI, AnimMaster, Oceon и
  Vlipsy — только visual references; их код не переносится.

## Матрица характера продуктов v2

Общие tokens не означают одинаковую композицию. Каждый продукт получает один основной
характер и один поддерживающий приём; декоративные эффекты не переносятся между продуктами
автоматически.

| Продукт | Основной характер | Поддерживающий приём | Ограничение |
|---|---|---|---|
| Eclipse Forge Landing | Editorial + oversized type | Lightweight 3D | только полировка существующей композиции |
| Eclipse Library | Bento knowledge system | Editorial hierarchy | без тяжёлого 3D вокруг каталога |
| Eclipse Chat | Minimal operational UI | selective Liquid Glass | glass только для временных overlays |
| Eclipse AI Hub | Bento workspace | restrained Y2K signals | neon не конкурирует с данными |
| Eclipse DnD Forge | Editorial fantasy | Lightweight 3D | depth только на world/campaign surfaces |
| Hopson Sentinel | Minimal operational UI | precise futurist signals | без decorative parallax |
| Eclipse Media | Production Bento | Lightweight spatial depth | артефакт важнее chrome |
| Shotforge | Editorial studio | Lightweight spatial depth | motion поддерживает story flow |
| Text2Image | Minimal studio | restrained Y2K signals | без повсеместного glass |
| Educator-AI | Editorial learning | Bento modules | ясность обучения важнее wow-effects |
| Growth OS | Bento operations | Editorial reports | approvals и KPI всегда первичны |
| Animation Lab | Y2K showcase | Liquid Glass + 3D demos | отдельная песочница, не шаблон продукта |

Neo-Brutalism остаётся ограниченным приёмом для промо-экспериментов, DnD handouts и
специальных коллекций Library. Он не становится базовой темой экосистемы.