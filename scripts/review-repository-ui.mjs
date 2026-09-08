import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Local review board only. Original screenshots are never retouched.
const home = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = path.join(home, '.artifacts/repository-presentation-2026-09-08/ui-capture');
const kind = process.argv.includes('--mobile') ? 'mobile' : 'overview';
const names = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : fs.readdirSync(base).filter(n => fs.existsSync(path.join(base,n,kind+'.png')));
const { chromium } = await import(pathToFileURL(path.join(process.env.REPOSITORY_PLAYWRIGHT,'index.mjs')).href);
const browser = await chromium.launch({ executablePath:process.env.REPOSITORY_EDGE, headless:true });
try {
  const page = await browser.newPage({viewport:{width:1440,height:1100},javaScriptEnabled:false});
  await page.route('**/*', route => route.abort());
  for (let start=0; start<names.length; start+=9) {
    const batch=names.slice(start,start+9);
    const html = batch.map(name => `<figure><figcaption>${name}</figcaption><img src="data:image/png;base64,${fs.readFileSync(path.join(base,name,kind+'.png')).toString('base64')}"></figure>`).join('');
    await page.setContent(`<html><style>body{margin:0;padding:12px;background:#20242b;color:white;font:15px Arial;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}figure{margin:0;background:#11161d}figcaption{padding:9px}img{display:block;width:100%;height:300px;object-fit:contain;object-position:top}</style>${html}</html>`);
    await page.screenshot({path:path.join(base,`review-${kind}-${start/9+1}.png`),fullPage:true});
    console.log(JSON.stringify({file:`review-${kind}-${start/9+1}.png`,projects:batch}));
  }
} finally { await browser.close(); }
