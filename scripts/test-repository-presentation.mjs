import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { profiles, checkoutFor, preserveIntro } from './repository-profiles.mjs';
import { firstSection } from './repository-write-guard.mjs';
const home = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspace = path.dirname(home);
const read = f => fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, '').replaceAll('\r\n','\n');
const digest = v => createHash('sha256').update(v).digest('hex');
const artifact = path.join(home,'.artifacts/repository-presentation-2026-09-08');
const baseline = JSON.parse(read(path.join(artifact,'baseline.json')));
const results = [];
const check = (name, fn) => { try { fn(); results.push({name,result:'pass'}); } catch(error) { results.push({name,result:'fail',error:String(error.message)}); } };
check('36 unique projects; exclusions',()=>{assert.equal(profiles.length,36);assert.equal(new Set(profiles.map(p=>p.folder)).size,36);assert(profiles.every(p=>!/star-crm|StarMarket|claude|the-delegation|external/i.test(p.folder)));});
let linkCount=0, coverCount=0;
for(const p of profiles){
 const root=path.join(workspace,checkoutFor(p)), current=read(path.join(root,'README.md')), guide=read(path.join(root,'docs/repository-guide.md'));
 check(`${p.folder}: guide and README navigation`,()=>{assert(current.includes('<!-- repository-guide:start -->')); for(const id of ['start','map','checks','boundaries']){assert(guide.includes(`id="${id}"`));assert(current.includes(`repository-guide.md#${id}`));} assert(guide.includes(p.boundary));});
 check(`${p.folder}: relative links`,()=>{for(const match of guide.matchAll(/\]\(<([^>]+)>\)/g)){const rel=decodeURIComponent(match[1].split('#')[0]);const target=path.resolve(root,'docs',rel);assert(target.startsWith(root+path.sep)||target===root,`${p.folder}: escaped path`);assert(fs.existsSync(target),`Missing: ${target}`);linkCount++;}});
 check(`${p.folder}: retained technical body`,()=>{if(['eclipse-library','RentKldRedesign'].includes(p.folder)) return;const original=baseline.find(b=>b.project===p.folder);const body=current.slice(firstSection(current));assert([body,body.replace(/\n$/,''),body+'\n'].some(s=>digest(s)===original.bodyHash),`${p.folder}: technical body changed (ignoring one EOF newline)`);});
 if(!preserveIntro.has(p.folder)){check(`${p.folder}: static local SVG`,()=>{const svg=read(path.join(root,'docs/assets/repository-cover.svg'));assert(svg.includes('<title id="title">'));assert(svg.includes('<desc id="desc">'));assert(!/<script|onload=|<foreignObject|<image|href=/i.test(svg));assert(current.includes('docs/assets/repository-cover.svg'));coverCount++;});}
}
check('Dirty README contents preserved',()=>{for(const name of ['AdService','eclipse-connect']){const p=profiles.find(p=>p.folder===name);let current=read(path.join(workspace,checkoutFor(p),'README.md'));current=current.replace(/<!-- repository-guide:start -->\n[\s\S]*?<!-- repository-guide:end -->\n\n/,'');const expected=baseline.find(p=>p.project===name).readmeHash;const lines=[current,current.replace(/\n$/,''),current+'\n'];const candidates=lines.flatMap(s=>[s,s.replaceAll('\n','\r\n')]).flatMap(s=>[s,'\uFEFF'+s]);assert(candidates.some(s=>digest(s)===expected),`${name}: preexisting README content changed`);}});
check('No duplicated Library counts',()=>{const s=read(path.join(workspace,checkoutFor(profiles.find(p=>p.folder==='eclipse-library')),'README.md'));assert(!s.includes('698 уникальных'));assert(s.includes('Счётчики не дублируются вручную'));});
const context={window:{}};vm.runInNewContext(read(path.join(home,'docs/portfolio/catalog.js')),context,{timeout:1000});const data=context.window.REPOSITORY_CATALOG;
check('Public catalog: no private topology and only GitHub links',()=>{assert.equal(data.length,36);const s=JSON.stringify(data);assert(!/[A-Z]:[\\/]|127\.0\.0\.1|192\.168\.|\.artifacts|DEPLOY_HOST|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY/.test(s));for(const p of data){if(p.repository){const u=new URL(p.repository);assert.equal(u.protocol,'https:');assert.equal(u.hostname,'github.com');assert(!u.username&&!u.password&&!u.search&&!u.hash);assert(!u.pathname.endsWith('.git'));}}});
check('UI: no HTML insertion or network execution',()=>{const s=read(path.join(home,'docs/portfolio/portfolio.js'));assert(!/\.innerHTML|insertAdjacentHTML|\beval\(|new Function|\bfetch\(|localStorage|serviceWorker|child_process/.test(s));const html=read(path.join(home,'docs/portfolio/index.html'));assert(html.includes("connect-src 'none'"));assert(html.includes('aria-live="polite"'));assert(read(path.join(home,'docs/portfolio/portfolio.css')).includes('prefers-reduced-motion'));});
check('Changed-surface secret signatures',()=>{const files=[...profiles.flatMap(p=>[path.join(workspace,checkoutFor(p),'docs/repository-guide.md')]),...['index.html','portfolio.js','portfolio.css','catalog.js'].map(f=>path.join(home,'docs/portfolio',f))];for(const f of files){assert(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|sk-(?:proj-)?[A-Za-z0-9_-]{40,}|AKIA[A-Z0-9]{16}/.test(read(f)),`Credential pattern in ${f}`);}});
check('Whitespace checks in all selected checkouts',()=>{for(const p of profiles){const r=spawnSync('git',['-C',path.join(workspace,checkoutFor(p)),'diff','--check','--','README.md','docs/repository-guide.md','docs/assets/repository-cover.svg'],{encoding:'utf8',windowsHide:true});assert.equal(r.status,0,`${p.folder}: ${r.stdout}`);}});
const failures=results.filter(r=>r.result==='fail');
fs.mkdirSync(artifact,{recursive:true});fs.writeFileSync(path.join(artifact,'documentation-tests.json'),JSON.stringify({results,linkCount,coverCount},null,2));console.log(JSON.stringify({checks:results.length,passed:results.length-failures.length,relativeLinks:linkCount,covers:coverCount,failures}));
if(failures.length)process.exitCode=1;
