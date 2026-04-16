export type ProjectStatus = 'Live' | 'Beta' | 'Prototype' | 'Concept' | 'Reference';

export interface Project {
  title: string;
  tag: string;
  status: ProjectStatus;
  description: string;
  tech: string[];
  result: string;
  liveUrl?: string;
  repoUrl: string;
  image?: string;
}

export interface ProjectCollection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  projects: Project[];
}

export const featuredProjects: Project[] = [
  {
    title: 'Eclipse Valhalla',
    tag: 'Мультиплатформа / AI / Геймификация',
    status: 'Live',
    description: 'Персональная ОС дисциплины: квесты, фокус-режим, тренировки, AI-коуч, 31 достижение, система давления. 128 тестов (unit + e2e Playwright). App.tsx декомпозирован с 978 до 419 строк. 5 AI-провайдеров включая NVIDIA NIM. Web + Electron (Win/Mac/Linux) + Capacitor (iOS/Android).',
    tech: ['React 19', 'TypeScript', 'Electron', 'Capacitor', 'Zustand', 'Vitest', 'Playwright', 'NVIDIA NIM'],
    result: '128 тестов, -57% App.tsx, 5 AI-провайдеров, мультиплатформа',
    liveUrl: 'https://eclipse-valhalla.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Valhalla',
  },
  {
    title: 'Eclipse Claw',
    tag: 'Rust / Инфраструктура / Парсинг',
    status: 'Beta',
    description: 'Высокопроизводительный веб-скрапер с TLS-фингерпринтингом Chrome, LLM-оптимизированным выводом (67% сжатие токенов) и MCP-сервером для AI-агентов. 22 583 строки Rust в 8 крейтах. 417 тестов. Docker + CI. REST API с 9 endpoint-тестами.',
    tech: ['Rust', 'Axum', 'tokio', 'MCP', 'Docker', 'TLS Fingerprinting'],
    result: '22K строк Rust, 95.1% точность, 417 тестов',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Claw',
  },
  {
    title: 'CryptoPulse 2077',
    tag: 'Финтех / AI-аналитика',
    status: 'Live',
    description: 'Крипто/форекс/фьючерсный терминал с 6 AI-провайдерами, торговым симулятором (до 100x плечо) и live-парсингом новостей через Cloudflare Workers. Паттерн source-tagging устраняет silent fallback. 76 тестов. ARCHITECTURE.md с mermaid-диаграммами.',
    tech: ['React 19', 'TypeScript', 'Recharts', 'Cloudflare Workers', 'NVIDIA NIM', 'Vitest'],
    result: '76 тестов, 6 AI-провайдеров, source tagging, ARCHITECTURE.md',
    liveUrl: 'https://cryptopulse-1d0.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/CryptoPulse',
  },
  {
    title: 'Eclipse Hopson Sentinel',
    tag: 'Edge AI / Голос / Гибридный стек',
    status: 'Beta',
    description: 'Локальный AI-оператор с голосовым интерфейсом (TTS/STT/PTT), TypeScript-рантайм, Rust-движок, Python-провайдеры, Bridge API, Windows-инсталлятор. 207K строк TypeScript. 244 теста (200 Bun + 44 pytest). Двойной CI.',
    tech: ['TypeScript', 'Bun', 'Rust', 'Python', 'WebSocket', 'Ollama', 'Voice'],
    result: '207K строк, 244 теста, двойной CI, голосовой MVP',
    repoUrl: 'https://github.com/PavelHopson/eclipse-hopson-sentinel',
  },
  {
    title: '@pavelhopson/retry-http',
    tag: 'npm-библиотека / Open Source',
    status: 'Live',
    description: 'Exponential backoff retry для HTTP-запросов. Ноль зависимостей, TypeScript-first. Спроектирован в Eclipse Valhalla, портирован без изменений в CryptoPulse, eclipse-ai-hub и Smart-Fitness-Booking-Agent. 4 потребителя, 0 расхождений, 26 тестов проходят с первого запуска в каждом проекте.',
    tech: ['TypeScript', 'ESM', 'Vitest', 'npm'],
    result: 'Опубликован на npm, 4 потребителя, zero-edit портируемость',
    repoUrl: 'https://github.com/PavelHopson/retry-http',
  },
  {
    title: 'Business Data Platform',
    tag: 'Data Engineering / Observability',
    status: 'Beta',
    description: 'Full-stack ETL-платформа для исследования компаний через API ФНС. FastAPI-бэкенд, Next.js-фронтенд, PostgreSQL, Redis. Полный стек наблюдаемости: Prometheus + Grafana + Loki. Docker Compose из 7 сервисов с health-чеками.',
    tech: ['FastAPI', 'Python', 'Next.js', 'PostgreSQL', 'Prometheus', 'Grafana', 'Loki', 'Docker'],
    result: 'ETL + observability + Docker Compose из 7 сервисов',
    repoUrl: 'https://github.com/PavelHopson/business-data-platform-mvp',
  },
];

