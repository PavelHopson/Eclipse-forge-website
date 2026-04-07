export interface Project {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  result: string;
  liveUrl?: string;
  repoUrl: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: 'Eclipse AI Hub',
    tag: 'AI Platform',
    description: 'Локальная AI-платформа: 6 инструментов в одном — чат, арена сравнения моделей, RAG (чат с документами), code review, копирайтер, сканер безопасности. 5 AI-провайдеров включая Ollama.',
    tech: ['React 19', 'TypeScript', 'Ollama', 'Gemini AI', 'RAG', 'Tailwind'],
    result: '6 AI-инструментов, 5 провайдеров',
    liveUrl: 'https://eclipse-ai-hub.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/eclipse-ai-hub',
  },
  {
    title: 'CryptoPulse 2077',
    tag: 'Финтех / AI',
    description: 'Финансовый терминал с AI-аналитикой: реальные котировки крипто/форекс/фьючерсов, симулятор трейдинга, свой парсер новостей на Cloudflare Workers, 3 темы оформления, 5 AI-провайдеров.',
    tech: ['React 19', 'TypeScript', 'Tailwind', 'Recharts', 'Cloudflare Workers'],
    result: '20+ фич, 3 темы, парсер новостей',
    liveUrl: 'https://cryptopulse-1d0.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/CryptoPulse',
  },
  {
    title: 'Eclipse PremiumRent',
    tag: 'Web Platform',
    description: 'Премиальный сайт аренды автомобилей для Калининграда. Luxury-дизайн, каталог 40+ авто с каруселями, 5-шаговый визард бронирования, мега-меню, Framer Motion анимации.',
    tech: ['React 19', 'TypeScript', 'Tailwind 4', 'Zustand', 'Framer Motion'],
    result: '40+ авто, 7 категорий',
    liveUrl: 'https://eclipse-premiumrent.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-PremiumRent',
  },
  {
    title: 'Shotforge',
    tag: 'AI / SaaS',
    description: 'AI-фотограф: 3 режима — портретная съёмка, Face Fusion (6 слотов), Style Transfer. Реальная генерация через Gemini + Flux.1 Pro. Выбор AI-модели в настройках.',
    tech: ['React 19', 'TypeScript', 'Gemini AI', 'Flux.1 Pro', 'Vite'],
    result: 'Фотосессия за 3 мин, 3 режима',
    liveUrl: 'https://shotforge.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/shotforge',
  },
  {
    title: 'Text2Image Studio',
    tag: 'AI / Генерация',
    description: 'Генератор изображений по текстовому описанию. 10 стилей (фото, аниме, 3D, киберпанк...), AI-улучшение промптов, 5 соотношений сторон, история с лайками. Gemini + DALL-E + Flux.',
    tech: ['React 19', 'TypeScript', 'Gemini', 'DALL-E', 'Tailwind'],
    result: '3 AI-провайдера, 10 стилей',
    liveUrl: 'https://text2image-studio.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/Text2Image',
  },
  {
    title: 'Questify (Educator AI)',
    tag: 'AI / EdTech',
    description: 'Платформа, превращающая PDF-документы в интерактивные квесты и escape rooms за 60 секунд. Quiz-режим, EN/RU локализация, геймификация обучения.',
    tech: ['React 19', 'TypeScript', 'Gemini AI', 'Framer Motion', 'Vite'],
    result: 'PDF → квест за 60 секунд',
    liveUrl: 'https://educator-ai.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/Educator-AI',
  },
  {
    title: 'InterviewForge',
    tag: 'AI / Desktop',
    description: 'AI-помощник для подготовки к собеседованиям. Десктоп-приложение на Tauri 2 (Rust) + веб-версия. Генерация вопросов, анализ ответов, голосовая практика.',
    tech: ['React 18', 'Tauri 2', 'Rust', 'Gemini AI', 'Zustand'],
    result: 'Десктоп + веб, Tauri 2',
    liveUrl: 'https://interviewforge-3pf.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/InterviewForge',
  },
  {
    title: 'Smart Fitness Agent',
    tag: 'AI Agent',
    description: 'AI-агент для записи в зал через натуральный язык. Gemini Function Calling: get_schedule, book_slot. Split-pane UI: чат + live БД. Mock PostgreSQL/Redis.',
    tech: ['React 19', 'TypeScript', 'Gemini AI', 'Function Calling', 'Vite'],
    result: 'AI-агент с function calling',
    liveUrl: 'https://fitness-booking-agent.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/Smart-Fitness-Booking-Agent',
  },
  {
    title: 'Eclipse Valhalla',
    tag: 'Productivity / AI',
    description: 'Операционная система жизни с дисциплинарным enforcement. Десктоп-приложение с AI-коучем, трекинг привычек, daily review, система штрафов.',
    tech: ['React 19', 'Electron', 'Gemini AI', 'Supabase', 'TypeScript'],
    result: 'Personal OS с AI-коучем',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Valhalla',
  },
  {
    title: 'Eclipse Sentinel',
    tag: 'AI Operator',
    description: 'Локальный AI-оператор для кода, терминала и голосового управления. Bridge API, push-to-talk, wake word, Rust runtime, кросс-платформенный TTS.',
    tech: ['TypeScript', 'Rust', 'Bun', 'WebSocket', 'Ollama'],
    result: 'AI-оператор с голосом',
    repoUrl: 'https://github.com/PavelHopson/eclipse-hopson-sentinel',
  },
  {
    title: 'Eclipse WebClaw',
    tag: 'Automation / Парсер',
    description: 'Парсер маркетплейсов: анализ карточек, позиций, новостей. Автообнаружение изменений, health-check, прокси-ротация, мониторинг 24/7.',
    tech: ['Rust', 'TypeScript', 'PostgreSQL', 'Puppeteer', 'Cron'],
    result: 'Мониторинг 24/7',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Claw',
  },
  {
    title: 'AI-Setup CLI',
    tag: 'Developer Tools',
    description: 'CLI-инструмент для автогенерации AI-конфигов (CLAUDE.md, .cursor/rules, AGENTS.md) из кодовой базы. Детерминистический скоринг 0-100 без LLM.',
    tech: ['TypeScript', 'Node.js', 'Commander', 'CLI'],
    result: '0 → 94 баллов за одну команду',
    repoUrl: 'https://github.com/PavelHopson/ai-setup',
  },
];

