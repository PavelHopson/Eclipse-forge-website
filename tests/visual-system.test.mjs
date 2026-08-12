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