export const portfolioCollections: ProjectCollection[] = [
  {
    id: 'ai-products',
    eyebrow: 'AI-продукты',
    title: 'Приложения и агенты на базе AI',
    description: 'Полноценные продукты вокруг AI: от мульти-провайдерного чата до Function Calling агентов и генерации изображений.',
    projects: [
      {
        title: 'Eclipse AI Hub',
        tag: 'AI-платформа',
        status: 'Live',
        description: 'Локальная AI-платформа: Чат, Арена, RAG, Code Review, Копирайтер, Сканер безопасности, Image Studio. 8 AI-провайдеров включая NVIDIA NIM. 41 тест.',
        tech: ['React 19', 'TypeScript', 'Ollama', 'Gemini', 'NVIDIA NIM', 'RAG', 'Vitest'],
        result: '8 провайдеров, 7 модулей, 41 тест',
        liveUrl: 'https://eclipse-ai-hub.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/eclipse-ai-hub',
      },
      {
        title: 'Smart Fitness Booking Agent',
        tag: 'AI-агент / Function Calling',
        status: 'Live',
        description: 'AI-агент для бронирования тренировок через естественный язык. Gemini Function Calling, retry-паттерны, mock-БД. 4-й потребитель retry-http.',
        tech: ['React 19', 'TypeScript', 'Gemini AI', 'Function Calling', 'Vitest'],
        result: 'Function Calling демо, retry.ts (4-й потребитель)',
        liveUrl: 'https://fitness-booking-agent.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Smart-Fitness-Booking-Agent',
      },
      {
        title: 'InterviewForge',
        tag: 'AI / Desktop / Tauri',
        status: 'Live',
        description: 'Desktop AI-помощник для собеседований на Tauri 2 (Rust). Gemini Live API в реальном времени: аудио-анализ, OCR экрана, горячие клавиши.',
        tech: ['React 18', 'Tauri 2', 'Rust', 'Gemini Live', 'Web Audio API'],
        result: 'Tauri desktop + Gemini Live стриминг',
        liveUrl: 'https://interviewforge-3pf.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/InterviewForge',
      },
      {
        title: 'Shotforge',
        tag: 'AI-фотостудия',
        status: 'Live',
        description: 'AI-фотостудия с 3 режимами: AI-фотограф (21 пресет), Face Fusion, Style Transfer. Мульти-провайдер.',
        tech: ['React 19', 'TypeScript', 'Gemini', 'Flux.1 Pro', 'Tailwind'],
        result: '3 production-режима, мульти-провайдер',
        liveUrl: 'https://shotforge.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/shotforge',
      },
      {
        title: 'Questify (Educator AI)',
        tag: 'AI / EdTech',
        status: 'Live',
        description: 'Загрузите PDF или вставьте текст — получите интерактивный Quiz или Escape Room за 60 секунд. Gemini structured output.',
        tech: ['React 19', 'TypeScript', 'Gemini AI', 'Framer Motion'],
        result: 'PDF → интерактивный квест за 60 сек',
        liveUrl: 'https://educator-ai.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Educator-AI',
      },
      {
        title: 'Text2Image Studio',
        tag: 'AI-генерация изображений',
        status: 'Live',
        description: 'Мульти-провайдерная студия генерации изображений с улучшением промптов, 10 стилями и историей генераций.',
        tech: ['React 19', 'TypeScript', 'Gemini', 'DALL-E', 'OpenRouter', 'Ollama'],
        result: '4 провайдера, 10 стилей, задеплоен',
        liveUrl: 'https://text2image-studio.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Text2Image',
      },
    ],
  },
  {
    id: 'web-fullstack',
    eyebrow: 'Веб и Fullstack',
    title: 'Веб-приложения и fullstack-проекты',
    description: 'От премиальной аренды авто до таск-менеджера — production-grade веб-приложения с авторизацией, базами данных и адаптивным UI.',
    projects: [
      {
        title: 'Eclipse PremiumRent',
        tag: 'Премиум-веб',
        status: 'Live',
        description: 'Люксовый сайт аренды автомобилей для Калининграда. Тёмно-золотой дизайн, 5-шаговый визард бронирования, 40+ авто в 7 категориях.',
        tech: ['React 19', 'TypeScript', 'Tailwind 4', 'Zustand', 'Framer Motion'],
        result: 'Премиум booking flow с luxury art direction',
        liveUrl: 'https://eclipse-premiumrent.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Eclipse-PremiumRent',
      },
      {
        title: 'Task Manager',
        tag: 'Fullstack / CRUD',
        status: 'Live',
        description: 'Полностековый менеджер задач с JWT-авторизацией, ролями, пагинацией, сортировкой. PostgreSQL в Docker.',
        tech: ['React 18', 'Express 5', 'Prisma', 'PostgreSQL', 'Docker'],
        result: 'Auth + роли + Prisma + Docker deploy',
        liveUrl: 'https://task-manager-eclipse.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/task-manager',
      },
      {
        title: 'Eclipse Media',
        tag: 'Fullstack / Медиа',
        status: 'Beta',
        description: 'Self-hosted загрузчик видео/аудио с SSE-прогрессом, TTL-очисткой и Docker. Поддержка 1000+ сайтов.',
        tech: ['React 19', 'FastAPI', 'yt-dlp', 'Docker', 'SSE'],
        result: 'Self-hosted медиа-загрузчик с Docker',
        liveUrl: 'https://eclipse-media.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/eclipse-media',
      },
    ],
  },
  {
    id: 'engineering-tools',
    eyebrow: 'Инфраструктура и инструменты',
    title: 'CLI, боты и DevOps-автоматизация',
    description: 'За пределами UI: инструменты, боты и инфраструктура, которые показывают backend-мышление и операционную дисциплину.',
    projects: [
      {
        title: 'WireGuard Telegram Bot',
        tag: 'DevOps / Автоматизация',
        status: 'Live',
        description: 'Telegram-бот для автоматической раздачи WireGuard VPN конфигов. Генерация ключей, .conf файлы, QR-коды, systemd-сервис.',
        tech: ['Python', 'aiogram', 'WireGuard', 'Bash', 'systemd'],
        result: 'VPN-автоматизация через Telegram (2 звезды)',
        repoUrl: 'https://github.com/PavelHopson/wireguard-telegram-bot',
      },
      {
        title: 'Smart Life Assistant',
        tag: 'Desktop / Life OS',
        status: 'Beta',
        description: 'Desktop-приложение для управления жизнью: интеграция с банками (TrueLayer), подписки через Stripe, автоматические действия, Electron NSIS-инсталлятор.',
        tech: ['Next.js', 'Electron', 'TypeScript', 'Prisma', 'TrueLayer', 'Stripe'],
        result: 'Desktop-приложение с банковским API и Stripe',
        repoUrl: 'https://github.com/PavelHopson/SmartLifeAssistant',
      },
    ],
  },
];

