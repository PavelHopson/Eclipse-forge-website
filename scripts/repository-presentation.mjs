import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { profiles, groups, checkoutFor, preserveIntro } from './repository-profiles.mjs';
import { assertSnapshot, validateApplyPlan, outputReceipt, firstSection } from './repository-write-guard.mjs';
import { readmeNavigation } from './repository-readme.mjs';
import { renderCover } from './repository-cover.mjs';

const home = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspace = path.dirname(home);
const apply = process.argv.includes('--apply');
const check = process.argv.includes('--check');
if (apply === check) throw new Error('Choose --apply or --check');
const patchExe = process.env.REPOSITORY_PATCH_EXE;
if (apply && !patchExe) throw new Error('REPOSITORY_PATCH_EXE must name the existing apply_patch entry point');
const slash = (v) => v.replaceAll('\\', '/');
const read = (f) => fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
const sha = (f) => createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const exists = (r, f) => fs.existsSync(path.join(r, f));
const git = (r, ...args) => { const p = spawnSync('git', ['-C', r, ...args], { encoding: 'utf8', windowsHide: true }); return p.status === 0 ? p.stdout.trim() : ''; };
const a = (label, dest) => `[${label}](<${dest}>)`;
const safeScripts = ['dev', 'dev:web', 'dev:server', 'typecheck', 'lint', 'test', 'check', 'build', 'preview'];
function commands(root) {
  const list = [];
  for (const dir of ['', 'frontend', 'backend']) {
    const file = path.join(root, dir, 'package.json');
    if (!fs.existsSync(file)) continue;
    const data = JSON.parse(read(file));
    for (const name of safeScripts) {
      if (typeof data.scripts?.[name] === 'string') list.push({ dir: dir || '.', name, command: `npm run ${name}`, source: `${dir ? dir + '/' : ''}package.json` });
    }
  }
  return list;
}
function sourceMap(root) {
  const paths = {
    'src/': 'Основные исходники', 'apps/': 'Приложения и сервисы workspace', 'app/': 'Маршруты и интерфейс', 'web/': 'Веб-интерфейс и публичные данные',
    'frontend/': 'Клиентское приложение', 'backend/': 'Серверная часть', 'server/': 'Сервер', 'client/': 'Клиент', 'shared/': 'Общие модули и контракты',
    'components/': 'Компоненты интерфейса', 'features/': 'Функциональные модули', 'public/': 'Статические ресурсы', 'catalog/': 'Канонический каталог',
    'guides/': 'Пользовательские гайды', 'scripts/': 'Сценарии и вспомогательные модули', 'tests/': 'Тесты', 'test/': 'Тесты', 'src-tauri/': 'Нативная часть Tauri',
    'Controllers/': 'HTTP-контроллеры', 'Services/': 'Сервисная логика', 'Models/': 'Модели данных', 'Endpoints/': 'HTTP endpoints',
    'assets/': 'Ресурсы интерфейса', 'styles/': 'Стили', 'css/': 'Стили', 'pages/': 'Страницы', 'dashboard/': 'Интерфейс управления', 'rust/': 'Rust-компоненты',
    'electron/': 'Десктопная оболочка Electron', 'prisma/': 'Схема данных и миграции', 'crates/': 'Rust crates', 'bot.py': 'Точка входа Telegram-бота',
    'Program.cs': 'Точка входа .NET', 'App.tsx': 'Корневой React-компонент', 'index.html': 'HTML-точка входа', 'main.py': 'Python-точка входа',
    'Cargo.toml': 'Rust manifest', 'pyproject.toml': 'Python manifest', 'requirements.txt': 'Python-зависимости', 'package.json': 'Node manifest и команды',
    'Makefile': 'Сценарии сборки', 'docker-compose.yml': 'Описание сервисов контейнерной среды', 'compose.yml': 'Описание сервисов контейнерной среды', 'docs/': 'Документация проекта'
  };
  const found = Object.entries(paths).filter(([p]) => exists(root, p));
  for (const name of fs.readdirSync(root).filter(n => /^[\w.-]+\.csproj$/.test(n))) found.push([name, '.NET project manifest']);
  return found;
}
function documents(root) {
  const names = fs.readdirSync(root).filter((n) => /^(ROADMAP|ARCHITECTURE|SECURITY|CONTRIBUTING|CHANGELOG)(\.[\w-]+)?\.md$/i.test(n));
  if (exists(root, 'docs')) for (const n of fs.readdirSync(path.join(root, 'docs'))) if (/^(architecture|security|deployment|development|operations|quickstart|testing|README|roadmap)[\w.-]*\.md$/i.test(n)) names.push(`docs/${n}`);
  return names.sort().slice(0, 12);
}
function guide(p, root) {
  const cmds = commands(root);
  const licenses = fs.readdirSync(root).filter((n) => /^(LICENSE|COPYING)(\.[\w-]+)?$/i.test(n));
  const docs = documents(root);
  return `<!-- repository-guide:generated v1; source: EclipseForgeLanding/scripts/repository-profiles.mjs -->\n# ${p.title} — путеводитель по репозиторию\n\n${p.summary}\n\n${a('Основной README', '../README.md')} · ${p.type} · ${groups[p.group]}\n\n## Основной маршрут\n\n${p.flow.map((s, i) => `${i + 1}. ${s}.`).join('\n')}\n\nЭто карта пользовательского сценария, а не отчёт о production-проверке.\n\n<a id="start"></a>\n## С чего начать\n\n1. Откройте ${a('README', '../README.md')}: в нём остаются подробности установки и эксплуатации.\n2. Определите нужный компонент по карте ниже. Для первого запуска используйте отдельную локальную среду и демонстрационные данные.\n3. Проверьте зависимости, переменные окружения и стоимость внешних провайдеров. Значения ключей не переносите в README, issue или prompt.\n4. Запустите только нужный компонент; миграции, фоновые сервисы и публикация не являются частью обычного просмотра проекта.\n\n<a id="map"></a>\n## Карта кода\n\n| Путь | Что искать |\n| --- | --- |\n${sourceMap(root).map(([f, label]) => `| ${a(f, '../' + f)} | ${label} |`).join('\n')}\n\n${docs.length ? `### Дополнительная документация\n\n${docs.map((f) => '- ' + a(f, '../' + f)).join('\n')}\n\n` : ''}<a id="checks"></a>\n## Запуск и проверка\n\n${cmds.length ? `Следующие команды **объявлены в manifest**, но не запускались при оформлении репозитория. Выполняйте их из указанной папки, после настройки среды по README.\n\n| Папка | Команда | Источник |\n| --- | --- | --- |\n${cmds.map((c) => `| \`${c.dir}\` | \`${c.command}\` | ${a(c.source, '../' + c.source)} |`).join('\n')}\n\n` : `У проекта нет стандартного набора корневых npm-команд. Используйте команды своего стека из ${a('README', '../README.md')}; не подменяйте их универсальным Vite-шаблоном.\n\n`}Перед принятием изменения проверьте: запуск нужного компонента, основной сценарий, ошибочный ввод, восстановление после ошибки и отсутствие секретов в diff. Сборка сама по себе не доказывает работоспособность пользовательского сценария.\n\n<a id="boundaries"></a>\n## Границы и права\n\n${p.boundary}\n\n${licenses.length ? `Условия кода описаны в ${licenses.map((f) => a(f, '../' + f)).join(', ')}. Права на сторонние материалы проверяются отдельно; этим оформлением лицензия не менялась.` : 'Файл LICENSE/COPYING в корне при этом обзоре не найден. Публичная доступность кода не означает разрешения на любое использование; новая лицензия автоматически не добавлялась.'}\n\n## Как вносить изменения\n\nСохраняйте существующие соглашения репозитория. Работайте над одной задачей, прикладывайте проверяемый результат и явно различайте локальную реализацию, тестирование и публикацию. Для AI-разработки в экосистеме применяется Codex; сторонние prompts и материалы не становятся активными правилами автоматически.\n\nОформление проверено по структуре файлов 2026-09-08. Актуальные версии, release-статус и доступность сервисов проверяются в самом проекте.\n`;
}
function changedReadme(p, original, root) {
  const nav = readmeNavigation(p, root);
  const alreadyManaged = original.includes('<!-- repository-guide:start -->');
  if (preserveIntro.has(p.folder) && alreadyManaged) return original.replace(/<!-- repository-guide:start -->\n[\s\S]*?<!-- repository-guide:end -->\n\n/, nav);
  const split = firstSection(original);
  if (preserveIntro.has(p.folder)) return original.slice(0, split) + nav + original.slice(split);
  let body = original.slice(split);
  if (p.folder === 'RentKldRedesign' && !alreadyManaged) body = '## Что внутри\n\nReact + TypeScript + Vite. Экран состоит из Header, Hero, BookingWidget, Fleet, Advantages, Process, Testimonials, FAQ, Contact, CTA и Footer; композиция задаётся в [src/App.tsx](src/App.tsx).\n\n## Локальный запуск\n\nУстановите зависимости согласно package-lock.json (`npm ci`), затем выполните `npm run dev`. Проверки: `npm run typecheck`, `npm run lint`, `npm run build`. Команды здесь перечислены по package.json, а не объявлены успешно выполненными.\n\n## Границы проекта\n\nЭто frontend-репозиторий. Доступность автомобилей, цены, отзывы и реальное подтверждение бронирования требуют отдельной проверки перед публичным использованием.\n';
  if (p.folder === 'eclipse-library' && !alreadyManaged) body = body.replace(/## Текущее состояние\n[\s\S]*?(?=## Как устроены данные)/, '## Текущее состояние\n\nТекущие записи и редакционные статусы хранятся в [catalog/resources.json](catalog/resources.json), а пользовательский индекс — в [web/catalog-index.json](web/catalog-index.json). Счётчики не дублируются вручную в README: они меняются при редакторских обновлениях. Наличие локального индекса не подтверждает его публикацию.\n\n');
  const portal = p.folder === 'EclipseForgeLanding' ? `[Интерактивная витрина ${profiles.length} проектов](docs/portfolio/README.md) — локальный просмотр без установки.\n\n` : '';
  return `# ${p.title}\n\n![${p.title}: ${p.flow.join(' → ')}](docs/assets/repository-cover.svg)\n\n**${p.type}.** ${p.summary}\n\n${nav}${portal}${body}`;
}
function applyFile(file, before, after) {
  if (before === after) return;
  const part = before === null ? `*** Add File: ${slash(file)}\n${after.trimEnd().split('\n').map((s) => '+' + s).join('\n')}` : `*** Update File: ${slash(file)}\n@@\n${before.trimEnd().split('\n').map((s) => '-' + s).join('\n')}\n${after.trimEnd().split('\n').map((s) => '+' + s).join('\n')}`;
  // A full README may exceed Windows' command-line size. Keep the unchanged suffix as context.
  let patch = `*** Begin Patch\n${part}\n*** End Patch`;
  if (before !== null && file.endsWith('README.md')) {
    const oldLines = before.trimEnd().split('\n'); const newLines = after.trimEnd().split('\n');
    let suffix = 0;
    while (suffix < Math.min(oldLines.length, newLines.length) && oldLines.at(-suffix - 1) === newLines.at(-suffix - 1)) suffix++;
    const oldCount = oldLines.length - suffix; const newCount = newLines.length - suffix;
    const context = oldLines.slice(oldCount, oldCount + Math.min(suffix, 2));
    patch = `*** Begin Patch\n*** Update File: ${slash(file)}\n@@\n${oldLines.slice(0, oldCount).map((s) => '-' + s).join('\n')}\n${newLines.slice(0, newCount).map((s) => '+' + s).join('\n')}\n${context.map((s) => ' ' + s).join('\n')}\n*** End Patch`;
  }
  const result = spawnSync(patchExe, ['--codex-run-as-apply-patch', patch], { encoding: 'utf8', windowsHide: true });
  if (result.status !== 0) throw new Error(`apply_patch failed for ${file}: ${result.stderr || result.stdout}`);
}
const plans = []; const baseline = []; const catalog = [];
for (const [i, p] of profiles.entries()) {
  if (/star-crm|claude|external/i.test(p.folder)) throw new Error('Excluded project in allowlist');
  const root = path.resolve(workspace, checkoutFor(p));
  if (!root.startsWith(workspace + path.sep) || slash(git(root, 'rev-parse', '--show-toplevel')).toLowerCase() !== slash(root).toLowerCase()) throw new Error(`Checkout mismatch: ${p.folder}`);
  const original = read(path.join(root, 'README.md'));
  const introEnd = firstSection(original);
  baseline.push({ project: p.folder, checkout: slash(root), branch: git(root, 'branch', '--show-current') || 'detached', head: git(root, 'rev-parse', 'HEAD') || 'unborn', readmeHash: sha(path.join(root, 'README.md')), bodyHash: createHash('sha256').update(original.slice(introEnd)).digest('hex'), dirtyPaths: git(root, 'status', '--porcelain=v1', '--untracked-files=no').split('\n').filter(Boolean) });
  const outputs = [['docs/repository-guide.md', guide(p, root).replaceAll('</a>\n##', '</a>\n\n##')], ['README.md', changedReadme(p, original, root)]];
  if (!preserveIntro.has(p.folder)) outputs.push(['docs/assets/repository-cover.svg', renderCover(p, i, groups[p.group])]);
  for (const [relative, content] of outputs) {
    const file = path.join(root, relative); const before = fs.existsSync(file) ? read(file) : null;
    if (relative !== 'README.md' && before !== null && !before.includes('repository-guide:generated') && !before.includes('ECLIPSE FORGE / PROJECT NOTES')) throw new Error(`Refuse to overwrite owned file: ${file}`);
    const scope = relative === 'README.md' ? (preserveIntro.has(p.folder) ? 'navigation' : 'intro') : 'full';
    plans.push({ file, before, after: content, scope });
  }
  const remote = git(root, 'remote', 'get-url', 'origin');
  const match = remote.match(/^(?:https:\/\/github\.com\/|git@github\.com:)([\w.-]+\/[\w.-]+?)(?:\.git)?$/);
  const repository = match ? 'https://github.com/' + match[1] : null;
  catalog.push({ ...p, groupLabel: groups[p.group], repository, commands: commands(root), files: sourceMap(root).map(([name, label]) => ({ name, label })) });
}
const publicData = `// Generated editorial data. No local checkout paths, private remotes or runtime health.\nwindow.REPOSITORY_CATALOG = ${JSON.stringify(catalog, null, 2).replaceAll('<', '\\u003c')};\n`;
const dataFile = path.join(home, 'docs/portfolio/catalog.js');
plans.push({ file: dataFile, before: fs.existsSync(dataFile) ? read(dataFile) : null, after: publicData, scope: 'full' });
if (check) {
  const stale = plans.filter((p) => p.before !== p.after).map((p) => slash(path.relative(workspace, p.file)));
  if (stale.length) { console.error(JSON.stringify({ stale }, null, 2)); process.exitCode = 1; }
  else console.log(JSON.stringify({ projects: profiles.length, generatedFilesCurrent: plans.length, result: 'pass' }));
} else {
  const artifact = path.join(home, '.artifacts/repository-presentation-2026-09-08');
  const stateFile = path.join(artifact, 'output-state.json');
  const state = fs.existsSync(stateFile) ? JSON.parse(read(stateFile)) : null;
  if (state && (state.version !== 1 || !state.files || Array.isArray(state.files))) throw new Error('Invalid generation receipt');
  const readCurrent = file => fs.existsSync(file) ? read(file) : null;
  // Preflight the entire batch before writing even the local receipt.
  validateApplyPlan(plans, state, readCurrent);
  fs.mkdirSync(artifact, { recursive: true });
  const baselineFile = path.join(artifact, 'baseline.json');
  if (!fs.existsSync(baselineFile)) fs.writeFileSync(baselineFile, JSON.stringify(baseline, null, 2));
  for (const item of plans) {
    assertSnapshot(item, readCurrent);
    if (item.file === dataFile) {
      // Pure serialization of the reviewed profiles + allowlisted file metadata; not a semantic source edit.
      if (item.before !== item.after) fs.writeFileSync(dataFile, item.after);
    } else applyFile(item.file, item.before, item.after);
  }
  fs.writeFileSync(stateFile, JSON.stringify(outputReceipt(plans), null, 2));
  const changed = plans.filter(p => p.before !== p.after).map(p => ({ path: slash(p.file), beforeHash: p.before === null ? null : createHash('sha256').update(p.before).digest('hex'), afterHash: sha(p.file) }));
  // Keep prior run evidence instead of overwriting the last successful change journal.
  fs.writeFileSync(path.join(artifact, 'apply-' + Date.now() + '.json'), JSON.stringify(changed, null, 2), { flag: 'wx' });
  console.log(JSON.stringify({ projects: profiles.length, filesChanged: plans.filter((p) => p.before !== p.after).length, result: 'applied locally' }));
}