export const services = [
  {
    title: 'Web & Brand Experience',
    text: 'Премиальные сайты и digital-платформы, которые усиливают доверие, подают продукт дорого и приводят лиды.',
  },
  {
    title: 'SaaS & Product Engineering',
    text: 'Проектируем и собираем SaaS-сервисы, кабинеты, CRM и внутренние системы с прицелом на рост и монетизацию.',
  },
  {
    title: 'Automation & AI Systems',
    text: 'Автоматизируем рутину, внедряем AI-сценарии и связываем отделы в одну рабочую систему без потери скорости.',
  },
];

export const processSteps = [
  {
    index: '01',
    title: 'Погружаемся в бизнес',
    text: 'Разбираем продукт, метрики, точки прибыли и узкие места, чтобы строить решение не "красиво", а результативно.',
  },
  {
    index: '02',
    title: 'Проектируем систему',
    text: 'Формируем архитектуру, UX, ключевые сценарии и дорожную карту запуска, чтобы убрать хаос ещё до разработки.',
  },
  {
    index: '03',
    title: 'Куем и запускаем',
    text: 'Собираем интерфейс, backend и автоматизацию, тестируем и выводим в релиз с контролем качества на каждом этапе.',
  },
  {
    index: '04',
    title: 'Усиливаем после релиза',
    text: 'Смотрим на данные, улучшаем узкие места, готовим масштабирование и превращаем запуск в устойчивый рост.',
  },
];

export const metrics = [
  { value: '25+', label: 'реализованных проектов' },
  { value: '10', label: 'живых демо онлайн' },
  { value: '5 AI', label: 'провайдеров интегрировано' },
];

export const contactDetails = {
  email: 'hello@eclipseforge.dev',
  telegramDm: '@EclipseHopson',
  telegramDmUrl: 'https://t.me/EclipseHopson',
  telegramChannel: '@EclipseForgeEngine',
  telegramChannelUrl: 'https://t.me/EclipseForgeEngine',
  githubUrl: 'https://github.com/PavelHopson',
  githubHandle: 'PavelHopson',
  responseTime: 'Отвечаем быстро, обычно в течение нескольких часов',
  cityTimezone: 'Калининград / UTC+2',
} as const;

export const contactFlow = {
  primaryCta: 'Написать в Telegram',
  telegramChecklist: [
    'Что нужно сделать',
    'Какой результат хотите получить',
    'Сроки и бюджет, если они уже есть',
  ],
} as const;