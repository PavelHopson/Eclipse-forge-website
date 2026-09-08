import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { profiles, checkoutFor, preserveIntro } from './repository-profiles.mjs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require=createRequire(import.meta.url);
if(!process.env.REPOSITORY_PLAYWRIGHT||!process.env.REPOSITORY_EDGE)throw new Error('Set existing REPOSITORY_PLAYWRIGHT and REPOSITORY_EDGE paths; no downloads are performed');
const {chromium}=require(process.env.REPOSITORY_PLAYWRIGHT);
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'), folder=path.join(home,'docs/portfolio'), artifact=path.join(home,'.artifacts/repository-presentation-2026-09-08');
const allowed=new Map([['/','index.html'],['/index.html','index.html'],['/catalog.js','catalog.js'],['/portfolio.js','portfolio.js'],['/portfolio.css','portfolio.css']]);
const server=http.createServer((req,res)=>{const name=allowed.get(new URL(req.url,'http://localhost').pathname);if(!name){res.writeHead(req.url==='/favicon.ico'?204:404);res.end();return;}res.setHeader('Content-Type',name.endsWith('.html')?'text/html; charset=utf-8':name.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8');res.end(fs.readFileSync(path.join(folder,name)));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.REPOSITORY_EDGE,headless:true});
const results=[],errors=[],external=[];let failed=null;
const contextData={window:{}};vm.runInNewContext(fs.readFileSync(path.join(folder,'catalog.js'),'utf8'),contextData);const data=JSON.parse(JSON.stringify(contextData.window.REPOSITORY_CATALOG));
const record=(name)=>results.push({name,result:'pass'});
async function pageFor(viewport, options={}){
 const context=await browser.newContext({viewport,reducedMotion:options.reduced?'reduce':'no-preference'});const page=await context.newPage();
 page.on('pageerror',e=>errors.push(String(e)));page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('file:'))external.push(r.url());});
 await page.addInitScript(({deny})=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async s=>{if(deny)throw new Error('Denied test fixture');window.__copied=s;}}}),{deny:options.deny||false});
 if(options.init) await page.addInitScript(options.init);
 if(options.catalog) await page.route('**/catalog.js',r=>r.fulfill({contentType:'text/javascript',body:options.catalog}));
 await page.goto(base+(options.hash||''),{waitUntil:'networkidle'});return {page,context};
}
try{
 for(const width of [1440,768,390,320]){
  const {page,context}=await pageFor({width,height:900});
  await page.waitForSelector('.project-row');assert.equal(await page.locator('.project-row').count(),36);assert(await page.locator('#reset').isDisabled());record(`${width}: initial list and disabled reset`);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));record(`${width}: no page overflow`);
  await page.locator('[data-group="creative"]').click();assert.equal(await page.locator('.project-row').count(),6);record(`${width}: category filter`);
  await page.locator('#search').fill('Несуществующий проект');assert(await page.locator('#empty').isVisible());await page.locator('#empty-reset').click();assert.equal(await page.locator('.project-row').count(),36);record(`${width}: empty state and reset`);
  await page.locator('#search').fill('медиа');assert(await page.locator('.project-row').count()>0);await page.locator('[data-project="eclipse-media"]').click();assert(await page.locator('#detail').isVisible());assert.equal(await page.locator('#detail-title').innerText(),'Eclipse Media');assert.equal(await page.locator('#flow li').count(),3);record(`${width}: search and detail`);
  assert(await page.locator('#detail').evaluate(el=>el.scrollWidth<=el.clientWidth+1));record(`${width}: dialog overflow`);
  await page.locator('#copy').click();await page.waitForFunction(()=>document.querySelector('#copy-status').textContent.includes('скопировано'));assert((await page.evaluate(()=>window.__copied)).includes('Eclipse Media'));record(`${width}: copy success`);
  await page.locator('summary').first().click();assert(await page.locator('#files').isVisible());record(`${width}: expandable source map`);
  await page.keyboard.press('Escape');assert(!(await page.locator('#detail').isVisible()));assert.equal(await page.evaluate(()=>document.activeElement?.dataset.project),'eclipse-media');record(`${width}: Escape and focus return`);
  await page.locator('#reset').click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(artifact,`portfolio-${width}.png`),fullPage:false});
  await context.close();
 }
 {
  const {page,context}=await pageFor({width:1440,height:900},{reduced:true});
  for(const p of data){const button=page.locator(`[data-project="${p.folder}"]`);await button.click();assert.equal(await page.locator('#detail-title').innerText(),p.title);assert.equal(await page.locator('#repository').isVisible(),Boolean(p.repository));await page.locator('#close').click();}record('All 36 projects: content and correct local/GitHub state');
  const row=page.locator('[data-project="shotforge"]');await row.scrollIntoViewIfNeeded();await row.focus();const y=await page.evaluate(()=>scrollY);await page.keyboard.press('Enter');await page.keyboard.press('Escape');assert(Math.abs((await page.evaluate(()=>scrollY))-y)<2);assert.equal(await page.evaluate(()=>document.activeElement.dataset.project),'shotforge');record('Keyboard open/close preserves list scroll');
  assert.equal(await page.locator('.project-row').first().evaluate(el=>getComputedStyle(el).transitionDuration),'0s');record('Reduced motion: no transitions');
  await page.locator('[data-project="EclipseForgeLanding"]').click();await page.screenshot({path:path.join(artifact,'portfolio-detail-desktop.png')});await context.close();
 }
 {
  const {page,context}=await pageFor({width:320,height:800},{deny:true});await page.locator('[data-project="eclipse-connect"]').click();await page.locator('#copy').click();await page.waitForFunction(()=>document.querySelector('#copy-status').textContent.includes('не разрешил'));assert(!(await page.locator('#copy').isDisabled()));record('Copy denial: visible error and retry');await page.screenshot({path:path.join(artifact,'portfolio-detail-mobile.png')});await context.close();
 }
 {
  const hostile=structuredClone(data);hostile[0].title='<img src=x onerror=alert(1)>';const {page,context}=await pageFor({width:1440,height:900},{catalog:'window.REPOSITORY_CATALOG='+JSON.stringify(hostile)});await page.locator('.project-row').first().click();assert.equal(await page.locator('#detail-title').innerText(),hostile[0].title);assert.equal(await page.locator('#detail-title img').count(),0);record('Untrusted text is rendered as text, not HTML');await context.close();
 }
 for(const fixture of ['window.REPOSITORY_CATALOG = null','window.REPOSITORY_CATALOG = '+JSON.stringify([{...data[0],repository:'javascript:alert(1)'}])]){
  const {page,context}=await pageFor({width:390,height:800},{catalog:fixture});assert(await page.locator('#error').isVisible());assert(await page.locator('#search').isDisabled());assert.equal(await page.locator('.project-row').count(),0);record('Malformed data/unsafe link fails closed');await context.close();
 }
 for(const width of [1440,390]){
  const {page,context}=await pageFor({width,height:900});
  await page.locator('[data-group="business"]').click();await page.locator('#search').fill('аренда');
  await page.locator('[data-project="RentKldRedesign"]').click();
  let params=new URLSearchParams(new URL(page.url()).hash.slice(1));assert.equal(params.get('p'),'RentKldRedesign');assert.equal(params.get('g'),'business');assert.equal(params.get('q'),'аренда');
  await page.reload({waitUntil:'networkidle'});assert(await page.locator('#detail').isVisible());assert.equal(await page.locator('#search').inputValue(),'аренда');
  await page.locator('#close').click();await page.waitForFunction(()=>!document.querySelector('#detail').open);
  assert(page.url().startsWith(base));assert.equal(new URLSearchParams(new URL(page.url()).hash.slice(1)).get('p'),null);assert.equal(await page.locator('#search').inputValue(),'аренда');
  record(width+': reload deep link; close stays on catalog with filters');await context.close();
 }
 {
  const {page,context}=await pageFor({width:1440,height:900});
  const row=page.locator('[data-project="ModelForge"]');await row.scrollIntoViewIfNeeded();const y=await page.evaluate(()=>scrollY);await row.click();
  await page.goBack();await page.waitForFunction(()=>!document.querySelector('#detail').open);assert(Math.abs((await page.evaluate(()=>scrollY))-y)<3);
  await page.goForward();await page.waitForFunction(()=>document.querySelector('#detail').open);assert.equal(await page.locator('#detail-title').innerText(),'ModelForge');
  await page.locator('#close').click();await page.waitForFunction(()=>!document.querySelector('#detail').open);assert.equal(await page.evaluate(()=>document.activeElement.dataset.project),'ModelForge');
  record('Back/Forward restore project, list scroll and focus');await context.close();
 }
 {
  const hash='#'+new URLSearchParams({p:'eclipse-media',g:'creative',q:'личный черновик'});
  const {page,context}=await pageFor({width:1440,height:900},{hash});
  assert(await page.locator('#detail').isVisible());await page.locator('#copy-link').click();await page.waitForFunction(()=>Boolean(window.__copied));
  const url=new URL(await page.evaluate(()=>window.__copied));const params=new URLSearchParams(url.hash.slice(1));assert.equal(params.get('p'),'eclipse-media');assert.equal(params.get('q'),null);assert.equal(params.get('g'),null);assert.equal(url.search,'');
  assert((await page.locator('#copy-status').innerText()).includes('на этом компьютере'));record('Share link excludes search/filter data and explains local scope');
  assert.equal(await page.locator('#start-command').innerText(),'npm run dev');assert((await page.locator('#start-dir').innerText()).includes('frontend'));
  await page.locator('#copy-start').click();await page.waitForFunction(()=>document.querySelector('#start-copy-status').textContent.includes('скопирована'));assert.equal(await page.evaluate(()=>window.__copied),'npm run dev');record('First step: declared frontend command copied, not executed');
  await page.screenshot({path:path.join(artifact,'portfolio-v2-detail-desktop.png')});await context.close();
 }
 {
  const {page,context}=await pageFor({width:390,height:850},{hash:'#p=KmlApiApp'});assert(await page.locator('#start-command-block').isHidden());assert((await page.locator('#start-title').innerText()).includes('.NET'));record('Non-Node project does not get an invented npm command');
  await page.locator('.start-plan').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(artifact,'portfolio-v2-detail-mobile.png')});await context.close();
 }
 {
  const {page,context}=await pageFor({width:390,height:850},{hash:'#p=%3Cimg%20src=x%20onerror=alert(1)%3E&g=unknown&q='+encodeURIComponent('x'.repeat(170))});
  assert(await page.locator('#route-status').isVisible());assert(!(await page.locator('#detail').isVisible()));assert.equal((await page.locator('#search').inputValue()).length,160);assert.equal(await page.locator('#route-status img').count(),0);record('Unknown route, bounded query and URL HTML are handled safely');await context.close();
 }
 {
  const {page,context}=await pageFor({width:390,height:850},{hash:'#q='+('x'.repeat(3000))});assert.equal(await page.locator('.project-row').count(),36);assert(await page.locator('#route-status').isVisible());record('Oversized fragment falls back to catalog');await context.close();
 }
 {
  const {page,context}=await pageFor({width:1440,height:900},{init:()=>{
   history.pushState=()=>{throw new DOMException('Blocked fixture','SecurityError');};history.replaceState=history.pushState;
  }});
  await page.locator('[data-group="creative"]').click();assert.equal(await page.locator('.project-row').count(),6);await page.locator('[data-project="eclipse-media"]').click();await page.locator('#close').click();await page.waitForFunction(()=>!document.querySelector('#detail').open);assert(await page.locator('#route-status').isVisible());record('Restricted History API preserves usable search and dialog');await context.close();
 }
 {
  const {page,context}=await pageFor({width:1440,height:900});
  await page.evaluate(()=>{navigator.clipboard.writeText=value=>new Promise(resolve=>{window.__finishCopy=()=>{window.__copied=value;resolve();};});});
  await page.locator('[data-project="eclipse-media"]').click();await page.locator('#copy').click();assert(await page.locator('#copy').isDisabled());
  await page.locator('#close').click();await page.waitForFunction(()=>!document.querySelector('#detail').open);await page.locator('[data-project="eclipse-media"]').click();
  await page.evaluate(()=>window.__finishCopy());await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(resolve)));
  assert.equal(await page.locator('#copy-status').innerText(),'');assert(!(await page.locator('#copy').isDisabled()));record('Late clipboard completion cannot update a reopened panel');await context.close();
 }
 {
  const fixture=structuredClone(data);fixture[0].commands[0].command='npm run dev && unexpected-command';
  const {page,context}=await pageFor({width:390,height:850},{catalog:'window.REPOSITORY_CATALOG='+JSON.stringify(fixture)});assert(await page.locator('#error').isVisible());assert.equal(await page.locator('.project-row').count(),0);record('Non-declared shell payload in copyable command fails closed');await context.close();
 }
 {
  const {page,context}=await pageFor({width:320,height:850},{hash:'#g=engineering&q=api'});
  await page.locator('.skip').focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'projects');assert.equal(await page.locator('#search').inputValue(),'api');
  const tooSmall=await page.locator('button').evaluateAll(buttons=>buttons.filter(button=>button.getClientRects().length && button.getBoundingClientRect().height<43.9).map(button=>button.id||button.textContent));assert.deepEqual(tooSmall,[]);record('Skip link preserves filters; visible touch controls are at least 44px');await context.close();
 }
 // Real file:// launch verifies that this artifact does not require a local server.
 {
  const context=await browser.newContext({viewport:{width:1200,height:800}}),page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));const url=new URL('file:///'+path.join(folder,'index.html').replaceAll('\\','/'));url.hash='p=Smart+Life+Assistant';await page.goto(url.href);await page.waitForSelector('.project-row');assert.equal(await page.locator('.project-row').count(),36);assert.equal(await page.locator('#detail-title').innerText(),'Smart Life Assistant');await page.locator('#close').click();assert(!(await page.locator('#detail').isVisible()));record('file:// direct project link without installation or server');await context.close();
 }
 {
  const context=await browser.newContext({viewport:{width:1200,height:360}}),page=await context.newPage();
  for(const p of profiles.filter(p=>!preserveIntro.has(p.folder))){
   const svg=path.join(path.dirname(home),checkoutFor(p),'docs/assets/repository-cover.svg');await page.goto(new URL('file:///'+svg.replaceAll('\\','/')).href);
   const overflow=await page.locator('svg text').evaluateAll(nodes=>nodes.filter(n=>{const b=n.getBBox();return b.x<0||b.y<0||b.x+b.width>1200||b.y+b.height>360;}).map(n=>n.textContent));assert.deepEqual(overflow,[],`${p.title}: cover overflow`);
   if(p.folder==='EclipseForgeLanding')await page.screenshot({path:path.join(artifact,'readme-cover.png')});
  }record('30 SVG covers: actual text geometry fits the viewBox');await context.close();
 }
 assert.equal(errors.length,0);assert.equal(external.length,0);record('Zero page errors and external requests');
}catch(error){failed=String(error.stack||error);process.exitCode=1;}finally{await browser.close();await new Promise(r=>server.close(r));fs.writeFileSync(path.join(artifact,'browser-tests.json'),JSON.stringify({results,errors,external,failed},null,2));console.log(JSON.stringify({checks:results.length,errors,external,failed}));}
