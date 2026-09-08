import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { profiles, checkoutFor } from './repository-profiles.mjs';

const home = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifact = path.join(home, '.artifacts/repository-presentation-2026-09-08/ui-capture');
const roots = { 'eclipse-chat':'apps/web', 'eclipse-hopson-sentinel':'dashboard', 'eclipse-media':'frontend', 'task-manager':'frontend', 'eclipse-library':'web' };
const excluded = new Set(['Eclipse-webclaw','eclipse-connect','ai-setup','retry-http','AdService','KmlApiApp','wireguard-telegram-bot','business-data-platform-mvp','finflow','Smart Life Assistant']);
const hash = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const json = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));
const child = process.argv.indexOf('--project');
if (child < 0) {
  fs.mkdirSync(artifact, { recursive: true });
  const selected = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : profiles.filter(p => !excluded.has(p.folder)).map(p => p.folder);
  const results = [];
  // No inherited provider keys or VITE_* variables. No application .env files are loaded.
  const environment = Object.fromEntries(['PATH','Path','SystemRoot','WINDIR','TEMP','TMP','COMSPEC','PATHEXT','LOCALAPPDATA','APPDATA','USERPROFILE','HOMEDRIVE','HOMEPATH','REPOSITORY_PLAYWRIGHT','REPOSITORY_EDGE'].filter(k => process.env[k]).map(k => [k, process.env[k]]));
  for (const name of selected) {
    if (!profiles.some(p => p.folder === name) || excluded.has(name)) throw new Error('Project is not an allowed web preview');
    console.log('Capturing ' + name);
    const startedAt = Date.now();
    const code = await new Promise(resolve => {
      const worker = spawn(process.execPath, [fileURLToPath(import.meta.url), '--project', name], { cwd: home, env: environment, windowsHide: true, stdio: ['ignore','pipe','pipe'] });
      let log = '';
      worker.stdout.on('data', b => { log = (log + b).slice(-12000); });
      worker.stderr.on('data', b => { log = (log + b).slice(-12000); });
      const timeout = setTimeout(() => worker.kill(), 90000);
      worker.on('close', code => { clearTimeout(timeout); fs.writeFileSync(path.join(artifact, name + '.log'), log); resolve(code); });
    });
    const resultFile = path.join(artifact, name, 'capture.json');
    const result = fs.existsSync(resultFile) && fs.statSync(resultFile).mtimeMs >= startedAt ? JSON.parse(fs.readFileSync(resultFile)) : { project:name, result:'failed', exitCode:code };
    results.push(result);
    console.log(JSON.stringify({ project:name, result:result.result, screens:result.screens?.length || 0, errors:result.errors?.slice(0,2) || [] }));
    json(path.join(artifact, 'batch-latest.json'), results);
  }
  process.exit(results.some(r => r.result === 'failed') ? 1 : 0);
}

