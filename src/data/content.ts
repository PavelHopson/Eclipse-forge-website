export type ProjectStatus = 'Live' | 'Beta' | 'Prototype' | 'Concept' | 'Reference';

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
  repoUrl: string;
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

const projectImage = (primary: string, secondary: string, alt: string, objectPosition = 'center'): ImageAsset => ({
  alt,
  objectPosition,
  sources: [`/images/projects/${primary}.png`, `/images/projects/${secondary}.png`],
});

export const brandAssets = {
  heroPlate: {
    alt: 'Eclipse Forge brand plate',
    sources: ['/images/projects/eclipse-forge-cover.png', '/images/Шапка.png'],
    objectPosition: 'center',
  },
  founderAvatar: {
    alt: 'Founder portrait of Pavel Hopson',
    sources: ['/images/projects/pavel-founder-avatar.png', '/images/Моя аватарка.png'],
    objectPosition: 'center top',
  },
  founderDesk: {
    alt: 'Pavel Hopson at the operator desk',
    sources: [
      '/images/projects/pavel-founder-desk.png',
      '/images/ChatGPT Image 4 мая 2026 г., 14_42_15.png',
    ],
    objectPosition: 'center top',
  },
  founderPortrait: {
    alt: 'Portrait of Pavel Hopson',
    sources: [
      '/images/projects/pavel-founder-portrait.png',
      '/images/ChatGPT Image 4 мая 2026 г., 14_54_55.png',
    ],
    objectPosition: 'center top',
  },
  founderSeated: {
    alt: 'Pavel Hopson seated portrait',
    sources: [
      '/images/projects/pavel-founder-seated.png',
      '/images/ChatGPT Image 4 мая 2026 г., 14_56_29.png',
    ],
    objectPosition: 'center top',
  },
} as const;

