# DESIGN.md

## Project

`EclipseForgeLanding` — флагманский студийный сайт Eclipse Forge.

Это не просто лендинг, а витрина инженерного бренда:
- показывает уровень мышления
- продаёт сложные AI / fullstack / systems проекты
- должен отличаться от обычных агентских сайтов
- должен ощущаться как студия, которая строит серьёзные системы, а не “делает сайты под ключ”

## Brand Positioning

Eclipse Forge — это:
- инженерная студия
- AI-first
- systems-minded
- premium
- precise
- dark, cinematic, deliberate

Сайт должен создавать ощущение:
- глубины
- технологической силы
- дисциплины
- уверенного архитектурного мышления

Ключевая идея:
- `Cinematic systems engineering`

## Audience

Основные сегменты:
- founders и продуктовые команды
- заказчики сложных AI-систем
- клиенты, которым нужен сильный fullstack / infrastructure partner
- технически грамотные люди, которые быстро замечают superficial agency fluff

Им важно:
- понять уровень студии по первому экрану
- увидеть реальные кейсы и стек
- почувствовать надёжность
- увидеть, что команда умеет не только в UI, но и в architecture / tests / delivery

## Visual Thesis

Интерфейс должен выглядеть как тёмная, кинематографичная, высокотехнологичная среда с космической метафорой, но без sci-fi-китча.

Это не “space theme ради space theme”.
Космический язык нужен как визуальная метафора:
- гравитации
- силы
- глубины
- системности

Сайт должен ощущаться как:
- premium editorial
- product launch page
- engineering showcase

Не как:
- generic SaaS landing
- AI slop with purple gradients
- over-decorated agency page

## Visual System

### Color Direction

Базовый dark theme:
- `--bg: #05070A`
- `--bg-card: #0C1117`
- `--text-1: #F2F5F9`
- `--text-2: #C4CED8`
- `--line: #1C2536`
- `--accent: #6BA3FF`
- `--accent-warm: #F5A623`

Базовый light theme:
- `--bg: #F5F2EB`
- `--bg-card: #FFFFFF`
- `--text-1: #07070A`
- `--text-2: #1F1F24`
- `--line: #D4D0C6`
- `--accent: #1E56E8`
- `--accent-warm: #B45309`

Правила:
- главный акцент — холодный синий
- тёплый янтарный используется как вторичный контраст
- акценты не должны спорить
- нельзя скатываться в фиолетовую AI-эстетику по умолчанию
- цвет должен поддерживать ощущение премиальной инженерии

### Typography

Каноническая связка:
- `Outfit` — display / headings
- `Inter` — body / UI
- `DM Sans` — supportive body fallback

Правила:
- крупные заголовки плотные, короткие, ударные
- типографика должна быть спокойной, дорогой и точно выстроенной
- большой display не должен превращаться в крик
- техническая мета-информация может быть компактной, но не “терминальной ради терминала”

## Layout Rules

### Hero

Hero — это poster.

Hero должен:
- мгновенно передавать уровень студии
- иметь одну сильную визуальную идею
- продавать не “услуги вообще”, а capability строить сложные системы
- показывать depth через motion, composition и headline

Hero не должен:
- быть собран из карточек
- превращаться в dashboard
- перегружаться параллельными сообщениями
- конкурировать сам с собой по акцентам

### Sections

У каждой секции одна задача:
- `Hero`: бренд и уровень
- `Services`: чем именно сильны
- `Metrics`: доказательства и масштаб
- `Cases`: реальные кейсы и breadth
- `Process`: как работает студия
- `About`: философия и доверие
- `CTA`: понятный финальный вход

Нельзя:
- повторять один и тот же message разными словами
- делать секции “для красоты”
- плодить псевдо-премиальные карточки без смысловой нагрузки

## Composition Rules

- prefer long horizontal rhythms over random card mosaics
- воздух должен быть deliberate, а не пустым
- асимметрия допустима, но контролируемая
- один сильный visual anchor на секцию
- section transitions должны ощущаться как cinematic pacing, не как набор блоков из конструктора

