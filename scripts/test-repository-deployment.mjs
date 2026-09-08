import test from 'node:test';
import assert from 'node:assert/strict';
import {deploymentScope} from './repository-deployment-scope.mjs';
const base='a'.repeat(40),head='b'.repeat(40),other='c'.repeat(40);
function fixture(paths=['README.md']){
  const comparison={status:'ahead',behind_by:0,merge_base_commit:{sha:base},files:paths.map(filename=>({filename}))};
  const suite={before:base,after:head,head_sha:head,head_branch:'main'};
  const args={context:{eventName:'push',repo:{owner:'test',repo:'sample'},sha:head,payload:{before:base}},bootstrapBase:base,bootstrapFiles:['.github/workflows/deploy.yml'],github:{rest:{repos:{compareCommitsWithBasehead:async()=>({data:comparison})},checks:{getSuite:async()=>({data:suite})}}}};
  return {args,comparison,suite};
}
for(const p of ['README.md','docs/repository-guide.md','docs/assets/repository-cover.svg','docs/assets/ui/overview.png','docs/portfolio/index.html'])test('skip presentation '+p,async()=>assert.equal(await deploymentScope(fixture([p]).args),false));
for(const p of ['src/App.tsx','package-lock.json','docs/runtime/config.json','.github/workflows/security.yml'])test('retain runtime deployment '+p,async()=>assert.equal(await deploymentScope(fixture(['README.md',p]).args),true));
test('bootstrap guard change is skipped only at reviewed base',async()=>{const f=fixture(['README.md','.github/workflows/deploy.yml']);assert.equal(await deploymentScope(f.args),false);f.args.bootstrapBase=other;assert.equal(await deploymentScope(f.args),true);});
test('bootstrap cannot hide mixed runtime changes',async()=>assert.equal(await deploymentScope(fixture(['.github/workflows/deploy.yml','src/app.js']).args),true));
test('rename from runtime into docs must deploy',async()=>{const f=fixture();f.comparison.files[0].previous_filename='src/app.js';assert.equal(await deploymentScope(f.args),true);});
for(const count of [0,300,301])test('fail closed at incomplete file count '+count,async()=>assert.rejects(deploymentScope(fixture(Array(count).fill('README.md')).args)));
test('all commits in push are compared with supplied before, never just HEAD parent',async()=>{const f=fixture();f.args.github.rest.repos.compareCommitsWithBasehead=async x=>{assert.equal(x.basehead,base+'...'+head);return {data:f.comparison}};assert.equal(await deploymentScope(f.args),false);});
test('API failure blocks deployment',async()=>{const f=fixture();f.args.github.rest.repos.compareCommitsWithBasehead=async()=>{throw Error('Unavailable')};await assert.rejects(deploymentScope(f.args));});
for(const p of ['', '0'.repeat(40),'not-a-sha'])test('invalid base '+p,async()=>{const f=fixture();f.args.context.payload.before=p;await assert.rejects(deploymentScope(f.args));});
test('diverged history requires review',async()=>{const f=fixture();f.comparison.status='diverged';await assert.rejects(deploymentScope(f.args));});
test('missing rename source validation fails closed',async()=>{const f=fixture();f.comparison.files[0].previous_filename='../app.js';await assert.rejects(deploymentScope(f.args));});
test('PR does not gain deployment authority',async()=>{const f=fixture();f.args.context.eventName='pull_request';assert.equal(await deploymentScope(f.args),false);});
test('manual dispatch retains existing separate approval gates',async()=>{const f=fixture();f.args.context.eventName='workflow_dispatch';assert.equal(await deploymentScope(f.args),true);});
function workflowFixture(){const f=fixture();f.args.context.eventName='workflow_run';f.args.context.payload={workflow_run:{event:'push',conclusion:'success',head_sha:head,head_branch:'main',head_repository:{full_name:'test/sample'},check_suite_id:123}};return f;}
test('workflow_run uses original complete push',async()=>assert.equal(await deploymentScope(workflowFixture().args),false));
test('workflow_run with runtime change deploys',async()=>{const f=workflowFixture();f.comparison.files.push({filename:'web/index.html'});assert.equal(await deploymentScope(f.args),true);});
test('foreign workflow run never deploys',async()=>{const f=workflowFixture();f.args.context.payload.workflow_run.head_repository.full_name='other/sample';assert.equal(await deploymentScope(f.args),false);});
test('failed workflow run never deploys',async()=>{const f=workflowFixture();f.args.context.payload.workflow_run.conclusion='failure';assert.equal(await deploymentScope(f.args),false);});
test('workflow suite mismatch fails closed',async()=>{const f=workflowFixture();f.suite.after=other;await assert.rejects(deploymentScope(f.args));});
test('missing workflow suite fails closed',async()=>{const f=workflowFixture();delete f.args.context.payload.workflow_run.check_suite_id;await assert.rejects(deploymentScope(f.args));});
