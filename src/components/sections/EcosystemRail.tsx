import { useLocale } from '../../lib/locale';

const products = [
  { id: 'eclipse-chat', name: 'Eclipse Chat', repo: 'eclipse-chat', ru: 'Чаты, задачи и голосовые комнаты для совместной работы.', en: 'Chat, tasks and voice rooms for teamwork.' },
  { id: 'eclipse-library', name: 'Eclipse Library', repo: 'eclipse-library', ru: 'Каталог знаний, источников и учебных материалов.', en: 'A catalog of knowledge, sources and learning materials.' },
  { id: 'eclipse-hopson-sentinel', name: 'Eclipse Hopson Sentinel', repo: 'eclipse-hopson-sentinel', ru: 'Локальный AI-оператор и инструменты работы с компьютером.', en: 'A local AI operator and desktop tools.' },
  { id: 'eclipse-ai-hub', name: 'Eclipse AI Hub', repo: 'eclipse-ai-hub', ru: 'Единый шлюз моделей, агентов и контролируемых запусков.', en: 'A shared gateway for models, agents and controlled runs.' },
  { id: 'eclipse-claw', name: 'Eclipse Claw', repo: 'Eclipse-Claw', ru: 'Извлечение и структурирование веб-контента для AI-агентов.', en: 'Web content extraction and structuring for AI agents.' },
  { id: 'eclipse-dnd-forge', name: 'Eclipse DnD Forge', repo: 'eclipse-dnd-forge', ru: 'Кампании, персонажи и инструменты ведущего в одном мире.', en: 'Campaigns, characters and game master tools in one world.' },
  { id: 'eclipse-media', name: 'Eclipse Media', repo: 'eclipse-media', ru: 'Работа с медиаматериалами, раскадровками и результатами обработки.', en: 'Media assets, storyboards and processing results.' },
  { id: 'eclipse-premium-rent', name: 'Eclipse Premium Rent', repo: 'Eclipse-PremiumRent', ru: 'Дизайн-кейс каталога автомобилей и сценария бронирования.', en: 'A design case for a vehicle catalog and booking flow.' },
];

const destinations: Record<string, { url: string; ru: string; en: string; noteRu?: string; noteEn?: string }> = {
  'eclipse-chat': { url: 'https://app.star-crm.ru/eclipse-chat/#auth-panel', ru: 'Открыть Chat', en: 'Open Chat' },
  'eclipse-library': { url: 'https://library.eclipse-forge.ru/', ru: 'Открыть библиотеку', en: 'Open Library' },
  'eclipse-ai-hub': { url: 'https://hub.eclipse-forge.ru/', ru: 'Открыть AI Hub', en: 'Open AI Hub', noteRu: 'Для AI-функций потребуется настроить провайдера.', noteEn: 'Configure a provider to use AI features.' },
  'eclipse-dnd-forge': { url: 'https://dnd.eclipse-forge.ru/', ru: 'Открыть DnD Forge', en: 'Open DnD Forge', noteRu: 'Для AI-функций потребуется настроить провайдера.', noteEn: 'Configure a provider to use AI features.' },
  'eclipse-media': { url: 'https://media.eclipse-forge.ru/', ru: 'Открыть веб-студию', en: 'Open web studio', noteRu: 'Загрузка YouTube в веб-версии ограничена; используйте приложение.', noteEn: 'YouTube downloads are limited on the web; use the desktop app.' },
  'eclipse-premium-rent': { url: 'https://rent.eclipse-forge.ru/', ru: 'Открыть демо', en: 'Open demo' },
};

export function EcosystemRail() {
  const { locale } = useLocale();
  const ru = locale === 'ru';
  return (
    <section id="cases" className="project-covers section-shell" aria-labelledby="project-covers-title">
      <header className="project-covers__header">
        <p className="type-meta">Eclipse Forge / 01 — 08</p>
        <h2 id="project-covers-title" className="font-display">{ru ? 'Проекты Eclipse Forge' : 'Eclipse Forge projects'}</h2>
        <p>{ru ? 'Концептуальные обложки проектов. Изображённые интерфейсы иллюстрируют идею и не являются снимками работающих приложений.' : 'Project concept artwork in Russian. The illustrated interfaces are not screenshots of the running applications.'}</p>
      </header>
      <nav className="project-covers__index" aria-label={ru ? 'Выбрать проект' : 'Choose a project'}>
        {products.map((product, index) => (
          <a key={product.id} href={'#project-' + product.id}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            {product.name}
            <span aria-hidden="true">↘</span>
          </a>
        ))}
      </nav>
      <div className="project-covers__list">
        {products.map((product, index) => {
          const image = `/images/projects/concept-covers/${product.id}-ru.png`;
          const destination = destinations[product.id];
          return (
            <article id={'project-' + product.id} tabIndex={-1} className="project-covers__item" key={product.id} aria-labelledby={`cover-${product.id}`}>
              <a className="project-covers__image" href={image} target="_blank" rel="noopener noreferrer"
                aria-label={`${ru ? 'Открыть обложку' : 'Open artwork'}: ${product.name} (${ru ? 'новая вкладка' : 'new tab'})`}>
                <picture>
                  <source type="image/webp" srcSet={image.replace('.png', '.webp')} />
                <img src={image} alt={`${product.name} — ${ru ? 'концептуальная обложка' : 'concept artwork in Russian'}`} width="1536" height="1024" loading="lazy" decoding="async" />
                </picture>
              </a>
              <div className="project-covers__caption">
                <span className="project-covers__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 id={`cover-${product.id}`}>{product.name}</h3>
                  <p>{product[locale]}</p>
                  {destination?.noteRu && <p className="project-covers__note">{ru ? destination.noteRu : destination.noteEn}</p>}
                </div>
                <div className="project-covers__actions">
                  {destination && (
                    <a className="project-covers__open" href={destination.url} target="_blank" rel="noopener noreferrer"
                      aria-label={`${destination[locale]} — ${product.name} (${ru ? 'новая вкладка' : 'new tab'})`}>
                      {destination[locale]} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                <a className="project-covers__repo" href={`https://github.com/PavelHopson/${product.repo}`} target="_blank" rel="noopener noreferrer" aria-label={`${product.name} — GitHub (${ru ? 'новая вкладка' : 'new tab'})`}>GitHub ↗</a>
                <a className="project-covers__back" href="#cases">{ru ? 'Все проекты' : 'All projects'} <span aria-hidden="true">↑</span></a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
