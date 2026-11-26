// Запуск: LEAD_RECIPIENT=stub node server/lead-relay/main.mjs
// Настройки — в README.md рядом. Секреты передаются только через окружение (systemd EnvironmentFile).
import { createLeadServer, readConfig } from './relay.mjs';

const config = readConfig();
const server = createLeadServer(config);
server.listen(config.port, config.host, () => {
  console.log(`[lead-relay] получатель: ${config.recipient}; слушаю ${config.host}:${config.port}; origin: ${config.allowedOrigins.join(', ')}`);
  if (config.recipient === 'stub') console.log(`[lead-relay] заглушка пишет заявки в ${config.stubFile}`);
});
