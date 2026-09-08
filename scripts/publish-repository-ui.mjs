import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { profiles, checkoutFor } from './repository-profiles.mjs';
import { uiGalleries } from './repository-ui-gallery.mjs';

// Publishes reviewed captures into LOCAL documentation only. No Git/network.
const home = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = path.join(home, '.artifacts/repository-presentation-2026-09-08/ui-capture');
const sha = b => createHash('sha256').update(b).digest('hex');
const plans = [];
for (const [name, entry] of Object.entries(uiGalleries)) {
  const profile = profiles.find(p => p.folder === name);
  assert(profile && !/star-crm|starmarket/i.test(name));
  const root = path.resolve(home,'..',checkoutFor(profile));
  const source = path.join(base,name);
  const capture = JSON.parse(fs.readFileSync(path.join(source,'capture.json')));
  assert.equal(capture.project,name);
  assert.equal(capture.result,'captured-needs-visual-review');
  assert.equal(capture.errors.length,0,'Capture has runtime errors: '+name);
  const screens = capture.screens.filter(s => s.kind === 'overview' || entry.mobile && s.kind === 'mobile');
  assert.equal(screens.length,entry.mobile ? 2 : 1);
  const destination = path.join(root,'docs/assets/ui');
  for (const screen of screens) {
    assert(['overview.png','mobile.png'].includes(screen.file));
    const bytes = fs.readFileSync(path.join(source,screen.file));
    assert.equal(sha(bytes),screen.sha256);
    assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    assert.equal(bytes.readUInt32BE(16),screen.width);
    assert.equal(bytes.readUInt32BE(20),screen.height);
    assert(bytes.length < 2500000,'Screenshot unexpectedly large: '+name);
    plans.push({ file:path.join(destination,screen.file), bytes });
  }
  const metadata = {
    schemaVersion:1, project:name, capturedAt:capture.capturedAt,
    caption:entry.caption, method:capture.method,
    context:'Local source preview, clean browser storage, reduced motion, no .env, external resources and backend APIs blocked. Repository content only, no additional fixtures or personal history; no production verification.',
    sourceHead:capture.head || null, sourceWorktreeDirty:capture.dirty,
    entryFiles:capture.source, screenshots:screens,
    review:'Desktop and selected mobile captures visually reviewed before documentation use.',
  };
  const bytes = Buffer.from(JSON.stringify(metadata,null,2)+'\n');
  assert(!/[A-Z]:[\\/]|ghp_[A-Za-z0-9]{30,}|sk-(?:proj-)?[A-Za-z0-9_-]{40,}|BEGIN [A-Z ]*PRIVATE KEY/.test(bytes.toString()));
  plans.push({file:path.join(destination,'capture.json'),bytes});
}
// Reject pre-existing different documentation assets before writing any file.
for (const plan of plans) if (fs.existsSync(plan.file)) assert.equal(sha(fs.readFileSync(plan.file)),sha(plan.bytes),'Existing asset differs; do not overwrite: '+plan.file);
let written=0;
for (const plan of plans) {
  if (fs.existsSync(plan.file)) continue;
  fs.mkdirSync(path.dirname(plan.file),{recursive:true});
  // Generated image bytes and sanitized generated provenance, not source edits.
  fs.writeFileSync(plan.file,plan.bytes,{flag:'wx'});
  written++;
}
console.log(JSON.stringify({projects:Object.keys(uiGalleries).length,files:plans.length,written,publication:'local-only'}));
