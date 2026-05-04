import { useLocale, type Locale } from '../lib/locale';

export type ProjectStatus = 'live' | 'beta' | 'prototype' | 'concept' | 'reference';

export interface ImageAsset {
  alt: string;
  sources: string[];
  objectPosition?: string;
}

export interface Project {
  title: string;
  systemType: string;
  status: ProjectStatus;
  description: string;
  tech: string[];
  result: string;
  signal: string;
  tags: string[];
  ecosystemTags?: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: ImageAsset;
}

export interface ProjectCollection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  projects: Project[];
}

export interface ServiceEntryPoint {
  title: string;
  cue: string;
  description: string;
  audience: string;
  result: string;
}

export interface FounderProfile {
  eyebrow: string;
  title: string;
  summary: string[];
  pillars: string[];
  stats: Array<{ value: string; label: string }>;
  portrait: ImageAsset;
  supportVisual: ImageAsset;
}

export interface SystemsEcosystemIntro {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  categories: string[];
}

export interface ProcessStep {
  index: string;
  title: string;
  text: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface ContactPrompt {
  label: string;
  prompt: string;
  placeholder: string;
}

export interface ContactFlow {
  primaryCta: string;
  secondaryCta: string;
  status: string[];
}

export interface SiteContent {
  featuredProjects: Project[];
  allProjects: Project[];
  portfolioCollections: ProjectCollection[];
  serviceEntryPoints: ServiceEntryPoint[];
  processSteps: ProcessStep[];
  metrics: Metric[];
  founderProfile: FounderProfile;
  systemsEcosystemIntro: SystemsEcosystemIntro;
  systemsEcosystemProjects: Project[];
  contactPrompts: ContactPrompt[];
  contactFlow: ContactFlow;
}

type Localized<T> = Record<Locale, T>;

interface LocalizedProjectDefinition {
  title: string;
  systemType: Localized<string>;
  status: ProjectStatus;
  description: Localized<string>;
  tech: string[];
  result: Localized<string>;
  signal: Localized<string>;
  tags: Localized<string[]>;
  ecosystemTags?: Localized<string[]>;
  liveUrl?: string;
  repoUrl?: string;
  image?: ImageAsset;
}

interface LocalizedProjectCollectionDefinition {
  id: string;
  eyebrow: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  projects: LocalizedProjectDefinition[];
}

interface LocalizedServiceEntryPointDefinition {
  title: Localized<string>;
  cue: string;
  description: Localized<string>;
  audience: Localized<string>;
  result: Localized<string>;
}

interface LocalizedProcessStepDefinition {
  index: string;
  title: Localized<string>;
  text: Localized<string>;
}

interface LocalizedFounderProfileDefinition {
  eyebrow: Localized<string>;
  title: Localized<string>;
  summary: Localized<string[]>;
  pillars: Localized<string[]>;
  stats: Localized<Array<{ value: string; label: string }>>;
  portrait: ImageAsset;
  supportVisual: ImageAsset;
}

interface LocalizedSystemsEcosystemIntroDefinition {
  eyebrow: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  note: Localized<string>;
  categories: Localized<string[]>;
}

interface LocalizedMetricDefinition {
  value: string;
  label: Localized<string>;
}

interface LocalizedContactPromptDefinition {
  label: string;
  prompt: Localized<string>;
  placeholder: Localized<string>;
}

interface LocalizedContactFlowDefinition {
  primaryCta: Localized<string>;
  secondaryCta: Localized<string>;
  status: Localized<string[]>;
}

const locales: Locale[] = ['ru', 'en'];

const localized = <T,>(ru: T, en: T): Localized<T> => ({ ru, en });

const projectImage = (primary: string, secondary: string, alt: string, objectPosition = 'center'): ImageAsset => ({
  alt,
  objectPosition,
  sources: [`/images/projects/${primary}.png`, `/images/projects/${secondary}.png`],
});

const founderSources = [
  '/images/projects/founder-portrait.png',
  '/images/ChatGPT Image 4 \u043c\u0430\u044f 2026 \u0433., 14_54_55.png',
];

const founderDeskSources = [
  '/images/projects/founder-portrait.png',
  '/images/ChatGPT Image 4 \u043c\u0430\u044f 2026 \u0433., 14_42_15.png',
];

const founderSeatedSources = [
  '/images/projects/founder-portrait.png',
  '/images/ChatGPT Image 4 \u043c\u0430\u044f 2026 \u0433., 14_56_29.png',
];

export const brandAssets = {
  heroPlate: {
    alt: 'Eclipse Forge brand plate',
    sources: ['/images/projects/eclipse-forge-cover.png'],
    objectPosition: 'center',
  },
  founderAvatar: {
    alt: 'Founder portrait of Pavel Hopson',
    sources: founderSources,
    objectPosition: 'center top',
  },
  founderDesk: {
    alt: 'Pavel Hopson at the operator desk',
    sources: founderDeskSources,
    objectPosition: 'center top',
  },
  founderPortrait: {
    alt: 'Portrait of Pavel Hopson',
    sources: founderSources,
    objectPosition: 'center top',
  },
  founderSeated: {
    alt: 'Pavel Hopson seated portrait',
    sources: founderSeatedSources,
    objectPosition: 'center top',
  },
} as const;

export const contactDetails = {
  email: 'hopsintoxin@mail.ru',
  telegramDm: '@EclipseHopson',
  telegramDmUrl: 'https://t.me/EclipseHopson',
  telegramChannel: '@EclipseForgeEngine',
  telegramChannelUrl: 'https://t.me/EclipseForgeEngine',
  githubUrl: 'https://github.com/PavelHopson',
  githubHandle: 'PavelHopson',
  instagramUrl: 'https://instagram.com/PavelHopson',
  instagramHandle: '@PavelHopson',
} as const;

function materializeProject(locale: Locale, definition: LocalizedProjectDefinition): Project {
  return {
    title: definition.title,
    systemType: definition.systemType[locale],
    status: definition.status,
    description: definition.description[locale],
    tech: definition.tech,
    result: definition.result[locale],
    signal: definition.signal[locale],
    tags: definition.tags[locale],
    ecosystemTags: definition.ecosystemTags?.[locale],
    liveUrl: definition.liveUrl,
    repoUrl: definition.repoUrl,
    image: definition.image,
  };
}

function materializeCollection(locale: Locale, definition: LocalizedProjectCollectionDefinition): ProjectCollection {
  return {
    id: definition.id,
    eyebrow: definition.eyebrow[locale],
    title: definition.title[locale],
    description: definition.description[locale],
    projects: definition.projects.map((project) => materializeProject(locale, project)),
  };
}

function materializeService(locale: Locale, definition: LocalizedServiceEntryPointDefinition): ServiceEntryPoint {
  return {
    title: definition.title[locale],
    cue: definition.cue,
    description: definition.description[locale],
    audience: definition.audience[locale],
    result: definition.result[locale],
  };
}

function materializeStep(locale: Locale, definition: LocalizedProcessStepDefinition): ProcessStep {
  return {
    index: definition.index,
    title: definition.title[locale],
    text: definition.text[locale],
  };
}

function materializeFounderProfile(locale: Locale, definition: LocalizedFounderProfileDefinition): FounderProfile {
  return {
    eyebrow: definition.eyebrow[locale],
    title: definition.title[locale],
    summary: definition.summary[locale],
    pillars: definition.pillars[locale],
    stats: definition.stats[locale],
    portrait: definition.portrait,
    supportVisual: definition.supportVisual,
  };
}

const featuredProjectDefinitions: LocalizedProjectDefinition[] = [
  {
    title: 'Eclipse Valhalla',
    systemType: localized('ПОВЕДЕНЧЕСКАЯ СИСТЕМА', 'BEHAVIORAL SYSTEM'),
    status: 'live',
    description: localized(
      'Операционная система исполнения для дисциплины, фокуса и pressure-механики. Здесь задачи не лежат списком: продукт превращает рутину в активный цикл с AI, квестами, восстановлением и синхронизацией между платформами.',
      'Execution OS for discipline, focus and pressure mechanics. Tasks are not stored as a list: the product turns routines into an active loop with AI, quests, recovery and multi-platform sync.',
    ),
    tech: ['React 19', 'TypeScript', 'Electron', 'Capacitor', 'Zustand', 'Vitest', 'Playwright'],
    result: localized(
      'Поведенческий движок вместо пассивного таск-менеджера.',
      'A behavior engine instead of a passive task manager.',
    ),
    signal: localized(
      '128 тестов, 5 AI-провайдеров, мультиплатформенная поставка.',
      '128 tests, 5 AI providers, multi-platform delivery.',
    ),
    tags: localized(
      ['AI-коучинг', 'циклы фокуса', 'геймифицированное исполнение'],
      ['AI coaching', 'focus loops', 'gamified execution'],
    ),
    ecosystemTags: localized(['AI', 'поведенческий движок', 'cross-platform'], ['AI', 'behavior engine', 'cross-platform']),
    liveUrl: 'https://eclipse-valhalla.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Valhalla',
    image: projectImage('valhalla', 'eclipse-valhalla', 'Eclipse Valhalla interface preview', 'center top'),
  },
  {
    title: 'Eclipse Hopson Sentinel',
    systemType: localized('AI ОПЕРАТОР', 'AI OPERATOR'),
    status: 'beta',
    description: localized(
      'Local-first AI-оператор с голосом, terminal tooling, bridge API и гибридным runtime на TypeScript, Rust и Python. Он построен как операторский слой, а не как браузерный чат.',
      'A local-first AI operator with voice, terminal tooling, bridge APIs and a hybrid TypeScript, Rust and Python runtime. It is built to act like an operator layer, not a browser chat.',
    ),
    tech: ['TypeScript', 'Bun', 'Rust', 'Python', 'WebSocket', 'Voice', 'Ollama'],
    result: localized(
      'Превращает AI из интерфейса в исполняемый операционный слой.',
      'Turns AI from interface into an executable operating layer.',
    ),
    signal: localized(
      '207K строк TypeScript, 244 теста, двойной CI, Windows installer.',
      '207K TypeScript lines, 244 tests, dual CI, Windows installer.',
    ),
    tags: localized(
      ['голосовой интерфейс', 'tool runtime', 'local-first контроль'],
      ['voice interface', 'tool runtime', 'local-first control'],
    ),
    ecosystemTags: localized(['AI', 'Rust / TS / Python', 'local-first'], ['AI', 'Rust / TS / Python', 'local-first']),
    repoUrl: 'https://github.com/PavelHopson/eclipse-hopson-sentinel',
    image: projectImage(
      'sentinel',
      'eclipse-hopson-sentinel',
      'Eclipse Hopson Sentinel operator interface preview',
      'center top',
    ),
  },
  {
    title: 'Eclipse Premium Rent',
    systemType: localized('ПРЕМИАЛЬНАЯ СИСТЕМА БРОНИРОВАНИЯ', 'PREMIUM BOOKING SYSTEM'),
    status: 'live',
    description: localized(
      'Премиальная booking-система для аренды люксовых авто, где landing работает как контур конверсии: визуальный авторитет, логика выбора и направляемый сценарий брони работают как единый продукт.',
      'A premium booking system for luxury car rental that treats the landing page as a conversion system: visual authority, selection logic and a guided reservation flow work as one product.',
    ),
    tech: ['React 19', 'TypeScript', 'Tailwind', 'Framer Motion', 'Zustand'],
    result: localized(
      'Luxury booking funnel с продуктовой логикой за арт-дирекшеном.',
      'A luxury booking funnel with product-grade logic behind the art direction.',
    ),
    signal: localized(
      'Премиальный визуальный язык, guided booking и адаптивный конверсионный flow.',
      'Premium visual language, guided booking, responsive conversion flow.',
    ),
    tags: localized(
      ['премиальный UX', 'guided reservation', 'high-trust интерфейс'],
      ['premium UX', 'guided reservation', 'high-trust interface'],
    ),
    ecosystemTags: localized(['UX', 'booking flow', 'premium surface'], ['UX', 'booking flow', 'premium surface']),
    liveUrl: 'https://eclipse-premiumrent.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-PremiumRent',
    image: projectImage('premium-rent', 'eclipse-premiumrent', 'Eclipse Premium Rent booking experience preview', 'center center'),
  },
  {
    title: 'Eclipse Claw',
    systemType: localized('ДВИЖОК ДАННЫХ', 'DATA ENGINE'),
    status: 'beta',
    description: localized(
      'Self-hosted движок извлечения веб-контента для AI-агентов. Он забирает враждебные страницы, вычищает шум, сжимает token payload и отдаёт результат через MCP-friendly интерфейс.',
      'A self-hosted web extraction engine for AI agents. It retrieves hostile web pages, strips noise, compresses token payloads and exposes the result through an MCP-friendly interface.',
    ),
    tech: ['Rust', 'Axum', 'Tokio', 'MCP', 'Docker', 'TLS Fingerprinting'],
    result: localized(
      'Более чистое, дешёвое и надёжное agent-ready извлечение, чем у типичных scraping-стеков.',
      'Cleaner, cheaper and more reliable agent-ready extraction than typical scraping stacks.',
    ),
    signal: localized(
      '22K строк Rust, 417 тестов, Docker, CI, REST API.',
      '22K Rust lines, 417 tests, Docker, CI, REST API.',
    ),
    tags: localized(
      ['agent extraction', 'LLM-оптимизация', 'self-hosted infra'],
      ['agent extraction', 'LLM optimization', 'self-hosted infra'],
    ),
    ecosystemTags: localized(['автоматизация', 'Rust', 'извлечение данных'], ['automation', 'Rust', 'data extraction']),
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Claw',
    image: projectImage('claw', 'eclipse-claw', 'Eclipse Claw extraction engine preview', 'center center'),
  },
  {
    title: 'Business Data Platform',
    systemType: localized('ПЛАТФОРМА АВТОМАТИЗАЦИИ', 'AUTOMATION PLATFORM'),
    status: 'beta',
    description: localized(
      'ETL и company-research платформа на FastAPI с ingestion, monitoring и alerting. Она заменяет разрозненные ручные проверки наблюдаемым pipeline и операторской панелью.',
      'An ETL and company-research platform with FastAPI, ingestion, monitoring and alerting. It replaces fragmented manual checking with an observable pipeline and operator dashboard.',
    ),
    tech: ['FastAPI', 'Python', 'Next.js', 'PostgreSQL', 'Redis', 'Prometheus', 'Grafana', 'Loki'],
    result: localized(
      'От ручного поиска компаний к наблюдаемой data/ops-системе.',
      'From manual company lookup to a monitored data and ops system.',
    ),
    signal: localized(
      'ETL, observability и 7-сервисная архитектура на Docker Compose.',
      'ETL, observability and 7-service Docker Compose architecture.',
    ),
    tags: localized(['ETL', 'observability', 'monitoring'], ['ETL', 'observability', 'monitoring']),
    ecosystemTags: localized(['автоматизация', 'ETL', 'мониторинг'], ['automation', 'ETL', 'monitoring']),
    repoUrl: 'https://github.com/PavelHopson/business-data-platform-mvp',
    image: projectImage('business-data-platform', 'business-data-platform-mvp', 'Business Data Platform dashboard preview', 'center top'),
  },
  {
    title: 'Smart Life Assistant',
    systemType: localized('ОПЕРАТОРСКАЯ ОС', 'OPERATOR OS'),
    status: 'beta',
    description: localized(
      'Desktop action system для личных операций: финансы, подписки, здоровье и ежедневное исполнение превращаются в следующие действия, напоминания и направляемые решения вместо пассивных dashboard-ов.',
      'A desktop action system for personal operations: finance, subscriptions, health and daily execution are converted into next actions, reminders and guided decisions instead of passive dashboards.',
    ),
    tech: ['Next.js', 'Electron', 'TypeScript', 'Prisma', 'TrueLayer', 'Stripe'],
    result: localized(
      'Преобразует личную операционку в направляемый action loop.',
      'Transforms personal admin into a guided action loop.',
    ),
    signal: localized(
      'Desktop app, banking API, платежи и генерация действий.',
      'Desktop app, banking APIs, payments and action generation.',
    ),
    tags: localized(['life ops', 'поддержка решений', 'desktop control'], ['life ops', 'decision support', 'desktop control']),
    ecosystemTags: localized(['автоматизация', 'desktop', 'поддержка решений'], ['automation', 'desktop', 'decision support']),
    repoUrl: 'https://github.com/PavelHopson/SmartLifeAssistant',
    image: projectImage('smart-life-assistant', 'smartlifeassistant', 'Smart Life Assistant product preview', 'center top'),
  },
];

const portfolioCollectionDefinitions: LocalizedProjectCollectionDefinition[] = [
  {
    id: 'ai-products',
    eyebrow: localized('AI-экосистема', 'AI ecosystem'),
    title: localized('Продуктовые интерфейсы вокруг AI-процессов', 'Product surfaces built around AI workflows'),
    description: localized(
      'Не отдельные промпты, а полные контуры: orchestration провайдеров, structured output, retries, local models и интерфейсы, которые удерживают пользователя внутри системы.',
      'Not single prompts, but complete flows: provider orchestration, structured output, retries, local models and interfaces that keep the user inside the system.',
    ),
    projects: [
      {
        title: 'Eclipse AI Hub',
        systemType: localized('AI WORKSPACE', 'AI WORKSPACE'),
        status: 'live',
        description: localized(
          'Локальное AI-пространство с chat, arena, RAG, review и generation-модулями поверх нескольких провайдеров и локальных маршрутов моделей.',
          'Local AI workspace with chat, arena, RAG, review and generation modules across multiple providers and local model routes.',
        ),
        tech: ['React 19', 'TypeScript', 'Ollama', 'Gemini', 'NVIDIA NIM', 'Vitest'],
        result: localized(
          'Реальное операторское workspace вместо одного chat-экрана.',
          'A real operator workspace instead of a single chat screen.',
        ),
        signal: localized('8 провайдеров, 7 модулей, 41 тест.', '8 providers, 7 modules, 41 tests.'),
        tags: localized(['multi-provider', 'RAG', 'local AI'], ['multi-provider', 'RAG', 'local AI']),
        liveUrl: 'https://eclipse-ai-hub.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/eclipse-ai-hub',
        image: projectImage('eclipse-ai-hub', 'ai-hub', 'Eclipse AI Hub workspace preview', 'center top'),
      },
      {
        title: 'Smart Fitness Booking Agent',
        systemType: localized('AI-АГЕНТ', 'AI AGENT'),
        status: 'live',
        description: localized(
          'Агент бронирования на естественном языке, который использует function calling и retry-safe запросы, чтобы планировать тренировки без хрупкого scripted flow.',
          'A natural-language booking agent that uses function calling and retry-safe requests to schedule training sessions without a brittle scripted flow.',
        ),
        tech: ['React 19', 'TypeScript', 'Gemini AI', 'Function Calling', 'Vitest'],
        result: localized(
          'Показывает, как AI может безопасно вести ограниченный booking-процесс.',
          'Shows how AI can operate a constrained booking process safely.',
        ),
        signal: localized(
          'Демо function calling с переиспользуемыми retry-паттернами.',
          'Function calling demo with reusable retry patterns.',
        ),
        tags: localized(['booking agent', 'function calling', 'workflow AI'], ['booking agent', 'function calling', 'workflow AI']),
        liveUrl: 'https://fitness-booking-agent.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Smart-Fitness-Booking-Agent',
        image: projectImage(
          'smart-fitness-booking-agent',
          'fitness-booking-agent',
          'Smart Fitness Booking Agent preview',
          'center top',
        ),
      },
      {
        title: 'InterviewForge',
        systemType: localized('ГОЛОСОВОЙ AI-ИНСТРУМЕНТ', 'VOICE AI TOOL'),
        status: 'live',
        description: localized(
          'Desktop interview copilot на Tauri с анализом аудио в реальном времени, OCR и hotkeys на базе Gemini Live API.',
          'Desktop interview copilot on Tauri with real-time audio analysis, OCR and hotkeys powered by the Gemini Live API.',
        ),
        tech: ['React 18', 'Tauri 2', 'Rust', 'Gemini Live', 'Web Audio API'],
        result: localized(
          'Быстрая локальная оболочка вокруг live multimodal reasoning.',
          'A fast local shell around live multimodal reasoning.',
        ),
        signal: localized(
          'Realtime voice плюс понимание экрана в desktop runtime.',
          'Realtime voice plus screen understanding in a desktop runtime.',
        ),
        tags: localized(['desktop AI', 'OCR', 'live audio'], ['desktop AI', 'OCR', 'live audio']),
        liveUrl: 'https://interviewforge-3pf.pages.dev',
        image: projectImage('interviewforge', 'interview-forge', 'InterviewForge desktop copilot preview', 'center top'),
      },
      {
        title: 'Shotforge',
        systemType: localized('AI-СТУДИЯ', 'AI STUDIO'),
        status: 'live',
        description: localized(
          'Студия генерации изображений с несколькими режимами, style-системами и provider routing для сценариев создания и трансформации контента.',
          'A photo-generation studio with multiple modes, style systems and provider routing for image creation and transformation workflows.',
        ),
        tech: ['React 19', 'TypeScript', 'Gemini', 'Flux.1 Pro', 'Tailwind'],
        result: localized(
          'Модульная контент-студия, а не один генераторный экран.',
          'A modular content studio rather than a single generator view.',
        ),
        signal: localized(
          '3 production-режима с multi-provider генерацией изображений.',
          '3 production modes with multi-provider image generation.',
        ),
        tags: localized(['генерация изображений', 'creative tooling', 'multi-mode'], ['image generation', 'creative tooling', 'multi-mode']),
        liveUrl: 'https://shotforge.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/shotforge',
        image: projectImage('shotforge', 'shot-forge', 'Shotforge AI studio preview', 'center top'),
      },
      {
        title: 'Questify (Educator AI)',
        systemType: localized('AI-ИНСТРУМЕНТ ОБУЧЕНИЯ', 'AI LEARNING TOOL'),
        status: 'live',
        description: localized(
          'Преобразует текст или PDF в интерактивные викторины и escape-room сценарии обучения через structured AI output.',
          'Transforms text or PDF content into interactive quizzes and escape-room style learning flows using structured AI output.',
        ),
        tech: ['React 19', 'TypeScript', 'Gemini AI', 'Framer Motion'],
        result: localized(
          'Превращает учебный материал в игровое структурированное взаимодействие.',
          'Turns learning material into playable, structured interaction.',
        ),
        signal: localized('PDF в интерактивный квест примерно за минуту.', 'PDF to interactive quest in roughly one minute.'),
        tags: localized(['edtech', 'structured output', 'interactive content'], ['edtech', 'structured output', 'interactive content']),
        liveUrl: 'https://educator-ai.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Educator-AI',
        image: projectImage('educator-ai', 'questify', 'Questify learning tool preview', 'center top'),
      },
      {
        title: 'Text2Image Studio',
        systemType: localized('AI-ИНСТРУМЕНТ ГЕНЕРАЦИИ', 'AI GENERATION TOOL'),
        status: 'live',
        description: localized(
          'Multi-provider image studio с улучшением промптов, style presets и историей генераций, спроектированная как переиспользуемый creative workflow.',
          'A multi-provider image studio with prompt enhancement, style presets and generation history designed as a reusable creative workflow surface.',
        ),
        tech: ['React 19', 'TypeScript', 'Gemini', 'DALL-E', 'OpenRouter', 'Ollama'],
        result: localized(
          'Организованный generation workflow вместо изолированных image prompts.',
          'Organized generation workflow instead of isolated image prompts.',
        ),
        signal: localized('4 провайдера, 10 стилей, production demo.', '4 providers, 10 styles, deployed production demo.'),
        tags: localized(['улучшение промптов', 'style presets', 'история генераций'], ['prompt enhancement', 'style presets', 'generation history']),
        liveUrl: 'https://text2image-studio.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Text2Image',
        image: projectImage('text2image-studio', 'text2image', 'Text2Image Studio preview', 'center top'),
      },
    ],
  },
  {
    id: 'product-systems',
    eyebrow: localized('Продуктовые системы', 'Product systems'),
    title: localized('Интерфейсы с тяжёлой логикой под поверхностью', 'Interfaces with heavy logic behind the surface'),
    description: localized(
      'Продукты, которые продают через качество взаимодействия, но опираются на routing, validation, data flows и внутреннюю структуру, а не только на визуальный polish.',
      'Products that sell through interaction quality, but are grounded in routing, validation, data flows and internal structure instead of visual polish alone.',
    ),
    projects: [
      {
        title: 'CryptoPulse 2077',
        systemType: localized('ТРЕЙДИНГОВАЯ АНАЛИТИКА', 'TRADING INTELLIGENCE'),
        status: 'live',
        description: localized(
          'Рыночный терминал для crypto, forex и futures с AI-анализом, разбором новостей с указанием источников и симуляцией торговли.',
          'A market terminal for crypto, forex and futures with AI analysis, source-tagged news parsing and trading simulation.',
        ),
        tech: ['React 19', 'TypeScript', 'Recharts', 'Cloudflare Workers', 'NVIDIA NIM', 'Vitest'],
        result: localized(
          'Аналитическая поверхность с контролируемым происхождением данных.',
          'An analytical surface with controlled data provenance.',
        ),
        signal: localized('76 тестов, 6 AI-провайдеров, архитектурная документация.', '76 tests, 6 AI providers, architecture docs.'),
        tags: localized(['market data', 'AI-аналитика', 'парсинг новостей'], ['market data', 'AI analytics', 'news parsing']),
        liveUrl: 'https://cryptopulse-1d0.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/CryptoPulse',
        image: projectImage('cryptopulse', 'cryptopulse-2077', 'CryptoPulse 2077 trading terminal preview', 'center top'),
      },
      {
        title: 'Task Manager',
        systemType: localized('ВНУТРЕННЯЯ ПЛАТФОРМА', 'INTERNAL PLATFORM'),
        status: 'live',
        description: localized(
          'Fullstack-платформа задач с аутентификацией, ролями, пагинацией и сортировкой на PostgreSQL и Dockerized-инфраструктуре.',
          'A fullstack task platform with authentication, roles, pagination and sorting backed by PostgreSQL and Dockerized infrastructure.',
        ),
        tech: ['React 18', 'Express 5', 'Prisma', 'PostgreSQL', 'Docker'],
        result: localized(
          'Чистая внутренняя админ-поверхность с production-основой.',
          'A clean internal admin surface with production fundamentals.',
        ),
        signal: localized('Auth, роли, Prisma и Docker deployment.', 'Auth, roles, Prisma and Docker deployment.'),
        tags: localized(['internal tools', 'CRUD', 'auth'], ['internal tools', 'CRUD', 'auth']),
        liveUrl: 'https://task-manager-eclipse.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/task-manager',
        image: projectImage('task-manager', 'task-manager-eclipse', 'Task Manager admin preview', 'center top'),
      },
      {
        title: 'Eclipse Media',
        systemType: localized('MEDIA-УТИЛИТА', 'MEDIA UTILITY'),
        status: 'beta',
        description: localized(
          'Self-hosted загрузчик медиа с SSE-прогрессом, автоматической очисткой и поддержкой большого числа источников.',
          'A self-hosted media downloader with SSE progress, automated cleanup and support for large numbers of sources.',
        ),
        tech: ['React 19', 'FastAPI', 'yt-dlp', 'Docker', 'SSE'],
        result: localized(
          'Превращает разовые скачивания медиа в контролируемый self-hosted инструмент.',
          'Turns ad hoc media retrieval into a controlled self-hosted tool.',
        ),
        signal: localized(
          '1000+ источников, Dockerized runtime, потоковый прогресс.',
          '1000+ sources, Dockerized runtime, streaming progress.',
        ),
        tags: localized(['self-hosted', 'media ops', 'streaming state'], ['self-hosted', 'media ops', 'streaming state']),
        liveUrl: 'https://eclipse-media.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/eclipse-media',
        image: projectImage('eclipse-media', 'media', 'Eclipse Media downloader preview', 'center top'),
      },
    ],
  },
  {
    id: 'engineering-tools',
    eyebrow: localized('Инфраструктура и tooling', 'Infrastructure and tooling'),
    title: localized('Переиспользуемые контуры управления за продуктами', 'Reusable control layers behind the products'),
    description: localized(
      'Библиотеки, боты и куски автоматизации, которые показывают, как команда мыслит там, где заканчивается видимый интерфейс: надёжность, переносимость, деплой и переиспользование.',
      'Libraries, bots and automation pieces that show how the team thinks once the visible interface ends: reliability, portability, deployment and reuse.',
    ),
    projects: [
      {
        title: '@pavelhopson/retry-http',
        systemType: localized('МОДУЛЬ НАДЁЖНОСТИ', 'RELIABILITY MODULE'),
        status: 'live',
        description: localized(
          'Zero-dependency TypeScript-библиотека retry-логики, извлечённая из production-задач и переиспользуемая между проектами без дрейфа.',
          'A zero-dependency TypeScript retry library extracted from production work and reused across multiple projects without drift.',
        ),
        tech: ['TypeScript', 'ESM', 'Vitest', 'npm'],
        result: localized(
          'Паттерны надёжности упакованы один раз и используются везде.',
          'Reliability patterns packaged once and reused everywhere.',
        ),
        signal: localized('Опубликована на npm и встроена в 4 проекта.', 'Published on npm and ported into 4 consumer projects.'),
        tags: localized(['retry logic', 'переиспользуемый модуль', 'open source'], ['retry logic', 'reusable module', 'open source']),
        repoUrl: 'https://github.com/PavelHopson/retry-http',
      },
      {
        title: 'WireGuard Telegram Bot',
        systemType: localized('БОТ АВТОМАТИЗАЦИИ', 'AUTOMATION BOT'),
        status: 'live',
        description: localized(
          'Telegram-бот, который автоматизирует выдачу VPN-доступа через генерацию конфигов, QR-кодов и service-level provisioning.',
          'A Telegram bot that automates VPN access delivery through config generation, QR codes and service-level provisioning.',
        ),
        tech: ['Python', 'aiogram', 'WireGuard', 'Bash', 'systemd'],
        result: localized(
          'Настройка инфраструктуры превращена в повторяемый операторский flow.',
          'Infrastructure setup turned into a repeatable operator flow.',
        ),
        signal: localized(
          'Автоматическая выдача VPN через Telegram workflows.',
          'Automated VPN issuance through Telegram workflows.',
        ),
        tags: localized(['Telegram bot', 'DevOps', 'provisioning'], ['Telegram bot', 'DevOps', 'provisioning']),
        repoUrl: 'https://github.com/PavelHopson/wireguard-telegram-bot',
      },
    ],
  },
];

const systemsEcosystemIntroDefinition: LocalizedSystemsEcosystemIntroDefinition = {
  eyebrow: localized('Флагманские системы', 'Flagship systems'),
  title: localized('Экосистема систем', 'Systems ecosystem'),
  description: localized(
    'Мы не делаем изолированные проекты. Мы строим системы, которые могут жить рядом, делить паттерны контроля и работать как модули более крупного продуктового мышления.',
    'We do not build isolated projects. We build systems that can live next to each other, share control patterns and behave like modules of a larger product mind.',
  ),
  note: localized(
    'У каждого модуля своя роль, но инженерный паттерн один: наблюдать, маршрутизировать, действовать и фиксировать.',
    'Each module keeps its own role, but the engineering pattern stays coherent: observe, route, act and record.',
  ),
  categories: localized(['AI-СИСТЕМЫ', 'АВТОМАТИЗАЦИЯ', 'SaaS', 'UX'], ['AI SYSTEMS', 'AUTOMATION', 'SaaS', 'UX']),
};

const serviceEntryPointDefinitions: LocalizedServiceEntryPointDefinition[] = [
  {
    title: localized('AI-система автоматизации', 'AI automation system'),
    cue: '01 / orchestration',
    description: localized(
      'Когда команда всё ещё двигает задачи через чаты, таблицы и ручной follow-up, мы превращаем эту логику в AI-assisted контур исполнения.',
      'When a team still moves tasks through chats, spreadsheets and manual follow-up, we turn that logic into an AI-assisted execution flow.',
    ),
    audience: localized('Для фаундеров и операторов, уставших от повторяющихся решений.', 'For founders and operators drowning in repeated decisions.'),
    result: localized('Система, которая видит события, маршрутизирует действия и закрывает цикл.', 'A system that sees events, routes actions and closes the loop.'),
  },
  {
    title: localized('SaaS MVP или внутренняя платформа', 'SaaS MVP or internal platform'),
    cue: '02 / product core',
    description: localized(
      'Когда продукт больше, чем набор экранов, мы строим контур управления, поток данных и интерфейс для операторов, который делает его полезным каждый день.',
      'When the product is more than screens, we build the control layer, data flow and operator-facing interface that make it usable day to day.',
    ),
    audience: localized('Для SaaS-фаундеров, ops-heavy продуктов и внутренних команд.', 'For SaaS founders, ops-heavy products and internal teams.'),
    result: localized('Рабочий MVP с логикой за интерфейсом, а не демо-оболочка.', 'A usable MVP with logic behind the interface, not a demo shell.'),
  },
  {
    title: localized('Премиальный лендинг или booking-система', 'Premium landing or booking system'),
    cue: '03 / conversion system',
    description: localized(
      'Когда важны визуальное доверие и премиальное позиционирование, мы проектируем front layer как часть реального сценария брони или квалификации.',
      'When visual trust and premium positioning matter, we design the front layer as part of a real booking or qualification flow.',
    ),
    audience: localized('Для high-ticket сервисов, премиальных продуктов и избирательных брендов.', 'For high-ticket services, premium products and selective brands.'),
    result: localized('Лендинг, который квалифицирует, направляет и конвертирует, а не просто украшает.', 'A landing that qualifies, guides and converts instead of decorating.'),
  },
  {
    title: localized('Data scraping и мониторинговый dashboard', 'Data scraping and monitoring dashboard'),
    cue: '04 / signal capture',
    description: localized(
      'Когда критическая информация размазана по источникам, мы строим ingestion, retries, parsing и dashboard-ы, которые делают её наблюдаемой.',
      'When critical information is scattered across sources, we build ingestion, retries, parsing and dashboards that make it observable.',
    ),
    audience: localized('Для research-команд, аналитиков и операторов ручных данных.', 'For research teams, analysts and manual data operators.'),
    result: localized('Наблюдаемый data engine вместо хрупких разовых скриптов.', 'A monitored data engine instead of fragile one-off scripts.'),
  },
  {
    title: localized('AI-оператор или agent tool', 'AI operator or agent tool'),
    cue: '05 / execution layer',
    description: localized(
      'Когда AI должен действовать через инструменты, голос или локальные workflow, мы строим runtime вокруг него: permissions, tools, guardrails и интерфейсы.',
      'When AI needs to act through tools, voice or local workflows, we build the runtime around it: permissions, tools, guardrails and interfaces.',
    ),
    audience: localized('Для команд, которые уходят от экспериментов с чат-ботами к реальным операторским системам.', 'For teams moving from chatbot experiments to real operator systems.'),
    result: localized('AI-слой, который действительно умеет исполнять работу.', 'An AI layer that can actually execute work.'),
  },
];

const processStepDefinitions: LocalizedProcessStepDefinition[] = [
  {
    index: '01',
    title: localized('Разобрать реальную систему', 'Map the real system'),
    text: localized(
      'Мы начинаем с анатомии процесса: что система видит, какое состояние хранит, где принимаются решения и где сейчас утекает контроль.',
      'We start from process anatomy: what the system sees, what state it keeps, where decisions happen and where control currently leaks.',
    ),
  },
  {
    index: '02',
    title: localized('Спроектировать цикл исполнения', 'Design the execution loop'),
    text: localized(
      'AI, автоматизация, dashboard-ы и уведомления собираются вокруг одного цикла: обнаружить, решить, выполнить, проверить и зафиксировать.',
      'AI, automation, dashboards and notifications are assembled around one loop: detect, decide, act, verify and record.',
    ),
  },
  {
    index: '03',
    title: localized('Выпустить с инженерной дисциплиной', 'Ship with engineering discipline'),
    text: localized(
      'Сборки, тесты, проверки деплоя и наблюдаемые логи входят в поставку. Цель не в демо, а в системе, которая продолжает работать.',
      'Builds, tests, deploy checks and observable logs are part of the delivery. The goal is not a demo but a system that keeps working.',
    ),
  },
  {
    index: '04',
    title: localized('Переиспользовать паттерны между продуктами', 'Reuse patterns across products'),
    text: localized(
      'Когда паттерн контроля доказывает свою ценность, мы упаковываем его и переносим между проектами: адаптеры, retries, operator panels, parsing-слои и AI-маршруты.',
      'Once a control pattern proves itself, we package it and reuse it across projects: adapters, retries, operator panels, parsing layers and AI routes.',
    ),
  },
];

const metricDefinitions: LocalizedMetricDefinition[] = [
  { value: '6', label: localized('production-систем в работе 24/7', 'production systems running 24/7') },
  { value: '958+', label: localized('автоматических проверок в релизе', 'automated checks per release') },
  { value: '22K', label: localized('строк Rust в core-движке извлечения', 'Rust lines in core extraction engine') },
];

const founderProfileDefinition: LocalizedFounderProfileDefinition = {
  eyebrow: localized('Профиль оператора', 'Operator profile'),
  title: localized('Кто стоит за системой', 'Who stands behind the system'),
  summary: localized(
    [
      'Павел Хопсон — основатель Eclipse Forge. Я создаю системы, которые заменяют ручную работу и становятся частью бизнеса. Не интерфейсы, не «сделать сайт» — контуры исполнения, которые работают сами.',
      'Работа лежит на стыке product UX, AI-runtime и операционной логики. Видимый слой важен, но настоящая ценность — в системе за ним: что она отслеживает, как принимает решения и где замыкает цикл без человека в петле.',
    ],
    [
      'Pavel Hopson — founder of Eclipse Forge. I build systems that replace manual work and become part of the business. Not interfaces, not "make me a site" — execution contours that run themselves.',
      'The work sits where product UX, AI runtime and operational logic meet. The visible layer matters, but the real value is in the system behind it: what it observes, how it decides, and where it closes the loop without a human in it.',
    ],
  ),
  pillars: localized(
    [
      'AI-системы, агенты и local-first операторские инструменты',
      'Automation flows, которые уменьшают ручную маршрутизацию и follow-up',
      'SaaS MVP и внутренние платформы с реальной логикой за UI',
      'Поведенческие системы и продукты, которые меняют исполнение, а не только видимость',
    ],
    [
      'AI systems, agents and local-first operator tooling',
      'Automation flows that reduce manual routing and follow-up',
      'SaaS MVPs and internal platforms with real logic behind the UI',
      'Behavioral systems and products that change execution, not just visibility',
    ],
  ),
  stats: localized(
    [
      { value: 'Rust + TS + Python', label: 'гибридный инженерный стек' },
      { value: 'Продукты + tooling', label: 'единая логика от UI до infra' },
      { value: 'Контроль над шумом', label: 'главный принцип дизайна' },
    ],
    [
      { value: 'Rust + TS + Python', label: 'hybrid engineering stack' },
      { value: 'Products + tooling', label: 'one mind across UI and infra' },
      { value: 'Control over noise', label: 'the main design principle' },
    ],
  ),
  portrait: brandAssets.founderPortrait,
  supportVisual: brandAssets.heroPlate,
};

const contactPromptDefinitions: LocalizedContactPromptDefinition[] = [
  {
    label: 'name',
    prompt: localized('Как к вам обращаться?', 'Your name'),
    placeholder: localized('Имя или компания', 'Name or company'),
  },
  {
    label: 'task_description',
    prompt: localized('Опишите задачу', 'Describe the task'),
    placeholder: localized(
      'Что вы делаете вручную, какой результат должна выдавать система, где сейчас теряется время или контроль...',
      'What you do manually, what the system should produce, where time or control is leaking now...',
    ),
  },
  {
    label: 'contact_channel',
    prompt: localized('Telegram или email для связи', 'Telegram or email to reach you'),
    placeholder: localized('@username или you@domain.com', '@username or you@domain.com'),
  },
];

const contactFlowDefinition: LocalizedContactFlowDefinition = {
  primaryCta: localized('Открыть Telegram', 'Open Telegram'),
  secondaryCta: localized('Скопировать сигнал', 'Copy signal packet'),
  status: localized(['канал запроса открыт', 'сигнал готов', 'оператор в сети'], ['request channel open', 'signal ready', 'operator online']),
};

const systemsEcosystemOrder = [
  'Eclipse Valhalla',
  'Eclipse Hopson Sentinel',
  'Eclipse Claw',
  'Eclipse Premium Rent',
  'Business Data Platform',
  'Smart Life Assistant',
] as const;

const siteContentByLocale: Record<Locale, SiteContent> = Object.fromEntries(
  locales.map((locale) => {
    const featuredProjects = featuredProjectDefinitions.map((project) => materializeProject(locale, project));
    const portfolioCollections = portfolioCollectionDefinitions.map((collection) => materializeCollection(locale, collection));
    const allProjects = [...featuredProjects, ...portfolioCollections.flatMap((collection) => collection.projects)].filter(
      (project, index, list) => list.findIndex((candidate) => candidate.title === project.title) === index,
    );
    const systemsEcosystemProjects = systemsEcosystemOrder
      .map((title) => featuredProjects.find((project) => project.title === title))
      .filter((project): project is Project => Boolean(project));

    const content: SiteContent = {
      featuredProjects,
      allProjects,
      portfolioCollections,
      serviceEntryPoints: serviceEntryPointDefinitions.map((entry) => materializeService(locale, entry)),
      processSteps: processStepDefinitions.map((step) => materializeStep(locale, step)),
      metrics: metricDefinitions.map((metric) => ({ value: metric.value, label: metric.label[locale] })),
      founderProfile: materializeFounderProfile(locale, founderProfileDefinition),
      systemsEcosystemIntro: {
        eyebrow: systemsEcosystemIntroDefinition.eyebrow[locale],
        title: systemsEcosystemIntroDefinition.title[locale],
        description: systemsEcosystemIntroDefinition.description[locale],
        note: systemsEcosystemIntroDefinition.note[locale],
        categories: systemsEcosystemIntroDefinition.categories[locale],
      },
      systemsEcosystemProjects,
      contactPrompts: contactPromptDefinitions.map((prompt) => ({
        label: prompt.label,
        prompt: prompt.prompt[locale],
        placeholder: prompt.placeholder[locale],
      })),
      contactFlow: {
        primaryCta: contactFlowDefinition.primaryCta[locale],
        secondaryCta: contactFlowDefinition.secondaryCta[locale],
        status: contactFlowDefinition.status[locale],
      },
    };

    return [locale, content];
  }),
) as Record<Locale, SiteContent>;

export function getSiteContent(locale: Locale): SiteContent {
  return siteContentByLocale[locale];
}

export function useSiteContent(): SiteContent {
  const { locale } = useLocale();
  return getSiteContent(locale);
}
