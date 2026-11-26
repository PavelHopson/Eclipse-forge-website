#!/usr/bin/env bash
# Записывает ключ бота и адресата заявок в /etc/ef-lead-api.env.
# Запускает владелец сам, в своём терминале:  ssh -t root@<сервер> ef-lead-setup
# Ключ вводится скрыто и нигде, кроме этого файла (root, 600), не сохраняется.
set -euo pipefail

ENV_FILE=/etc/ef-lead-api.env
PROXY="${TELEGRAM_PROXY:-socks5h://127.0.0.1:10808}"

echo "1) В Telegram откройте @BotFather → /newbot → получите ключ бота."
echo "2) Откройте своего нового бота и нажмите «Start» (отправьте ему /start)."
echo
read -r -s -p "Вставьте ключ бота (ввод скрыт): " TOKEN
echo
if [[ ! "$TOKEN" =~ ^[0-9]+:[A-Za-z0-9_-]{30,}$ ]]; then
  echo "Это не похоже на ключ бота. Ничего не записано." >&2
  exit 1
fi

# Ключ передаём curl через stdin, чтобы он не попал в список процессов.
api() {
  printf 'url = "https://api.telegram.org/bot%s/%s"\n' "$TOKEN" "$1" | curl -sS -m 15 -x "$PROXY" -K - "${@:2}"
}

CHAT_ID=$(api getUpdates | python3 -c '
import json, sys
data = json.load(sys.stdin)
chats = [u["message"]["chat"] for u in data.get("result", []) if "message" in u and u["message"]["chat"]["type"] == "private"]
print(chats[-1]["id"] if chats else "")
')
if [[ -z "$CHAT_ID" ]]; then
  echo "Бот не видит вашего сообщения. Нажмите у бота «Start» и запустите команду ещё раз." >&2
  exit 1
fi

umask 077
printf 'TELEGRAM_BOT_TOKEN=%s\nTELEGRAM_CHAT_ID=%s\nTELEGRAM_PROXY=%s\nALLOWED_ORIGINS=https://eclipse-forge.ru\n' \
  "$TOKEN" "$CHAT_ID" "$PROXY" > "$ENV_FILE"
chown root:root "$ENV_FILE"
chmod 600 "$ENV_FILE"

systemctl restart ef-lead-api
sleep 1
api sendMessage --data-urlencode "chat_id=$CHAT_ID" --data-urlencode "text=Форма заявки eclipse-forge.ru подключена. Сюда будут приходить заявки." >/dev/null
echo "Готово: бот написал вам проверочное сообщение. Сервис: $(systemctl is-active ef-lead-api)."
