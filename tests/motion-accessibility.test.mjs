import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('ambient motion has an accessible user and system governor', async () => {
  const [preference, toggle, app, styles] = await Promise.all([
    readFile(new URL('src/lib/motionPreference.tsx', root), 'utf8'),
    readFile(new URL('src/components/ui/MotionToggle.tsx', root), 'utf8'),
    readFile(new URL('src/app/App.tsx', root), 'utf8'),
    readFile(new URL('src/styles/index.css', root), 'utf8'),
  ]);

  assert.match(preference, /prefers-reduced-motion: reduce/);
  assert.match(preference, /addEventListener\('change'/);
  assert.match(preference, /dataset\.ambientMotion/);
  assert.match(toggle, /aria-pressed=\{paused\}/);
  assert.match(toggle, /disabled=\{systemReducedMotion\}/);
  assert.match(app, /reducedMotion=\{ambientMotionEnabled \? 'user' : 'always'\}/);
  assert.match(styles, /animation-play-state: paused !important/);
  assert.match(styles, /animation-iteration-count: 1 !important/);
});

test('black hole canvas pauses offscreen and uses a bounded mobile profile', async () => {
  const canvas = await readFile(new URL('src/components/ui/BlackHoleCanvas.tsx', root), 'utf8');

  assert.match(canvas, /MOBILE_PARTICLE_COUNT = 180/);
  assert.match(canvas, /new IntersectionObserver/);
  assert.match(canvas, /document\.hidden \|\| !inViewport/);
  assert.match(canvas, /if \(ambientMotionEnabled && !paused\) frameId = requestAnimationFrame\(step\)/);
  assert.match(canvas, /intersectionObserver\.disconnect\(\)/);
});

test('explicit smooth scrolling respects reduced and manually paused motion', async () => {
  const routing = await readFile(new URL('src/lib/routing.tsx', root), 'utf8');

  assert.match(routing, /prefers-reduced-motion: reduce/);
  assert.match(routing, /dataset\.ambientMotion === 'paused'/);
  assert.match(routing, /behavior: reduced \? 'auto' : 'smooth'/);
});
