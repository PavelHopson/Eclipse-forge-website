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
    title: 'Eclipse PremiumRent',
    tag: 'Web Platform',
    description: 'Сайт аренды премиальных автомобилей для Калининграда. Тёмный luxury-дизайн в стиле Carloson Club, каталог 40+ авто с каруселями, 5-шаговый визард бронирования, мега-меню.',
    tech: ['React 19', 'TypeScript', 'Tailwind 4', 'Zustand', 'Framer Motion'],
    result: '40+ авто, 7 категорий, Cloudflare Pages',
    liveUrl: 'https://eclipse-premiumrent.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-PremiumRent',
  },
  {
    title: 'CryptoPulse',
    tag: 'Финтех / AI',
    description: 'Финансовый терминал нового поколения: AI-аналитика, реальные котировки криптовалют, симулятор трейдинга, парсер новостей. Cyberpunk 2077 дизайн.',
    tech: ['React 19', 'TypeScript', 'AI Analytics', 'WebSocket', 'Charts'],
    result: 'Real-time данные, AI-прогнозы',
    liveUrl: 'https://cryptopulse-1d0.pages.dev',
    repoUrl: 'https://github.com/PavelHopson/CryptoPulse',
  },
  {
    title: 'Questify (Educator AI)',
    tag: 'AI / EdTech',
    description: 'ИИ-платформа, превращающая PDF-документы в интерактивные квесты, escape-room и адаптивные квизы за 60 секунд. HR-мануалы, учебники, SOP.',
    tech: ['React', 'TypeScript', 'Gemini AI', 'PDF Parser', 'Gamification'],
    result: 'PDF → игра за 60 секунд',
    repoUrl: 'https://github.com/PavelHopson/Educator-AI',
  },
  {
    title: 'Shotforge',
    tag: 'AI / SaaS',
    description: 'AI-фотограф: профессиональные фотосессии за 3 минуты и $9. От селфи до Vogue-level эдиториалов. Flux.1 Pro + Gemini 3 + InsightFace.',
    tech: ['Next.js', 'TypeScript', 'Flux.1 Pro', 'Gemini 3', 'InsightFace'],
    result: 'Фотосессия за 3 мин вместо $3000',
    repoUrl: 'https://github.com/PavelHopson/shotforge',
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
    title: 'Eclipse WebClaw',
    tag: 'Automation / Парсер',
    description: 'Система парсинга и мониторинга маркетплейсов: анализ карточек, позиций, новостей. Автообнаружение изменений, health-check, прокси-ротация.',
    tech: ['Node.js', 'TypeScript', 'Puppeteer', 'PostgreSQL', 'Cron'],
    result: 'Автоматизация мониторинга 24/7',
    repoUrl: 'https://github.com/PavelHopson/Eclipse-Claw',
  },
  {
    title: 'ModelForge',
    tag: 'AI / Генерация',
    description: 'Приложение для генерации изображений Instagram-моделей на базе ИИ. Face swap без артефактов, анализ черт лица, профессиональные фотосессии.',
    tech: ['Python', 'Stable Diffusion', 'InsightFace', 'Face Swap', 'React'],
    result: 'Генерация фото без артефактов',
    repoUrl: 'https://github.com/PavelHopson/ModelForge',
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
  { value: '8+', label: 'реализованных проектов' },
  { value: '3 формата', label: 'сайты, SaaS, AI-автоматизация' },
  { value: '24/7', label: 'мониторинг и поддержка' },
];

export const contactDetails = {
  email: 'hello@eclipseforge.dev',
  telegramHandle: '@EclipseForgeEngine',
  telegramUrl:
    'https://t.me/EclipseForgeEngine?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82,%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82',
  responseTime: 'Отвечаем быстро, обычно в течение нескольких часов',
  cityTimezone: 'Калининград / UTC+2',
} as const;

export const telegramChannel = {
  username: '@EclipseForgeEngine',
  url: 'https://t.me/EclipseForgeEngine',
  label: 'Telegram канал',
  description: 'Следите за проектами, разработкой и реальными кейсами Eclipse Forge',
} as const;

export const contactFlow = {
  primaryCta: 'Написать в Telegram',
  secondaryCta: 'Написать на email',
  panelTitle: 'Свяжитесь с нами напрямую.',
  panelDescription:
    'Основной канал связи — Telegram. Если удобнее, можно написать на email.',
  telegramPrompt: 'Что прислать в первом сообщении',
  telegramChecklist: [
    'Что нужно сделать',
    'Какой результат хотите получить',
    'Сроки и бюджет, если они уже есть',
  ],
} as const;