#!/usr/bin/env bash
# Записывает ключ бота и адресата заявок в /etc/ef-lead-api.env.
# Запускает владелец сам, в своём терминале:  ssh -t root@<сервер> ef-lead-setup
# Ключ вводится скрыто и нигде, кроме этого файла (root, 600), не сохраняется.
set -euo pipefail

ENV_FILE=/etc/ef-lead-api.env
PROXY="${TELEGRAM_PROXY:-socks5h://127.0.0.1:10808}"

echo "1) В Telegram откройте @BotFather → /newbot → получите ключ бота."
echo
read -r -s -p "Вставьте ключ бота (ввод скрыт): " TOKEN
echo
if [[ ! "$TOKEN" =~ ^[0-9]+:[A-Za-z0-9_-]{30,}$ ]]; then
  echo "Это не похоже на ключ бота. Ничего не записано." >&2
  exit 1
fi

# Ключ передаём curl через stdin, чтобы он не попал в список процессов.
api() {
  printf 'url = "https://api.telegram.org/bot%s/%s"\n' "$TOKEN" "$1" | curl -sS --fail -m 20 -x "$PROXY" -K - "${@:2}"
}

if ! api getMe >/dev/null; then
  echo "Telegram не принял ключ (или недоступен прокси $PROXY). Ничего не записано." >&2
  exit 1
fi

# Адресат заявок — только тот, кто пришлёт боту этот одноразовый код:
# посторонний, написавший боту раньше, заявки не получит.
CODE="ef-$(od -An -N4 -tu4 /dev/urandom | tr -d ' ')"
echo "2) Откройте своего бота, нажмите «Start» и отправьте ему этот код:"
echo
echo "      $CODE"
echo
read -r -p "Когда отправите, нажмите Enter… " _

CHAT_ID=$(api getUpdates | EF_CODE="$CODE" python3 -c '
import json, os, sys
code = os.environ["EF_CODE"]
data = json.load(sys.stdin)
found = ""
for update in data.get("result", []):
    message = update.get("message") or {}
    chat = message.get("chat") or {}
    if chat.get("type") == "private" and (message.get("text") or "").strip() == code:
        found = str(chat["id"])
print(found)
')
if [[ -z "$CHAT_ID" ]]; then
  echo "Бот не получил сообщение с кодом. Запустите команду ещё раз и отправьте новый код." >&2
  exit 1
fi

umask 077
printf 'TELEGRAM_BOT_TOKEN=%s\nTELEGRAM_CHAT_ID=%s\nTELEGRAM_PROXY=%s\nALLOWED_ORIGINS=https://eclipse-forge.ru\n' \
  "$TOKEN" "$CHAT_ID" "$PROXY" > "$ENV_FILE"
chown root:root "$ENV_FILE"
chmod 600 "$ENV_FILE"

systemctl restart ef-lead-api
sleep 1
if api sendMessage --data-urlencode "chat_id=$CHAT_ID" --data-urlencode "text=Форма заявки eclipse-forge.ru подключена. Сюда будут приходить заявки." >/dev/null; then
  echo "Готово: бот написал вам проверочное сообщение. Сервис: $(systemctl is-active ef-lead-api)."
else
  echo "Настройки записаны, но проверочное сообщение не ушло. Сервис: $(systemctl is-active ef-lead-api)." >&2
  exit 1
fi
