import fs from 'node:fs';
import path from 'node:path';

// Only real, visually reviewed local captures belong here. No fabricated UI.
export const uiGalleries = {
  EclipseForgeLanding: { caption:'Главная страница Eclipse Forge: позиционирование и вход в продукты экосистемы.', mobile:true },
  'eclipse-library': { caption:'Главная Library: поиск, направления и локальный индекс материалов.', mobile:true },
  'eclipse-chat': { caption:'Продуктовая страница Eclipse Chat с встроенным демонстрационным превью рабочего пространства.', mobile:true },
  'eclipse-ai-hub': { caption:'Рабочее пространство AI Hub до первого диалога: навигация по инструментам и панель помощника.', mobile:true },
  'eclipse-hopson-sentinel': { caption:'Голосовой экран Альтрона в ожидании команды. Микрофон и локальные модели не запускались.', mobile:true },
  'eclipse-media': { caption:'Медиа-мастерская: ввод ссылки, выбор раздела и пустая очередь загрузок.', mobile:true },
  Text2Image: { caption:'Панель генератора: промпт, стили и область результата. Снято без ключа и без генерации.', mobile:true },
  shotforge: { caption:'Стартовая страница ShotForge: выбор направления и вход в сценарий AI-фотосессии.', mobile:true },
  'Educator-AI': { caption:'Главная Questify: вход в создание учебного квеста и демонстрационный сценарий.', mobile:true },
  'eclipse-dnd-forge': { caption:'Стартовый экран ведущего: кампании, выбор AI-провайдера и параметры подключения. Поле ключа пустое.', mobile:true },
  VALHALLA: { caption:'Command Loop в новом локальном профиле: цели, дисциплина и начало работы без личной истории.', mobile:true },
  'modern-2048': { caption:'Новое игровое поле Modern 2048: плитки, счёт и локальные рекорды.', mobile:true },
  InterviewForge: { caption:'Веб-прототип InterviewForge до подключения Live API. Надписи о защите в UI не являются результатом security-аудита.', mobile:true },
  RentKldRedesign: { caption:'Главная RENT-express: предложение аренды и переход к выбору автомобиля.', mobile:true },
  'zefir-gift-landing': { caption:'Первый экран «Вся в Зефире»: брендовая типографика и фотографии работ из локальных ресурсов.', mobile:false },
  dark_roast_coffee: { caption:'Главная Dark Roast: история бренда, вход в меню и бронирование.', mobile:true },
};

export function renderUiGallery(profile, root) {
  const entry = uiGalleries[profile.folder];
  if (!entry) return '';
  for (const file of ['overview.png','capture.json', ...(entry.mobile ? ['mobile.png'] : [])]) {
    if (!fs.existsSync(path.join(root,'docs/assets/ui',file))) throw new Error('Missing reviewed UI asset: '+profile.folder+'/'+file);
  }
  return `<a id="readme-interface"></a>\n\n## Интерфейс\n\n![${profile.title} — ${entry.caption}](docs/assets/ui/overview.png)\n\n**${entry.caption}**\n\nЛокальный снимок от 8 сентября 2026: отдельный профиль браузера, без внешних API и пользовательских секретов. Это вид интерфейса, не подтверждение production-функций.\n\n${entry.mobile ? `<details>\n<summary><strong>Мобильный экран · 390 px</strong></summary>\n\n<img src="docs/assets/ui/mobile.png" alt="${profile.title} — мобильный экран" width="390">\n\n</details>\n\n` : ''}[Открыть в полном размере](docs/assets/ui/overview.png) · [Данные снимка](docs/assets/ui/capture.json)\n\n`;
}
