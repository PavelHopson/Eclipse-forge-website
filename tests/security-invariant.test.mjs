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
const growthEvidenceMapUrl = new URL(
  '../docs/eclipse-forge-os/security/growth-runtime-test-evidence.md',
  import.meta.url,
);
const growthReviewPacketUrl = new URL(
  '../docs/eclipse-forge-os/security/growth-invariant-review-packet.md',
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

test('every Growth invariant test id resolves to evidence or an explicit missing-test backlog', async () => {
  const fixture = JSON.parse(await readFile(growthFixtureUrl, 'utf8'));
  const evidenceMap = await readFile(growthEvidenceMapUrl, 'utf8');
  const testIds = fixture.invariants.flatMap((item) => item.testIds);

  assert.equal(new Set(testIds).size, testIds.length);
  for (const testId of testIds) {
    assert.equal(evidenceMap.includes(`| \`${testId}\` |`), true);
  }
  assert.match(evidenceMap, /No invariant record may move to `approved` while[\s\S]+`MISSING-`/);
});

test('Growth independent review packet stays pending and binds exact immutable evidence', async () => {
  const fixture = JSON.parse(await readFile(growthFixtureUrl, 'utf8'));
  const packet = await readFile(growthReviewPacketUrl, 'utf8');

  assert.equal(fixture.status, 'draft');
  assert.match(packet, /Decision status:\*\* `pending_independent_review`/);
  assert.match(packet, /aa56478749246588e4af587584b7fd3b7b17f3dc/);
  assert.match(packet, /09661beb3db5fd5dfb2ddcad84c82b2f29949c03/);
  assert.match(packet, /8591e19a70ffd720e4b8d87232d0df3ecc897d8e/);
  assert.match(packet, /process-local execution lease/);
  assert.match(packet, /one Supervisor program and no `numprocs`/);
  assert.match(packet, /not PostgreSQL integration evidence/);
  assert.match(packet, /recommended only if the reviewer confirms the live deployment is/);
  assert.match(packet, /must never be inferred from green CI/);
});
