import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { profiles, checkoutFor } from './repository-profiles.mjs';
import { firstSection } from './repository-write-guard.mjs';
import { readmeNavigation } from './repository-readme.mjs';
import { uiGalleries } from './repository-ui-gallery.mjs';

const home = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifact = path.join(home, '.artifacts/repository-presentation-2026-09-08');
const read = f => fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
const hash = s => createHash('sha256').update(s).digest('hex');
const baseline = JSON.parse(read(path.join(artifact, 'readme-v3-baseline.json')));
const corrections = JSON.parse(read(path.join(artifact, 'readme-v3-corrections.json')));
const results = [];
const check = (name, fn) => { try { fn(); results.push({ name, pass: true }); } catch (e) { results.push({ name, pass: false, error: e.message }); } };
let links = 0;
for (const p of profiles) {
  const root = path.resolve(home, '..', checkoutFor(p));
  const text = read(path.join(root, 'README.md'));
  check(p.folder + ': current source-backed overview', () => {
    assert(text.includes(readmeNavigation(p, root).trimEnd()));
    assert.equal(text.split('<!-- repository-guide:start -->').length, 2);
    assert.equal(text.split('<!-- repository-guide:end -->').length, 2);
    for (const id of ['readme-start', 'readme-map']) assert(text.includes(`id="${id}"`));
  });
  check(p.folder + ': local README links', () => {
    for (const match of text.matchAll(/!?\[[^\]]*\]\((<[^>]+>|[^)]+)\)/g)) {
      const raw = match[1].replace(/^<|>$/g, '').split(/\s+"/)[0];
      if (/^(https?:|#|mailto:|data:)/i.test(raw)) continue;
      const relative = decodeURIComponent(raw.split('#')[0]);
      const target = path.resolve(root, relative);
      assert(target === root || target.startsWith(root + path.sep), 'Link leaves the repository: ' + relative);
      assert(fs.existsSync(target), 'Missing local link: ' + relative);
      links++;
    }
  });
  check(p.folder + ': technical content preservation or reviewed correction', () => {
    const before = baseline.find(item => item.project === p.folder);
    const correction = corrections.find(item => item.project === p.folder);
    if (correction) assert.equal(correction.beforeBodyHash, before.bodyHash);
    assert.equal(hash(text.slice(firstSection(text))), correction?.afterBodyHash || before.bodyHash, 'Technical text differs from the current task snapshot; review concurrent changes');
  });
  check(p.folder + ': new content has no credential signatures', () => {
    const surface = readmeNavigation(p, root);
    assert(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|ghp_[A-Za-z0-9]{30,}|sk-(?:proj-)?[A-Za-z0-9_-]{40,}|AKIA[A-Z0-9]{16}|[A-Z]:[\\/]/.test(surface));
    assert(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|sk-(?:proj-)?[A-Za-z0-9_-]{40,}|AKIA[A-Z0-9]{16}/.test(text), 'High-confidence credential pattern in README; value omitted');
  });
}
check('InterviewForge: explicit native and credential limitations', () => {
  const text = read(path.join(home, '../InterviewForge/README.md'));
  assert(text.includes('каталога `src-tauri/`'));
  assert(text.includes('Не публикуйте сборку с реальным секретом'));
  assert(!text.includes('**нативное десктопное приложение**'));
  assert(!text.includes('**E2E защита**'));
});
check('AI Setup: no fictional Codex-only CLI flag', () => {
  const text = read(path.join(home, '../ai-setup/README.md'));
  assert(text.includes('нет отдельного Codex-only флага'));
  assert(text.includes('npm run dev -- --help'));
  assert(!text.includes('ANTHROPIC_API_KEY=sk-'));
});

// Optional isolated rendering. Existing runtimes only; no package download.
if (process.env.REPOSITORY_MARKED && process.env.REPOSITORY_PLAYWRIGHT && process.env.REPOSITORY_EDGE) {
  const { marked } = await import(pathToFileURL(process.env.REPOSITORY_MARKED).href);
  const { chromium } = await import(pathToFileURL(path.join(process.env.REPOSITORY_PLAYWRIGHT, 'index.mjs')).href);
  const preview = path.join(artifact, 'readme-preview');
  fs.mkdirSync(preview, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.REPOSITORY_EDGE, headless: true });
  let external = 0;
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, javaScriptEnabled: false });
      await context.route('http://**/*', r => { external++; return r.abort(); });
      await context.route('https://**/*', r => { external++; return r.abort(); });
      const page = await context.newPage();
      for (const p of profiles) {
        const root = path.resolve(home, '..', checkoutFor(p));
        const source = read(path.join(root, 'README.md'));
        let html = marked.parse(source);
        // Embed local images; do not request remote badges, media or fonts.
        html = html.replace(/<img\b[^>]*>/gi, tag => {
          const source = tag.match(/\bsrc="([^"]+)"/)?.[1];
          if (!source || /^(?:[a-z]+:|\/\/)/i.test(source)) return '<span class="remote-media">Внешний бейдж или изображение — не загружается в локальной проверке</span>';
          const file = path.resolve(root, decodeURIComponent(source));
          if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) return '<span class="remote-media">Изображение недоступно в этом checkout</span>';
          const ext = path.extname(file).toLowerCase();
          const mime = { '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.gif':'image/gif' }[ext];
          if (!mime) return '';
          return tag.replace(source, `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`);
        });
        const document = `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; script-src 'none'; connect-src 'none'; frame-src 'none'; form-action 'none'; base-uri 'none'"><title>${p.title} — README</title><style>body{margin:0;background:#0d1117;color:#e6edf3;font:16px/1.55 -apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif}main{max-width:950px;margin:24px auto;padding:36px;border:1px solid #30363d;border-radius:6px;overflow-wrap:anywhere}h1{font-size:32px}h2{font-size:24px}h1,h2{padding-bottom:10px;border-bottom:1px solid #30363d;line-height:1.25;margin-top:24px}h3{font-size:20px}img{max-width:100%;height:auto}a{color:#79c0ff;text-decoration:none}a:hover{text-decoration:underline}table{border-collapse:collapse;display:block;overflow:auto;width:max-content;max-width:100%}td,th{padding:10px 14px;border:1px solid #30363d;text-align:left}tr:nth-child(2n){background:#161b22}pre{padding:16px;background:#161b22;overflow:auto;border-radius:6px}code{font:13px/1.5 Consolas,monospace;background:#161b22;padding:2px 4px}pre code{padding:0}blockquote{margin:16px 0;padding:0 16px;color:#abb6c5;border-left:4px solid #506d92}details{margin:20px 0}summary{cursor:pointer}.remote-media{font-size:11px;color:#8b949e}li{margin:4px 0}@media(max-width:600px){main{margin:0;padding:20px 16px;border:0}h1{font-size:27px}h2{font-size:22px}td,th{padding:8px}}</style><main>${html}</main></html>`;
        if (width === 1440) fs.writeFileSync(path.join(preview, p.folder + '.html'), document);
        await page.setContent(document, { waitUntil: 'load' });
        const layout = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, routes: document.querySelectorAll('li a').length, disclosure: !!document.querySelector('details summary'), target: !!document.getElementById('readme-start') }));
        check(p.folder + ': Markdown render ' + width, () => { assert(layout.scroll <= layout.width + 1, `Horizontal page overflow: ${layout.scroll}/${layout.width}`); assert(layout.routes >= 3); assert(layout.disclosure); assert(layout.target); });
        if (uiGalleries[p.folder]) {
          const decoded = await page.locator('img').evaluateAll(imgs => imgs.every(img => img.complete && img.naturalWidth > 0));
          check(p.folder + ': gallery images decoded ' + width, () => assert(decoded));
          if (uiGalleries[p.folder].mobile) {
            const summary = page.locator('summary').filter({hasText:'Мобильный экран · 390 px'});
            await summary.focus();
            await page.keyboard.press('Enter');
            const expanded = await summary.evaluate(el => ({open:el.parentElement.open,scroll:document.documentElement.scrollWidth,width:innerWidth}));
            check(p.folder + ': keyboard mobile disclosure ' + width, () => { assert(expanded.open); assert(expanded.scroll <= expanded.width+1); });
            await page.keyboard.press('Enter');
            await page.evaluate(() => window.scrollTo(0,0));
          }
        }
        if (['EclipseForgeLanding', 'eclipse-media', 'InterviewForge', 'eclipse-connect'].includes(p.folder)) await page.screenshot({ path: path.join(artifact, `readme-v3-${p.folder}-${width}.png`) });
      }
      await context.close();
    }
    check('README rendering: no external network requests', () => assert.equal(external, 0));
  } finally { await browser.close(); }
}
const failures = results.filter(r => !r.pass);
fs.writeFileSync(path.join(artifact, 'readme-v3-tests.json'), JSON.stringify({ checks: results.length, links, failures, results }, null, 2));
console.log(JSON.stringify({ checks: results.length, passed: results.length - failures.length, links, failures }));
if (failures.length) process.exitCode = 1;
