// Запуск: DEMO_ADMIN_TOKEN=<случайная строка от 24 символов> node server/demo-video/main.mjs
// Настройки — в README.md рядом. Секреты передаются только через окружение (systemd EnvironmentFile).
import { createDemoServer, readConfig } from './server.mjs';

const config = readConfig();
createDemoServer(config).listen(config.port, config.host, () => {
  console.log(`[demo-video] слушаю ${config.host}:${config.port}; ссылки: ${config.publicBase}/v/…; записи: ${config.dataDir}`);
  console.log(`[demo-video] уведомления о просмотрах: ${config.telegram ? 'Telegram' : 'только в лог'}`);
});
