import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const manifestUrl = new URL('../public/ecosystem/manifest.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));

test('control plane and integrations reference known projects', () => {
  const projectIds = new Set(manifest.projects.map((project) => project.id));

  assert.equal(projectIds.size, manifest.projects.length, 'project ids must be unique');
  assert.ok(projectIds.has(manifest.controlPlane), 'control plane must reference a project');

  for (const integration of manifest.integrations) {
    assert.ok(projectIds.has(integration.from), `${integration.id} has an unknown producer`);
    assert.ok(projectIds.has(integration.to), `${integration.id} has an unknown consumer`);
    assert.notEqual(integration.from, integration.to, `${integration.id} must cross a product boundary`);
    assert.match(integration.contract, /^[a-z][a-z0-9.-]*\.v\d+$/);
  }
});

test('data ownership is explicit and unambiguous', () => {
  const owners = new Map();

  for (const project of manifest.projects) {
    for (const dataType of project.ownsData) {
      assert.equal(
        owners.has(dataType),
        false,
        `${dataType} is claimed by both ${owners.get(dataType)} and ${project.id}`,
      );
      owners.set(dataType, project.id);
    }
  }
});

test('integration maturity matches the implemented control-plane slice', () => {
  const chatAiGateway = manifest.integrations.find((integration) => integration.id === 'chat-ai-gateway');
  assert.equal(chatAiGateway?.maturity, 'experimental');

  const remaining = manifest.integrations.filter((integration) => integration.id !== 'chat-ai-gateway');
  assert.ok(remaining.length > 0);
  assert.ok(remaining.every((integration) => integration.maturity === 'planned'));
  assert.equal(manifest.integrations.some((integration) => integration.maturity === 'available'), false);
});