export const featuredProjects: Project[] = [
  {
    title: 'Eclipse Valhalla',
    systemType: 'BEHAVIORAL SYSTEM',
    status: 'Live',
    description:
      'Execution OS for discipline, focus and pressure mechanics. Tasks are not stored as a list: the product turns routines into an active loop with AI, quests, recovery and multi-platform sync.',
    tech: ['React 19', 'TypeScript', 'Electron', 'Capacitor', 'Zustand', 'Vitest', 'Playwright'],
    result: 'A behavior engine instead of a passive task manager.',
    signal: '128 tests, 5 AI providers, multi-platform delivery.',
    tags: ['AI coaching', 'focus loops', 'gamified execution'],
    ecosystemTags: ['AI', 'behavior engine', 'cross-platform'],
    liveUrl: 'https://eclipse-valhalla.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Valhalla',
    image: projectImage('valhalla', 'eclipse-valhalla', 'Eclipse Valhalla interface preview', 'center top'),
  },
  {
    title: 'Eclipse Hopson Sentinel',
    systemType: 'AI OPERATOR',
    status: 'Beta',
    description:
      'A local-first AI operator with voice, terminal tooling, bridge APIs and a hybrid TypeScript, Rust and Python runtime. It is built to act like an operator layer, not a browser chat.',
    tech: ['TypeScript', 'Bun', 'Rust', 'Python', 'WebSocket', 'Voice', 'Ollama'],
    result: 'Turns AI from interface into an executable operating layer.',
    signal: '207K TypeScript lines, 244 tests, dual CI, Windows installer.',
    tags: ['voice interface', 'tool runtime', 'local-first control'],
    ecosystemTags: ['AI', 'Rust / TS / Python', 'local-first'],
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
    systemType: 'PREMIUM BOOKING',
    status: 'Live',
    description:
      'A premium booking system for luxury car rental that treats the landing page as a conversion system: visual authority, selection logic and a guided reservation flow work as one product.',
    tech: ['React 19', 'TypeScript', 'Tailwind', 'Framer Motion', 'Zustand'],
    result: 'A luxury booking funnel with product-grade logic behind the art direction.',
    signal: 'Premium visual language, guided booking, responsive conversion flow.',
    tags: ['premium UX', 'guided reservation', 'high-trust interface'],
    ecosystemTags: ['UX', 'booking flow', 'premium surface'],
    liveUrl: 'https://eclipse-premiumrent.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-PremiumRent',
    image: projectImage(
      'premium-rent',
      'eclipse-premiumrent',
      'Eclipse Premium Rent booking experience preview',
      'center center',
    ),
  },
  {
    title: 'Eclipse Claw',
    systemType: 'DATA ENGINE',
    status: 'Beta',
    description:
      'A self-hosted web extraction engine for AI agents. It retrieves hostile web pages, strips noise, compresses token payloads and exposes the result through an MCP-friendly interface.',
    tech: ['Rust', 'Axum', 'Tokio', 'MCP', 'Docker', 'TLS Fingerprinting'],
    result: 'Cleaner, cheaper and more reliable agent-ready extraction than typical scraping stacks.',
    signal: '22K Rust lines, 417 tests, Docker, CI, REST API.',
    tags: ['agent extraction', 'LLM optimization', 'self-hosted infra'],
    ecosystemTags: ['automation', 'Rust', 'data extraction'],
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Claw',
    image: projectImage('claw', 'eclipse-claw', 'Eclipse Claw extraction engine preview', 'center center'),
  },
  {
    title: 'Business Data Platform',
    systemType: 'AUTOMATION PLATFORM',
    status: 'Beta',
    description:
      'An ETL and company-research platform with FastAPI, ingestion, monitoring and alerting. It replaces fragmented manual checking with an observable pipeline and operator dashboard.',
    tech: ['FastAPI', 'Python', 'Next.js', 'PostgreSQL', 'Redis', 'Prometheus', 'Grafana', 'Loki'],
    result: 'From manual company lookup to a monitored data and ops system.',
    signal: 'ETL, observability and 7-service Docker Compose architecture.',
    tags: ['ETL', 'observability', 'monitoring'],
    ecosystemTags: ['automation', 'ETL', 'monitoring'],
    repoUrl: 'https://github.com/PavelHopson/business-data-platform-mvp',
    image: projectImage(
      'business-data-platform',
      'business-data-platform-mvp',
      'Business Data Platform dashboard preview',
      'center top',
    ),
  },
  {
    title: 'Smart Life Assistant',
    systemType: 'OPERATOR OS',
    status: 'Beta',
    description:
      'A desktop action system for personal operations: finance, subscriptions, health and daily execution are converted into next actions, reminders and guided decisions instead of passive dashboards.',
    tech: ['Next.js', 'Electron', 'TypeScript', 'Prisma', 'TrueLayer', 'Stripe'],
    result: 'Transforms personal admin into a guided action loop.',
    signal: 'Desktop app, banking APIs, payments and action generation.',
    tags: ['life ops', 'decision support', 'desktop control'],
    ecosystemTags: ['automation', 'desktop', 'decision support'],
    repoUrl: 'https://github.com/PavelHopson/SmartLifeAssistant',
    image: projectImage(
      'smart-life-assistant',
      'smartlifeassistant',
      'Smart Life Assistant product preview',
      'center top',
    ),
  },
];

export const systemsEcosystemIntro: SystemsEcosystemIntro = {
  eyebrow: 'Flagship systems',
  title: 'Systems ecosystem',
  description: 'We do not build isolated projects. We build systems that can live next to each other, share control patterns and behave like modules of a larger product mind.',
  note: 'Each module keeps its own role, but the engineering pattern stays coherent: observe, route, act and record.',
  categories: ['AI SYSTEMS', 'AUTOMATION', 'SaaS', 'UX'],
};

const systemsEcosystemOrder = [
  'Eclipse Valhalla',
  'Eclipse Hopson Sentinel',
  'Eclipse Claw',
  'Eclipse Premium Rent',
  'Business Data Platform',
  'Smart Life Assistant',
] as const;

export const systemsEcosystemProjects: Project[] = systemsEcosystemOrder
  .map((title) => featuredProjects.find((project) => project.title === title))
  .filter((project): project is Project => Boolean(project));

