# PANDORA WAR SERVER — WEBSITE BRIEF

## What Pandora is

Pandora is a roughly one-week private Minecraft Java war server for a friend group, planned for Thanksgiving break.

This is **not** a public Minecraft server, commercial network, generic PvP server, or esports product.

The experience is built around factions, territorial development, player-built bases, scouting, raids, alliances and betrayal, server-wide objectives, War Score, proximity voice chat, unusual terrain, long sightlines, and emergent stories between friends.

Kills alone do not determine the result of the war.

The website exists primarily as the **official information hub** for the players. At the current stage it does **not** need live server APIs, online-player tracking, live War Score, live maps, current-event telemetry, or server-monitoring widgets. Those systems may be added later.

## Product identity

The site should feel like an:

> **interactive digital war dossier / campaign briefing**

It should feel unusually polished and substantial for a private Minecraft server. A good first-time reaction is: “Wait, you made all of this for a Minecraft server between friends?”

The site should be fun to explore even when the visitor already knows the information.

### The site IS

- cinematic
- dark
- tense
- interactive
- atmospheric
- large-feeling
- readable
- informative
- tactile
- playful in its interactions

### The site IS NOT

Do not make it look like:

- a generic Minecraft server landing page
- a hosting-company template
- an admin control panel
- a SaaS dashboard
- a wiki
- an esports scoreboard
- a neon “gamer” site
- a military-simulator parody
- a page made entirely of boxed cards
- a fake live-status dashboard

Do not invent live statistics to make the interface look fuller.

## Visual identity

Use a dark, restrained foundation: near-black, charcoal, dark gray, off-white text, and subtle neutral accent tones.

Faction colors should become prominent only in faction-specific contexts. Avoid flooding the whole site with saturated red, blue, or green.

Good recurring visual motifs:

- topographic contour lines
- coordinate grids
- terrain-map forms
- subtle film grain/noise
- faint moving gradients
- tactical ticks / scale marks
- large translucent typography
- semi-transparent faction insignias
- subtle depth/parallax

The site must look intentional even before final Minecraft screenshots are available.

Real Pandora screenshots, GIFs, WebP animations, or short muted videos will be added later and should be replaceable without changing the underlying layout.

## Motion philosophy

The website should feel **alive**, but not hyperactive.

### Ambient motion

Always present, very subtle.

Examples:

- topographic lines slowly deform or propagate in waves
- gradients drift slowly through the background
- very mild parallax
- faint grain movement
- gradual lighting or accent shifts

The visitor should feel movement before consciously noticing it.

### Interaction motion

Triggered by hover, focus, click, scroll, or pointer movement.

Examples:

- buttons rise a few pixels
- buttons scale slightly
- borders brighten
- arrows or icons shift
- navigation indicators slide
- side bookmarks extend outward
- panels unfold or slide instead of abruptly appearing
- icons react subtly to hover
- nearby topographic lines gently displace around the pointer

The cursor effect should feel like pressing into a flexible terrain map, not like a particle trail.

### Cinematic transitions

Reserve these for larger state changes:

- switching factions
- opening/closing a player bookmark panel
- entering the Featured Mods browser
- changing major sections or visual states

Use them sparingly so they stay meaningful.

### Reduced motion

All motion must respect `prefers-reduced-motion`. Important content and navigation must remain fully usable with motion disabled.

## Hero concept

The homepage should open with a large, central:

```text
PANDORA
WAR SERVER
```

The title should feel enormous.

Behind it, use an animated topographic field or similar abstract terrain treatment. It may slowly shift in wave-like patterns, react subtly to pointer movement, use parallax, and later fade into real terrain imagery.

Possible supporting facts:

```text
THANKSGIVING BREAK
~12 PLAYERS
LIKELY 3 FACTIONS
2000 × 2000
```

The hero should include a short explanation of Pandora and one or two strong actions such as:

- How the War Works
- Server Info
- Read Rules
- Setup

Do not put live server statistics in the hero.

## Information architecture

Current major content areas:

- Overview
- Players / Factions
- Game Logic / War System
- Rules
- Server Information
- Setup / Installation
- Featured Mods / What Pandora Adds
- FAQ

Not every area must be a top-level navigation item.

A likely navigation set is:

```text
Overview
Players
War System
Rules
Server
Setup
```

Featured Mods may live under Setup or “What Pandora Adds.” FAQ may be part of Setup rather than top-level navigation.

## Homepage direction

A likely homepage structure:

```text
HERO
↓
WHAT IS PANDORA?
↓
SERVER INFORMATION
↓
HOW THE WAR WORKS
↓
OBJECTIVES
↓
PLAYERS / FACTIONS PREVIEW
↓
THE WORLD
↓
WHAT PANDORA ADDS / FEATURED MODS
↓
RULES PREVIEW
↓
PREPARE FOR THE WAR / SETUP
```

This order is not immutable.

Prefer large sections, strong typography, generous spacing, and visual rhythm over a dense grid of cards. The homepage should preview deeper content rather than duplicate entire pages.

## Players / factions concept

Keep the default player presentation deliberately simple.

At rest, a player only needs:

```text
Player Name
Faction
```

Potentially `Captain` if captains are part of the final organization.

Do **not** create twelve large permanent profile cards.

### Preferred interaction

Once factions are finalized, selecting a faction may alter the page atmosphere:

- faction-colored haze enters subtly from one or both sides
- background topographic lines inherit a faint faction tint
- a large semi-transparent faction insignia sits partially off-screen
- player names appear as small side “bookmarks” or tabs

Conceptually:

