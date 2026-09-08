'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const list = $('list');
  const dialog = $('detail');
  const search = $('search');
  const allowedGroups = new Set(['platform', 'creative', 'business', 'life', 'engineering']);
  const allowedCommands = new Set(['dev', 'dev:web', 'dev:server', 'typecheck', 'lint', 'test', 'check', 'build', 'preview']);
  const text = (value, max = 4000) => typeof value === 'string' && value.length > 0 && value.length <= max;
  const node = (tag, content, className) => {
    const element = document.createElement(tag);
    if (content != null) element.textContent = content;
    if (className) element.className = className;
    return element;
  };
  const safeRepository = value => {
    if (value === null) return null;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && url.hostname === 'github.com' && !url.port &&
        !url.username && !url.password && !url.search && !url.hash &&
        /^\/[\w.-]+\/[\w.-]+$/.test(url.pathname) ? url.href : null;
    } catch { return null; }
  };
  const data = window.REPOSITORY_CATALOG;
  const valid = Array.isArray(data) && data.length > 0 && data.length <= 100 &&
    new Set(data.map(project => project?.folder)).size === data.length &&
    data.every(project => project &&
      ['folder', 'title', 'summary', 'type', 'group', 'groupLabel', 'boundary'].every(key => text(project[key])) &&
      /^[A-Za-z0-9][A-Za-z0-9 ._-]{0,100}$/.test(project.folder) && allowedGroups.has(project.group) &&
      Array.isArray(project.flow) && project.flow.length === 3 && project.flow.every(step => text(step, 120)) &&
      Array.isArray(project.files) && project.files.length <= 40 &&
      project.files.every(file => text(file?.name, 200) && text(file?.label, 500)) &&
      Array.isArray(project.commands) && project.commands.length <= 40 &&
      project.commands.every(command => command && ['.', 'frontend', 'backend'].includes(command.dir) &&
        allowedCommands.has(command.name) && command.command === 'npm run ' + command.name &&
        command.source === (command.dir === '.' ? '' : command.dir + '/') + 'package.json') &&
      (project.repository === null || safeRepository(project.repository)));
  if (!valid) {
    $('error').hidden = false;
    $('count').textContent = 'Каталог недоступен';
    return;
  }

  let route = { group: 'all', q: '', project: null };
  let opened = null;
  let returnFocus = null;
  let panelVersion = 0;
  let startCommand = null;
  let lastHash = null;
  let renderedFilter = null;
  let previousOverflow = '';
  let historyEnabled = true;
  let closePending = false;
  const normalize = value => value.normalize('NFKC').toLocaleLowerCase('ru').replaceAll('ё', 'е');
  const searchTerm = value => {
    const term = normalize(value);
    if (term.length < 5 || !/^[а-я]+$/u.test(term)) return term;
    // Small Russian ending tolerance: "аренда" also finds "аренды"; no remote search or model.
    const stem = term.replace(/(?:иями|ами|ями|ого|ему|ому|ыми|ими|ий|ый|ая|ые|ой|ых|ов|ев|ах|ях|ам|ям|ем|ом|а|я|ы|и|у|ю|е|о)$/u, '');
    return stem.length >= 3 ? stem : term;
  };
  const projectById = id => data.find(project => project.folder === id);
  const projectButton = id => Array.from(list.querySelectorAll('.project-row')).find(button => button.dataset.project === id);
  const categories = [['all', 'Все проекты'], ...new Map(data.map(project => [project.group, project.groupLabel]))];

  function notice(message) {
    $('route-status').textContent = message;
    $('route-status').hidden = !message;
  }
  function fragment(state) {
    const params = new URLSearchParams();
    if (state.project) params.set('p', state.project);
    if (state.group !== 'all') params.set('g', state.group);
    if (state.q) params.set('q', state.q);
    return params.size ? '#' + params.toString() : '';
  }
  function readRoute() {
    if (location.hash.length > 2048) {
      notice('Ссылка слишком длинная. Показан полный каталог.');
      return { group: 'all', q: '', project: null };
    }
    const params = new URLSearchParams(location.hash.slice(1));
    const group = params.get('g') || 'all';
    const project = params.get('p');
    const knownProject = project ? projectById(project)?.folder || null : null;
    notice(project && !knownProject ? 'Проект из ссылки не найден. Можно выбрать другой в каталоге.' : '');
    return {
      group: allowedGroups.has(group) ? group : 'all',
      q: (params.get('q') || '').replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 160),
      project: knownProject
    };
  }
  function writeHistory(next, mode, metadata = {}) {
    try {
      const url = new URL(location.href);
      url.hash = fragment(next);
      history[mode + 'State']({ portfolio: true, scroll: scrollY, ...metadata }, '', url.href);
      lastHash = location.hash;
      return true;
    } catch {
      historyEnabled = false;
      notice('Браузер не разрешил сохранять адрес. Каталог продолжает работать.');
      return false;
    }
  }
  function saveListPosition() {
    if (historyEnabled) writeHistory(route, 'replace', { modalFromList: false, scroll: scrollY });
  }
  function render() {
    const filterKey = route.group + '\n' + route.q;
    if (renderedFilter === filterKey) return;
    renderedFilter = filterKey;
    search.value = route.q;
    const words = route.q.trim().split(/\s+/).filter(Boolean).map(searchTerm);
    const filtered = data.filter(project => (route.group === 'all' || project.group === route.group) &&
      words.every(word => normalize([project.folder, project.title, project.summary, project.type, project.groupLabel].join(' ')).includes(word)));
    const content = document.createDocumentFragment();
    for (const project of filtered) {
      const item = node('li');
      const button = node('button', null, 'project-row');
      button.type = 'button';
      button.dataset.project = project.folder;
      button.setAttribute('aria-label', 'О проекте ' + project.title);
      const main = node('span');
      main.append(node('strong', project.title), node('span', project.type, 'project-type'), node('span', project.summary, 'description'));
      const arrow = node('span', '→', 'arrow');
      arrow.setAttribute('aria-hidden', 'true');
      button.append(main, node('span', project.groupLabel, 'group'), arrow);
      button.addEventListener('click', () => {
        saveListPosition();
        const next = { ...route, project: project.folder };
        writeHistory(next, 'push', { modalFromList: true, scroll: scrollY });
        applyRoute(next);
      });
      item.append(button);
      content.append(item);
    }
    list.replaceChildren(content);
    $('empty').hidden = filtered.length > 0;
    $('count').textContent = filtered.length + ' / ' + data.length + ' проектов';
    $('reset').disabled = !route.q && route.group === 'all';
    for (const button of $('filters').children) button.setAttribute('aria-pressed', String(button.dataset.group === route.group));
  }

  function firstStep(project) {
    const manual = {
      'eclipse-connect': ['Инструкция Windows-приложения', 'Локальная утилита', 'Начните с README: выберите сборку и ознакомьтесь с режимами проверки. Не запускайте сетевые компоненты ради просмотра проекта.'],
      'wireguard-telegram-bot': ['Сначала — среда и права бота', 'Python / Telegram', 'README описывает зависимости и конфигурацию. Перед запуском отделите тестового бота от рабочих токенов и WireGuard-клиентов.'],
      'ai-setup': ['Начните со справки и оценки', 'CLI-конфигурация', 'В CLI пока нет Codex-only режима: init создаёт несколько конфигураций, refresh перезаписывает их. В README описан ознакомительный маршрут без генерации.'],
      'eclipse-library': ['Начните с структуры каталога', 'Статические данные и веб-интерфейс', 'В README описаны канонические данные и локальные проверки. Для работы с интерфейсом используйте описанный там локальный сервер; не подменяйте его npm-шаблоном.']
    };
    if (manual[project.folder]) {
      const [title, kind, summary] = manual[project.folder];
      return { title, kind, summary, command: null };
    }
    const preferred = [['frontend', 'dev'], ['.', 'dev:web'], ['.', 'dev'], ['backend', 'dev']];
    const command = preferred.map(([dir, name]) => project.commands.find(item => item.dir === dir && item.name === name)).find(Boolean);
    if (command) {
      const multiPart = project.files.some(file => ['backend/', 'apps/'].includes(file.name));
      return {
        title: command.dir === 'frontend' || command.name === 'dev:web' ? 'Начните с клиентского интерфейса' : 'Начните с локального dev-режима',
        kind: 'Команда из manifest',
        summary: 'Сначала установите зависимости и настройте среду по README. ' +
          (multiPart ? 'Сервер и его данные готовятся отдельно; один frontend не подтверждает работу всего приложения.' : 'Команда ниже только копируется. Она не запускалась при оформлении и может обращаться к настроенным сервисам.'),
        command
      };
    }
    const dotnet = project.files.some(file => file.name.endsWith('.csproj'));
    const staticPage = project.files.some(file => file.name === 'index.html');
    return {
      title: dotnet ? 'Проверьте .NET SDK и конфигурацию' : staticPage ? 'Начните с HTML-точки входа' : 'Начните с инструкции своего стека',
      kind: dotnet ? '.NET' : staticPage ? 'Статический сайт' : project.type,
      summary: dotnet ? 'Целевая платформа указана в .csproj. Подходящий SDK, запуск API и входные данные проверьте по README; готовность сервиса здесь не проверялась.' :
        staticPage ? 'Точка входа — index.html. Способ локального просмотра и подготовки стилей указан в README; серверные функции не предполагаются автоматически.' :
        'В корне нет объявленной dev-команды из стандартного списка. Используйте README и карту исходников: npm-команда для другого стека не подставляется.',
      command: null
    };
  }

  function showProject(project) {
    if (opened?.folder === project.folder) return;
    opened = project;
    panelVersion++;
    returnFocus = projectButton(project.folder) || search;
    for (const [id, key] of [['detail-title', 'title'], ['detail-summary', 'summary'], ['detail-type', 'type'], ['detail-group', 'groupLabel'], ['boundary', 'boundary']]) $(id).textContent = project[key];
    $('flow').replaceChildren(...project.flow.map(step => node('li', step)));
    const repository = safeRepository(project.repository);
    $('repository').hidden = !repository;
    $('local-project').hidden = Boolean(repository);
    if (repository) $('repository').href = repository;
    else $('repository').removeAttribute('href');

    const start = firstStep(project);
    startCommand = start.command;
    $('start-title').textContent = start.title;
    $('start-kind').textContent = start.kind;
    $('start-summary').textContent = start.summary;
    $('start-command-block').hidden = !start.command;
    $('start-command').textContent = start.command?.command || '';
    $('start-dir').textContent = start.command ? (start.command.dir === '.' ? 'Из корня проекта' : 'Из папки ' + start.command.dir) : '';
    $('start-source').textContent = start.command ? 'Источник: ' + start.command.source + ' · скрипт ' + start.command.name : 'Источник: README.md и структура репозитория';

    $('files').replaceChildren(...project.files.flatMap(file => [node('dt', file.name), node('dd', file.label)]));
    $('commands').replaceChildren(...project.commands.map(command => {
      const item = node('li');
      item.append(node('code', command.command), node('span', 'папка: ' + command.dir));
      return item;
    }));
    if (!project.commands.length) $('commands').append(node('li', 'Команды своего стека смотрите в README репозитория.'));
    for (const details of dialog.querySelectorAll('details')) details.open = false;
    for (const id of ['copy', 'copy-link', 'copy-start']) $(id).disabled = false;
    for (const id of ['copy-status', 'start-copy-status']) $(id).textContent = '';
    if (!dialog.open) {
      previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
    dialog.scrollTop = 0;
    $('close').focus({ preventScroll: true });
    document.title = project.title + ' — Eclipse Forge';
  }
  function hideProject() {
    if (!opened) return;
    panelVersion++;
    opened = null;
    startCommand = null;
    dialog.close();
    document.body.style.overflow = previousOverflow;
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    else search.focus({ preventScroll: true });
    document.title = 'Проекты — Eclipse Forge';
  }
  function applyRoute(next, restoreScroll = null) {
    route = next;
    render();
    const project = projectById(route.project);
    if (project) showProject(project);
    else hideProject();
    if (!project && Number.isFinite(restoreScroll)) scrollTo(0, Math.max(0, restoreScroll));
  }
  function closeProject() {
    if (!opened || closePending) return;
    if (historyEnabled && history.state?.portfolio && history.state.modalFromList) {
      closePending = true;
      history.back();
    } else {
      const next = { ...route, project: null };
      writeHistory(next, 'replace', { modalFromList: false });
      applyRoute(next);
    }
  }
  function syncHistory() {
    if (lastHash === location.hash && !closePending) return;
    closePending = false;
    lastHash = location.hash;
    applyRoute(readRoute(), history.state?.scroll);
  }
  function changeFilter(next, push = false) {
    if (closePending) return;
    notice('');
    if (push) saveListPosition();
    writeHistory(next, push ? 'push' : 'replace', { modalFromList: false, scroll: scrollY });
    applyRoute(next);
  }
  function reset() {
    changeFilter({ group: 'all', q: '', project: null }, true);
    search.focus({ preventScroll: true });
  }
  async function copyText(button, output, message, statusId = 'copy-status') {
    if (!opened) return;
    const version = panelVersion;
    button.disabled = true;
    $(statusId).textContent = '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(output);
      if (version === panelVersion) $(statusId).textContent = message;
    } catch {
      if (version === panelVersion) $(statusId).textContent = 'Браузер не разрешил копирование. Можно выделить текст вручную.';
    } finally {
      if (version === panelVersion) button.disabled = false;
    }
  }

  for (const [id, label] of categories) {
    const button = node('button', label, 'filter');
    button.type = 'button';
    button.dataset.group = id;
    button.addEventListener('click', () => {
      if (route.group !== id) changeFilter({ ...route, group: id, project: null }, true);
    });
    $('filters').append(button);
  }
  search.disabled = false;
  search.addEventListener('input', () => changeFilter({ ...route, q: search.value.slice(0, 160), project: null }));
  $('reset').addEventListener('click', reset);
  $('empty-reset').addEventListener('click', reset);
  $('close').addEventListener('click', closeProject);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeProject();
  });
  document.querySelector('.skip').addEventListener('click', event => {
    event.preventDefault();
    $('projects').focus({ preventScroll: true });
    $('projects').scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  $('copy').addEventListener('click', () => {
    if (!opened) return;
    copyText($('copy'), [opened.title, opened.summary, opened.flow.join(' → '), opened.boundary, opened.repository].filter(Boolean).join('\n'), 'Описание скопировано.');
  });
  $('copy-start').addEventListener('click', () => {
    if (startCommand) copyText($('copy-start'), startCommand.command, 'Команда скопирована. Запускайте её вручную после настройки среды.', 'start-copy-status');
  });
  $('copy-link').addEventListener('click', () => {
    if (!opened) return;
    const url = new URL(location.href);
    url.search = '';
    url.hash = fragment({ group: 'all', q: '', project: opened.folder });
    const local = url.protocol === 'file:' || ['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname);
    copyText($('copy-link'), url.href, local ? 'Локальная ссылка скопирована: она открывается только на этом компьютере.' : 'Ссылка на проект скопирована.');
  });
  addEventListener('popstate', syncHistory);
  addEventListener('hashchange', syncHistory);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const initial = readRoute();
  // A reloaded or externally opened deep link must close to the catalog, not leave this page.
  writeHistory(initial, 'replace', { modalFromList: false, scroll: scrollY });
  applyRoute(initial);
})();
