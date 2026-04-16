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
    tag: 'Multiplatform / AI / Gamification',
    status: 'Live',
    description: 'Personal Discipline OS with quests, focus mode, workouts, AI coach, 31 achievements, and gamification. 125 unit tests, App.tsx refactored from 978 to 419 lines. 5 AI providers including NVIDIA NIM. Runs on Web, Electron (Win/Mac/Linux), and Capacitor (iOS/Android).',
    tech: ['React 19', 'TypeScript', 'Electron', 'Capacitor', 'Zustand', 'Vitest', 'NVIDIA NIM'],
    result: '125 tests, App.tsx -57%, 5 AI providers, multiplatform',
    liveUrl: 'https://pavelhopson.github.io/Eclipse-Valhalla/',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Valhalla',
  },
  {
    title: 'Eclipse Claw',
    tag: 'Rust / Infrastructure / Scraping',
    status: 'Beta',
    description: 'High-performance web scraper with Chrome TLS fingerprinting, LLM-optimized output (67% token compression), and MCP server for AI agents. 22,583 lines of Rust across 8 crates. 450+ test markers. Docker + CI.',
    tech: ['Rust', 'Axum', 'tokio', 'MCP', 'Docker', 'TLS Fingerprinting'],
    result: '22K LOC Rust, 95.1% extraction accuracy, 450+ tests',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Claw',
  },
  {
    title: 'CryptoPulse 2077',
    tag: 'Fintech / AI Analytics',
    status: 'Live',
    description: 'Crypto/forex/futures terminal with 6 AI providers, trade simulator (up to 100x leverage), and live news pipeline via Cloudflare Workers. Source-tagged fallback pattern eliminates silent mock antipattern. 76 tests. Full ARCHITECTURE.md with mermaid diagrams.',
    tech: ['React 19', 'TypeScript', 'Recharts', 'Cloudflare Workers', 'NVIDIA NIM', 'Vitest'],
    result: '76 tests, 6 AI providers, source tagging, ARCHITECTURE.md',
    liveUrl: 'https://cryptopulse-1d0.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/CryptoPulse',
  },
  {
    title: 'Eclipse Hopson Sentinel',
    tag: 'Edge AI / Voice / Hybrid Stack',
    status: 'Beta',
    description: 'Local AI operator with voice interface (TTS/STT/PTT), TypeScript runtime, Rust engine, Python providers, Bridge API, and Windows installer. 207K lines of TypeScript. 244 tests (200 Bun + 44 pytest). Dual CI.',
    tech: ['TypeScript', 'Bun', 'Rust', 'Python', 'WebSocket', 'Ollama', 'Voice'],
    result: '207K LOC, 244 tests, dual CI (Bun + pytest), voice MVP',
    repoUrl: 'https://github.com/PavelHopson/eclipse-hopson-sentinel',
  },
  {
    title: '@pavelhopson/retry-http',
    tag: 'npm Library / Open Source',
    status: 'Live',
    description: 'Exponential backoff retry for HTTP requests. Zero dependencies, TypeScript-first. Designed in Eclipse-Valhalla, ported byte-identical to CryptoPulse, eclipse-ai-hub, and Smart-Fitness-Booking-Agent — 4 consumers, zero divergence, 26 tests pass on first run in each.',
    tech: ['TypeScript', 'ESM', 'Vitest', 'npm'],
    result: 'Published npm package, 4 consumers, zero-edit portability',
    repoUrl: 'https://github.com/PavelHopson/retry-http',
  },
  {
    title: 'Business Data Platform',
    tag: 'Data Engineering / Observability',
    status: 'Beta',
    description: 'Full-stack ETL platform for company research via FNS API. FastAPI backend, Next.js frontend, PostgreSQL, Redis, with full observability stack: Prometheus + Grafana + Loki. Docker Compose with 7 services and health checks.',
    tech: ['FastAPI', 'Python', 'Next.js', 'PostgreSQL', 'Prometheus', 'Grafana', 'Loki', 'Docker'],
    result: 'ETL + observability + 7-service Docker Compose',
    repoUrl: 'https://github.com/PavelHopson/business-data-platform-mvp',
  },
];

