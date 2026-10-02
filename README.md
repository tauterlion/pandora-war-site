# Pandora War Server Website

Official information website for the Pandora War Server.

## Read these first

- `AGENTS.md` — standing instructions for Codex
- `PANDORA_BRIEF.md` — product, visual, motion, and interaction direction
- `CONTENT.md` — current factual server/game content
- `references/` — supporting source material, including the player-facing DOCX once added

## Run locally

Requires Node.js 22.12+ (tested with 24.11.1) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

Browser tests use installed Microsoft Edge via Playwright. On a machine without Edge, install a Playwright Chromium browser (`npx playwright install chromium`) and remove `channel: 'msedge'` in `playwright.config.ts`.

## Current architecture

React + TypeScript + Vite, with React Router for browser-history routing. The site remains a static, client-rendered information hub with no backend, API or live telemetry.

| Route | Contents |
| --- | --- |
| `/` | Original hero, introduction, field specifications, onward chapter links |
| `/war-system` | Build/Compete/Adapt, War Score, interactive objectives, terrain/base context |
| `/factions` | Neutral atmosphere, pending roster, side bookmarks, future faction/player data boundary |
| `/mods` | Focused moving mod rail and mod-specific abstract environments |
| `/rules` | Seven core rules and seven optional clarification accordions |
| `/setup` | Pending preparation package, with no fabricated downloads or connection details |

The old long homepage is removed. Numbering is local to each chapter.

### Major files

- `src/App.tsx`: route composition, document titles, focus on navigation, scroll restoration, footer and unknown-route handling.
- `src/pages/`: six separate route components.
- `src/content/pandora.ts`: server facts, objective data, candidate mods, confirmed-content types and pending states.
- `src/components/Navigation.tsx`: preserved header appearance with real links, sliding route indicator and mobile disclosure.
- `src/components/Topography.tsx`: stronger canvas contour system.
- `src/components/Objectives.tsx`: objective selection, sequence diagrams and provisional rewards.
- `src/components/Players.tsx`: reusable side-bookmark dossier with optional faction switching.
- `src/components/ModBrowser.tsx`: wheel, keyboard, click and swipe navigation through the focused rail.
- `src/components/ModEnvironment.tsx`: seven abstract environments, shared with media placeholders.
- `src/hooks/useStagedSelection.ts`: interruptible content departure/arrival for Mods and future faction states. `ModAtmosphere.tsx` independently overlaps at most two environment layers.
- `src/components/Media.tsx` and `Primitives.tsx`: retained reusable media, actions, labels and objective symbols.
- `src/styles.css`: preserved common visual foundation, with unused single-page styles removed.
- `src/chapters.css`: route personalities, environmental palette and focused-browser layout.
- `tests/home.spec.ts`: route/history/refresh, interaction, responsive, accessibility and motion checks.

React Router is the only new runtime dependency in this revision. Fonts remain self-hosted. No animation framework, image service or live data infrastructure was added.

## Deployment and deep links

Build output is `dist/`. The default base path is `/`. Vercel rewrites are in `vercel.json`; `public/_redirects` supplies SPA fallback behavior for hosts that support that file. Other static hosts must serve `index.html` for these route URLs. Do not deploy on a host without configuring deep-link fallback.

For GitHub Pages specifically, add a Pages-compatible SPA fallback or prerender the route entrypoints, and set Vite's base to the repository subpath before deploying. BrowserRouter reads Vite's base; supplied public media paths must use the same base. This revision is not deployed.

## Motion and input

The hero retains the original contour concept, with blue/violet lines, stronger band variation and approximately 30 redraws per second. Pointer influence uses a wider falloff, ridge/valley displacement and eased strength/position; leaving the hero lets the deformation settle. There are no per-frame React renders. Device pixel ratio remains capped at 1.5, with offscreen and document-visibility suspension.

The Mods rail translates as one element. Neighboring entries shrink and fade; farther entries leave the clipped viewport. Keyboard input uses a single focusable ARIA listbox with Up/Down and Home/End. Previous/Next controls support touch and pointer use. A swipe is scoped to the rail, leaving the surrounding page available for normal scrolling. Wheel input accumulates a threshold, has a short momentum gate, ignores pinch-zoom/horizontal gestures and releases page scrolling at the list boundaries.

