# Eclipse Design Gate browser QA — 2026-08-26

## Scope

- production build served locally from `dist`;
- Landing hero, sourced metrics and navigation shell;
- desktop `1440 × 900` and mobile `390 × 844` viewport overrides;
- manual ambient-motion pause;
- console and page-overflow checks.

## Results

| Check | Result | Evidence |
| --- | --- | --- |
| Three-second hero | PASS | One `h1`, one `main`, clear primary request CTA and separate systems CTA |
| Heading treatment | PASS | `0` gradient classes inside `h1` or `h2`; Eclipse gold remains a solid semantic accent |
| Source visibility | PASS | Hero and metrics surfaces expose links to the public runtime registry or versioned visual contract |
| Desktop overflow | PASS | document width equals viewport content width; delta `0 px` |
| Mobile overflow | PASS | document width equals viewport content width; delta `0 px` |
| Mobile hierarchy | PASS | hero heading starts below the fixed shell; primary CTA remains visible and full-width |
| Touch controls | PASS | visible language, motion, theme and menu controls are `44 × 44 px` or larger |
| Manual motion pause | PASS | control changes `data-ambient-motion` to `paused` and exposes `aria-pressed=true` |
| Console | PASS | zero warning or error entries in the checked desktop run |
| Keyboard traversal | PENDING | In-app automation did not advance browser focus with synthetic Tab; source regression coverage passes, but a real manual Tab walkthrough is still required before adoption |

## Reduced motion

The browser pass verified the manual pause path. Automated motion contract tests verify the
system preference listener, JS/canvas gating, off-screen pause and non-smooth fallback.
A captured OS-emulated reduced-motion walkthrough remains part of the final adoption set.

## Decision

The changed Landing surfaces pass responsive and runtime smoke. The project remains `pilot`
under `eclipse-forge.design-gate.v1` because live product imagery, exact case-number evidence,
selective reveal pacing, remaining generic blur cleanup, complete state evidence and a manual
keyboard walkthrough are not yet closed.