export const portfolioCollections: ProjectCollection[] = [
  {
    id: 'ai-products',
    eyebrow: 'AI Products',
    title: 'AI-powered applications and agents',
    description: 'Full products built around AI capabilities — from multi-provider chat to function-calling agents to image generation studios.',
    projects: [
      {
        title: 'Eclipse AI Hub',
        tag: 'AI Platform',
        status: 'Live',
        description: 'Local AI platform with 7 modules: Chat, Arena, RAG, Code Review, Copywriter, Security Scanner, Image Studio. 8 AI providers including NVIDIA NIM. 41 tests.',
        tech: ['React 19', 'TypeScript', 'Ollama', 'Gemini', 'NVIDIA NIM', 'RAG', 'Vitest'],
        result: '8 AI providers, 7 modules, 41 tests',
        repoUrl: 'https://github.com/PavelHopson/eclipse-ai-hub',
      },
      {
        title: 'Smart Fitness Booking Agent',
        tag: 'AI Agent / Function Calling',
        status: 'Live',
        description: 'AI agent that books gym sessions through natural language. Demonstrates Gemini Function Calling, retry API patterns, and mock database integration.',
        tech: ['React 19', 'TypeScript', 'Gemini AI', 'Function Calling', 'Vitest'],
        result: 'Function Calling demo, retry.ts (4th consumer)',
        liveUrl: 'https://fitness-booking-agent.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Smart-Fitness-Booking-Agent',
      },
      {
        title: 'InterviewForge',
        tag: 'AI / Desktop / Tauri',
        status: 'Live',
        description: 'Desktop AI interview coach built with Tauri 2 (Rust) and Gemini Live API. Real-time audio analysis, screen OCR, hotkeys for code fix and counter-questions.',
        tech: ['React 18', 'Tauri 2', 'Rust', 'Gemini Live', 'Web Audio API'],
        result: 'Tauri desktop + real-time Gemini Live streaming',
        repoUrl: 'https://github.com/PavelHopson/InterviewForge',
      },
      {
        title: 'Shotforge',
        tag: 'AI Photo Studio',
        status: 'Live',
        description: 'AI photo studio with 3 production modes: AI Photographer (21 presets), Face Fusion, Style Transfer. Multi-provider support.',
        tech: ['React 19', 'TypeScript', 'Gemini', 'Flux.1 Pro', 'Tailwind'],
        result: '3 production modes, multi-provider',
        liveUrl: 'https://shotforge.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/shotforge',
      },
      {
        title: 'Questify (Educator AI)',
        tag: 'AI / EdTech',
        status: 'Live',
        description: 'Upload a PDF or paste text, get an interactive Quiz or Escape Room in 60 seconds. Gemini structured output, Framer Motion animations.',
        tech: ['React 19', 'TypeScript', 'Gemini AI', 'Framer Motion'],
        result: 'PDF to interactive quiz in 60s',
        liveUrl: 'https://educator-ai.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Educator-AI',
      },
      {
        title: 'Text2Image Studio',
        tag: 'AI Image Generation',
        status: 'Live',
        description: 'Multi-provider image generation studio with prompt enhancement, 10 styles, and generation history.',
        tech: ['React 19', 'TypeScript', 'Gemini', 'DALL-E', 'OpenRouter', 'Ollama'],
        result: '4 providers, 10 styles, deployed',
        liveUrl: 'https://text2image-studio.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Text2Image',
      },
    ],
  },
  {
    id: 'web-fullstack',
    eyebrow: 'Web & Fullstack',
    title: 'Web applications and fullstack projects',
    description: 'From premium car rental to task management — production-grade web applications with auth, databases, and responsive UI.',
    projects: [
      {
        title: 'Eclipse PremiumRent',
        tag: 'Premium Web',
        status: 'Live',
        description: 'Luxury car rental website for Kaliningrad. Dark gold design, 5-step booking wizard, 40+ vehicles in 7 categories.',
        tech: ['React 19', 'TypeScript', 'Tailwind 4', 'Zustand', 'Framer Motion'],
        result: 'Premium booking flow with luxury art direction',
        liveUrl: 'https://eclipse-premiumrent.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Eclipse-PremiumRent',
      },
      {
        title: 'Task Manager',
        tag: 'Fullstack / CRUD',
        status: 'Live',
        description: 'Full-stack task manager with JWT auth, pagination, sorting, roles (user/admin), PostgreSQL in Docker.',
        tech: ['React 18', 'Express 5', 'Prisma', 'PostgreSQL', 'Docker'],
        result: 'Auth + roles + Prisma + Docker deploy',
        liveUrl: 'https://task-manager-copy-production.up.railway.app/',
        repoUrl: 'https://github.com/PavelHopson/task-manager',
      },
      {
        title: 'Eclipse Media',
        tag: 'Fullstack / Media',
        status: 'Beta',
        description: 'Self-hosted video/audio downloader with SSE progress, TTL auto-cleanup, and Docker deployment. Supports 1000+ sites.',
        tech: ['React 19', 'FastAPI', 'yt-dlp', 'Docker', 'SSE'],
        result: 'Self-hosted media downloader with Docker',
        repoUrl: 'https://github.com/PavelHopson/eclipse-media',
      },
    ],
  },
  {
    id: 'infra-tools',
    eyebrow: 'Infrastructure & Tools',
    title: 'CLI tools, bots, and DevOps automation',
    description: 'Beyond the UI — tools, bots, and infrastructure that demonstrate backend thinking and operational discipline.',
    projects: [
      {
        title: 'WireGuard Telegram Bot',
        tag: 'DevOps / Automation',
        status: 'Live',
        description: 'Telegram bot for automated WireGuard VPN config distribution. Key generation, .conf files, QR codes, systemd service.',
        tech: ['Python', 'aiogram', 'WireGuard', 'Bash', 'systemd'],
        result: 'VPN automation via Telegram (2 stars)',
        repoUrl: 'https://github.com/PavelHopson/wireguard-telegram-bot',
      },
      {
        title: 'Smart Life Assistant',
        tag: 'Desktop / Life OS',
        status: 'Beta',
        description: 'Desktop life management app with bank API integration (TrueLayer), Stripe subscriptions, automated actions, and Electron NSIS installer.',
        tech: ['Next.js', 'Electron', 'TypeScript', 'Prisma', 'TrueLayer', 'Stripe'],
        result: 'Desktop app with bank API and Stripe',
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
    title: 'AI Infrastructure',
    text: 'Multi-provider AI abstractions (6+ providers), RAG pipelines, function calling agents, streaming, and retry resilience. NVIDIA NIM, Ollama, Gemini, OpenAI, Anthropic.',
  },
  {
    title: 'Fullstack Engineering',
    text: 'React 19 + TypeScript frontends, FastAPI / Express backends, PostgreSQL / Redis, Docker Compose, observability with Prometheus + Grafana + Loki.',
  },
  {
    title: 'Systems & Rust',
    text: 'High-performance Rust (22K LOC scraper, TLS fingerprinting, MCP servers), hybrid TS+Rust+Python stacks, edge AI on consumer hardware.',
  },
];

export const processSteps = [
  {
    index: '01',
    title: 'Understand the system',
    text: 'Study the architecture, map dependencies, find the real root cause. Never modify code I do not understand.',
  },
  {
    index: '02',
    title: 'Verify with tests',
    text: '538 tests across 6 projects. Every change is gated on typecheck + test + build. Coverage badges, CI pipelines, no silent fallbacks.',
  },
  {
    index: '03',
    title: 'Ship incrementally',
    text: 'Atomic commits, feature branches, squash-merge PRs. 10+ merged PRs in this portfolio uplift alone — each one green before merge.',
  },
  {
    index: '04',
    title: 'Reuse across projects',
    text: 'retry-http: designed once, ported byte-identical to 4 projects, published as npm package. Source tagging pattern, NVIDIA NIM integration — all cross-project.',
  },
];

export const metrics = [
  { value: '538', label: 'tests across 6 projects' },
  { value: '22K', label: 'lines of Rust (Eclipse Claw)' },
  { value: '6', label: 'AI providers per project' },
];

export const contactDetails = {
  email: 'man773608@gmail.com',
  telegramDm: '@EclipseHopson',
  telegramDmUrl: 'https://t.me/EclipseHopson',
  telegramChannel: '',
  telegramChannelUrl: '',
  githubUrl: 'https://github.com/PavelHopson',
  githubHandle: 'PavelHopson',
  instagramUrl: 'https://instagram.com/PavelHopson',
  instagramHandle: '@PavelHopson',
  responseTime: 'Usually responds within a few hours',
  cityTimezone: 'Kaliningrad / UTC+2',
} as const;

export const contactFlow = {
  primaryCta: 'Message on Telegram',
  telegramChecklist: [
    'What you need built',
    'Timeline and scope',
    'Your stack preferences (if any)',
  ],
} as const;