## Components

### Buttons

Кнопки:
- спокойные
- tactile
- premium
- заметные, но не кричащие

Primary CTA:
- glowing accent
- мягкое, но уверенное свечение

Secondary CTA:
- outline / ghost
- строгий, инженерный характер

Нельзя:
- candy gradients
- жирный SaaS-глянец
- oversized cartoon CTA

### Cards

Карточки допустимы, только если:
- это кейс
- сервис
- метрика
- proof block

Карточка должна ощущаться как:
- structured module
- content surface

Не как:
- случайный decorative panel

### Theme Toggle

Light theme — не вторичный режим “для галочки”.
Он должен оставаться:
- дорогим
- читабельным
- editorial

Нельзя:
- терять контраст
- превращать сайт в стерильный белый шаблон

## Imagery and Visual Effects

Главный визуальный язык:
- eclipse
- orbital rings
- black hole physics
- particles
- glow
- subtle grid lines

Но это не должно выглядеть как:
- gamer sci-fi
- cheap 3D
- NFT-era visual clutter

Правила:
- VFX всегда обслуживают hierarchy
- motion и glow подчеркивают структуру, а не заменяют её
- если отключить эффекты, сайт всё равно должен выглядеть премиально

## Motion

Motion здесь обязателен, но только осмысленный.

Допустимо:
- kinetic word reveal
- depth parallax
- subtle scroll transforms
- ring / particle ambient movement
- calm CTA hover

Недопустимо:
- noisy perpetual animation
- motion, мешающий чтению
- дешёвые bounce / spring ради show-off

Принцип:
- motion creates presence, not spectacle

## Copy

Тон:
- уверенный
- инженерный
- не занудный
- не рекламно-крикливый
- не generic agency copy

Copy должен звучать как:
- люди, которые действительно строят системы
- люди, которые тестируют, релизят, документируют и доводят до production

Copy не должен звучать как:
- “мы делаем инновационные решения для роста бизнеса”
- “digital transformation partner”
- “будущее уже здесь”

Хорошо:
- конкретика
- стек
- тесты
- масштабы
- реальные результаты

Плохо:
- vague promises
- inflated AI buzzwords
- одинаковые формулировки в каждой секции

## Cases Section

Кейсы — ядро доверия.

Правила:
- featured cases должны быть действительно лучшими
- остальные кейсы должны быть логично сгруппированы
- карточки должны быстро отвечать на 4 вопроса:
  - что это
  - для кого
  - какой стек
  - какой результат

Нельзя:
- делать 31 одинаковую карточку без иерархии
- смешивать reference / concept / live как будто это один уровень зрелости

## Do

- показывай инженерную силу через структуру
- используй настоящий technical proof
- держи визуальную систему дисциплинированной
- создавай ощущение high-end studio
- строй композицию от visual anchor, а не от списка компонентов
- держи кейсы в центре narrative

## Avoid

- generic agency gradients
- overloaded glassmorphism
- purple-on-black AI clichés
- карточки ради карточек
- лишнюю терминальность
- “too much motion”
- copy, которую можно вставить в любой SaaS-сайт

## Mobile Behavior

На mobile сайт должен:
- сохранять ощущение премиальности
- не терять visual anchor hero
- держать headline читаемым
- быстро выводить кейсы и CTA

На mobile нельзя:
- ломать hero из-за oversized motion
- прятать смысл в длинных блоках текста
- превращать studio site в длинную скучную простыню

## Definition of Done

Новый экран или секция считаются удачными, если:
- сайт по первому экрану ощущается сильнее типовой агентской витрины
- визуальный язык узнаваем как Eclipse Forge
- dark и light theme одинаково премиальны
- кейсы читаются как evidence, а не как шум
- motion усиливает hierarchy
- без эффектов сайт всё равно остаётся сильным
