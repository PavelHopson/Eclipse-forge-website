# Приём заявок с формы eclipse-forge.ru

Маленький сервис без зависимостей (Node 20). Форма на лендинге шлёт `POST /api/lead`, сервис пишет заявку в файл и отправляет её сообщением в Telegram.

## Что делает

- Слушает только `127.0.0.1:8790`; наружу его отдаёт Caddy по адресу `https://eclipse-forge.ru/api/lead`.
- Принимает только JSON и только с `Origin: https://eclipse-forge.ru`.
- Проверяет поля: имя (2–80), контакт (5–120), текст (до 1500), согласие обязательно. Тело запроса до 8 КБ.
- Поле-ловушка `website`: если заполнено, отвечает «принято» и ничего не сохраняет.
- Не больше 5 заявок за 10 минут с одного адреса.
- Сначала пишет заявку в `/var/lib/ef-lead-api/leads.jsonl` (каталог 700, файл 600), потом шлёт в Telegram. Если Telegram недоступен, заявка остаётся в файле, а в журнале сервиса появляется строка `telegram failed`.
- IP вместе с заявкой не сохраняет.
- С сервера Telegram напрямую недоступен, поэтому запрос идёт через локальный SOCKS5-прокси (`TELEGRAM_PROXY`).

## Настройки (`/etc/ef-lead-api.env`, root, 600)

| Переменная | Значение |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | ключ бота из @BotFather |
| `TELEGRAM_CHAT_ID` | кому писать (определяется автоматически в `setup-env.sh`) |
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
		handle /api/lead* {
			request_body {
				max_size 16KB
			}
			reverse_proxy 127.0.0.1:8790
		}
```

Затем `caddy validate` и `systemctl reload caddy`.

Владелец подключает бота сам:

```bash
ssh -t root@111.88.125.84 ef-lead-setup
```

## Проверка

```bash
curl -s https://eclipse-forge.ru/api/lead/health            # {"ok":true}
journalctl -u ef-lead-api -n 20 --no-pager                  # нет строк "telegram failed"
```

Тесты: `node --test tests/lead-api.test.mjs`.

## Удаление заявки по просьбе человека

Заявки лежат построчно в `/var/lib/ef-lead-api/leads.jsonl`. Найти строку по контакту и удалить её; сообщение в Telegram удалить вручную.
