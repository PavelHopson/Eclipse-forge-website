import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const schemaUrl = new URL(
  '../docs/eclipse-forge-os/growth-os/schemas/threads-signal-batch.schema.json',
  import.meta.url,
);

test('Threads signal batches stay manual, bounded and metadata-only', async () => {
  const schema = JSON.parse(await readFile(schemaUrl, 'utf8'));
  const signal = schema.properties.signals.items;

  assert.equal(schema.properties.schemaVersion.const, 'threads.signal.batch.v1');
  assert.equal(schema.properties.collectionMode.const, 'manual_public_only');
  assert.equal(schema.properties.profileScope.properties.profileType.const, 'personal_engineering');
  assert.equal(schema.properties.signals.maxItems, 20);
  assert.equal(schema.additionalProperties, false);
  assert.equal(signal.additionalProperties, false);
  assert.equal(Object.hasOwn(signal.properties, 'postText'), false);
  assert.match(signal.properties.sourceUrl.pattern, /threads/);
  assert.deepEqual(schema.allOf[0].then.required, ['reviewedBy', 'reviewedAt']);
  assert.deepEqual(schema.properties.status.enum, [
    'draft',
    'ready_for_human_review',
    'accepted',
    'rejected',
  ]);
});
