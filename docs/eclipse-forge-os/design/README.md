# Eclipse Design Gate

`Eclipse Design Gate` is the shared quality contract for every user-facing Eclipse
surface. It keeps a recognizable product family without forcing every product into the
same black-and-gold landing-page composition.

Machine-readable source:
[`eclipse-forge.design-gate.json`](../../../public/design-system/eclipse-forge.design-gate.json).
The visual tokens remain in
[`eclipse-forge.tokens.json`](../../../public/design-system/eclipse-forge.tokens.json).

## Decision rule

A project becomes `adopted` only when all required checks have evidence and every one of
the 25 anti-slop signals is recorded as `pass`, `justified` or `not-applicable`. A
justification names the product need and the evidence that makes the pattern intentional.
Taste is reviewed by a human; CI verifies that the decision and its evidence are present.

`needs-change` and `pending` keep the project in `pilot`. Blocking trust signals cannot be
waived for a public surface: invented testimonials, unsupported trust logos, unsourced
numbers, dead links and missing live product evidence must be corrected.

## Required evidence

Every project keeps a versioned evidence manifest containing:

- product profile: `cinematic`, `product` or `operational`;
- surface type and one-sentence user job;
- three-second-test result and one primary action;
- loading, empty, error, success, disabled and focus coverage when applicable;
- desktop and mobile screenshots plus a page-overflow result;
- keyboard path and visible-focus result;
- normal and reduced-motion screenshots;
- bundle or performance delta;
- provenance and license notes for references, assets, fonts and dependencies;
- security and truthfulness review;
- all 25 anti-slop decisions with rationale for every exception.

The first evidence manifest is
[`Eclipse Forge Landing`](evidence/eclipse-forge-landing.json). It intentionally remains
`pilot` under the new gate until the remaining live-product and repeated-motion findings
are closed; the earlier visual-system adoption is not treated as proof for this stricter
contract.

## Motion tiers

Motion is progressive enhancement. Static content and the primary action render first.

| Tier | Examples | Reduced-motion behavior |
| --- | --- | --- |
| Remove | parallax, large translation/zoom, 3D spin, scroll hijacking | no spatial motion |
| Soften | small reveal, modal entry, local transition | opacity transition no longer than 200 ms |
| Keep | focus, color, loading and essential state feedback | preserve orientation and status |

Auto-playing motion lasting longer than five seconds needs a visible pause control even
when the operating system allows motion. Touch surfaces never depend on cursor position.

## Product profiles

- `cinematic`: Landing, campaign pages and selected case studies. One dominant visual
  anchor; no more than two large semantic layers move simultaneously.
- `product`: AI Hub, Library, Media, Shotforge and creative tools. The artifact or current
  task is more prominent than brand atmosphere.
- `operational`: Chat, Sentinel, Webclaw, finance, CRM and admin surfaces. State,
  approvals, risk and the next safe action dominate; ambient motion stays away from data.

## Anti-slop review

The 25 signals in the machine-readable contract are review prompts, not a style lottery.
Three cards, a bento layout or Inter body copy can be correct. They fail when used without
information hierarchy, product need or evidence. Patterns that imitate trust are never
stylistic exceptions.

The review answers four questions:

1. Does the pattern communicate meaning or merely fill space?
2. Would the screen still be recognizable without its glow and animation?
3. Is every claim backed by a current artifact, source or versioned registry?
4. Can a new user complete the primary path without instructions?

## First rollout

The first product wave is defined in [First-wave profiles](first-wave.md). The order is:

1. Eclipse AI Hub — interactive Agent Office with a static-first mobile fallback;
2. Eclipse Chat — operational Mission Control for runs, approvals and artifacts;
3. Eclipse Library — evidence and provenance surface;
4. Eclipse Media — artifact-first production workflow after the shared handoff is proven.

Project repositories copy versioned snapshots of the tokens and gate. They do not import
runtime files from Landing and they do not inherit cinematic effects automatically.
