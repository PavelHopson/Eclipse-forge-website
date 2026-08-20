# 30-дневный rollout личного бренда Павла Хопсона

> Статус: `draft_for_owner_review`. Дата: 2026-08-20. Владелец решения: Павел Хопсон.
>
> Документ описывает стратегию, content backlog и ручной social execution plan. Он не
> разрешает подключение аккаунтов, публикацию, outreach, рекламную закупку, оплату или
> изменение production-систем.

## Цель и единственная воронка

Цель первых 30 дней — проверить, приводит ли доказательный инженерный контент к
квалифицированным разговорам и одному ограниченному платному пилоту.

```text
проверяемый инженерный факт или честный эксперимент
  -> reviewed video / carousel / post
  -> AI Project Production Readiness Checklist
  -> квалифицированный запрос
  -> AI Automation Audit
  -> ограниченный implementation pilot или честный no-go
```

Follower count и impressions остаются диагностикой. Главные outcomes: запросы на аудит,
оплаченный пилот, принятый результат и решение `stop / iterate / scale`.

## Evidence boundary: факты и рекламные hooks

| ID | Статус | Разрешённая публичная формулировка | Источник |
| --- | --- | --- | --- |
| `E1` | факт | Павел строит AI-системы, automation и production-ready продукты с human control | [Growth OS positioning](README.md#positioning) |
| `E2` | факт | Production Readiness Checklist существует как открытый материал без email wall | [Checklist](../../../public/guides/ai-project-production-readiness.md) |
| `E3` | факт | Исторические sessions, CTA clicks, downloads и audit requests сейчас `not_available` | [Analytics baseline](../execution/stage-0/analytics-baseline.md) |
| `E4` | факт | Growth Office — первый commercial wedge; audit ведёт к ограниченному implementation pilot | [Business model](../business-model.md) |
| `E5` | факт | Verified template требует owner, version, capability manifest, tests, provenance, license, security review и rollback | [Business model](../business-model.md#4-capability-and-template-ecosystem) |
| `E6` | факт | Публикация, messaging, advertising и payment требуют отдельного human approval | [Business model](../business-model.md#security-and-trust-as-product-features) |
| `E7` | подтверждено владельцем, требует свежего snapshot | Аккаунты имеют малую аудиторию и являются clean slate, а не validated audience | [Social inventory, лист «Соцсети»](https://docs.google.com/spreadsheets/d/1VpEVU34TXIJj_CKwzD8tNhpRYHXt1hUXUv8j9jvB14I/edit) |
| `E8` | visual contract | Lucien Voss — визуальный персонаж Eclipse Hopson, не фотографическое доказательство личности или клиента | owner-provided character sheet; exact asset проходит review |

| Hook / hypothesis | Что запрещено утверждать | Как получить evidence |
| --- | --- | --- |
| «AI video ads сокращают production time» | Нельзя обещать скорость, стоимость, CTR, лиды или продажи | Замерить brief-to-approved-export time, human edits, tool cost и accepted variants на собственном demo |
| «Automation audit найдёт экономию» | Нельзя гарантировать ROI, сокращение штата или конкретную сумму | Зафиксировать baseline процесса, допущения, effort и решение клиента по одному пилоту |
| «Verified templates безопаснее prompts» | Нельзя называть template безопасным только из-за каталога или бренда | Пройти `E5` gate и публиковать exact version, scope, tests и residual risks |
| «AI выполняет работу, а не только отвечает» | Нельзя выдавать planned capability за deployed outcome | Показывать конкретный reproducible workflow, его границы, approval и receipt |

## Аудитории

### Primary ICP на 30 дней

Русскоязычные product owners, founders и небольшие команды, у которых критичный процесс
держится на Telegram, таблицах, ручном переносе данных или несвязанных AI-инструментах.
Первый job-to-be-done: понять, **что автоматизировать, где нужен человек и стоит ли
запускать ограниченный pilot**, не покупая заранее большой AI-проект.

### Secondary audiences

| Аудитория | Проблема | Контент | Следующее действие |
| --- | --- | --- | --- |
| Technical founders / leads | Agent demo не становится надёжным workflow | architecture, permissions, observability, MCP | Описать один процесс для audit qualification |
| Developers | Неясно, готов ли AI prototype к production | checklist, failures, rollback, evals | Открыть Production Readiness Checklist |
| Agencies / consultants | Повторяющуюся работу трудно стандартизировать без потери качества | verified templates, evidence и review gates | Обсудить один client-safe workflow |
| Hiring teams | Нужны доказательства senior-level delivery | build logs, trade-offs, tests, CI/CD | Открыть релевантный repository/case |

Один unit обращается только к одному сегменту. Смешивание developer, buyer и hiring CTA
в одном материале запрещено.

## Пять content pillars

1. **AI systems that execute.** Задача, state, tools, permissions, approval, receipt и
   rollback вместо абстрактного «чат-бота».
2. **AI Automation Audit.** Как выбрать процесс, определить baseline, отсеять плохие
   use cases и сформировать ограниченный pilot.
3. **Production readiness.** Данные, права, evals, security, observability и rollback на
   основе открытого checklist.
4. **AI video ads as a governed experiment.** Brief, script, character/assets, rights,
   review, export и measurement; без обещаний performance до данных.
5. **Verified templates and honest build logs.** Почему prompt не равен продукту; owner,
   version, evidence, tests, license, residual risks и решения Павла.

## Роли каналов

| Канал | Роль | Format / cadence ceiling | CTA |
| --- | --- | --- | --- |
| YouTube `Eclipse Hopson` | Главный proof layer | 2 long-form/demo + до 4 Shorts за 30 дней | Checklist или audit; один CTA на видео |
| Instagram `@pavelhopson` | Визуальное объяснение и доверие | До 4 carousels/Reels; Stories только после approval | Checklist |
| Threads `@pavelhopson` | Проверка thesis и founder voice | До 3 reviewed posts в неделю | Relevant reply или checklist |
| Telegram `@EclipseForgeEngine` | Owned build notes и offer boundary | 1–2 posts в неделю | Checklist / audit по стадии funnel |
| Landing | Единая conversion surface | Checklist, proof и contact path | Квалифицированный запрос |
| GitHub `PavelHopson` | Техническое доказательство | Только релевантный repository/commit | Review evidence |

`@gde_ya_nastoyashiy` остаётся personal space: максимум один естественный bridge за месяц,
без conversion cadence. `@Eclipse_Hopson` остаётся Visual Archive / optional Visual Lab.
Остальные Telegram-каналы, Pinterest и новые аккаунты не входят в first-month cadence до
отдельного owner decision.

## 30-дневная последовательность

| Период | Результат | Gate |
| --- | --- | --- |
| Дни 1–3 | Свежий manual baseline каналов, campaign ID, evidence register и exact audit scope | Никакого контента без source и owner |
| Дни 4–7 | Пакет `U01–U05`, voice, Lucien disclosure и mobile preview | Павел утверждает exact text, asset, account, link и timing |
| Дни 8–14 | Пакет `U06–U10`, checklist path и audit qualification script | Metrics без источника остаются `not_available` |
| Дни 15–21 | Пакет `U11–U14`; при отдельном разрешении — один paid Telegram placement | Price, channel, disclosure, creative, UTM и budget утверждаются отдельно |
| Дни 22–27 | Conversion unit `U15`, follow-up только на входящие запросы | Никакого cold outreach или автоматического сообщения |
| Дни 28–30 | 24h/7d snapshots и решение `stop / iterate / scale` | Не масштабировать spend или cadence автоматически |

## Первые 15 content units

Все units начинаются в статусе `idea` или `draft`; таблица не является publication queue.

| ID | Pillar / stage | Hook — не факт сам по себе | Format и channel | Evidence до approval | CTA | KPI |
| --- | --- | --- | --- | --- | --- | --- |
| `U01` | Systems / awareness | «AI — не чат-бот: ответ модели ещё не выполненная работа» | YouTube 3–5 min | `E1`, concrete workflow screen/receipt | Checklist | qualified views, visits |
| `U02` | Systems / awareness | «Пять шагов между prompt и реальным результатом» | YouTube Short / Reel | approved `U01` | Checklist | completion, visits |
| `U03` | Readiness / consideration | «Пять причин не выпускать AI feature в production» | Instagram carousel | `E2`, exact checklist sections | Checklist | saves, downloads |
| `U04` | Readiness / awareness | «Чаще ломается не модель, а граница процесса» | Threads founder opinion | one public Eclipse example; opinion label | Checklist | qualified replies |
| `U05` | Readiness / consideration | «Как пройти checklist без самообмана» | Telegram deep dive | `E2`, no-certification note | Checklist | opens, downloads |
| `U06` | Systems / consideration | «Что должен хранить Content Command Center» | YouTube screen demo | verified current UI capture; no planned screens | Checklist | completion, visits |
| `U07` | Systems / awareness | «AI готовит → Павел подтверждает → система публикует» | Short / Reel | approval boundary `E6` | Checklist | completion, profile visits |
| `U08` | Audit / consideration | «Что клиент получает из AI Automation Audit» | Instagram carousel | scope, exclusions, acceptance criteria | Audit request | qualified messages |
| `U09` | Audit / awareness | «Automation audit начинается с процесса, не с модели» | Threads | `E4`; founder thesis | Audit request | qualified replies |
| `U10` | Audit / conversion | «Один процесс, три use cases, один pilot decision» | Telegram offer | price hypothesis, capacity, no-ROI promise | Audit request | scoped requests |
| `U11` | Video ads / awareness | «Как собрать AI video ad без чёрного ящика» | YouTube/Short demo | own timings, costs, rights и review log | Checklist | completion, visits |
| `U12` | Video ads / consideration | «Brief → script → Lucien → review → export» | Instagram carousel | own pipeline and Lucien disclosure | Checklist | saves, visits |
| `U13` | Video ads / trust | «Красивый AI-ролик ещё не доказывает рекламу» | Threads | explicit absence of CTR/sales evidence | Reply with use case | relevant replies |
| `U14` | Templates / consideration | «Prompt — не template: семь обязательных gates» | Carousel + Telegram | `E5`, exact seven fields | Checklist | saves, downloads |
| `U15` | Audit / conversion | «Открываю ограниченный AI Automation Audit pilot» | One owner-selected surface first | offer, price, capacity, terms | Audit request | requests, paid pilot |

`U15` публикуется только после проверки delivery capacity. «Ограниченный» описывает
реальную ручную вместимость, а не искусственную срочность.

## Repurposing contract

| Source pack | Производные units | Что сохраняется | Что меняется |
| --- | --- | --- | --- |
| `U01` flagship | `U02`, `U04`, часть `U07` | thesis, evidence boundary, CTA stage | hook, length, crop, captions |
| `U03` checklist | `U05`, часть `U14` | exact checklist language и disclaimer | examples и depth |
| `U06` product demo | `U07` | current behavior и approval boundary | one-screen short story |
| `U08` audit scope | `U09`, `U10`, `U15` | inclusions, exclusions, acceptance criteria | funnel stage и CTA |
| `U11` video experiment | `U12`, `U13` | measured production log и rights note | breakdown vs limitation post |

Repurposing — новая редактура под канал, не механический cross-post. Новая цифра, client
outcome, capability или comparison возвращает derivative в Claims Review.

## AI Automation Audit: paid-pilot offer

**Объект:** один повторяющийся business workflow, выбранный до оплаты.

**Вход:** 60–90 minute intake, sanitized process artifacts и только явно переданные
клиентом материалы.

**Выход за 5 рабочих дней:**

1. current-state process map и baseline gaps;
2. до трёх opportunity cards с value hypothesis, data needs, permissions, risks и effort;
3. ranking по impact / feasibility / risk без выдуманного ROI;
4. one-page specification одного bounded pilot;
5. decision memo: `pilot / collect evidence / do not automate`;
6. 60-minute handoff.

**Exclusions:** production access, implementation, legal/privacy/security certification,
гарантированная экономия, сокращение персонала, advertising performance и бессрочный support.

**Price hypothesis:** `25,000–50,000 RUB`. Перед публикацией Павел выбирает одну точную
цену и подтверждает налоги, оплату, capacity и refund/cancellation terms. Диапазон не
является market evidence или обещанием выручки.

Запрос qualified, если известны owner процесса, частота, текущий ручной путь, цена
ошибки/задержки, данные, ограничения и готовность принять решение по одному pilot.
«Хотим внедрить AI везде» без процесса не считается audit-ready lead.

```text
U03/U05/U14 -> Checklist
  -> landing contact path
  -> manual qualification
  -> exact scope + fixed price + acceptance criteria
  -> отдельное подтверждение оплаты
  -> audit delivery
  -> acceptance / changes
  -> implementation proposal или no-go
```

Ни один draft, просмотр или download не запускает сообщение, invoice или follow-up.

## Optional paid Telegram placement

Это proposal, не разрешение на закупку. До отдельного owner approval проверяются URL,
тема, язык, geography, median views последних 10 обычных posts, audience fit, anomaly
signals, цена, рекламная маркировка, два прошлых размещения, exact creative и unique UTM.

Budget hypothesis: `5,000–10,000 RUB total` на один micro-test. Продолжение возможно,
только если attribution работает и появился минимум один qualified conversation. CTR без
дальнейшего действия не является основанием для scale.

## UTM и attribution

Используется существующий [UTM v1 contract](../execution/stage-0/analytics-baseline.md#utm-naming-v1):

- `utm_source`: `youtube`, `instagram`, `threads`, `telegram`, `github`;
- `utm_medium`: `organic-social`, `profile`; для отдельно утверждённого размещения
  `paid-placement`;
- `utm_campaign`: `pavel-brand-30d-2026-08`;
- `utm_content`: `<unit-id>-<format>-v<variant>`, например `u03-checklist-carousel-v1`;
- `utm_term`: отсутствует.

```text
https://eclipse-forge.ru/?utm_source=instagram&utm_medium=organic-social&utm_campaign=pavel-brand-30d-2026-08&utm_content=u03-checklist-carousel-v1
```

| Aggregate ledger field | Правило |
| --- | --- |
| `unitId`, channel, exact URL, publishedAt | Только после manual publication |
| evidence IDs и approved version | Изменение после approval создаёт новую version |
| production minutes и direct cost | AI/tool cost и human review time отдельно |
| impressions/reach, saves, replies | Только доступный platform snapshot |
| tagged visits и downloads | `not_available`, пока нет approved instrumentation |
| conversations, audit requests, paid pilots | Manual weekly aggregate без message body и PII |
| placement cost | Только фактически подтверждённая сумма |

Нельзя считать conversion без надёжного denominator. Self-reported source — directional
evidence, не точная attribution.

## KPI и decision thresholds

Это thresholds эксперимента, не прогноз аудитории или выручки.

### Guardrails

- 100% публикаций и рекламы имеют exact human approval;
- 100% factual claims имеют source или помечены как hypothesis/opinion;
- 0 fabricated clients, testimonials, revenue, ROI или performance results;
- 0 autonomous publications, DMs, payments и account connections;
- 0 private message bodies, credentials или personal data в records;
- Lucien Voss обозначается как visual character, когда его можно принять за реальное
  фото или видео Павла.

### 30-day continue threshold

- 12–15 approved units готовы; фактическая публикация зависит от manual approvals;
- минимум 50 tagged landing sessions после появления валидного source;
- минимум 15 checklist downloads/opens с валидным source;
- минимум 5 qualified conversations;
- минимум 2 scoped audit requests;
- минимум 1 paid audit pilot;
- target human editing time после calibration: до 20 минут на derivative unit.

Если instrumentation не готова, traffic/download остаются `not_available`, а решение
принимается по qualified conversations, audit requests, costs и review burden.

- **Stop format:** два выпуска после достаточного reach не дают relevant reply,
  checklist action или qualified conversation.
- **Iterate:** тема вызывает вопросы, но CTA не срабатывает или review слишком дорог.
- **Scale:** повторный format/offer дал attributable qualified action при приемлемых cost
  и review time; scale требует нового owner decision.

## Approval gate

```text
Finding -> Brief -> Draft -> Claims + rights review -> Pavel exact approval
  -> Manual publication -> 24h snapshot -> 7d snapshot -> Stop / iterate / scale
```

Перед approval проверяются:

1. audience, funnel stage, один CTA и один `unitId`;
2. source, checked date, rights и fact/hypothesis/hook boundary;
3. отсутствие secrets, PII, client data и private repository evidence;
4. exact account, text, asset, captions, link, UTM, disclosure и timing;
5. Lucien Voss identity consistency и disclosure;
6. для offer — price, scope, exclusions, capacity, payment и acceptance criteria;
7. для paid placement — channel, price, budget cap и ad disclosure.

Approval инвалидируется при изменении текста, asset, destination, account, price, budget
или timing. Молчание и timeout означают denial. Standing approval отсутствует.

## Roadmap state и owner decisions

- [x] Зафиксированы funnel, audiences, five pillars, channel roles и 15 units.
- [x] Определены repurposing, UTM, aggregate attribution и approval boundary.
- [x] AI video ads, audit value, price и paid placement отделены как hypotheses.
- [ ] Павел утверждает или меняет Primary ICP.
- [ ] Павел выбирает точную цену pilot или откладывает её.
- [ ] Павел утверждает first pack `U01–U05` и publishing order.
- [ ] Владелец решает: privacy-reviewed Landing instrumentation или manual first cycle.
- [ ] Paid Telegram micro-test остаётся запрещённым до отдельного exact approval.

