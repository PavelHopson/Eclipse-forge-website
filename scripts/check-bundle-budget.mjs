import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const assetsDirectory = resolve('dist', 'assets');
const maxChunkBytes = 500 * 1024;
const entries = await readdir(assetsDirectory);
const javascriptAssets = entries.filter((entry) => entry.endsWith('.js'));
if (javascriptAssets.length === 0) throw new Error('Bundle budget check: no JavaScript chunks.');

const chunks = await Promise.all(javascriptAssets.map(async (entry) => ({ entry, size: (await stat(resolve(assetsDirectory, entry))).size })));
const oversized = chunks.filter((chunk) => chunk.size > maxChunkBytes);
const summary = chunks.sort((left, right) => right.size - left.size).map((chunk) => `${chunk.entry}: ${(chunk.size / 1024).toFixed(1)} KiB`).join('\n');
if (oversized.length > 0) throw new Error(`Bundle budget exceeded (500 KiB per JavaScript chunk):\n${summary}`);
console.log(`Bundle budget passed (500 KiB per JavaScript chunk):\n${summary}`);
