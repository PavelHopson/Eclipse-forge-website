// Generated editorial data. No local checkout paths, private remotes or runtime health.
window.REPOSITORY_CATALOG = [
  {
    "folder": "EclipseForgeLanding",
    "title": "Eclipse Forge",
    "group": "platform",
    "type": "Главный сайт",
    "summary": "Вход в экосистему продуктов, инженерных проектов и общих стандартов Eclipse Forge.",
    "flow": [
      "Идея",
      "Проект",
      "Результат"
    ],
    "boundary": "Центральные документы описывают общие договорённости; runtime и эксплуатационные инструкции принадлежат отдельным продуктам.",
    "groupLabel": "Экосистема",
    "repository": "https://github.com/PavelHopson/Eclipse-forge-website",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "check",
        "command": "npm run check",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "public/",
        "label": "Статические ресурсы"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "tests/",
        "label": "Тесты"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "eclipse-chat",
    "title": "Eclipse Chat",
    "group": "platform",
    "type": "Рабочее пространство",
    "summary": "Рабочее пространство для общения, AI-задач и проверяемых действий в экосистеме Eclipse.",
    "flow": [
      "Сообщение",
      "Действие",
      "Результат"
    ],
    "boundary": "Проверяйте доступ к workspace, подтверждения действий и безопасное журналирование отдельно от оформления интерфейса.",
    "groupLabel": "Экосистема",
    "repository": "https://github.com/PavelHopson/eclipse-chat",
    "commands": [
      {
        "dir": ".",
        "name": "dev:web",
        "command": "npm run dev:web",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "dev:server",
        "command": "npm run dev:server",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "apps/",
        "label": "Приложения и сервисы workspace"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "eclipse-ai-hub",
    "title": "Eclipse AI Hub",
    "group": "platform",
    "type": "AI-платформа",
    "summary": "Единый интерфейс AI-инструментов, провайдеров и агентских сценариев с локальными и облачными моделями.",
    "flow": [
      "Задача",
      "Провайдер",
      "Артефакт"
    ],
    "boundary": "Облачные вызовы, MCP и агентские действия требуют отдельной настройки доступа, бюджета и разрешений.",
    "groupLabel": "Экосистема",
    "repository": "https://github.com/PavelHopson/eclipse-ai-hub",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "public/",
        "label": "Статические ресурсы"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "eclipse-library",
    "title": "Eclipse Library",
    "group": "platform",
    "type": "База знаний",
    "summary": "Кураторская библиотека инструментов, практических гайдов и решений с источниками и ограничениями применения.",
    "flow": [
      "Найти",
      "Проверить",
      "Применить"
    ],
    "boundary": "Карточка в библиотеке не означает одобрение установки. Лицензия, источник и допуск для агентов проверяются отдельно.",
    "groupLabel": "Экосистема",
    "repository": "https://github.com/PavelHopson/eclipse-library",
    "commands": [],
    "files": [
      {
        "name": "web/",
        "label": "Веб-интерфейс и публичные данные"
      },
      {
        "name": "catalog/",
        "label": "Канонический каталог"
      },
      {
        "name": "guides/",
        "label": "Пользовательские гайды"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "eclipse-hopson-sentinel",
    "title": "Eclipse Ultron",
    "group": "platform",
    "type": "Локальный помощник",
    "summary": "Локальный помощник: голосовой запрос, план, подтверждение действия и проверяемый результат.",
    "flow": [
      "Запрос",
      "Подтверждение",
      "Отчёт"
    ],
    "boundary": "Микрофон, управление компьютером и системные действия включаются только по явному разрешению; новые права не выводятся из голосового запроса.",
    "groupLabel": "Экосистема",
    "repository": "https://github.com/PavelHopson/eclipse-hopson-sentinel",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "dashboard/",
        "label": "Интерфейс управления"
      },
      {
        "name": "rust/",
        "label": "Rust-компоненты"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "eclipse-media",
    "title": "Eclipse Media",
    "group": "creative",
    "type": "Медиа-мастерская",
    "summary": "Планирование и обработка разрешённых медиаисточников: загрузки, субтитры, исследование и планы сцен.",
    "flow": [
      "Источник",
      "План",
      "Медиа"
    ],
    "boundary": "До обработки фиксируются права на материал. Скачивание, AI-провайдеры, публикация и платные операции — разные действия.",
    "groupLabel": "Креативные инструменты",
    "repository": "https://github.com/PavelHopson/eclipse-media",
    "commands": [
      {
        "dir": "frontend",
        "name": "dev",
        "command": "npm run dev",
        "source": "frontend/package.json"
      },
      {
        "dir": "frontend",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "frontend/package.json"
      },
      {
        "dir": "frontend",
        "name": "lint",
        "command": "npm run lint",
        "source": "frontend/package.json"
      },
      {
        "dir": "frontend",
        "name": "test",
        "command": "npm run test",
        "source": "frontend/package.json"
      },
      {
        "dir": "frontend",
        "name": "build",
        "command": "npm run build",
        "source": "frontend/package.json"
      },
      {
        "dir": "frontend",
        "name": "preview",
        "command": "npm run preview",
        "source": "frontend/package.json"
      }
    ],
    "files": [
      {
        "name": "frontend/",
        "label": "Клиентское приложение"
      },
      {
        "name": "backend/",
        "label": "Серверная часть"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "docker-compose.yml",
        "label": "Описание сервисов контейнерной среды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "Eclipse-webclaw",
    "title": "Eclipse Claw",
    "group": "engineering",
    "type": "Web extraction toolkit",
    "summary": "Локальный toolkit извлечения веб-данных для агентов: CLI, MCP и REST с проверяемыми fixtures.",
    "flow": [
      "URL",
      "Извлечение",
      "Данные"
    ],
    "boundary": "Сохраняйте public-only egress, ограничения URL и изоляцию workers; не расширяйте сетевой доступ ради удобства.",
    "groupLabel": "Инженерия",
    "repository": "https://github.com/PavelHopson/Eclipse-Claw",
    "commands": [],
    "files": [
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "assets/",
        "label": "Ресурсы интерфейса"
      },
      {
        "name": "crates/",
        "label": "Rust crates"
      },
      {
        "name": "Cargo.toml",
        "label": "Rust manifest"
      },
      {
        "name": "docker-compose.yml",
        "label": "Описание сервисов контейнерной среды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "eclipse-connect",
    "title": "Eclipse Connect",
    "group": "engineering",
    "type": "Локальная утилита",
    "summary": "Windows-приложение для обзора доступности сервисов и явного управления сетевыми компонентами.",
    "flow": [
      "Проверка",
      "Выбор",
      "Контроль"
    ],
    "boundary": "Это отдельный продукт, не VPN. Запуск FIX, обновления и изменение работающей сети требуют собственного плана возврата.",
    "groupLabel": "Инженерия",
    "repository": null,
    "commands": [],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "tests/",
        "label": "Тесты"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "eclipse-vpn",
    "title": "Eclipse VPN",
    "group": "engineering",
    "type": "Прототип консоли",
    "summary": "Интерфейс закрытого VPN/proxy-продукта; текущий первый срез описывает gateway, устройства и доступ на mock-данных.",
    "flow": [
      "Gateway",
      "Устройства",
      "Доступ"
    ],
    "boundary": "Mock-консоль не доказывает работу туннеля. Ключи, адреса инфраструктуры и конфигурации клиентов не должны попадать в публичную витрину.",
    "groupLabel": "Инженерия",
    "repository": null,
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "ai-setup",
    "title": "AI Setup",
    "group": "engineering",
    "type": "CLI-инструмент",
    "summary": "Анализ структуры проекта, оценка AI-документации и генерация конфигураций. Отдельный Codex-only режим CLI пока не реализован.",
    "flow": [
      "Проект",
      "Анализ",
      "Проверка"
    ],
    "boundary": "init создаёт несколько AI-конфигураций, refresh перезаписывает их. В Eclipse используются справка и чтение оценки; генерация в рабочие проекты требует отдельного Codex-only режима и review.",
    "groupLabel": "Инженерия",
    "repository": "https://github.com/PavelHopson/ai-setup",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "tests/",
        "label": "Тесты"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "retry-http",
    "title": "retry-http",
    "group": "engineering",
    "type": "TypeScript-библиотека",
    "summary": "Небольшая библиотека HTTP-повторов с backoff для устойчивых сетевых клиентов.",
    "flow": [
      "Запрос",
      "Повтор",
      "Ответ"
    ],
    "boundary": "Повтор изменяющего запроса требует идемпотентности; retry не заменяет timeout, отмену и ограничения нагрузки.",
    "groupLabel": "Инженерия",
    "repository": "https://github.com/PavelHopson/retry-http",
    "commands": [
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "AdService",
    "title": "AdService",
    "group": "engineering",
    "type": "HTTP API",
    "summary": "Сервис поиска рекламных площадок по вложенным географическим локациям на ASP.NET Core.",
    "flow": [
      "Загрузка",
      "Индекс",
      "Поиск"
    ],
    "boundary": "Проверяйте входной формат и размер файла; примеры запросов не подтверждают безопасность открытого production API.",
    "groupLabel": "Инженерия",
    "repository": "https://github.com/PavelHopson/AdService",
    "commands": [],
    "files": [
      {
        "name": "Services/",
        "label": "Сервисная логика"
      },
      {
        "name": "Program.cs",
        "label": "Точка входа .NET"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      },
      {
        "name": "AdService.csproj",
        "label": ".NET project manifest"
      }
    ]
  },
  {
    "folder": "KmlApiApp",
    "title": "KML API",
    "group": "engineering",
    "type": "Геоданные",
    "summary": "API географических полей: KML-полигоны, центроиды, площадь и расстояния.",
    "flow": [
      "KML",
      "Геометрия",
      "Ответ API"
    ],
    "boundary": "XML/KML — недоверенный ввод: ограничения размера, внешних сущностей и координат должны проверяться в отдельном security-тесте.",
    "groupLabel": "Инженерия",
    "repository": "https://github.com/PavelHopson/KmlApiApp",
    "commands": [],
    "files": [
      {
        "name": "Controllers/",
        "label": "HTTP-контроллеры"
      },
      {
        "name": "Services/",
        "label": "Сервисная логика"
      },
      {
        "name": "Models/",
        "label": "Модели данных"
      },
      {
        "name": "Program.cs",
        "label": "Точка входа .NET"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      },
      {
        "name": "KmlApiApp.csproj",
        "label": ".NET project manifest"
      }
    ]
  },
  {
    "folder": "wireguard-telegram-bot",
    "title": "WireGuard Telegram Bot",
    "group": "engineering",
    "type": "Telegram-бот",
    "summary": "Бот доставки WireGuard-конфигураций и взаимодействия с пользователями сервиса.",
    "flow": [
      "Запрос",
      "Доступ",
      "Конфигурация"
    ],
    "boundary": "Конфигурации содержат секреты. Не публикуйте клиентские файлы, токены, журналы переписки и адреса закрытой инфраструктуры.",
    "groupLabel": "Инженерия",
    "repository": "https://github.com/PavelHopson/wireguard-telegram-bot",
    "commands": [],
    "files": [
      {
        "name": "bot.py",
        "label": "Точка входа Telegram-бота"
      },
      {
        "name": "requirements.txt",
        "label": "Python-зависимости"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "business-data-platform-mvp",
    "title": "Business Data Platform",
    "group": "business",
    "type": "Data-платформа",
    "summary": "Прототип анализа компаний и наблюдения за ETL-процессами с отдельными backend и frontend.",
    "flow": [
      "Источники",
      "ETL",
      "Анализ"
    ],
    "boundary": "Данные компаний и права доступа оцениваются отдельно; demo-данные не следует смешивать с выгрузками реальных клиентов.",
    "groupLabel": "Бизнес и витрины",
    "repository": "https://github.com/PavelHopson/business-data-platform-mvp",
    "commands": [],
    "files": [
      {
        "name": "frontend/",
        "label": "Клиентское приложение"
      },
      {
        "name": "backend/",
        "label": "Серверная часть"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "Makefile",
        "label": "Сценарии сборки"
      },
      {
        "name": "docker-compose.yml",
        "label": "Описание сервисов контейнерной среды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "Lead-Sniper-CAT-Analytics",
    "title": "Lead Sniper",
    "group": "business",
    "type": "B2B-исследование",
    "summary": "Исследование рынка переводческих услуг и использования CAT-инструментов с аналитикой компаний.",
    "flow": [
      "Компании",
      "Анализ",
      "Гипотезы"
    ],
    "boundary": "Исследование не даёт разрешения на массовый outreach. Источники, персональные данные и отправки требуют отдельных ограничений.",
    "groupLabel": "Бизнес и витрины",
    "repository": "https://github.com/PavelHopson/Lead-Sniper-CAT-Analytics",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "components/",
        "label": "Компоненты интерфейса"
      },
      {
        "name": "Services/",
        "label": "Сервисная логика"
      },
      {
        "name": "App.tsx",
        "label": "Корневой React-компонент"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "Eclipse-PremiumRent",
    "title": "Eclipse Premium Rent",
    "group": "business",
    "type": "Веб-витрина",
    "summary": "Витрина премиальной аренды автомобилей в Калининграде: каталог и путь к заявке.",
    "flow": [
      "Автопарк",
      "Выбор",
      "Заявка"
    ],
    "boundary": "Цены, доступность автомобилей и отзывы перед публикацией проверяются владельцем бизнеса; UI не подтверждает реальное бронирование.",
    "groupLabel": "Бизнес и витрины",
    "repository": "https://github.com/PavelHopson/Eclipse-PremiumRent",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "RentKldRedesign",
    "title": "Rent Express",
    "group": "business",
    "type": "Редизайн сайта",
    "summary": "Сайт аренды автомобилей: автопарк, параметры бронирования, этапы аренды и контакты.",
    "flow": [
      "Автомобиль",
      "Даты",
      "Заявка"
    ],
    "boundary": "Форма бронирования в интерфейсе не означает серверное подтверждение заказа; интеграция и коммерческие сведения требуют отдельной проверки.",
    "groupLabel": "Бизнес и витрины",
    "repository": "https://github.com/PavelHopson/rent-express-redesign",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "lint",
        "command": "npm run lint",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "public/",
        "label": "Статические ресурсы"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "dark_roast_coffee",
    "title": "Dark Roast Coffee",
    "group": "business",
    "type": "Кофейная витрина",
    "summary": "Визуальный сайт кофейного бренда: продукт, атмосфера и контент в статическом веб-формате.",
    "flow": [
      "Бренд",
      "Кофе",
      "Выбор"
    ],
    "boundary": "Контент и изображения проверяются на права; коммерческие обещания должны соответствовать реальному предложению.",
    "groupLabel": "Бизнес и витрины",
    "repository": "https://github.com/PavelHopson/dark_roast_coffee",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "public/",
        "label": "Статические ресурсы"
      },
      {
        "name": "css/",
        "label": "Стили"
      },
      {
        "name": "pages/",
        "label": "Страницы"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "zefir-gift-landing",
    "title": "Зефирные подарки",
    "group": "business",
    "type": "Сайт малого бизнеса",
    "summary": "Статическая витрина подарочных наборов с галереей, информацией о заказе и контактами.",
    "flow": [
      "Подарок",
      "Детали",
      "Связь"
    ],
    "boundary": "Перед публичным использованием проверьте актуальность контактов, условий заказа и права на фотографии.",
    "groupLabel": "Бизнес и витрины",
    "repository": "https://github.com/PavelHopson/zefir-gift-landing",
    "commands": [],
    "files": [
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "assets/",
        "label": "Ресурсы интерфейса"
      },
      {
        "name": "styles/",
        "label": "Стили"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "shotforge",
    "title": "ShotForge",
    "group": "creative",
    "type": "AI-студия",
    "summary": "Работа с визуальными концепциями, сценами и AI-материалами с передачей результата в медиа-процесс.",
    "flow": [
      "Концепция",
      "Сцены",
      "Материалы"
    ],
    "boundary": "Генерация зависит от провайдера, ключей и стоимости. Передача плана в Media не равна запуску генерации или публикации.",
    "groupLabel": "Креативные инструменты",
    "repository": "https://github.com/PavelHopson/shotforge",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "components/",
        "label": "Компоненты интерфейса"
      },
      {
        "name": "public/",
        "label": "Статические ресурсы"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "tests/",
        "label": "Тесты"
      },
      {
        "name": "Services/",
        "label": "Сервисная логика"
      },
      {
        "name": "App.tsx",
        "label": "Корневой React-компонент"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "Text2Image",
    "title": "Text2Image",
    "group": "creative",
    "type": "Генерация изображений",
    "summary": "Интерфейс текстовой генерации изображений с несколькими AI-провайдерами и настройками результата.",
    "flow": [
      "Промпт",
      "Генерация",
      "Изображение"
    ],
    "boundary": "Провайдеры имеют разные условия хранения и использования данных; ключи и стоимость проверяются до запуска.",
    "groupLabel": "Креативные инструменты",
    "repository": "https://github.com/PavelHopson/Text2Image",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "public/",
        "label": "Статические ресурсы"
      },
      {
        "name": "tests/",
        "label": "Тесты"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "ModelForge",
    "title": "ModelForge",
    "group": "creative",
    "type": "Визуальные концепции",
    "summary": "Инструмент разработки образов и визуальных концепций для AI-контента.",
    "flow": [
      "Референс",
      "Образ",
      "Варианты"
    ],
    "boundary": "Реальные лица и голоса требуют согласия и проверки прав. Качество и идентичность результата не гарантируются оформлением проекта.",
    "groupLabel": "Креативные инструменты",
    "repository": "https://github.com/PavelHopson/ModelForge",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "components/",
        "label": "Компоненты интерфейса"
      },
      {
        "name": "Services/",
        "label": "Сервисная логика"
      },
      {
        "name": "App.tsx",
        "label": "Корневой React-компонент"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "AI-Face-Fusion-Pro",
    "title": "AI Face Fusion Pro",
    "group": "creative",
    "type": "Виртуальная примерка",
    "summary": "Визуальная работа с образами, одеждой и референсами через интерфейс AI-примерки.",
    "flow": [
      "Фото",
      "Образ",
      "Примерка"
    ],
    "boundary": "Используйте только разрешённые фотографии и согласованные лица; не загружайте чужие биометрические данные без разрешения.",
    "groupLabel": "Креативные инструменты",
    "repository": "https://github.com/PavelHopson/AI-Face-Fusion-Pro",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "components/",
        "label": "Компоненты интерфейса"
      },
      {
        "name": "Services/",
        "label": "Сервисная логика"
      },
      {
        "name": "App.tsx",
        "label": "Корневой React-компонент"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "StreamForge-AI",
    "title": "StreamForge AI",
    "group": "creative",
    "type": "Контент для стримов",
    "summary": "Подготовка визуальных материалов и брендированных наборов для стриминговых каналов.",
    "flow": [
      "Референс",
      "Стиль",
      "Набор"
    ],
    "boundary": "Проверьте права на референсы, торговые знаки и результат генерации до публикации материалов канала.",
    "groupLabel": "Креативные инструменты",
    "repository": "https://github.com/PavelHopson/StreamForge-AI",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "components/",
        "label": "Компоненты интерфейса"
      },
      {
        "name": "Services/",
        "label": "Сервисная логика"
      },
      {
        "name": "App.tsx",
        "label": "Корневой React-компонент"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "Educator-AI",
    "title": "Educator AI",
    "group": "life",
    "type": "Учебные сценарии",
    "summary": "Преобразование учебного материала в интерактивные задания, квесты и структурированные учебные сценарии.",
    "flow": [
      "Материал",
      "Задания",
      "Практика"
    ],
    "boundary": "Педагог проверяет содержание и ответы. Загруженные документы и данные учащихся не должны попадать в публичные примеры.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/Educator-AI",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "shared/",
        "label": "Общие модули и контракты"
      },
      {
        "name": "components/",
        "label": "Компоненты интерфейса"
      },
      {
        "name": "Services/",
        "label": "Сервисная логика"
      },
      {
        "name": "App.tsx",
        "label": "Корневой React-компонент"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "eclipse-dnd-forge",
    "title": "Eclipse D&D Forge",
    "group": "life",
    "type": "Мастерская кампаний",
    "summary": "Организация настольных приключений: миры, кампании и AI-помощники для подготовки игры.",
    "flow": [
      "Мир",
      "Кампания",
      "Сессия"
    ],
    "boundary": "AI-материалы проходят review ведущего; ключи провайдеров и частные заметки игроков не публикуются.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/eclipse-dnd-forge",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "lint",
        "command": "npm run lint",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "public/",
        "label": "Статические ресурсы"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "tests/",
        "label": "Тесты"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "finflow",
    "title": "FinFlow",
    "group": "life",
    "type": "Семейные финансы",
    "summary": "Совместный учёт доходов и расходов, семейные бюджеты и отчёты в одном приложении.",
    "flow": [
      "Операции",
      "Бюджет",
      "Отчёт"
    ],
    "boundary": "Финансовые записи приватны; проверяйте изоляцию семейных аккаунтов. AI-подсказки не являются финансовой рекомендацией.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/finflow",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "dev:web",
        "command": "npm run dev:web",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "dev:server",
        "command": "npm run dev:server",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "apps/",
        "label": "Приложения и сервисы workspace"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "CryptoPulse",
    "title": "CryptoPulse",
    "group": "life",
    "type": "Рыночные исследования",
    "summary": "Рабочее пространство для анализа крипторынка, сценариев и исследовательских гипотез.",
    "flow": [
      "Рынок",
      "Гипотеза",
      "Проверка"
    ],
    "boundary": "Аналитика и paper trading не доказывают доходность. Подключение биржи и реальные сделки требуют отдельного решения.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/CryptoPulse",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "tests/",
        "label": "Тесты"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "VALHALLA",
    "title": "VALHALLA",
    "group": "life",
    "type": "Личная дисциплина",
    "summary": "Приложение личной дисциплины и развития с веб- и нативными направлениями проекта.",
    "flow": [
      "Цель",
      "Действие",
      "Прогресс"
    ],
    "boundary": "Данные о привычках и здоровье приватны; документация интерфейса не подтверждает медицинскую эффективность.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/Eclipse-Valhalla",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "public/",
        "label": "Статические ресурсы"
      },
      {
        "name": "tests/",
        "label": "Тесты"
      },
      {
        "name": "electron/",
        "label": "Десктопная оболочка Electron"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "Smart Life Assistant",
    "title": "Smart Life Assistant",
    "group": "life",
    "type": "Personal Action OS",
    "summary": "Личное рабочее пространство для задач, финансов, здоровья и повседневных действий.",
    "flow": [
      "Событие",
      "План",
      "Действие"
    ],
    "boundary": "Это разные чувствительные области данных. Доступ, AI-обработка и внешние действия проверяются по каждому сценарию.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/SmartLifeAssistant",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "lint",
        "command": "npm run lint",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "public/",
        "label": "Статические ресурсы"
      },
      {
        "name": "scripts/",
        "label": "Сценарии и вспомогательные модули"
      },
      {
        "name": "electron/",
        "label": "Десктопная оболочка Electron"
      },
      {
        "name": "prisma/",
        "label": "Схема данных и миграции"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "InterviewForge",
    "title": "InterviewForge",
    "group": "life",
    "type": "Веб-прототип",
    "summary": "Веб-интерфейс тренировки технических интервью и разбора беседы с Gemini Live. Нативная часть Tauri в текущем checkout отсутствует.",
    "flow": [
      "Тренировка",
      "Разбор",
      "Подготовка"
    ],
    "boundary": "Только согласованные тренировки. Аудио и экран передаются провайдеру. API_KEY встраивается Vite в клиентский bundle: не публикуйте сборку с секретом; серверная схема доступа ещё нужна.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/InterviewForge",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "components/",
        "label": "Компоненты интерфейса"
      },
      {
        "name": "Services/",
        "label": "Сервисная логика"
      },
      {
        "name": "App.tsx",
        "label": "Корневой React-компонент"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "Smart-Fitness-Booking-Agent",
    "title": "Fitness Booking Agent",
    "group": "life",
    "type": "Демонстрация AI-агента",
    "summary": "Демонстрация записи на фитнес-занятия через AI-диалог и вызов функций.",
    "flow": [
      "Запрос",
      "Занятие",
      "Запись"
    ],
    "boundary": "Вызов функции и demo-слот не равны подтверждённой записи у реального клуба; права и повторные запросы тестируются отдельно.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/Smart-Fitness-Booking-Agent",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "typecheck",
        "command": "npm run typecheck",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "test",
        "command": "npm run test",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "server/",
        "label": "Сервер"
      },
      {
        "name": "components/",
        "label": "Компоненты интерфейса"
      },
      {
        "name": "Services/",
        "label": "Сервисная логика"
      },
      {
        "name": "App.tsx",
        "label": "Корневой React-компонент"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "cinemate-movie-finder",
    "title": "CineMate",
    "group": "life",
    "type": "Поиск фильмов",
    "summary": "Веб-приложение поиска и просмотра информации о фильмах с OMDb.",
    "flow": [
      "Поиск",
      "Фильм",
      "Подробности"
    ],
    "boundary": "Каталог зависит от доступности и лимитов внешнего API; ключ не следует публиковать вместе с демонстрацией.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/cinemate-movie-finder",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "modern-2048",
    "title": "Modern 2048",
    "group": "life",
    "type": "Браузерная игра",
    "summary": "Современная веб-реализация 2048 как самостоятельная игра и пример интерактивного интерфейса.",
    "flow": [
      "Ход",
      "Слияние",
      "Счёт"
    ],
    "boundary": "Проверяйте клавиатуру, touch и сохранение прогресса; оформление README не заменяет игровой тест.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/modern-2048",
    "commands": [
      {
        "dir": ".",
        "name": "dev",
        "command": "npm run dev",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "lint",
        "command": "npm run lint",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "build",
        "command": "npm run build",
        "source": "package.json"
      },
      {
        "dir": ".",
        "name": "preview",
        "command": "npm run preview",
        "source": "package.json"
      }
    ],
    "files": [
      {
        "name": "src/",
        "label": "Основные исходники"
      },
      {
        "name": "index.html",
        "label": "HTML-точка входа"
      },
      {
        "name": "package.json",
        "label": "Node manifest и команды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  },
  {
    "folder": "task-manager",
    "title": "Task Manager",
    "group": "life",
    "type": "Full-stack приложение",
    "summary": "Менеджер задач с отдельными frontend и backend, Prisma и PostgreSQL.",
    "flow": [
      "Задача",
      "Работа",
      "Готово"
    ],
    "boundary": "Миграции, база и пользовательские задачи не затрагиваются оформлением. Проверка доступа выполняется отдельно от локальной сборки.",
    "groupLabel": "Личные продукты",
    "repository": "https://github.com/PavelHopson/task-manager",
    "commands": [
      {
        "dir": "frontend",
        "name": "dev",
        "command": "npm run dev",
        "source": "frontend/package.json"
      },
      {
        "dir": "frontend",
        "name": "lint",
        "command": "npm run lint",
        "source": "frontend/package.json"
      },
      {
        "dir": "frontend",
        "name": "build",
        "command": "npm run build",
        "source": "frontend/package.json"
      },
      {
        "dir": "frontend",
        "name": "preview",
        "command": "npm run preview",
        "source": "frontend/package.json"
      },
      {
        "dir": "backend",
        "name": "dev",
        "command": "npm run dev",
        "source": "backend/package.json"
      }
    ],
    "files": [
      {
        "name": "frontend/",
        "label": "Клиентское приложение"
      },
      {
        "name": "backend/",
        "label": "Серверная часть"
      },
      {
        "name": "docker-compose.yml",
        "label": "Описание сервисов контейнерной среды"
      },
      {
        "name": "docs/",
        "label": "Документация проекта"
      }
    ]
  }
];
