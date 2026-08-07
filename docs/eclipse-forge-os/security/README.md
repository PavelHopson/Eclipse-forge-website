# Eclipse Forge OS security registry

This directory contains portable, reviewable security records for Agent Office
templates. It does not grant execution permission.

- [`security.invariant.v1`](security-invariant.schema.json) defines scope, risk signals,
  invariants, evidence, negative tests, threat events and reassessment triggers.
- [Growth Office fixture](fixtures/growth-office.security-invariant.v1.json) records the
  current public-data-only design boundary as a draft.

The schema blocks `executionAllowed=true` when private-data access, untrusted-content
access and agent-directed external communication are all present. Consumers must still
validate the artifact, check tenant ownership, verify evidence against the current code
and reset approval at their own trust boundary.

An `approved` record requires an independent reviewer and timestamp. Approval expires
when a prompt, model, tool, memory, retrieval, connector or data classification changes,
or when a security incident requires reassessment.