const name = process.argv[child + 1];
const profile = profiles.find(p => p.folder === name);
if (!profile || excluded.has(name)) throw new Error('Unknown preview project');
const root = path.resolve(home, '..', checkoutFor(profile));
const front = path.resolve(root, roots[name] || '.');
const output = path.join(artifact, name);
fs.mkdirSync(output, { recursive: true });
// Tailwind/PostCSS resolve content globs against cwd, not only Vite's root.
process.chdir(front);
const record = { project:name, capturedAt:new Date().toISOString(), method:'isolated-local-source-preview', environment:'No .env; no inherited provider keys; fresh browser storage; APIs and external resources blocked', source:[], screens:[], errors:[], blocked:[], result:'failed' };
for (const rel of ['index.html','package.json','src/main.tsx','index.tsx']) {
  const file = path.join(front, rel);
  if (fs.existsSync(file)) record.source.push({ file:path.relative(root,file).replaceAll('\\','/'), sha256:hash(file) });
}
record.head = spawnSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8',windowsHide:true}).stdout.trim();
record.dirty = !!spawnSync('git',['-C',root,'status','--short'],{encoding:'utf8',windowsHide:true}).stdout.trim();
let server, browser;
try {
  const entry = fs.readFileSync(path.join(front, 'index.html'), 'utf8');
  if (/cdn\.tailwindcss\.com/.test(entry)) throw new Error('UI requires remote Tailwind script; offline screenshot would be inaccurate');
  const staticOnly = ['eclipse-library','zefir-gift-landing','dark_roast_coffee'].includes(name);
  if (staticOnly) {
    const mime = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.woff':'font/woff','.mp4':'video/mp4' };
    server = http.createServer((req,res) => {
      let target;
      try { target = path.resolve(front, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); } catch { res.writeHead(400).end(); return; }
      if (req.method !== 'GET' || !target.startsWith(front + path.sep) && target !== front || /(?:^|[\\/])\.[^\\/]/.test(path.relative(front,target))) { res.writeHead(403).end(); return; }
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target,'index.html');
      const type = mime[path.extname(target).toLowerCase()];
      if (!type || !fs.existsSync(target) || fs.statSync(target).size > 24000000) { res.writeHead(404).end(); return; }
      res.writeHead(200, {'Content-Type':type}); fs.createReadStream(target).pipe(res);
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  } else {
    const require = createRequire(path.join(front,'package.json'));
    const viteFile = require.resolve('vite/package.json');
    const { createServer } = await import(pathToFileURL(path.join(path.dirname(viteFile),'dist/node/index.js')).href);
    const deps = JSON.parse(fs.readFileSync(path.join(front,'package.json')));
    const plugins = [];
    if (deps.devDependencies?.['@tailwindcss/vite'] || deps.dependencies?.['@tailwindcss/vite']) {
      const plugin = await import(pathToFileURL(require.resolve('@tailwindcss/vite')).href); plugins.push(plugin.default());
    }
    server = await createServer({ root:front, configFile:false, envFile:false, mode:'readme-preview', base:'/', logLevel:'error', cacheDir:path.join(output,'vite-cache'), plugins, esbuild:{jsx:'automatic'}, define:{'process.env.API_KEY':'""','process.env.GEMINI_API_KEY':'""'}, resolve:{alias:{'@':fs.existsSync(path.join(front,'src'))?path.join(front,'src'):front}}, server:{host:'127.0.0.1',port:0,strictPort:false,open:false,hmr:false,proxy:{},fs:{strict:true,allow:[root, output]},watch:{ignored:['**/.artifacts/**','**/docs/**']}} });
    await server.listen();
  }
  const port = (server.httpServer || server).address().port;
  const origin = 'http://127.0.0.1:' + port;
  const { chromium } = await import(pathToFileURL(path.join(process.env.REPOSITORY_PLAYWRIGHT,'index.mjs')).href);
  browser = await chromium.launch({ executablePath:process.env.REPOSITORY_EDGE, headless:true });
  for (const [kind,width,height] of [['overview',1440,900],['mobile',390,844]]) {
    const context = await browser.newContext({ viewport:{width,height}, reducedMotion:'reduce', serviceWorkers:'block', acceptDownloads:false, permissions:[] });
    await context.route('**/*', route => {
      const request = route.request();
      const url = new URL(request.url());
      const localStaticFetch = /\.(?:js|mjs|ts|tsx|jsx|css|json|svg|woff2?|webp|png|jpe?g)$/i.test(url.pathname) || /^\/@(?:vite|id)\//.test(url.pathname);
      if (url.origin !== origin || !['GET','HEAD'].includes(request.method()) || /^\/(api|socket\.io|graphql)(\/|\?|$)/i.test(url.pathname) || /(?:^|\/)\.env/i.test(url.pathname) || request.resourceType() === 'websocket' || ['fetch','xhr'].includes(request.resourceType()) && !localStaticFetch) {
        const key = url.origin === origin ? 'local-api-or-nonstatic' : url.hostname;
        if (!record.blocked.includes(key)) record.blocked.push(key);
        return route.abort();
      }
      return route.continue();
    });
    if (context.routeWebSocket) await context.routeWebSocket('**/*', socket => socket.close());
    const page = await context.newPage();
    record.httpFailures ||= [];
    page.on('response', response => {
      const url = new URL(response.url());
      if (url.origin === origin && response.status() >= 400 && record.httpFailures.length < 12) record.httpFailures.push({path:url.pathname.replaceAll(root.replaceAll('\\','/'),'<repo>'),status:response.status()});
    });
    page.on('pageerror', error => { if (record.errors.length < 8) record.errors.push(String(error.message).replaceAll(root,'<repo>')); });
    await page.goto(origin + (name === 'dark_roast_coffee' ? '/pages/homepage.html' : '/'), {waitUntil:'commit',timeout:25000});
    await page.waitForFunction(() => document.body && document.body.innerText.trim().length > 40, {timeout:30000}).catch(() => {});
    await page.waitForTimeout(2500);
    await page.evaluate(() => document.fonts.ready);
    if (name === 'eclipse-hopson-sentinel') {
      const dismiss = page.getByRole('button', {name:'Понятно, начать работу',exact:true});
      if (await dismiss.count()) { await dismiss.click(); await page.waitForTimeout(400); }
    }
    if (name === 'VALHALLA') {
      const dismiss = page.getByRole('button', {name:'GOT IT',exact:true});
      if (await dismiss.count()) { await dismiss.click(); await page.waitForTimeout(400); }
    }
    const body = await page.locator('body').innerText();
    record[kind + 'Text'] = body.slice(0,3200);
    if (body.trim().length < 40 || await page.locator('vite-error-overlay').count()) throw new Error('UI did not render a usable local screen');
    if (/ghp_[A-Za-z0-9]{30,}|sk-(?:proj-)?[A-Za-z0-9_-]{40,}|BEGIN [A-Z ]*PRIVATE KEY/.test(body)) throw new Error('Credential pattern on screen; capture rejected');
    const file = path.join(output,kind+'.png');
    await page.screenshot({path:file,animations:'disabled'});
    record.screens.push({ kind,file:kind+'.png',width,height,sha256:hash(file),bytes:fs.statSync(file).size });
    await context.close();
  }
  record.result = 'captured-needs-visual-review';
} catch(error) { record.errors.push(String(error.message).replaceAll(root,'<repo>')); }
finally {
  if (browser) await browser.close();
  if (server) await new Promise(resolve => { if (server.httpServer) server.close().then(resolve); else server.close(resolve); });
  json(path.join(output,'capture.json'),record);
}
console.log(JSON.stringify({project:name,result:record.result,screens:record.screens.length}));
process.exit(record.result === 'failed' ? 1 : 0);
