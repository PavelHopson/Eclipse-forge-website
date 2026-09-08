import test from 'node:test';
import assert from 'node:assert/strict';
import { firstSection, managedHash, assertSnapshot, validateApplyPlan, outputReceipt } from './repository-write-guard.mjs';

const file = 'E:/projects/example/docs/repository-guide.md';
const make = (before = 'original', after = 'generated', scope = 'full') => ({ file, before, after, scope });
const receipt = item => outputReceipt([{ ...item, after: item.before }]);
test('unchanged current outputs can establish a receipt without rewriting source', () => {
  const item = make('same', 'same');
  assert.doesNotThrow(() => validateApplyPlan([item], null, () => 'same'));
  assert.equal(outputReceipt([item]).files[file].hash, managedHash('same'));
});
test('existing changed output without a prior receipt fails closed', () => {
  assert.throws(() => validateApplyPlan([make()], null, () => 'original'), /No verified generation receipt/);
});
test('reviewed owned content may be regenerated', () => {
  const item = make();
  assert.doesNotThrow(() => validateApplyPlan([item], receipt(item), () => 'original'));
});
test('manual modification since the last successful generation is preserved', () => {
  const item = make('user edit', 'new generated');
  assert.throws(() => validateApplyPlan([item], receipt(make()), () => 'user edit'), /edited outside/);
});
test('a concurrent edit after planning fails before apply', () => {
  const item = make();
  assert.throws(() => validateApplyPlan([item], receipt(item), () => 'concurrent edit'), /Concurrent file change/);
});
test('new file appeared or existing file disappeared after planning', () => {
  assert.throws(() => assertSnapshot(make(null, 'new'), () => 'user file'), /Concurrent file change/);
  assert.throws(() => assertSnapshot(make(), () => null), /Concurrent file change/);
});
test('all targets are preflighted, including unchanged outputs', () => {
  const first = make('same', 'same');
  const second = { ...make(), file: file + '.second' };
  const reads = [];
  assert.throws(() => validateApplyPlan([first, second], receipt(second), name => {
    reads.push(name); return name === file ? 'same' : 'concurrent';
  }), /Concurrent file change/);
  assert.equal(reads.length, 2);
});
test('duplicate target is rejected', () => {
  const item = make('same', 'same');
  assert.throws(() => validateApplyPlan([item, item], null, () => 'same'), /Duplicate output target/);
});
test('new absent files can be generated', () => {
  assert.doesNotThrow(() => validateApplyPlan([make(null, 'new')], null, () => null));
});
test('README intro ownership excludes the technical body', () => {
  const a = '# Project\nIntro\n\n## Runtime\nOld version';
  const b = '# Project\nIntro\n\n## Runtime\nNew user version';
  assert.equal(managedHash(a, 'intro'), managedHash(b, 'intro'));
  assert.notEqual(managedHash(a), managedHash(b));
});
test('README navigation ownership excludes even the preserved introduction', () => {
  const nav = '<!-- repository-guide:start -->\nlink\n<!-- repository-guide:end -->';
  assert.equal(managedHash('Version 1\n' + nav, 'navigation'), managedHash('Version 2\n' + nav, 'navigation'));
  assert.notEqual(managedHash(nav, 'navigation'), managedHash(nav.replace('link', 'manual edit'), 'navigation'));
});
test('missing markers and unknown scopes do not grant ownership', () => {
  assert.throws(() => managedHash('text', 'navigation'), /marker is missing/);
  assert.throws(() => managedHash('text', 'unknown'), /Unknown managed scope/);
});
test('section detection ignores headings in fenced code', () => {
  const intro = '# Project\n\n\x60\x60\x60md\n## Example\n\x60\x60\x60\n\n';
  assert.equal(firstSection(intro + '## Real section\nBody'), intro.length);
});
test('BOM and CRLF normalize without changing semantic ownership', () => {
  assert.equal(managedHash('\uFEFFone\r\ntwo'), managedHash('one\ntwo'));
});
test('managed README sections do not become the technical body', () => {
  const intro = '# Project\n\n<!-- repository-guide:start -->\n## Overview\n\n## Start\n<!-- repository-guide:end -->\n\n';
  const body = '## API\nUser-owned documentation';
  assert.equal(firstSection(intro + body), intro.length);
  assert.equal(managedHash(intro + body, 'intro'), managedHash(intro + body + ' updated', 'intro'));
  assert.notEqual(managedHash(intro + body, 'intro'), managedHash(intro.replace('Overview', 'Manual edit') + body, 'intro'));
});