export const portfolioCollections: ProjectCollection[] = [
  {
    id: 'ai-products',
    eyebrow: 'AI ecosystem',
    title: 'Product surfaces built around AI workflows',
    description:
      'Not single prompts, but complete flows: provider orchestration, structured output, retries, local models and interfaces that keep the user inside the system.',
    projects: [
      {
        title: 'Eclipse AI Hub',
        systemType: 'AI WORKSPACE',
        status: 'Live',
        description:
          'Local AI workspace with chat, arena, RAG, review and generation modules across multiple providers and local model routes.',
        tech: ['React 19', 'TypeScript', 'Ollama', 'Gemini', 'NVIDIA NIM', 'Vitest'],
        result: 'A real operator workspace instead of a single chat screen.',
        signal: '8 providers, 7 modules, 41 tests.',
        tags: ['multi-provider', 'RAG', 'local AI'],
        liveUrl: 'https://eclipse-ai-hub.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/eclipse-ai-hub',
      },
      {
        title: 'Smart Fitness Booking Agent',
        systemType: 'AI AGENT',
        status: 'Live',
        description:
          'A natural-language booking agent that uses function calling and retry-safe requests to schedule training sessions without a brittle scripted flow.',
        tech: ['React 19', 'TypeScript', 'Gemini AI', 'Function Calling', 'Vitest'],
        result: 'Shows how AI can operate a constrained booking process safely.',
        signal: 'Function calling demo with reusable retry patterns.',
        tags: ['booking agent', 'function calling', 'workflow AI'],
        liveUrl: 'https://fitness-booking-agent.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Smart-Fitness-Booking-Agent',
      },
      {
        title: 'InterviewForge',
        systemType: 'VOICE AI TOOL',
        status: 'Live',
        description:
          'Desktop interview copilot on Tauri with real-time audio analysis, OCR and hotkeys powered by the Gemini Live API.',
        tech: ['React 18', 'Tauri 2', 'Rust', 'Gemini Live', 'Web Audio API'],
        result: 'A fast local shell around live multimodal reasoning.',
        signal: 'Realtime voice plus screen understanding in a desktop runtime.',
        tags: ['desktop AI', 'OCR', 'live audio'],
        liveUrl: 'https://interviewforge-3pf.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/InterviewForge',
      },
      {
        title: 'Shotforge',
        systemType: 'AI STUDIO',
        status: 'Live',
        description:
          'A photo-generation studio with multiple modes, style systems and provider routing for image creation and transformation workflows.',
        tech: ['React 19', 'TypeScript', 'Gemini', 'Flux.1 Pro', 'Tailwind'],
        result: 'A modular content studio rather than a single generator view.',
        signal: '3 production modes with multi-provider image generation.',
        tags: ['image generation', 'creative tooling', 'multi-mode'],
        liveUrl: 'https://shotforge.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/shotforge',
      },
      {
        title: 'Questify (Educator AI)',
        systemType: 'AI LEARNING TOOL',
        status: 'Live',
        description:
          'Transforms text or PDF content into interactive quizzes and escape-room style learning flows using structured AI output.',
        tech: ['React 19', 'TypeScript', 'Gemini AI', 'Framer Motion'],
        result: 'Turns learning material into playable, structured interaction.',
        signal: 'PDF to interactive quest in roughly one minute.',
        tags: ['edtech', 'structured output', 'interactive content'],
        liveUrl: 'https://educator-ai.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Educator-AI',
      },
      {
        title: 'Text2Image Studio',
        systemType: 'AI GENERATION TOOL',
        status: 'Live',
        description:
          'A multi-provider image studio with prompt enhancement, style presets and generation history designed as a reusable creative workflow surface.',
        tech: ['React 19', 'TypeScript', 'Gemini', 'DALL-E', 'OpenRouter', 'Ollama'],
        result: 'Organized generation workflow instead of isolated image prompts.',
        signal: '4 providers, 10 styles, deployed production demo.',
        tags: ['prompt enhancement', 'style presets', 'generation history'],
        liveUrl: 'https://text2image-studio.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/Text2Image',
      },
    ],
  },
  {
    id: 'product-systems',
    eyebrow: 'Product systems',
    title: 'Interfaces with heavy logic behind the surface',
    description:
      'Products that sell through interaction quality, but are grounded in routing, validation, data flows and internal structure instead of visual polish alone.',
    projects: [
      {
        title: 'CryptoPulse 2077',
        systemType: 'TRADING INTELLIGENCE',
        status: 'Live',
        description:
          'A market terminal for crypto, forex and futures with AI analysis, source-tagged news parsing and trading simulation.',
        tech: ['React 19', 'TypeScript', 'Recharts', 'Cloudflare Workers', 'NVIDIA NIM', 'Vitest'],
        result: 'An analytical surface with controlled data provenance.',
        signal: '76 tests, 6 AI providers, architecture docs.',
        tags: ['market data', 'AI analytics', 'news parsing'],
        liveUrl: 'https://cryptopulse-1d0.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/CryptoPulse',
      },
      {
        title: 'Task Manager',
        systemType: 'INTERNAL PLATFORM',
        status: 'Live',
        description:
          'A fullstack task platform with authentication, roles, pagination and sorting backed by PostgreSQL and Dockerized infrastructure.',
        tech: ['React 18', 'Express 5', 'Prisma', 'PostgreSQL', 'Docker'],
        result: 'A clean internal admin surface with production fundamentals.',
        signal: 'Auth, roles, Prisma and Docker deployment.',
        tags: ['internal tools', 'CRUD', 'auth'],
        liveUrl: 'https://task-manager-eclipse.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/task-manager',
      },
      {
        title: 'Eclipse Media',
        systemType: 'MEDIA UTILITY',
        status: 'Beta',
        description:
          'A self-hosted media downloader with SSE progress, automated cleanup and support for large numbers of sources.',
        tech: ['React 19', 'FastAPI', 'yt-dlp', 'Docker', 'SSE'],
        result: 'Turns ad hoc media retrieval into a controlled self-hosted tool.',
        signal: '1000+ sources, Dockerized runtime, streaming progress.',
        tags: ['self-hosted', 'media ops', 'streaming state'],
        liveUrl: 'https://eclipse-media.pages.dev',
        repoUrl: 'https://github.com/PavelHopson/eclipse-media',
      },
    ],
  },
  {
    id: 'engineering-tools',
    eyebrow: 'Infrastructure and tooling',
    title: 'Reusable control layers behind the products',
    description:
      'Libraries, bots and automation pieces that show how the team thinks once the visible interface ends: reliability, portability, deployment and reuse.',
    projects: [
      {
        title: '@pavelhopson/retry-http',
        systemType: 'RELIABILITY MODULE',
        status: 'Live',
        description:
          'A zero-dependency TypeScript retry library extracted from production work and reused across multiple projects without drift.',
        tech: ['TypeScript', 'ESM', 'Vitest', 'npm'],
        result: 'Reliability patterns packaged once and reused everywhere.',
        signal: 'Published on npm and ported into 4 consumer projects.',
        tags: ['retry logic', 'reusable module', 'open source'],
        repoUrl: 'https://github.com/PavelHopson/retry-http',
      },
      {
        title: 'WireGuard Telegram Bot',
        systemType: 'AUTOMATION BOT',
        status: 'Live',
        description:
          'A Telegram bot that automates VPN access delivery through config generation, QR codes and service-level provisioning.',
        tech: ['Python', 'aiogram', 'WireGuard', 'Bash', 'systemd'],
        result: 'Infrastructure setup turned into a repeatable operator flow.',
        signal: 'Automated VPN issuance through Telegram workflows.',
        tags: ['Telegram bot', 'DevOps', 'provisioning'],
        repoUrl: 'https://github.com/PavelHopson/wireguard-telegram-bot',
      },
    ],
  },
];

