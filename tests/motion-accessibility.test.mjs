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

test('orbital header and event-horizon footer share the governed motion contract', async () => {
  const [header, app, styles] = await Promise.all([
    readFile(new URL('src/components/layout/SiteHeader.tsx', root), 'utf8'),
    readFile(new URL('src/app/App.tsx', root), 'utf8'),
    readFile(new URL('src/styles/index.css', root), 'utf8'),
  ]);

  assert.match(header, /useTransform\(scrollYProgress, \[0, 1\], \[0, 360\]\)/);
  assert.match(header, /site-command-mark__tracker/);
  assert.match(app, /event-horizon-footer__eclipse/);
  assert.match(app, /initial=\{ambientMotionEnabled \?/);
  assert.match(styles, /html\[data-ambient-motion='paused'\][\s\S]*\.event-horizon-footer__orbit/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.event-horizon-footer__signal/);

  const orbitKeyframes = [
    styles.match(/@keyframes siteCommandIgnition[\s\S]*?\n}/)?.[0] ?? '',
    styles.match(/@keyframes eventHorizonOrbit[\s\S]*?\n}/)?.[0] ?? '',
    styles.match(/@keyframes eventHorizonOrbitReverse[\s\S]*?\n}/)?.[0] ?? '',
    styles.match(/@keyframes eventHorizonSignal[\s\S]*?\n}/)?.[0] ?? '',
  ].join('\n');

  assert.doesNotMatch(orbitKeyframes, /filter:|box-shadow:|background-position:|\b(?:top|left|width|height):/);
  assert.match(orbitKeyframes, /transform:/);
});