Selection moves the tower immediately. The outgoing opaque atmosphere remains underneath a 640ms incoming blend, so the backdrop never drains to black. At most two environment layers exist; animation completion removes the outgoing layer, and unmount requires no atmosphere timers. Content departs over 160ms, then title, description, media and purpose enter in a short stagger. Rapid input cancels superseded content timers. A wheel gesture remains consumed until a 180ms quiet gap or direction reversal, preventing long momentum tails from skipping multiple entries. CSS/SVG provide ridges (Tectonic), strata (Terralith), violet communication rings (Voice Chat), amber/green cultivation (Farmer's Delight), cyan horizons (Voxy), red archive frames (Replay), and violet/blue system geometry (Pandora and performance/security candidates).

Reduced motion keeps the rail correctly positioned without animated travel, shows static terrain/environment art and retains every control. Route navigation uses a short fade. Content never relies on hover. Objective diagrams explicitly describe a sequence, not live progress.

## Adding the content that is still pending

Edit `CONTENT.md` first when factual information changes, then synchronize the typed content layer.

- **Roster:** populate `roster` with confirmed names; optional `factionId`, `captain`, `description` and `quote` fields are supported. No sample players are shipped.
- **Factions:** populate `factions` with confirmed names and optional `color`/`insignia`. The existing dossier supports atmosphere changes and filtered side bookmarks.
- **Rules:** edit `src/content/rules.ts` alongside `CONTENT.md`. Seven native details/summary disclosures contain the supplied expanded rules; source section numbers are retained in data for review.
- **Setup:** `preparation` has optional `download`, `address` and `instructions`. Replace pending package statuses when these are actually ready.
- **Mods:** each entry supports a real icon and media. Keep the list marked provisional until confirmed.

## Replacing abstract media

Place mod files in `public/media/mods/` (and other site media in `public/media/`), then set `briefing.heroMedia`, `world.media` or `mods[].media`. Files in the Mods folder are served at `/media/mods/<filename>`:

```ts
{ kind: 'image', src: '/media/terrain.webp', alt: 'Describe the supplied terrain image' }
{ kind: 'animated-image', src: '/media/mod-demo.gif', stillSrc: '/media/mod-demo-still.webp', alt: 'Describe the demonstration' }
{ kind: 'video', src: '/media/flyover.webm', poster: '/media/flyover-still.webp', alt: 'Describe the flyover' }
```

GIF and animated WebP use `animated-image`, which requires a reduced-motion still. Video uses muted inline playback, native controls and a required poster; it pauses offscreen. Mod-specific environmental artwork remains independent of the media slot.

## Validation

The suite runs in installed Microsoft Edge, using Playwright and axe. It covers all six routes at widths 320, 390, 768, 1024 and 1920; desktop/mobile accessibility scans; all eight candidate-mod states; actual touch swipe input; wheel boundary release; keyboard navigation; quick consecutive selections; direct refresh and browser history; and static/offscreen terrain behavior. Screenshots are generated under `test-results/` for visual review.

These are Chromium/Edge checks, not claims of physical-device or Safari/Firefox testing.

## Intentionally pending

Final player roster, faction identities/assignments, captains, setup package, address, exact dates, objective/event tuning, final mod list, final world screenshots and trailer remain unconfirmed. No fake player data, faction colors, downloads, live scores or server monitoring are supplied. Mod previews and rule examples are now supplied and connected.


## Source discrepancies found during implementation

The authoritative brief and content file were preserved. The supporting `references/Pandora War Server (v0.2).docx` differs or offers details not finalized in those files:

- Version: DOCX says **26.3**, marked subject to change; `CONTENT.md` says **26.2**. The website uses 26.2.
- Factions: DOCX describes **two factions if the player count reaches 14 or higher**. Current content expects **about 12 players and likely three factions**. This is a different planning scenario, not a confirmed replacement.
- Captains: DOCX names people interested in leadership; current content leaves assignments TBD. No names or assignments were published.
- Timing: DOCX includes a tentative **12-hour grace period**, an hour-or-two event concept and a five-minute warning example. Current content leaves exact timing unfinalized; no timers or grace-period duration were published.
- Availability: DOCX says “available 24/7”; current content describes Exaroton auto-start/stop. The site explains the hosting behavior without claiming continuous uptime.
- Mod lists differ: the DOCX includes AppleSkin, Veinminer Enchantment and AmbientSounds candidates; current content includes other newer candidates. The site follows the current content list and explicitly labels it provisional.
- Resolved October 2: the user supplied `Pandora War Server (v0.2) (1).docx` (expanded rules) and authorized seven condensed core rules plus optional clarifications. This supersedes the previous pending-rules state. Other planning discrepancies above remain unchanged.

Recommended next step: review the refined Mods/Rules pages and provide the confirmed roster when ready. Reconcile version/timing/faction planning notes before publishing those facts as final.

## October 2 validation and source notes

Rules data is condensed from the newer expanded-rules document, with seven optional categories: Raiding & Griefing; Offline Bases; Stealing & Surrender; Traps & Spawn Camping; Alliances, Betrayal & Spying; Objectives; Admin Rulings & Server Integrity. Native summary elements support keyboard opening/closing and communicate expanded state without custom scripting.

No new rule conflict was resolved by invention. The source intentionally leaves remote unattended structures case-dependent and final independent-player rules open to pre-launch clarification. It has no fixed respawn grace timer or block-count destruction limit. Large environmental destruction remains permitted subject to server impact and purposeful warfare; it does not override offline-base or post-surrender restrictions.

The checks additionally cover background coverage during interrupted transitions, bounded environment layers, a prolonged wheel momentum gesture, seven collapsed disclosures and keyboard toggling. Supplied media stays selected-only; videos use `preload="none"`, muted inline playback and still posters under reduced motion. Screenshots are generated under `test-results/`.