export const allProjects: Project[] = [...featuredProjects, ...portfolioCollections.flatMap((collection) => collection.projects)].filter(
  (project, index, list) => list.findIndex((candidate) => candidate.title === project.title) === index,
);

export const serviceEntryPoints: ServiceEntryPoint[] = [
  {
    title: 'AI automation system',
    cue: '01 / orchestration',
    description:
      'When a team still moves tasks through chats, spreadsheets and manual follow-up, we turn that logic into an AI-assisted execution flow.',
    audience: 'For founders and operators drowning in repeated decisions.',
    result: 'A system that sees events, routes actions and closes the loop.',
  },
  {
    title: 'SaaS MVP or internal platform',
    cue: '02 / product core',
    description:
      'When the product is more than screens, we build the control layer, data flow and operator-facing interface that make it usable day to day.',
    audience: 'For SaaS founders, ops-heavy products and internal teams.',
    result: 'A usable MVP with logic behind the interface, not a demo shell.',
  },
  {
    title: 'Premium landing or booking system',
    cue: '03 / conversion system',
    description:
      'When visual trust and premium positioning matter, we design the front layer as part of a real booking or qualification flow.',
    audience: 'For high-ticket services, premium products and selective brands.',
    result: 'A landing that qualifies, guides and converts instead of decorating.',
  },
  {
    title: 'Data scraping and monitoring dashboard',
    cue: '04 / signal capture',
    description:
      'When critical information is scattered across sources, we build ingestion, retries, parsing and dashboards that make it observable.',
    audience: 'For research teams, analysts and manual data operators.',
    result: 'A monitored data engine instead of fragile one-off scripts.',
  },
  {
    title: 'AI operator or agent tool',
    cue: '05 / execution layer',
    description:
      'When AI needs to act through tools, voice or local workflows, we build the runtime around it: permissions, tools, guardrails and interfaces.',
    audience: 'For teams moving from chatbot experiments to real operator systems.',
    result: 'An AI layer that can actually execute work.',
  },
];

