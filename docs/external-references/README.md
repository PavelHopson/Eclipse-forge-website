# External References

Cherry-picked ассеты из открытых репозиториев под текущий и будущий
дизайн Eclipse Forge. Не подключены автоматически — это **библиотека**,
из которой нужное берётся точечно когда понадобится.

---

## 📂 design-systems/

11 полноценных дизайн-систем в формате DESIGN.md (источник:
[nexu-io/open-design](https://github.com/nexu-io/open-design),
Apache 2.0). Каждая система — это самодостаточный CSS-токен-набор +
типографика + components + use-cases.

**Карта применимости к нашим проектам:**

| Система | Lines | Куда вписать |
|---|---|---|
| `mission-control/` | 473 | **Eclipse Forge Tier E** brutal sci-fi pivot. Amber-on-navy telemetry, monospace, NASA mission control vibe. Прямой эталон для `Forge Core` + section panel headers. |
| `hud/` | 172 | **Eclipse Forge** Tier E technical glyphs, status indicators, telemetry HUD overlays. |
| `trading-terminal/` | 177 | **CryptoPulse 2077** UI redesign — реальный terminal layout с indicators, dense data. |
| `linear-app/` | 370 | **Star CRM admin panels**, **Task Manager**, любой internal tool — эталон clean functional B2B UI. |
| `nvidia/` | 296 | **Eclipse AI Hub / Sentinel** — brand cards для NIM-провайдера; референс по green-on-black tech аесthетике. |
| `openai/` | 140 | **Eclipse AI Hub** — brand card для OpenAI-провайдера; референс по minimal monochrome. |
| `cosmic/` | 71 | **Eclipse Forge текущий стиль** — gold + dark space; ближайший аналог нашего бренда. |
| `premium/` | 71 | **Project covers v2** + **Romark лендинг** — luxury cinematic poster аесthетика. |
| `luxury/` | 71 | **Premium Rent** + любые luxury-вертикали (rent, jewellery, spa). |
| `brutalism/` | 71 | Альтернатива cosmic если когда-нибудь захочется pivot в brutal-direction. |
| `futuristic/` | 71 | Резерв для AI/sci-fi проектов. |

**Как использовать:**

1. Прочитать DESIGN.md выбранной системы — там есть готовые CSS-токены
2. Адаптировать токены под свой проект (заменить hex / typography
   подбором под бренд)
3. **НЕ копировать всю систему целиком** — обычно берётся 30-50% и
   миксуется с brand-specific

Полный набор из 130+ систем — в оригинальном репо
[nexu-io/open-design/design-systems/](https://github.com/nexu-io/open-design/tree/main/design-systems).
Если из 11 cherry-picked не хватило, можно подключить любую другую.

---

## 📂 ../public/images/brand-icons/

39 brand-icon папок (87 SVG-файлов), покрывающих все технологии
из 17 проектов на лендинге. Источник:
[glincker/thesvg](https://github.com/glincker/thesvg), MIT (codebase) +
Fair Use (brand icons).

**Структура каждой папки:**

```
brand-icons/<brand>/
├── default.svg     # цветной brand version (для colored tech rows)
├── mono.svg        # монохромный (gold/white под Eclipse Forge brand)
└── wordmark.svg    # с надписью (опционально, не у всех брендов)
```

**Полный список (39):**

```
anthropic, bun, capacitor, claude, cloudflare, docker, electron,
express, fastapi, framer, gemini, github, grafana, jwt, mcp, nextjs,
npm, nvidia, ollama, openai, openrouter, postgresql, prisma,
prometheus, python, react, redis, rust, stripe, supabase, tailwind,
tauri, telegram, tokio, typescript, vite, vitest, webassembly,
wireguard
```

**Не нашлось в TheSVG (нужно делать вручную или искать у других):**
`recharts`, `loki`, `zustand`, `axum`, `yt-dlp`, `aiogram` — все
ниши-специфичные библиотеки без отдельных brand-pages.

**Когда использовать:**

- **Sidebar / Footer Eclipse Forge** — tech-stack iconography
- **Star CRM admin** — WB/Ozon-related panels (Telegram icon)
- **Romark / zefir footer** — социальные иконки (Telegram, GitHub)
- **Будущие project covers** — реальные SVG вместо AI-generated brand glyphs
  (текущие 17 cover'ов — finalised PNG, не трогаем)

**Использование в коде:**

```tsx
// React (если будем делать reusable component)
import reactIcon from '/Eclipse-forge-website/images/brand-icons/react/default.svg';

<img src={reactIcon} alt="React" width={24} height={24} />
```

Или через `AssetImage` (если будем добавлять brand-iconography в UI):

```tsx
<AssetImage src="images/brand-icons/typescript/mono.svg" alt="TypeScript" />
```

---

## ⚖️ Licensing

| Источник | Licence | Что значит для нас |
|---|---|---|
| Open Design (DESIGN.md) | Apache 2.0 | OK для коммерческого использования + modification + redistribution. Нужно сохранить copyright/notice. |
| TheSVG codebase | MIT | OK для всего. |
| TheSVG brand icons | Fair Use (для identification) | OK использовать для идентификации брендов в tech-stack. **НЕ использовать** в контекстах implying endorsement (на главной «Используют нас Microsoft, Google»). Для каждой иконки в TheSVG есть metadata с `license` (CC0 / MIT / Apache / Fair Use / Proprietary) — проверять если будет prod-критичное использование. |

---

## 🔄 Обновление

Если в Open Design / TheSVG выйдут новые версии (Open Design
обновляется ежедневно), обновить cherry-pick можно так:

```bash
cd E:/projects/external/open-design && git pull
cd E:/projects/external/thesvg && git pull

# Обновить design-systems (заменить файлы):
for s in mission-control hud cosmic premium luxury trading-terminal linear-app nvidia openai brutalism futuristic; do
  cp "E:/projects/external/open-design/design-systems/$s/DESIGN.md" \
     "E:/projects/EclipseForgeLanding/docs/external-references/design-systems/$s/"
done

# Обновить brand-icons — пересобрать через тот же скрипт что в первой сессии.
```

---

_Generated 2026-05-11 by Claude Opus 4.7 (1M context). Cherry-picked
для текущих потребностей Eclipse Forge / Star CRM / Romark / zefir-gift._
