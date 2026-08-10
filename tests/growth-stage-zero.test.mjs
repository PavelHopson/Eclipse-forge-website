import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';

const stageRoot = resolve('docs/eclipse-forge-os/execution/stage-0');
const expectedSteps = [
  ['research', 'Researcher'],
  ['strategy', 'Strategist'],
  ['draft', 'Writer'],
  ['claims', 'Claim Auditor'],
  ['final', 'Editor'],
];

test('Stage 0 run preserves the bounded no-action Growth contract', async () => {
  const run = JSON.parse(await readFile(resolve(stageRoot, 'run-output.json'), 'utf8'));

  assert.equal(run.schemaVersion, 'growth.run.v1');
  assert.equal(run.status, 'ready_for_approval');
  assert.equal(run.approval, null);
  assert.deepEqual(run.policy, {
    externalActions: false,
    publishAllowed: false,
    toolsAllowed: false,
    sourceContentTrusted: false,
  });
  assert.equal(run.execution.maxRequests, 5);
  assert.equal(run.execution.completedRequests, 5);
  assert.equal(run.execution.provider, 'ollama');
  assert.equal(run.execution.model, 'qwen3:8b');
  assert.equal(run.execution.cost, 'provider-dependent');
  assert.deepEqual(run.artifacts.map(({ step, role }) => [step, role]), expectedSteps);
  assert.ok(run.artifacts.every(({ content }) => content.length >= 40 && content.length <= 16_000));
});

test('Stage 0 input stays public-only and excludes executable capabilities', async () => {
  const source = await readFile(resolve(stageRoot, 'run-input.json'), 'utf8');
  const input = JSON.parse(source);

  assert.equal(input.execution.maxRequests, 5);
  assert.deepEqual(input.policy, {
    externalActions: false,
    publishAllowed: false,
    toolsAllowed: false,
    sourceContentTrusted: false,
  });
  assert.ok(input.input.sourceUrls.length >= 1 && input.input.sourceUrls.length <= 8);
  for (const raw of input.input.sourceUrls) {
    const url = new URL(raw);
    assert.equal(url.protocol, 'https:');
    assert.equal(url.username, '');
    assert.equal(url.password, '');
  }
  assert.doesNotMatch(source, /(?:api[_-]?key|client[_-]?secret|password|bearer)\s*[:=]/i);
});

test('Stage 0 v2 preserves limits and remains unapproved after failed quality gates', async () => {
  const source = await readFile(resolve(stageRoot, 'run-v2-input.json'), 'utf8');
  const input = JSON.parse(source);
  const run = JSON.parse(await readFile(resolve(stageRoot, 'run-v2-output.json'), 'utf8'));

  assert.equal(input.id, 'growth-stage-0-positioning-audit-v2');
  assert.equal(input.execution.maxRequests, 5);
  assert.equal(input.execution.wallClockMinutes, 15);
  assert.equal(run.schemaVersion, 'growth.run.v1');
  assert.equal(run.id, input.id);
  assert.equal(run.status, 'ready_for_approval');
  assert.equal(run.approval, null);
  assert.equal(run.execution.completedRequests, 5);
  assert.deepEqual(run.policy, input.policy);
  assert.deepEqual(run.artifacts.map(({ step, role }) => [step, role]), expectedSteps);

  const artifact = Object.fromEntries(run.artifacts.map(({ step, content }) => [step, content]));
  const claimsComplete = /AUDIT_COMPLETE\W*$/u.test(artifact.claims);
  const finalComplete = /FINAL_COMPLETE\W*$/u.test(artifact.final);
  const finalAvoidsForbiddenWording = !/(?:доказательства эффективности|AI-командн(?:ый|ого) агент)/iu.test(
    artifact.final,
  );
  const rolesStayIsolated = !/AUDIT_COMPLETE|FINAL_COMPLETE/u.test(artifact.research)
    && !/FINAL_COMPLETE/u.test(artifact.claims);

  assert.equal(claimsComplete, false);
  assert.equal(finalComplete, true);
  assert.equal(finalAvoidsForbiddenWording, false);
  assert.equal(rolesStayIsolated, false);
  assert.match(artifact.final, /Request an AI Opportunity Audit/u);
  assert.match(artifact.final, /not_available/u);
});