```text
                         ┌ MARCO
                         ├ LUCAS
                         ├ ALEJANDRO
                         └ SHANE
```

Hovering a bookmark should extend it slightly. Clicking a bookmark can slide open a compact information panel.

Possible expanded content:

```text
Name
Faction
Captain status
optional short description later
optional quote later
```

Do not invent biographies.

### Faction switching

A faction switch can feel cinematic:

1. old faction color recedes
2. the interface briefly returns toward neutral
3. the new faction color fades in
4. insignia changes
5. bookmark set transitions

Aim for roughly 400–600 ms for this type of transition unless testing suggests otherwise.

## Featured Mods experience

The Featured Mods area should **not** be a normal card grid.

Use an interaction inspired by the PlayStation XMB or media browsers.

Concept:

```text
TECTONIC

SIMPLE VOICE CHAT

> FARMER'S DELIGHT

VOXY

SERVER REPLAY
```

The selected item expands or reveals a companion panel containing:

```text
Icon
Mod name
Short description
Why Pandora uses it
GIF / PNG / WebP / short muted video
```

Example:

```text
FARMER'S DELIGHT

Expands Minecraft's farming and cooking systems while
remaining compatible with Pandora's vanilla-oriented design.

Used for:
• Farming
• Cooking
• Faction logistics
```

Selecting a mod may subtly alter the section's background treatment.

Possible mood directions:

- Tectonic → slate / earthy
- Simple Voice Chat → subdued blue or purple
- Farmer's Delight → warm amber / green
- Voxy → cold blue
- ServerReplay → muted red / gray

These are suggestions, not locked palette values. The dark base palette should remain dominant.

Future media examples:

- Tectonic → mountain flyover
- Simple Voice Chat → proximity voice indicators
- Farmer's Delight → cooking/farming sequence
- Voxy → long-distance terrain reveal
- ServerReplay → free-camera replay shot

Until real media exists, use tasteful abstract placeholders—not fake Minecraft screenshots.

## War System presentation

The website should explain mechanics clearly without becoming a wall of text.

Major subjects currently include:

- War Score
- Events
- Relic Extraction
- Supply Drops
- Control Points
- Factions
- Alliances
- Independent players
- Raids / bases

Illustrative diagrams are encouraged.

Example for Relic Extraction:

```text
RELIC APPEARS
      ↓
UNLOCK
      ↓
CARRY
      ↓
DEPOSIT
      ↓
DEFEND EXTRACTION
      ↓
SCORE
```

War Score primarily comes from objectives and strategic server actions. Raw kills are intentionally not the primary victory system.

## Bases and capitals

Players are expected to build meaningful bases, with underground construction being especially likely.

Bases are part of the sandbox war.

A capital/base raid does **not** automatically grant War Score.

A major enemy base should be understood more like a persistent, player-created high-value raid target:

- valuable resources
- information
- strategic value
- raid opportunities

Players may hide entrances, build tunnels, create escape routes, move resources, spy on travel patterns, raid opposing bases, and relocate important storage or infrastructure.

The site should not imply that “capturing a capital” is automatically a score-bearing objective.

## Rules presentation

The homepage should show only a condensed rules preview.

The full Rules experience can contain:

### Core Rules
Short, scannable rules.

### Expanded Rules
Examples, edge cases, and explanations.

Expanded rules should distinguish between legitimate warfare and behavior whose main purpose is ruining another player's experience.

A useful design philosophy:

> Conflict is expected. Ruining somebody's week isn't.

Use the actual player document in `references/` for finalized wording when available.

## Server information presentation

Server information should be static, clear, and easy to scan.

Potential fields:

```text
Version
Loader
Host
World Border
Runtime
Dates
World Generation
Style
Auto-start behavior
Auto-shutdown behavior
```

This should look like technical information, not a live operations dashboard.

## Setup / installation

The Setup area should eventually make joining the server straightforward.

Possible flow:

```text
STEP 1
Install/download the Pandora client pack

STEP 2
Launch Minecraft and verify the required version

STEP 3
Verify required mods

STEP 4
Connect to Pandora

STEP 5
Test proximity voice chat
```

GitHub Releases may eventually distribute the client modpack, Pandora custom mod, configuration files, resource pack, and setup notes.

Do not assume those artifacts exist yet.

## Current media status

Final website imagery does not exist yet.

Do not block the design on screenshots.

The site should use replaceable abstract placeholders until real media is supplied.

Future desired media may include:

- overhead world/map image
- mountain vista
- river/canyon
- open plains
- forest/cherry biome
- underground base-style shot
- objective-like locations
- mod demonstrations
- trailer/media assets

## Technical design principles

The implementation should:

- be responsive
- work well on desktop and mobile
- maintain smooth animation
- avoid unnecessary dependencies
- use reusable components
- keep content/data separate from presentation where reasonable
- make media easy to replace
- leave room for future API integration
- support future GitHub-hosted downloads/releases
- preserve accessibility
- support keyboard focus states
- respect reduced-motion preferences

Do not build live API infrastructure unless explicitly requested.

## Content status / TBD policy

The following may still be TBD and should not be invented:

- final faction names
- final faction colors
- final faction icons
- final player assignments
- final captains
- player descriptions
- server address
- final dates
- final mod list
- final screenshots
- trailer
- live War Score implementation
- live website API

The site should gracefully support these being filled in later.

## Overall design test

Before committing to a major UI decision, ask:

> Does this make Pandora feel larger, more atmospheric, and more fun to explore?

Then ask:

> Does this still make the information easy for the players to actually find?

Both should be true.
