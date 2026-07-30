import { readFile } from 'node:fs/promises';

const manifestUrl = new URL('../public/ecosystem/manifest.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));
const errors = [];

const requiredString = (value, path) => {
  if (typeof value !== 'string' || value.trim() === '') errors.push(`${path} must be a non-empty string`);
};

if (manifest.schemaVersion !== 1) errors.push('schemaVersion must be 1');
requiredString(manifest.ecosystem, 'ecosystem');
requiredString(manifest.updatedAt, 'updatedAt');
requiredString(manifest.controlPlane, 'controlPlane');

if (!Array.isArray(manifest.projects) || manifest.projects.length === 0) {
  errors.push('projects must be a non-empty array');
}

const projectIds = new Set();
const allowedStatuses = new Set(['live', 'beta', 'prototype', 'library', 'archived']);

for (const [index, project] of (manifest.projects ?? []).entries()) {
  const path = `projects[${index}]`;
  requiredString(project.id, `${path}.id`);
  requiredString(project.name, `${path}.name`);
  requiredString(project.repository, `${path}.repository`);
  requiredString(project.role, `${path}.role`);

  if (projectIds.has(project.id)) errors.push(`${path}.id duplicates ${project.id}`);
  projectIds.add(project.id);

  if (!allowedStatuses.has(project.status)) errors.push(`${path}.status is unsupported`);
  if (!project.repository?.startsWith('https://github.com/')) errors.push(`${path}.repository must use a GitHub HTTPS URL`);
  if (!Array.isArray(project.capabilities) || project.capabilities.length === 0) errors.push(`${path}.capabilities must not be empty`);
  if (!Array.isArray(project.ownsData)) errors.push(`${path}.ownsData must be an array`);
}

if (!projectIds.has(manifest.controlPlane)) errors.push('controlPlane must reference a project id');

const integrationIds = new Set();
const allowedMaturity = new Set(['available', 'experimental', 'planned']);
const allowedPriorities = new Set(['P0', 'P1', 'P2', 'P3']);

for (const [index, integration] of (manifest.integrations ?? []).entries()) {
  const path = `integrations[${index}]`;
  requiredString(integration.id, `${path}.id`);
  requiredString(integration.contract, `${path}.contract`);

  if (integrationIds.has(integration.id)) errors.push(`${path}.id duplicates ${integration.id}`);
  integrationIds.add(integration.id);
  if (!projectIds.has(integration.from)) errors.push(`${path}.from references an unknown project`);
  if (!projectIds.has(integration.to)) errors.push(`${path}.to references an unknown project`);
  if (integration.from === integration.to) errors.push(`${path} must connect two different projects`);
  if (!allowedMaturity.has(integration.maturity)) errors.push(`${path}.maturity is unsupported`);
  if (!allowedPriorities.has(integration.priority)) errors.push(`${path}.priority is unsupported`);
}

if (errors.length > 0) {
  console.error('Ecosystem manifest validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Ecosystem manifest valid: ${projectIds.size} projects, ${integrationIds.size} integrations.`);
