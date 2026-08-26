import { access, readFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contractPath = resolve(repositoryRoot, 'public/design-system/eclipse-forge.design-gate.json');
const evidencePath = resolve(repositoryRoot, 'docs/eclipse-forge-os/design/evidence/eclipse-forge-landing.json');
const errors = [];

const contract = JSON.parse(await readFile(contractPath, 'utf8'));
const evidence = JSON.parse(await readFile(evidencePath, 'utf8'));

const requireString = (value, path) => {
  if (typeof value !== 'string' || value.trim() === '') errors.push(`${path} must be a non-empty string`);
};

if (contract.schemaVersion !== 'eclipse-forge.design-gate.v1') {
  errors.push('contract.schemaVersion must be eclipse-forge.design-gate.v1');
}
if (contract.visualSystemVersion !== 'eclipse-forge.visual-system.v1') {
  errors.push('contract.visualSystemVersion must reference the current visual system');
}

const profiles = new Set(Object.keys(contract.profiles ?? {}));
for (const profile of ['cinematic', 'product', 'operational']) {
  if (!profiles.has(profile)) errors.push(`contract.profiles must include ${profile}`);
}

const requiredChecks = contract.requiredChecks ?? [];
const requiredCheckIds = new Set(requiredChecks.map((check) => check.id));
if (requiredChecks.length !== requiredCheckIds.size) errors.push('contract.requiredChecks ids must be unique');
for (const check of requiredChecks) {
  requireString(check.id, 'contract.requiredChecks[].id');
  requireString(check.label, `contract.requiredChecks.${check.id}.label`);
}

const signals = contract.antiSlopSignals ?? [];
const signalIds = new Set(signals.map((signal) => signal.id));
if (signals.length !== 25) errors.push(`contract.antiSlopSignals must contain 25 items, found ${signals.length}`);
if (signalIds.size !== signals.length) errors.push('contract.antiSlopSignals ids must be unique');
for (let number = 1; number <= 25; number += 1) {
  const id = `AS-${String(number).padStart(2, '0')}`;
  if (!signalIds.has(id)) errors.push(`contract.antiSlopSignals is missing ${id}`);
}
for (const signal of signals) {
  requireString(signal.category, `${signal.id}.category`);
  requireString(signal.signal, `${signal.id}.signal`);
  requireString(signal.decision, `${signal.id}.decision`);
  requireString(signal.evidence, `${signal.id}.evidence`);
}

if (evidence.schemaVersion !== 'eclipse-forge.design-evidence.v1') {
  errors.push('evidence.schemaVersion must be eclipse-forge.design-evidence.v1');
}
if (evidence.contractVersion !== contract.schemaVersion) {
  errors.push('evidence.contractVersion must match the design gate contract');
}
if (!profiles.has(evidence.profile)) errors.push(`evidence.profile ${evidence.profile} is unsupported`);
if (!new Set(contract.gateStatuses ?? []).has(evidence.gateStatus)) {
  errors.push(`evidence.gateStatus ${evidence.gateStatus} is unsupported`);
}
for (const field of ['project', 'surface', 'userJob', 'reviewedAt']) requireString(evidence[field], `evidence.${field}`);

const evidenceStatuses = new Set(contract.evidenceStatuses ?? []);
for (const checkId of requiredCheckIds) {
  const check = evidence.checks?.[checkId];
  if (!check) {
    errors.push(`evidence.checks is missing ${checkId}`);
    continue;
  }
  if (!evidenceStatuses.has(check.status)) errors.push(`evidence.checks.${checkId}.status is unsupported`);
  if (!Array.isArray(check.evidence) || check.evidence.length === 0) {
    errors.push(`evidence.checks.${checkId}.evidence must not be empty`);
  } else {
    for (const path of check.evidence) {
      const candidate = resolve(repositoryRoot, path);
      const relativePath = relative(repositoryRoot, candidate);
      if (relativePath.startsWith('..') || isAbsolute(relativePath)) {
        errors.push(`evidence.checks.${checkId} references a path outside the repository: ${path}`);
        continue;
      }
      try {
        await access(candidate);
      } catch {
        errors.push(`evidence.checks.${checkId} references missing path ${path}`);
      }
    }
  }
  if (['justified', 'needs-change', 'pending', 'not-applicable'].includes(check.status)) {
    requireString(check.rationale, `evidence.checks.${checkId}.rationale`);
  }
}

const reviews = evidence.antiSlopReview ?? [];
const reviewsById = new Map(reviews.map((review) => [review.id, review]));
if (reviews.length !== 25 || reviewsById.size !== 25) {
  errors.push('evidence.antiSlopReview must contain 25 unique decisions');
}
for (const signalId of signalIds) {
  const review = reviewsById.get(signalId);
  if (!review) {
    errors.push(`evidence.antiSlopReview is missing ${signalId}`);
    continue;
  }
  if (!evidenceStatuses.has(review.status)) errors.push(`${signalId}.status is unsupported`);
  if (['justified', 'needs-change', 'pending', 'not-applicable'].includes(review.status)) {
    requireString(review.rationale, `${signalId}.rationale`);
  }
}

if (!Array.isArray(evidence.openActions)) errors.push('evidence.openActions must be an array');

if (evidence.gateStatus === 'adopted') {
  const unfinishedChecks = Object.entries(evidence.checks ?? {})
    .filter(([, check]) => ['needs-change', 'pending'].includes(check.status))
    .map(([id]) => id);
  const unfinishedSignals = reviews
    .filter((review) => ['needs-change', 'pending'].includes(review.status))
    .map((review) => review.id);
  if (unfinishedChecks.length > 0) errors.push(`adopted evidence has unfinished checks: ${unfinishedChecks.join(', ')}`);
  if (unfinishedSignals.length > 0) errors.push(`adopted evidence has unfinished anti-slop signals: ${unfinishedSignals.join(', ')}`);
}

if (errors.length > 0) {
  console.error('Eclipse Design Gate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const openChecks = Object.entries(evidence.checks).filter(([, check]) => ['needs-change', 'pending'].includes(check.status));
const openSignals = reviews.filter((review) => ['needs-change', 'pending'].includes(review.status));
console.log(
  `Eclipse Design Gate valid: ${signals.length} signals, ${requiredChecks.length} checks, `
  + `${openChecks.length} open checks, ${openSignals.length} open anti-slop signals, status ${evidence.gateStatus}.`,
);
