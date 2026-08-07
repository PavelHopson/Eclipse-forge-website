import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const schemaUrl = new URL(
  '../docs/eclipse-forge-os/security/security-invariant.schema.json',
  import.meta.url,
);
const growthFixtureUrl = new URL(
  '../docs/eclipse-forge-os/security/fixtures/growth-office.security-invariant.v1.json',
  import.meta.url,
);

test('security invariant schema fails closed for the lethal trifecta', async () => {
  const schema = JSON.parse(await readFile(schemaUrl, 'utf8'));
  const trifectaGate = schema.allOf[0];

  assert.equal(schema.properties.schemaVersion.const, 'security.invariant.v1');
  assert.equal(schema.additionalProperties, false);
  assert.equal(
    trifectaGate.if.properties.riskSignals.properties.privateDataAccess.const,
    true,
  );
  assert.equal(
    trifectaGate.if.properties.riskSignals.properties.untrustedContentAccess.const,
    true,
  );
  assert.equal(
    trifectaGate.if.properties.riskSignals.properties.agentDirectedExternalCommunication.const,
    true,
  );
  assert.equal(trifectaGate.then.properties.lethalTrifectaDecision.const, 'blocked');
  assert.equal(trifectaGate.then.properties.executionAllowed.const, false);
  assert.deepEqual(schema.allOf[1].then.required, ['reviewedBy', 'reviewedAt']);
});

test('Growth Office fixture breaks the trifecta and keeps every invariant fail-closed', async () => {
  const fixtureText = await readFile(growthFixtureUrl, 'utf8');
  const fixture = JSON.parse(fixtureText);
  const signals = fixture.riskSignals;

  assert.equal(fixture.status, 'draft');
  assert.equal(fixture.executionAllowed, true);
  assert.equal(fixture.lethalTrifectaDecision, 'broken_by_design');
  assert.equal(
    signals.privateDataAccess
      && signals.untrustedContentAccess
      && signals.agentDirectedExternalCommunication,
    false,
  );
  assert.equal(fixture.invariants.every((item) => item.failureMode === 'fail_closed'), true);
  assert.equal(fixture.invariants.every((item) => item.testIds.length > 0), true);
  assert.doesNotMatch(fixtureText, /(?:api[_-]?key|client[_-]?secret|bearer\s+[a-z0-9._-]+)/i);
});
