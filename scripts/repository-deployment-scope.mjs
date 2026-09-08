// Pure dependency-injected policy, embedded into presentation-release deployment workflows.
export async function deploymentScope({github,context,bootstrapBase,bootstrapFiles}) {
  const event=context.eventName;
  const repo=context.repo;
  let before=context.payload.before;
  let after=context.sha;
  if(event==='workflow_dispatch') return true;
  if(event==='workflow_run') {
    const run=context.payload.workflow_run;
    if(run?.event!=='push'||run.conclusion!=='success'||run.head_repository?.full_name!==`${repo.owner}/${repo.repo}`) return false;
    if(!Number.isSafeInteger(run.check_suite_id)) throw Error('Missing source push check suite');
    const {data:suite}=await github.rest.checks.getSuite({...repo,check_suite_id:run.check_suite_id});
    if(suite.head_sha!==run.head_sha||suite.after!==run.head_sha||suite.head_branch!==run.head_branch) throw Error('Source push mismatch');
    before=suite.before; after=suite.after;
  } else if(event!=='push') return false;
  const valid=v=>typeof v==='string'&&/^[a-f0-9]{40}$/.test(v)&&!/^0+$/.test(v);
  if(!valid(before)||!valid(after)||before===after) throw Error('Unknown push range: deployment requires manual review');
  const {data:comparison}=await github.rest.repos.compareCommitsWithBasehead({...repo,basehead:`${before}...${after}`,per_page:100,page:1});
  // The Compare API returns at most 300 changed files, even with pagination.
  // Fail closed at that boundary instead of guessing that omitted files are documentation.
  if(comparison.status!=='ahead'||comparison.behind_by!==0||comparison.merge_base_commit?.sha!==before||!Array.isArray(comparison.files)||comparison.files.length===0||comparison.files.length>=300) throw Error('Incomplete change list: deployment requires manual review');
  const documentation=p=>p==='README.md'||p==='docs/repository-guide.md'||p==='docs/assets/repository-cover.svg'||p.startsWith('docs/assets/ui/')||p.startsWith('docs/portfolio/');
  const knownPath=p=>typeof p==='string'&&p.length>0&&!p.includes('..')&&!p.includes('\\')&&!p.startsWith('/');
  const ignored=p=>documentation(p)||(before===bootstrapBase&&bootstrapFiles.includes(p));
  for(const file of comparison.files){
    if(!knownPath(file.filename)||(file.previous_filename!==undefined&&!knownPath(file.previous_filename))) throw Error('Invalid changed path');
    // A rename from runtime into docs still changes runtime.
    if(!ignored(file.filename)||(file.previous_filename&&!ignored(file.previous_filename))) return true;
  }
  return false;
}
