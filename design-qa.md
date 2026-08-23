# Design QA — NØRTHBOUND Scroll Cinema Study

Date: 2026-08-23
Reference: https://panda-orchid-barn.pagey.site/
Local route: `/cases/northbound-study/index.html`

## Scope and attribution

This is an attributed technical reconstruction study. Original concept, AI / code / direction:
Andrei Mei. The landing card is explicitly marked `Reference`; the microsite links to the original
source and retains the original author credits. It is not presented as original Eclipse Forge art direction.

## Evidence captured

- reference opening, story states and mobile opening under
  `C:/Users/garaa/Documents/Codex/2026-08-22/eclipse-forge/qa/northbound-reference/captures/`;
- local desktop, mobile and 4K captures under
  `C:/Users/garaa/Documents/Codex/2026-08-22/eclipse-forge/qa/northbound-reference/local-captures/`;
- same-viewport opening comparison: `local-captures/opening-source-local.jpg`;
- local keyframe sheet: `local-captures/local-keyframes.jpg`;
- mobile opening/credits sheet: `local-captures/mobile-keyframes.jpg`;
- machine-readable regression output produced by `verify-local.mjs`.

The second automated source pass could not force remote cross-origin video seeking and therefore
fell back to the source poster on later states. Those captures were not treated as frame-accurate
evidence. The initial live captures, the three supplied local master videos and their ffprobe/contact
sheet inspection were used for the remaining media-state comparison.

## Visual comparison

| State | Result | Notes |
|---|---|---|
| Opening `1920×1080` | Pass | Same train frame, centered editorial lockup, serif continuation, dark hero field and safe-area UI. |
| Intertitle 1 | Pass | Darkness, restrained uppercase copy and icy serif hierarchy preserved. |
| Carriage | Pass | Warm footage remains free of large headline copy. |
| Whiteout | Pass | Interior disappears; blur, desaturation, canvas streaks and edge frost peak late. |
| Tunnel | Pass | Copy is gated to tunnel time and multiplied by flash proximity. |
| Aurora | Pass | Large copy and chapter rail are suppressed so the footage owns the payoff. |
| Exterior pullback | Pass | Only the small chapter caption is permitted. |
| Ice / underwater | Pass | Cold grade, refraction and snow-to-bubble mode change are present. |
| Credits | Pass | Credits render only after actual final video time passes 35.15 s. |
| Mobile `390×844` | Pass | Live video, readable lockup, compact chapter counter, 0 px horizontal overflow. |
| 4K `3840×2160` | Pass | Poster composition remains centered and type stays inside the frame. |

Intentional difference: the local study adds a quiet `RECONSTRUCTION STUDY` / `SOURCE` disclosure
in the desktop top bar and changes the final guide link to the Eclipse Library. It does not copy
Pagey banner or Umami analytics.

## Functional regression

Final `verify-local.mjs` result:

- console errors/warnings: `0`;
- non-expected failed requests: `0`;
- first departure frame: `0.62 s`;
- sound default: `OFF`;
- credits frame reached: `35.57 s`;
- credits opacity at bottom: `1`;
- return-to-departure: `scrollY 0`, video `0.62 s`, hero `1`, prompt `1`;
- mobile overflow: `0 px`;
- reduced-motion scene height: `844 px` at an `844 px` viewport;
- reduced-motion weather canvas: disabled;
- analytics/page-builder scripts: absent;
- HTTP Range request for the 23.9 MB production video: `206`, exact 1024-byte response.

## Accessibility and failure states

- semantic header/main/sections/nav/buttons and video fallback text are present;
- skip link, visible focus, live chapter announcement and 44 px controls are present;
- sound requires explicit interaction and `aria-pressed` stays synchronized;
- no pointer-only core action: chapters, credits links and return are buttons/anchors;
- final pointer interception bug was reproduced, fixed and regression-tested;
- reduced motion keeps all chapters/copy and replaces heavy synchronized motion with bounded media playback;
- `<noscript>` and poster-based media fallback are present.

## Security and privacy pass

- strict meta CSP for same-origin scripts, media, fonts and images;
- `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`;
- external links use `noopener noreferrer`;
- no credentials, browser storage, cookies, trackers or user data;
- media and vendor files are local; no cross-origin hotlink dependency at runtime;
- no new npm dependency was added; existing pinned GSAP files were copied into the isolated case.

`frame-ancestors 'none'` must be supplied as an HTTP response header at deployment because browsers
ignore that directive in a meta CSP. It is intentionally omitted from the meta tag to keep the console clean.

## Build gates

- `npm run check`: 32/32 tests, ecosystem validation and TypeScript pass;
- `npm run build`: Vite production build pass;
- bundle budget: every JavaScript chunk below 500 KiB;
- every production asset is below Cloudflare Pages' 25 MiB file limit;
- the films are isolated static assets and are not included in the landing JavaScript bundle.

## Final result

passed
