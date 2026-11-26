# lead-relay — приём заявок с формы eclipse-forge.ru

Маленький сервис на Node 20+ без зависимостей. Принимает `POST /api/lead` с формы контакта и пересылает заявку получателю.

**Получатель выбирается одной настройкой `LEAD_RECIPIENT`:**

| Значение | Куда уходит заявка | Что нужно |
|---|---|---|
| `stub` (по умолчанию) | Строка в JSONL-файл (`LEAD_STUB_FILE`, по умолчанию во временной папке) | Ничего. Только для проверки маршрута |
| `telegram` | Сообщение от бота в личку или группу | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |
| `email` | Письмо через SMTP | `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `LEAD_EMAIL_TO`; опционально `SMTP_PORT` (465), `LEAD_EMAIL_FROM`; пакет `nodemailer` (`npm i nodemailer` в этой папке) |

Если для выбранного получателя чего-то не хватает, сервис не стартует и пишет, какой переменной нет.

Общие настройки: `LEAD_ALLOWED_ORIGINS` (по умолчанию `https://eclipse-forge.ru`, через запятую), `LEAD_PORT` (8787), `LEAD_HOST` (127.0.0.1), `LEAD_RATE_MAX` (5) и `LEAD_RATE_WINDOW_MS` (600000).

## Включение на VPS (делает Павел, после выбора получателя)

1. Файл `/etc/ef-lead-relay.env`, права `600`, владелец — пользователь сервиса:
   ```
   LEAD_RECIPIENT=telegram
   TELEGRAM_BOT_TOKEN=...   # из @BotFather
   TELEGRAM_CHAT_ID=...     # см. ниже
   ```
2. systemd-юнит `/etc/systemd/system/ef-lead-relay.service`:
   ```
   [Service]
   EnvironmentFile=/etc/ef-lead-relay.env
   ExecStart=/usr/bin/node /srv/ef-lead-relay/main.mjs
   Restart=on-failure
   User=www-data
   [Install]
   WantedBy=multi-user.target
   ```
   Скопировать `main.mjs` и `relay.mjs` в `/srv/ef-lead-relay/`, затем `systemctl enable --now ef-lead-relay`.
3. Caddyfile, в блоке сайта:
   ```
   handle /api/lead {
       reverse_proxy 127.0.0.1:8787
   }
   ```
4. Сборка сайта с включённой отправкой: `VITE_LEAD_ENDPOINT=/api/lead npm run build`, новый релиз в `releases/`, симлинк `current`.
5. Проверка: одна тестовая заявка с сайта → пришла получателю. Затем — с телефона.

Без шага 4 форма на сайте работает по-старому (копирует ответы и открывает Telegram).

### Как узнать TELEGRAM_CHAT_ID

Нажать «Start» в своём боте, затем на VPS: `curl -s "https://api.telegram.org/bot<ТОКЕН>/getUpdates"` → поле `message.chat.id`. Эта же команда проверяет, что VPS достучится до api.telegram.org. Токен не вставлять в чаты и git.

### Переключение получателя

Поменять `LEAD_RECIPIENT` (и нужные переменные) в `/etc/ef-lead-relay.env` → `systemctl restart ef-lead-relay`. Сайт пересобирать не нужно.

## Защита

Проверка Origin, только JSON до 16 КБ, обязательное согласие, лимиты длины полей, 5 заявок с IP за 10 минут, ловушка для ботов (поле `website`), повтор той же заявки (`requestId`) не дублируется, ответ не повторяет данные клиента, сообщение в Telegram — простым текстом без разметки. Ошибка доставки → `502`, форма предлагает повторить или написать в Telegram.

## Тесты

`node --test tests/lead-relay.test.mjs` — без сети и реальных ключей (Telegram и почта подменены заглушками).

Локальная ручная проверка: `LEAD_RECIPIENT=stub LEAD_ALLOWED_ORIGINS=http://localhost:5173 node server/lead-relay/main.mjs` и `VITE_LEAD_ENDPOINT=http://127.0.0.1:8787/api/lead npx vite`.
