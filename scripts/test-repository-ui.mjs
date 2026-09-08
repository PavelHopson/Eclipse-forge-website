import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {profiles,checkoutFor} from './repository-profiles.mjs';
import {uiGalleries,renderUiGallery} from './repository-ui-gallery.mjs';

const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const evidence=path.join(home,'.artifacts/repository-presentation-2026-09-08');
const results=[];
let images=0,totalBytes=0;
const check=(name,fn)=>{try{fn();results.push({name,pass:true});}catch(e){results.push({name,pass:false,error:e.message});}};
for(const p of profiles){
  const root=path.resolve(home,'..',checkoutFor(p));
  const selected=uiGalleries[p.folder];
  if(!selected){check(p.folder+': no fabricated gallery',()=>assert.equal(renderUiGallery(p,root),''));continue;}
  const base=path.join(root,'docs/assets/ui');
  const metadata=JSON.parse(fs.readFileSync(path.join(base,'capture.json')));
  const original=JSON.parse(fs.readFileSync(path.join(evidence,'ui-capture',p.folder,'capture.json')));
  check(p.folder+': sanitized provenance',()=>{
    assert.equal(metadata.project,p.folder);
    assert.equal(metadata.capturedAt,original.capturedAt);
    assert.equal(metadata.sourceHead,original.head);
    assert.equal(metadata.sourceWorktreeDirty,original.dirty);
    assert.deepEqual(metadata.entryFiles,original.source);
    assert.equal(metadata.method,'isolated-local-source-preview');
    assert.equal(metadata.screenshots.length,selected.mobile?2:1);
    for(const key of ['overviewText','mobileText','httpFailures','blocked','errors','environment'])assert(!Object.hasOwn(metadata,key),'Internal capture field leaked: '+key);
    assert(!/[A-Z]:[\\/]|localhost|127\.0\.0\.1|BEGIN [A-Z ]*PRIVATE KEY|ghp_[A-Za-z0-9]{30,}|sk-(?:proj-)?[A-Za-z0-9_-]{40,}/.test(JSON.stringify(metadata)));
    assert(metadata.context.includes('no production verification'));
  });
  for(const screen of metadata.screenshots){
    check(p.folder+': original '+screen.kind,()=>{
      assert(['overview.png','mobile.png'].includes(screen.file));
      const bytes=fs.readFileSync(path.join(base,screen.file));
      assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
      assert.equal(bytes.readUInt32BE(16),screen.kind==='overview'?1440:390);
      assert.equal(bytes.readUInt32BE(20),screen.kind==='overview'?900:844);
      assert.equal(bytes.length,screen.bytes);
      assert(bytes.length<2500000);
      assert.equal(createHash('sha256').update(bytes).digest('hex'),screen.sha256);
      assert(bytes.equals(fs.readFileSync(path.join(evidence,'ui-capture',p.folder,screen.file))),'Screenshot was altered');
      images++;totalBytes+=bytes.length;
    });
  }
  check(p.folder+': README gallery and disclosure',()=>{
    const readme=fs.readFileSync(path.join(root,'README.md'),'utf8').replaceAll('\r\n','\n');
    assert(readme.includes(renderUiGallery(p,root)));
    assert(readme.includes('[Интерфейс](#readme-interface)'));
    assert.equal(readme.includes('Мобильный экран · 390 px'),selected.mobile);
    if(selected.mobile)assert(readme.includes('width="390"'));
  });
}
const failures=results.filter(r=>!r.pass);
const report={projects:Object.keys(uiGalleries).length,images,totalBytes,checks:results.length,passed:results.length-failures.length,failures,results};
fs.writeFileSync(path.join(evidence,'readme-ui-tests.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,results:undefined}));
if(failures.length)process.exitCode=1;
