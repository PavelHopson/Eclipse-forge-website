# Приём заявок с формы eclipse-forge.ru

Маленький сервис без зависимостей (Node 20). Форма на лендинге шлёт `POST /api/lead`, сервис пишет заявку в файл и отправляет её сообщением в Telegram.

## Что делает

- Слушает только `127.0.0.1:8790`; наружу его отдаёт Caddy по адресу `https://eclipse-forge.ru/api/lead`.
- Принимает только JSON и только с `Origin: https://eclipse-forge.ru`.
- Проверяет поля: имя (2–80), контакт (5–120), текст (до 1500), согласие обязательно. Тело запроса до 8 КБ.
- Поле-ловушка `ef_hp`: если заполнено, заявка сохраняется в файл с пометкой `spam`, но в Telegram не уходит. Так настоящая заявка не пропадёт, если скрытое поле заполнило автозаполнение браузера.
- Не больше 5 заявок за 10 минут с одного адреса (IPv6 — с сети /64) и не больше 60 заявок в час всего.
- Сначала пишет заявку в `/var/lib/ef-lead-api/leads.jsonl` (каталог 700, файл 600), потом шлёт в Telegram. Посетитель получает ответ сразу после записи в файл; в Telegram сервис шлёт в фоне, три попытки (сразу, через 5 и через 30 секунд). Если все не удались, заявка остаётся в файле, а в журнале появляется строка `telegram gave up`.
- IP вместе с заявкой не сохраняет.
- С сервера Telegram напрямую недоступен, поэтому запрос идёт через локальный SOCKS5-прокси (`TELEGRAM_PROXY`).

## Настройки (`/etc/ef-lead-api.env`, root, 600)

| Переменная | Значение |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | ключ бота из @BotFather |
| `TELEGRAM_CHAT_ID` | кому писать: определяется в `setup-env.sh` по одноразовому коду, который владелец отправляет боту |
| `TELEGRAM_PROXY` | `socks5h://127.0.0.1:10808` |
| `ALLOWED_ORIGINS` | `https://eclipse-forge.ru` |

Ключ бота в репозиторий, чат и журналы не попадает: владелец вводит его сам командой `ef-lead-setup`.

## Установка на сервер (один раз, по разрешению владельца)

```bash
useradd --system --no-create-home --shell /usr/sbin/nologin ef-lead
install -d -o root -g root -m 755 /opt/ef-lead-api
install -o root -g root -m 644 server.mjs /opt/ef-lead-api/server.mjs
install -o root -g root -m 755 setup-env.sh /usr/local/bin/ef-lead-setup
install -o root -g root -m 644 ef-lead-api.service /etc/systemd/system/ef-lead-api.service
install -o root -g root -m 600 /dev/null /etc/ef-lead-api.env
systemctl daemon-reload && systemctl enable --now ef-lead-api
```

В `/etc/caddy/sites/eclipse-forge.caddy`, внутри `route { … }` перед `try_files`:

```
		@lead path /api/lead /api/lead/health
		handle @lead {
			request_body {
				max_size 16KB
			}
			reverse_proxy 127.0.0.1:8790 {
				transport http {
					response_header_timeout 30s
				}
			}
		}
```

Затем `caddy validate` и `systemctl reload caddy`.

Владелец подключает бота сам:

```bash
ssh -t root@<сервер> ef-lead-setup
```

## Проверка

```bash
curl -s https://eclipse-forge.ru/api/lead/health            # {"ok":true}
journalctl -u ef-lead-api -n 20 --no-pager                  # нет строк "telegram gave up"
grep -c . /var/lib/ef-lead-api/leads.jsonl                  # число заявок в файле: сверять с Telegram
```

Тесты: `node --test tests/lead-api.test.mjs`.

## Хранение и удаление

Заявки лежат построчно в `/var/lib/ef-lead-api/leads.jsonl`. В политике на сайте обещано хранить их не дольше года после последнего обращения: автоматической очистки нет, старые строки удаляются вручную.

По просьбе человека: найти строку по контакту и удалить её; сообщение в Telegram удалить вручную.

Журнал обращений Caddy для сайта хранится 14 дней (`roll_keep_for 336h`) — это тоже записано в политике, при смене срока поправить текст.
