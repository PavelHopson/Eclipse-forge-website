import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const canonicalUrl = 'https://eclipse-forge.ru/';

const read = (path) => readFile(new URL(path, root), 'utf8');

test('robots.txt allows crawling and declares the canonical sitemap', async () => {
  const robots = await read('public/robots.txt');

  assert.match(robots, /^User-agent: \*/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Sitemap: https:\/\/eclipse-forge\.ru\/sitemap\.xml$/m);
});

test('sitemap contains only absolute canonical URLs', async () => {
  const sitemap = await read('public/sitemap.xml');
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

  assert.deepEqual(locations, [canonicalUrl]);
  assert.match(sitemap, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
});

test('llms.txt identifies the brand and evidence boundary', async () => {
  const llms = await read('public/llms.txt');

  assert.match(llms, /# Eclipse Forge/);
  assert.match(llms, /https:\/\/github\.com\/PavelHopson/);
  assert.match(llms, /Do not infer customers, revenue, testimonials/);
});

test('document head exposes canonical, social and structured metadata', async () => {
  const html = await read('index.html');

  assert.match(html, /<link rel="canonical" href="https:\/\/eclipse-forge\.ru\/" \/>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/eclipse-forge\.ru\/" \/>/);
  assert.match(html, /<meta property="og:image" content="https:\/\/eclipse-forge\.ru\/og-image\.svg" \/>/);
  assert.match(html, /<meta name="twitter:image" content="https:\/\/eclipse-forge\.ru\/og-image\.svg" \/>/);

  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(jsonLdMatch, 'JSON-LD must be present');

  const jsonLd = JSON.parse(jsonLdMatch[1]);
  assert.equal(jsonLd['@context'], 'https://schema.org');
  assert.ok(jsonLd['@graph'].some((entry) => entry['@type'] === 'WebSite'));
  assert.ok(jsonLd['@graph'].some((entry) => entry['@type'] === 'Person'));
});
