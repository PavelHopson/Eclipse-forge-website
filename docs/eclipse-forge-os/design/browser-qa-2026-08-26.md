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

## Orbital shell follow-up

The header/footer motion pilot was repeated after the initial gate pass:

| Check | Result | Evidence |
| --- | --- | --- |
| Desktop shell | PASS | `1440 × 900`; header controls remain inside the viewport and the footer CTA/dock stay readable |
| Mobile shell | PASS | `390 × 844` override (`375 px` content viewport); document and scroll widths match |
| Touch targets | PASS | visible mobile header controls are `44 px` high; footer CTAs are `48–49.5 px`; social targets are `45.8 px` |
| Motion governor | PASS | footer orbit transforms change only while `data-ambient-motion=running` and pause through the shared control |
| Mobile menu | PASS | menu opens with `aria-expanded=true`; Escape closes it and restores focus to the menu button |
| Focus treatment | PASS | footer primary action exposes a visible `2 px` focus outline |
| Console | PASS WITH NOTE | no runtime errors; Framer Motion reports its existing reduced-motion/configuration notices in the development build |
| Motion cost | PASS | new continuous keyframes use only `transform`/`opacity`; regression coverage rejects layout, filter and shadow animation |

The orbital eclipse was moved below the mobile dock after the first screenshot pass so that
Instagram and metadata stay readable. The mobile footer heading was reduced from six visual
lines to four without changing the message or CTA priority.

## Showcase 2.0 follow-up

The project wall was replaced with four authored flagship scenes and one compact System Index.
The separate ecosystem card grid was removed from the Landing composition because it repeated
six systems already represented in the catalogue.

| Check | Result | Evidence |
| --- | --- | --- |
| Catalogue completeness | PASS | `4` flagship scenes plus `14` index rows preserve all `18` unique projects |
| Real product evidence | PASS FOR FLAGSHIPS | Valhalla, Sentinel, Premium Rent and Claw use their real product assets rather than generic placeholders |
| Desktop composition | PASS | `1440 × 1000`; four `1304 px` scenes, `0 px` horizontal overflow, Cases height `7056 px` |
| Mobile composition | PASS | `390 × 844` override (`375 px` content viewport); `335 px` scenes and index rows, `0 px` horizontal overflow |
| Touch targets | PASS | flagship CTAs and compact index actions are `44 px` high |
| Evidence visibility | PASS | title, status, outcome, engineering signal and links are visible without hover |
| Keyboard focus | PASS FOR CHANGED SURFACE | Tab reaches index actions; focus state changes border, background and text to Eclipse gold |
| Motion governor | PASS | paused mode renders headers at `opacity: 1` / `transform: none`; running mode remains available through the shared control |
| Runtime console | PASS | zero error entries in the desktop and mobile runs |

The changed section removes pointer-follow tilt, spring lift and repeated decorative card shells.
New continuous effects were not added; reveal motion uses the shared preference governor and the
image interaction is limited to a compositor-friendly scale on real links.

## Decision

The changed Landing surfaces pass responsive and runtime smoke. The project remains `pilot`
under `eclipse-forge.design-gate.v1` because complete imagery across every referenced project,
exact case-number evidence, selective reveal pacing outside the changed showcase, remaining generic
blur cleanup, complete state evidence and a full-page manual keyboard walkthrough are not yet closed.
