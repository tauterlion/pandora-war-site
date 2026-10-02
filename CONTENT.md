# Pandora Website — Current Content

This file contains the current factual website content and known gameplay details.

If something is marked TBD, do not invent it.

## Server

- **Game:** Minecraft Java Edition
- **Version:** 26.2
- **Loader:** Fabric
- **Host:** Exaroton
- **World border:** 2000 × 2000 blocks
- **Runtime:** roughly one week
- **Planned period:** approximately November 21–28
- **Player count:** approximately 12
- **Likely faction count:** 3
- **Style:** vanilla-leaning survival with selected mods and custom game systems
- **PvP:** allowed
- **Safe zones:** none currently planned
- **World generation:** custom Tectonic preset + Terralith

Exaroton can auto-start when someone attempts to join and auto-stop after a short period of inactivity.

Do not present those behaviors as live status.

## Website purpose

The current website is an information hub.

It should help players understand:

- what Pandora is
- who is playing
- faction assignments once decided
- team captains once decided
- general rules
- expanded rules / edge cases
- server information
- featured mods
- game logic
- objectives
- War Score
- setup / installation

The site currently does **not** need:

- online/offline status
- current player count
- current event
- current War Score
- live map data
- player coordinates
- inventory data
- base locations
- any other live telemetry

## Players

TBD.

Preferred default website presentation:

- player name
- faction
- captain status if relevant

Optional expanded player information may be added later.

Do not invent biographies.

## Factions

Final faction identities are TBD.

Current expectation: likely 3 factions if the planned player count remains around 12.

Alliances are allowed.

Allied factions do **not** automatically share War Score.

Players may leave a faction and become independent, but faction switching is not currently intended to be freely available.

Independent players do not contribute to a faction's War Score.

Exact rules should be verified against the current player-facing document before publication.

## Team Captains

TBD.

The server does not otherwise require strict class/role structures.

If captains are used, present them as organization/leadership information, not as a special combat class.

## War Score

Pandora is not simply “kill the other team.”

War Score is primarily earned through server-wide objectives and other defined strategic systems.

Raw player kills should not be presented as the main victory condition.

### Relic Extraction

- Major objective
- Approximate reward: **8–10 War Score**
- High-value recurring event
- Basic flow:

```text
Unlock
↓
Carry
↓
Deposit
↓
Defend extraction
↓
Score
```

Enemies can contest and steal control.

Exact timing and steal-progress rules may still be tuned.

### Supply Drop

- Temporary contested loot location
- Approximate reward: **1–2 War Score**
- Also contains valuable loot
- Intended to create movement and smaller fights

### Control Point

- Temporary capture zone
- Approximate reward: **4–5 War Score**
- Contesting factions freeze capture progress
- Likely more common than Relic Extraction

## Events

Current concept:

- events occur after enough players have been online for a while
- players receive a warning before activation
- the event type/location is revealed around activation
- events are separated by downtime so the server is not permanently in objective mode

Exact timers are not finalized.

Do not invent exact countdowns unless supplied later.

## Bases / capitals

Faction bases/capitals are meaningful sandbox targets.

Important clarification:

**Attacking or defending a capital does not automatically award War Score.**

A major base is closer to a persistent player-created high-value raid target.

Reasons to raid include:

- loot
- resources
- information
- strategic disruption

Players may hide bases underground, conceal entrances, build tunnels, create escape routes, and relocate important resources.

Do not describe capitals as automatic score objectives.

## Rules — current high-level principles

Use the player-facing DOCX in `references/` for exact published wording once it is added.

Current known principles include:

- no cheating
- no X-ray
- no hacked clients
- no duping
- no abusive exploits
- no combat logging
- PvP is part of the server
- limited stealing, spying, alliances, and betrayal are allowed once the war begins
- legitimate raid damage is allowed
- pointless/excessive griefing is not
- avoid unfair griefing while people are unavailable
- do not abuse objective mechanics
- no spawn camping
- use common sense

Useful guiding phrase:

> Conflict is expected. Ruining somebody's week isn't.

## Featured Mods / systems

### Tectonic
Custom terrain generation. Pandora uses a customized preset designed for dramatic terrain, mountains, river systems, valleys, and memorable geography.

### Terralith
Adds biome/world variety while keeping the server broadly Minecraft-like.

### Simple Voice Chat
Provides proximity voice communication.

### Farmer's Delight
Expands farming, food preparation, and cooking while remaining compatible with the vanilla-oriented direction.

### Voxy / LOD Server Support
Used for long-distance terrain rendering / LOD-related functionality.

Exact client/server implementation is still being tested.

### ServerReplay / Flashback
Planned for server-wide archival recording so the week can be revisited later in free-camera replay footage.

### Performance / security mods
Additional server-side performance, anti-exploit, anti-Xray, audit, and stability mods may be used.

### Custom Pandora mod
Planned custom Fabric mod for Pandora-specific game logic such as factions, War Score, objectives, event systems, persistence, and administration.

Final mod list is TBD.

## World

Current border target:

**2000 × 2000**

The map is intended to emphasize:

- large sightlines
- forests as concealment rather than total coverage
- rivers
- chokepoints
- mountain spines
- valleys
- memorable landmarks
- underground bases
- scouting routes
- strategic movement

Final screenshots/media are TBD.

## Setup / installation

Final setup flow is TBD.

The eventual website may include:

- modpack/client download
- setup instructions
- server connection information
- voice-chat test instructions
- FAQ
- GitHub Release links

Do not invent download URLs or server addresses.

## Media

Final website screenshots do not exist yet.

Use abstract placeholders until real media is supplied.

Desired future media may include:

- terrain flyovers
- dramatic mountain/riverscape screenshots
- map/overview imagery
- mod demonstration GIFs or short videos
- underground/base imagery
- objective-location imagery
- trailer assets

## Known TBD items

Do not invent:

- final faction names
- final faction colors
- final faction icons
- final player assignments
- final captain assignments
- player bios
- final server IP/address
- final exact dates
- final mod list
- final objective tuning
- final event timing
- final screenshots
- trailer assets
- live website API

## October 2 rules and media update

The user supplied the expanded rules and authorized a condensed Rules page. For rules, `references/Pandora War Server (v0.2) (1).docx` supersedes the older reference and the earlier “once added” / pending wording above. `src/content/rules.ts` contains seven core rules and seven optional clarification groups, with source section numbers for review.

Clarifications cover raids/griefing, offline bases, stealing/surrender, traps/spawn camping, alliances/betrayal/spying, objectives, and admin rulings/server integrity. Remote unattended structures remain case-dependent; ask the server manager when uncertain. Final independent-player details remain subject to clarification before launch. Do not invent fixed recovery timers, destruction limits, or penalties.

The supplied mod images and three videos are now available under `public/media/mods/` and connected to all eight candidate entries. They are mod previews/illustrations, not proof of the final Pandora map. Final world screenshots and trailer remain pending.
