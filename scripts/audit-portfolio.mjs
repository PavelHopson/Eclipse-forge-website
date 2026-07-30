import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const defaultRoot = resolve(scriptDir, '..', '..');
const args = process.argv.slice(2);

const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};

const root = resolve(valueAfter('--root') ?? defaultRoot);
const output = valueAfter('--output');
const ignoredDirectories = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage', 'target', 'vendor', '.next']);
const testPattern = /(?:^|[\\/])(?:tests?|__tests__)(?:[\\/])|\.(?:test|spec)\.[cm]?[jt]sx?$|_test\.py$|test_.*\.py$/i;

const runGit = (repository, parameters) => {
  const result = spawnSync('git', ['-C', repository, ...parameters], {
    encoding: 'utf8',
    windowsHide: true,
  });
  return result.status === 0 ? result.stdout.trim() : '';
};

const hasTestFile = (directory) => {
  const queue = [directory];
  while (queue.length > 0) {
    const current = queue.shift();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!ignoredDirectories.has(entry.name)) queue.push(join(current, entry.name));
        continue;
      }
      if (testPattern.test(join(current, entry.name))) return true;
    }
  }
  return false;
};

const repositories = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(root, entry.name, '.git')))
  .map((entry) => {
    const repository = join(root, entry.name);
    const lastCommit = runGit(repository, ['log', '-1', '--format=%cs']);
    const dirtyLines = runGit(repository, ['status', '--porcelain']).split(/\r?\n/).filter(Boolean);
    const workflowDirectory = join(repository, '.github', 'workflows');
    const workflowCount = existsSync(workflowDirectory)
      ? readdirSync(workflowDirectory).filter((name) => /\.ya?ml$/i.test(name)).length
      : 0;
    const hasLicense = readdirSync(repository).some((name) => /^LICENSE(?:\.|$)/i.test(name));
    const hasReadme = existsSync(join(repository, 'README.md'));
    const hasRoadmap = existsSync(join(repository, 'ROADMAP.md'));
    const tests = hasTestFile(repository);
    const ageDays = lastCommit
      ? Math.floor((Date.now() - new Date(`${lastCommit}T00:00:00Z`).getTime()) / 86_400_000)
      : 9999;

    let score = 100;
    if (!hasReadme) score -= 15;
    if (!hasLicense) score -= 10;
    if (workflowCount === 0) score -= 15;
    if (!tests) score -= 20;
    if (dirtyLines.length > 0) score -= 15;
    if (ageDays > 90) score -= 20;
    else if (ageDays > 30) score -= 10;

    return {
      name: entry.name,
      branch: runGit(repository, ['branch', '--show-current']) || 'detached',
      lastCommit: lastCommit || 'none',
      dirty: dirtyLines.length,
      workflowCount,
      tests,
      hasLicense,
      hasReadme,
      hasRoadmap,
      score: Math.max(0, score),
    };
  })
  .sort((left, right) => right.score - left.score || left.name.localeCompare(right.name));

const stateFor = (score) => {
  if (score >= 85) return 'healthy';
  if (score >= 65) return 'attention';
  return 'at-risk';
};

const dirtyCount = repositories.filter((repository) => repository.dirty > 0).length;
const missingLicenseCount = repositories.filter((repository) => !repository.hasLicense).length;
const missingWorkflowCount = repositories.filter((repository) => repository.workflowCount === 0).length;
const secretPathCount = [
  join(root, 'Ключи', '.env'),
  join(root, 'О проекте', '.env'),
  join(root, 'О проекте', 'Ключ прод.txt'),
  join(root, 'О проекте', 'openAI code.txt'),
].filter(existsSync).length;

const lines = [
  '# Portfolio health report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  `Repositories: **${repositories.length}** | Dirty: **${dirtyCount}** | Missing license: **${missingLicenseCount}** | Missing CI: **${missingWorkflowCount}**`,
  '',
  `Sensitive path indicators found outside repositories: **${secretPathCount}**. Values were not read.`,
  '',
  '> The score is a triage signal, not a product-quality verdict. It rewards a clean tree, recent work, CI, tests, README and an explicit license.',
  '',
  '| Repository | Score | State | Branch | Last commit | Dirty | CI | Tests | License | Roadmap |',
  '|---|---:|---|---|---|---:|---:|---|---|---|',
  ...repositories.map((repository) =>
    `| ${repository.name} | ${repository.score} | ${stateFor(repository.score)} | ${repository.branch} | ${repository.lastCommit} | ${repository.dirty} | ${repository.workflowCount} | ${repository.tests ? 'yes' : 'no'} | ${repository.hasLicense ? 'yes' : 'no'} | ${repository.hasRoadmap ? 'yes' : 'no'} |`
  ),
  '',
  '## Required interpretation',
  '',
  '- Dirty repositories require manual authorship review; never bulk-commit them.',
  '- Missing license requires an owner decision; do not add an open-source license automatically.',
  '- A workflow file is not proof that the latest run passed.',
  '- A test filename is not proof of meaningful coverage.',
  '- Sensitive path indicators are handled through the security runbook without printing their contents.',
  '',
];

const report = lines.join('\n');
if (output) {
  const outputPath = resolve(output);
  writeFileSync(outputPath, report, 'utf8');
  console.log(`Portfolio report written to ${outputPath}`);
} else {
  console.log(report);
}
