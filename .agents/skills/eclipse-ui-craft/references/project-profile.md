# Eclipse Forge Landing — cinematic

The product is the public studio showcase, not an operational dashboard. Preserve its
editorial hierarchy, case evidence, locale support and both existing theme surfaces.
No mandatory preloader: content and the primary CTA must be available without waiting for effects.

## Product sources

- [DESIGN.md](../../../../DESIGN.md)
- [Visual system](../../../../docs/eclipse-forge-visual-system.md)
- [Design Gate](../../../../docs/eclipse-forge-os/design/README.md)
- [Tokens](../../../../public/design-system/eclipse-forge.tokens.json)
- [Styles](../../../../src/styles/index.css), [theme state](../../../../src/lib/theme.tsx)
- [Package manifest](../../../../package.json)

Use the versioned system: Outfit/Inter, warm-gold primary action, blue signal/focus,
dark and light tokens, existing icons. Keep public claims evidence-backed. Cinematic
effects are progressive enhancement, not a reason to import Apple materials or system fonts.
Do not apply another Eclipse product's dark-only or CSS-only rule here.
The manifest declares framer-motion ^12.9.2 and GSAP ^3.15.0; these are declarations,
not verification of an installed runtime. Check lockfile/types before future API edits.

## One next pilot — proposed, not implemented

[ThemeToggle](../../../../src/components/ui/ThemeToggle.tsx): preserve the current
auto/light/dark cycle while reviewing the rotating/translating icon transition
(`AnimatePresence mode="wait"`). Make reduced-motion feedback non-spatial and verify
rapid repeated activation never queues an outdated visual state or delays the actual theme.
Keep the existing button, localized label and theme semantics.

Acceptance: keyboard/click cycle immediately updates the actual theme; focus stays visible;
rapid reversal/repetition settles on the current mode; reduced motion removes rotation;
desktop/mobile labels and both theme contrasts remain legible. This is a future scoped UI task,
not a claim that this docs-only PR tested or changed runtime behavior.

## Checks and boundaries

For docs-only work: relative links, frontmatter, provenance, instruction review and diff.
The existing Design Gate remains required for future visual adoption. Build/test/typecheck
commands are in package.json; no automatic deployment or push-to-main instruction is inherited
from historical CLAUDE.md. Do not change other products through this repository.
