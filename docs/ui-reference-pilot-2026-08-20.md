# UI reference pilot — 2026-08-20

## Scope

Bounded review для project showcase EclipseForgeLanding. Eclipse Library и Eclipse Chat не
входят в scope. Skiper UI, AnimMaster, Oceon и Vlipsy рассматривались только как visual
references; их исходный код не копировался.

## Vengeance UI decision

- Upstream: `Ashutoshx7/VengeanceUI` — <https://github.com/Ashutoshx7/VengeanceUI>
- License: MIT — <https://github.com/Ashutoshx7/VengeanceUI/blob/main/LICENSE>
- Candidate: Highlight Grid — <https://www.vengenceui.com/components/highlight-grid>
- Alternative checked: Glow Border Card — <https://www.vengenceui.com/components/glow-border-card>

| Gate | Highlight Grid | Glow Border Card |
|---|---|---|
| Provenance/license | Pass: public upstream, MIT | Pass: same upstream |
| Bundle | Pass: local React + CSS transition, no new runtime dependency | Pass: CSS-only effect |
| Accessibility | Fail: meaning is expressed primarily by moving hover highlight | Fail: decorative perpetual glow competes with content hierarchy |
| Keyboard | Fail: no equivalent focus-driven state in the published component | Not applicable to a non-interactive wrapper, but no focus contract supplied |
| Reduced motion | Fail: no `prefers-reduced-motion` behavior in the published component | Fail: animation is enabled by default and reduced-motion is not automatic |
| Mobile | Fail: pointer-position behavior has no useful touch equivalent | Conditional, but the effect adds cost without improving the mobile task |

Decision: **reject integration**. No Vengeance source or registry package was copied or
installed. The rollout keeps the useful design principle — one controlled emphasis per group —
but implements it through the existing Eclipse Forge visual contract: always-visible project
identity, outcome and evidence; focus parity; static mobile presentation; governed motion.

## Landing application

- Project title is visible in every case card instead of being implied by cover artwork.
- Outcome and evidence are visible without hover.
- The primary stack is scannable, with overflow summarized rather than expanding the card.
- Wide featured cards use a horizontal editorial rhythm on desktop and collapse to one column
  on mobile.
- Pointer tilt and lift obey the shared system/user motion governor.
- Focus within a card receives the same hierarchy enhancement as hover.

## Reuse boundary

Reusable guidance for Eclipse Media lives in
[`eclipse-forge-visual-system.md`](eclipse-forge-visual-system.md#reusable-guidance-для-eclipse-media).
It is a design contract only; this pilot makes no changes in the Media repository.

## Editorial portfolio reference — 2026-08-23

`andrey-may-pf.netlify.app` was reviewed as a visual reference for editorial hierarchy only.
No source, assets, layout measurements or motion implementation were copied: the public page
does not provide a reusable-code license in the reviewed experience. The useful principle was
the reduction to one oversized statement, one visual anchor and an early project proof.

The Landing adaptation keeps the Eclipse Forge identity and implementation:

- the single anchor is a circular black eclipse with a warm-gold corona, orbital geometry and
  restrained system telemetry;
- Outfit/Inter, the canonical tokens and the existing motion governor remain authoritative;
- the founder portrait and metric cards no longer compete with the hero message;
- the project showcase follows the hero directly, so evidence no longer waits behind four
  positioning sections;
- primary and secondary actions remain visible, keyboard-focusable and at least 44px tall;
- touch layouts receive a static, cropped eclipse composition rather than pointer parallax;
- `prefers-reduced-motion` and the manual ambient-motion pause freeze the new CSS effects.
