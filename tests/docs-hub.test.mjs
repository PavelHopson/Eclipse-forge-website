import assert from 'node:assert/strict';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const hubRoot = resolve(repositoryRoot, 'docs/eclipse-forge-os');

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
  }));
  return nested.flat();
}

test('Eclipse Forge OS documentation lives under one discoverable hub', async () => {
  const required = [
    'README.md',
    'operating-plan.md',
    'business-model.md',
    'architecture.md',
    'security-and-release-runbook.md',
    'growth-os/README.md',
    'security/README.md',
    'execution/stage-0/README.md',
    'projects/README.md',
  ];

  await Promise.all(required.map((path) => access(resolve(hubRoot, path))));
  const hubReadme = await readFile(resolve(hubRoot, 'README.md'), 'utf8');
  for (const path of required.slice(1)) assert.match(hubReadme, new RegExp(path.replaceAll('.', '\\.')));
});

test('project registry exposes portfolio, documents, baseline, backlog and governance', async () => {
  const projectsRoot = resolve(hubRoot, 'projects');
  const required = [
    'portfolio-registry.md',
    'documentation-registry.md',
    'workspace-baseline.md',
    'consolidated-backlog.md',
    'governance-source-map.md',
  ];

  await Promise.all(required.map((path) => access(resolve(projectsRoot, path))));
  const projectsReadme = await readFile(resolve(projectsRoot, 'README.md'), 'utf8');
  for (const path of required) assert.match(projectsReadme, new RegExp(path.replaceAll('.', '\\.')));
});

test('portfolio registry keeps every inventoried Eclipse repository discoverable', async () => {
  const expectedProjects = [
    'Eclipse Forge Landing', 'Eclipse Chat', 'Eclipse AI Hub', 'Eclipse Library',
    'Hopson Sentinel', 'Eclipse Webclaw', 'Eclipse Media', 'retry-http',
    'Eclipse DnD Forge', 'Finflow', 'Educator AI', 'CryptoPulse',
    'Eclipse Valhalla', 'Smart Life Assistant', 'InterviewForge',
    'Smart Fitness Booking Agent', 'Task Manager', 'Shotforge', 'Text2Image',
    'ModelForge', 'AI Face Fusion Pro', 'StreamForge AI', 'Cinemate Movie Finder',
    'Modern 2048', 'Dark Roast Coffee', 'Zefir Gift Landing',
    'Eclipse Premium Rent', 'Rent KLD Redesign', 'AI Setup', 'eclipse-vpn',
    'Business Data Platform', 'AdService', 'KmlApiApp',
    'Lead Sniper CAT Analytics', 'WireGuard Telegram Bot', 'oh-my-claudecode',
  ];
  const portfolio = await readFile(resolve(hubRoot, 'projects/portfolio-registry.md'), 'utf8');

  for (const project of expectedProjects) assert.match(portfolio, new RegExp(project.replaceAll('.', '\\.')));
});

test('Stage 0 execution packet exposes every decision input', async () => {
  const stageRoot = resolve(hubRoot, 'execution/stage-0');
  const required = [
    'objective.md',
    'public-evidence.md',
    'analytics-baseline.md',
    'risk-review.md',
    'positioning-audit.md',
    'decision.md',
  ];

  await Promise.all(required.map((path) => access(resolve(stageRoot, path))));
  const stageReadme = await readFile(resolve(stageRoot, 'README.md'), 'utf8');
  for (const path of required) assert.match(stageReadme, new RegExp(path.replaceAll('.', '\\.')));
});

test('relative Markdown links inside the Eclipse Forge OS hub resolve', async () => {
  const files = await markdownFiles(hubRoot);
  const broken = [];

  for (const file of files) {
    const markdown = await readFile(file, 'utf8');
    for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const rawTarget = match[1].trim().replace(/^<|>$/g, '');
      if (/^(?:https?:|mailto:|#)/i.test(rawTarget)) continue;
      const relativeTarget = decodeURIComponent(rawTarget.split('#', 1)[0]);
      if (!relativeTarget) continue;
      const target = resolve(dirname(file), relativeTarget);
      try {
        await stat(target);
      } catch {
        broken.push(`${file}: ${rawTarget}`);
      }
    }
  }

  assert.deepEqual(broken, []);
});