export const allProjects: Project[] = portfolioCollections.reduce<Project[]>(
  (acc, collection) => acc.concat(collection.projects),
  [...featuredProjects],
);

export const services = [
  {
    title: 'AI-инфраструктура',
    text: 'Мульти-провайдерные AI-абстракции (6+ провайдеров), RAG-пайплайны, Function Calling агенты, стриминг и retry-устойчивость. NVIDIA NIM, Ollama, Gemini, OpenAI, Anthropic.',
  },
  {
    title: 'Fullstack-разработка',
    text: 'React 19 + TypeScript фронтенды, FastAPI / Express бэкенды, PostgreSQL / Redis, Docker Compose, observability через Prometheus + Grafana + Loki.',
  },
  {
    title: 'Системы и Rust',
    text: 'Высокопроизводительный Rust (22K строк скрапер, TLS-фингерпринтинг, MCP-серверы), гибридные TS+Rust+Python стеки, edge AI на обычном железе.',
  },
];

export const processSteps = [
  {
    index: '01',
    title: 'Понять систему',
    text: 'Изучить архитектуру, построить карту зависимостей, найти настоящую причину. Никогда не менять код, который не понимаю.',
  },
  {
    index: '02',
    title: 'Проверить тестами',
    text: '958 тестов в 7 проектах. Каждое изменение проходит typecheck + test + build. Coverage-бейджи, CI-пайплайны, никаких silent fallback.',
  },
  {
    index: '03',
    title: 'Релизить инкрементально',
    text: 'Атомарные коммиты, feature-ветки, squash-merge PR. 11+ смерженных PR только в этом портфолио — каждый зелёный перед мержем.',
  },
  {
    index: '04',
    title: 'Переиспользовать между проектами',
    text: 'retry-http: спроектирован однажды, портирован без изменений в 4 проекта, опубликован как npm-пакет. Source tagging, NVIDIA NIM — всё кросс-проектное.',
  },
];

export const metrics = [
  { value: '958', label: 'тестов в 7 проектах' },
  { value: '22K', label: 'строк Rust (Eclipse Claw)' },
  { value: '6', label: 'AI-провайдеров на проект' },
];

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
  responseTime: 'Обычно отвечаю в течение нескольких часов',
  cityTimezone: 'Калининград / UTC+2',
} as const;

export const contactFlow = {
  primaryCta: 'Написать в Telegram',
  telegramChecklist: [
    'Что нужно сделать',
    'Сроки и объём',
    'Предпочтения по стеку (если есть)',
  ],
} as const;