export const processSteps = [
  {
    index: '01',
    title: 'Map the real system',
    text: 'We start from process anatomy: what the system sees, what state it keeps, where decisions happen and where control currently leaks.',
  },
  {
    index: '02',
    title: 'Design the execution loop',
    text: 'AI, automation, dashboards and notifications are assembled around one loop: detect, decide, act, verify and record.',
  },
  {
    index: '03',
    title: 'Ship with engineering discipline',
    text: 'Builds, tests, deploy checks and observable logs are part of the delivery. The goal is not a demo but a system that keeps working.',
  },
  {
    index: '04',
    title: 'Reuse patterns across products',
    text: 'Once a control pattern proves itself, we package it and reuse it across projects: adapters, retries, operator panels, parsing layers and AI routes.',
  },
];

export const metrics = [
  { value: '958+', label: 'tests across flagship systems' },
  { value: '22K', label: 'Rust lines in the extraction engine' },
  { value: '6', label: 'flagship systems positioned on this site' },
];

export const founderProfile: FounderProfile = {
  eyebrow: 'Operator profile',
  title: 'Who stands behind the system',
  summary: [
    'Pavel is the developer and founder behind Eclipse Forge. The focus is not “code for code’s sake”, but systems that can observe, decide, automate and keep control when a process becomes complex.',
    'The work sits where product UX, internal tooling, AI runtime design and operational logic meet. The interface matters, but the real value is in the contour behind it: what the system tracks, how it reacts and where it closes the loop.',
  ],
  pillars: [
    'AI systems, agents and local-first operator tooling',
    'Automation flows that reduce manual routing and follow-up',
    'SaaS MVPs and internal platforms with real logic behind the UI',
    'Behavioral systems and products that change execution, not just visibility',
  ],
  stats: [
    { value: 'Rust + TS + Python', label: 'hybrid engineering stack' },
    { value: 'Products + tooling', label: 'one mind across UI and infra' },
    { value: 'Control over noise', label: 'the main design principle' },
  ],
  portrait: brandAssets.founderPortrait,
  supportVisual: brandAssets.heroPlate,
};

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
  responseTime: 'Usually replies within a few hours',
  cityTimezone: 'Kaliningrad / UTC+2',
} as const;

export const contactPrompts = [
  {
    label: 'manual_load',
    prompt: 'What are you still doing manually?',
    placeholder: 'For example: routing leads, checking data, rewriting reports, coordinating requests...',
  },
  {
    label: 'target_state',
    prompt: 'What result should the system produce?',
    placeholder: 'For example: classify requests, trigger actions, generate briefs, monitor anomalies...',
  },
  {
    label: 'control_gap',
    prompt: 'Where are time, money or control leaking now?',
    placeholder: 'For example: approvals stall, information gets lost, handoffs fail, data arrives too late...',
  },
];

export const contactFlow = {
  primaryCta: 'Open Telegram channel',
  secondaryCta: 'Copy signal packet',
  status: ['request channel open', 'signal ready', 'operator online'],
} as const;
