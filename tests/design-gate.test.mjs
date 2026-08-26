import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('publishes a complete versioned Eclipse Design Gate', async () => {
  const contract = JSON.parse(await read('public/design-system/eclipse-forge.design-gate.json'));
  const ids = contract.antiSlopSignals.map((signal) => signal.id);

  assert.equal(contract.schemaVersion, 'eclipse-forge.design-gate.v1');
  assert.equal(contract.visualSystemVersion, 'eclipse-forge.visual-system.v1');
  assert.deepEqual(Object.keys(contract.profiles), ['cinematic', 'product', 'operational']);
  assert.equal(ids.length, 25);
  assert.equal(new Set(ids).size, 25);
  assert.equal(contract.motionTiers.reducedFadeMaxMs, 200);
  assert.ok(contract.requiredChecks.some((check) => check.id === 'real-product-evidence'));
  assert.ok(contract.requiredChecks.some((check) => check.id === 'security-truthfulness'));
});

test('keeps Landing in pilot while new anti-slop evidence remains open', async () => {
  const evidence = JSON.parse(await read('docs/eclipse-forge-os/design/evidence/eclipse-forge-landing.json'));

  assert.equal(evidence.contractVersion, 'eclipse-forge.design-gate.v1');
  assert.equal(evidence.gateStatus, 'pilot');
  assert.equal(evidence.antiSlopReview.length, 25);
  assert.ok(evidence.openActions.length > 0);
  assert.ok(evidence.antiSlopReview.some((review) => review.id === 'AS-25' && review.status === 'needs-change'));
});

test('homepage metrics are derived from the public registry and expose their source', async () => {
  const manifest = JSON.parse(await read('public/ecosystem/manifest.json'));
  const content = await read('src/data/content.ts');
  const metrics = await read('src/components/sections/MetricsSection.tsx');
  const hero = await read('src/components/sections/HeroSection.tsx');
  const metricDefinitions = content.match(/const metricDefinitions:[\s\S]*?\n\];/)?.[0] ?? '';

  assert.ok(metricDefinitions);
  assert.match(metricDefinitions, new RegExp(`value: '${manifest.projects.length}'`));
  assert.match(metricDefinitions, new RegExp(`value: '${manifest.projects.filter((project) => project.status === 'live').length}'`));
  assert.doesNotMatch(metricDefinitions, /production-систем в работе 24\/7|958\+ тестов|958\+.*автоматических проверок/);
  assert.match(metrics, /metric\.sourceHref/);
  assert.match(metrics, /metric\.sourceLabel/);
  assert.match(hero, /metric\.sourceHref/);
  assert.match(hero, /metric\.sourceLabel/);
});

test('non-interactive overview surfaces do not simulate clickable elevation', async () => {
  const [metrics, services, process] = await Promise.all([
    read('src/components/sections/MetricsSection.tsx'),
    read('src/components/sections/ServicesSection.tsx'),
    read('src/components/sections/ProcessSection.tsx'),
  ]);

  assert.doesNotMatch(metrics, /whileHover=\{\{\s*y:/);
  assert.doesNotMatch(services, /whileHover=\{\{\s*y:/);
  assert.doesNotMatch(process, /whileHover=\{\{\s*x:/);
});
