import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('publishes the versioned Eclipse Forge visual system contract', async () => {
  const tokens = JSON.parse(await read('public/design-system/eclipse-forge.tokens.json'));

  assert.equal(tokens.schemaVersion, 'eclipse-forge.visual-system.v1');
  assert.equal(tokens.principle, 'Cinematic systems engineering');
  assert.equal(tokens.colors.dark.background, '#05070A');
  assert.equal(tokens.colors.dark.gold, '#D4AF37');
  assert.deepEqual(tokens.intensityProfiles, ['cinematic', 'product', 'operational']);
  assert.equal(tokens.motion.reducedMotionRequired, true);
});

test('self-hosts the canonical fonts without a Google Fonts runtime request', async () => {
  const css = await read('src/styles/index.css');

  assert.doesNotMatch(css, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  for (const path of [
    'public/fonts/inter-cyrillic.woff2',
    'public/fonts/inter-latin.woff2',
    'public/fonts/outfit-latin-ext.woff2',
    'public/fonts/outfit-latin.woff2',
    'public/fonts/INTER-OFL.txt',
    'public/fonts/OUTFIT-OFL.txt',
  ]) {
    assert.ok((await stat(new URL(path, root))).size > 1_000, `${path} must be present and non-empty`);
  }
});

test('ships an optimized CryptoPulse image with a real PNG fallback', async () => {
  const content = await read('src/data/content.ts');
  const webp = await stat(new URL('public/images/projects/cryptopulse.webp', root));
  const png = await stat(new URL('public/images/projects/cryptopulse.png', root));

  assert.match(content, /sources: \['\/images\/projects\/cryptopulse\.webp', '\/images\/projects\/cryptopulse\.png'\]/);
  assert.ok(webp.size > 10_000, 'optimized CryptoPulse image must be non-empty');
  assert.ok(webp.size < png.size, 'optimized CryptoPulse image must be smaller than PNG fallback');
});

test('project showcase exposes identity, outcome and evidence without hover', async () => {
  const cases = await read('src/components/sections/CasesSection.tsx');
  const ecosystem = await read('src/components/sections/SystemsEcosystemSection.tsx');

  assert.match(cases, /\{project\.title\}/);
  assert.match(cases, /\{project\.result\}/);
  assert.match(cases, /\{project\.signal\}/);
  assert.match(cases, /useMotionPreference/);
  assert.match(cases, /group-focus-within:opacity-100/);
  assert.match(ecosystem, /\{project\.title\}/);
  assert.match(ecosystem, /\{project\.result\}/);
  assert.match(ecosystem, /useMotionPreference/);
});

test('editorial hero keeps the Eclipse anchor and accessible primary paths', async () => {
  const [hero, styles] = await Promise.all([
    read('src/components/sections/HeroSection.tsx'),
    read('src/styles/index.css'),
  ]);

  assert.match(hero, /eclipse-editorial-hero/);
  assert.match(hero, /hero-editorial-eclipse/);
  assert.match(hero, /href="#contact"/);
  assert.match(hero, /href="#cases"/);
  assert.match(hero, /useMotionPreference/);
  assert.match(styles, /\.hero-editorial-cta\s*\{[\s\S]*min-height:\s*52px/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.hero-editorial-corona/);
});

test('records the bounded UI pilot and reusable Media contract', async () => {
  const pilot = await read('docs/ui-reference-pilot-2026-08-20.md');
  const contract = await read('docs/eclipse-forge-visual-system.md');

  assert.match(pilot, /reject integration/i);
  assert.match(pilot, /prefers-reduced-motion/);
  assert.match(contract, /Reusable guidance для Eclipse Media/);
  assert.match(contract, /Skiper UI, AnimMaster, Oceon и\s+Vlipsy/);
});
