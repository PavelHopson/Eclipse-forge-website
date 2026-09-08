import { createHash } from 'node:crypto';

export const normalizeDocument = value => value.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');

export function firstSection(text) {
  let offset = 0;
  let fence = false;
  let managed = false;
  for (const line of text.split('\n')) {
    if (line === '<!-- repository-guide:start -->') managed = true;
    if (managed) {
      if (line === '<!-- repository-guide:end -->') managed = false;
      offset += line.length + 1;
      continue;
    }
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    if (!fence && /^## /.test(line)) return offset;
    offset += line.length + 1;
  }
  return text.length;
}

export function managedHash(content, scope = 'full') {
  if (content === null) return null;
  const text = normalizeDocument(content);
  let region = text;
  if (scope === 'intro') region = text.slice(0, firstSection(text));
  else if (scope === 'navigation') {
    region = text.match(/<!-- repository-guide:start -->\n[\s\S]*?<!-- repository-guide:end -->/)?.[0];
    if (!region) throw new Error('Managed navigation marker is missing');
  } else if (scope !== 'full') throw new Error('Unknown managed scope');
  return createHash('sha256').update(region).digest('hex');
}

export function assertSnapshot(item, readCurrent) {
  const current = readCurrent(item.file);
  if (current !== item.before) throw new Error(`Concurrent file change; nothing should overwrite it: ${item.file}`);
}

export function validateApplyPlan(plans, state, readCurrent) {
  const seen = new Set();
  for (const item of plans) {
    if (seen.has(item.file)) throw new Error(`Duplicate output target: ${item.file}`);
    seen.add(item.file);
    assertSnapshot(item, readCurrent);
    if (item.before === item.after || item.before === null) continue;
    const known = state?.files?.[item.file];
    if (!known || known.scope !== item.scope) {
      throw new Error(`No verified generation receipt; review the existing file before regeneration: ${item.file}`);
    }
    if (known.hash !== managedHash(item.before, item.scope)) {
      throw new Error(`Managed content was edited outside the generator; preserve and review it: ${item.file}`);
    }
  }
}

export function outputReceipt(plans) {
  return { version: 1, files: Object.fromEntries(plans.map(item => [item.file, {
    scope: item.scope,
    hash: managedHash(item.after, item.scope)
  }])) };
}
