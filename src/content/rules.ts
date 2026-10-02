// Condensed from references/Pandora War Server (v0.2) (1).docx, supplied October 2.
// Core wording follows the user's refinement request; source sections are retained for review.
export const coreRules = [
  { title: 'Play fair', text: 'No cheating, X-ray, hacked clients, duping, abusive exploits, or anything that gives you an unfair advantage.' },
  { title: 'Don’t combat log', text: 'If you are actively fighting or being pursued, do not disconnect to avoid the outcome.' },
  { title: 'Fight with a purpose', text: 'PvP, raids, stealing, spying, alliances, betrayal, and sabotage are part of Pandora. Pointless destruction and excessive griefing are not.' },
  { title: 'Respect offline players', text: 'Do not use another faction’s absence to raid, destroy, or empty their base. Offline time is not a free strategic advantage.' },
  { title: 'Don’t abuse objectives', text: 'Do not use bugs, glitches, loopholes, or unintended mechanics to bypass how an objective is meant to work.' },
  { title: 'No spawn camping', text: 'Do not repeatedly kill players immediately after they respawn or prevent them from reasonably recovering.' },
  { title: 'Keep it between friends', text: 'Pandora is competitive, but it is still a server between friends. Keep the war inside Minecraft, not in your friendships.' },
];

export const ruleClarifications = [
  {
    id: 'raiding', title: 'Raiding & Griefing', sourceSections: [3, 5, 16, 17],
    paragraphs: [
      'Raid a base while it is actively defended or faction members are present and able to respond. Breaking entry points, disabling defenses, stealing resources, damaging strategic equipment, and sabotaging useful systems are legitimate parts of a raid.',
      'When defenders surrender, retreat, or meaningful fighting ends, stop further destruction unless there is a specific strategic reason. Leveling buildings, destroying remaining chests, killing animals without purpose, or damaging bedrooms just to make recovery harder is excessive. There is no fixed block-count limit; context matters.',
      'Terrain can change: trenches, tunnels, bridges, route demolition, and clearing sightlines all belong in the war. Large-scale environmental destruction is encouraged as long as it does not negatively affect the server. Farms, animals, transport, and production infrastructure may be targeted when doing so has real strategic value.',
    ],
  },
  {
    id: 'offline', title: 'Offline Bases', sourceSections: [4],
    paragraphs: [
      'Pandora should not reward whoever stays online longest. Do not enter an unattended faction base or use its owners’ absence to erase, cripple, or empty it. Offline time is not a substitute for winning a raid.',
      'Normal observation from outside is allowed: watch travel routes and roads, notice entrances and nearby builds, and identify exposed infrastructure.',
      'An exposed farm, road, outpost, boat, or minor structure away from the main base may be treated differently depending on the situation. If you are unsure whether something counts as an active faction base, ask the server manager.',
    ],
  },
  {
    id: 'stealing', title: 'Stealing & Surrender', sourceSections: [6, 7],
    paragraphs: [
      'Taking weapons, armor, food, tools, materials, valuables, or objective items through legitimate gameplay is allowed. After taking meaningful loot, emptying every chest of basic blocks, seeds, junk, and rebuilding supplies solely to force a faction to restart is usually excessive.',
      'A clearly communicated surrender ends active resistance. Stop unnecessary killing and escalating destruction, allow recovery, finish reasonable looting or withdrawal, and leave within a reasonable time.',
      'Surrender does not require returning stolen items or instantly leaving, and it does not magically protect everything after a loss. It also does not permit uncontested demolition. Different surrender terms may be honored voluntarily if both sides agree.',
    ],
  },
  {
    id: 'traps', title: 'Traps & Spawn Camping', sourceSections: [8, 9],
    paragraphs: [
      'Tactical traps for defense, ambushes, protecting valuable areas, or delaying pursuers are allowed. Do not trap beds, spawn locations, required server infrastructure, or areas players have no reasonable way to avoid. Traps must not primarily abuse respawning or make an area permanently unusable.',
      'Do not create repeated deaths immediately after respawning, trap players in bedrooms, or prevent reasonable equipment recovery. There is no fixed grace timer; recovery depends on the situation.',
      'Move away from bedrooms and respawn points once the immediate fight ends. You may help teammates still fighting elsewhere or finish searching and withdrawing during a raid, while leaving defenders enough room to recover.',
    ],
  },
  {
    id: 'diplomacy', title: 'Alliances, Betrayal & Spying', sourceSections: [10, 11, 12, 18],
    paragraphs: [
      'Alliances may be formal, informal, temporary, secret, or conditional. Trading, sharing intelligence, coordinating attacks, and betrayal are allowed. Breaking an alliance does not require admin approval. Factions keep separate War Score unless the server manager explicitly says otherwise; helping an ally does not automatically award the same score.',
      'Gather intelligence through normal gameplay: follow players, observe routes or construction, discover entrances, listen to nearby proximity voice chat, and remember coordinates you found yourself. Do not use X-ray, spectator exploits, unauthorized maps, private files, someone else’s account or screen, or administrative tools to gain an advantage.',
      'Keep private real-world information and personal arguments outside the war. Do not pressure people outside the game for coordinates, passwords, plans, screenshots, or secrets. Access to devices, accounts, screens, or private messages is not permission to use their information unless intentionally shared as part of the game. Joking and trash talk depend on everyone being comfortable.',
      'Independent players follow the same rules and do not automatically earn faction War Score. Independence cannot be a loophole for extra faction membership, faction restrictions, scoring manipulation, or repeated allegiance switches. Final independent-player rules may still be clarified before launch.',
    ],
  },
  {
    id: 'objectives', title: 'Objectives', sourceSections: [13, 14],
    paragraphs: [
      'Fight within the mechanic: ambush approaches, intercept a relic, steal control, block routes, defend extraction, build temporary fortifications, attack departing reward carriers, cooperate, or betray an ally during an event.',
      'Do not bypass the mechanic with terrain clipping, unintended movement, unreachable objective placement, duplication, broken scripts or triggers, disconnect or chunk exploits, or bugs that skip capture requirements. Report objective bugs instead of building a strategy around them. Ask if an interaction is questionable.',
    ],
  },
  {
    id: 'rulings', title: 'Admin Rulings & Server Integrity', sourceSections: [1, 2, 15, 19, 20],
    paragraphs: [
      'Do not intentionally cause lag, crashes, corruption, or severe performance problems through lag machines, uncontrolled entities, abusive chunk loading, packets, redstone, or TNT. A legitimate build that accidentally causes performance problems may need to change.',
      'Admin powers and privileged information are for maintenance and investigations, never personal war advantage. Logs, replay footage, inventories, spectator tools, maps, and console information may be reviewed for cheating, disputes, bugs, or accidental destruction; they must not be used casually for intelligence.',
      'Accidents and misunderstandings are different from deliberate abuse. A crash or connection failure is not automatically combat logging: rejoin when reasonably possible and explain if needed. Accidentally finding a bug is not automatically cheating; repeatedly exploiting its unfair advantage is.',
      'The server manager may address conduct against fair play even if the exact action is not listed. Responses can include warnings, stopping or reversing actions, returning items, repairs or rollbacks, War Score corrections, removing unfair advantages, temporary restrictions, and stronger action for repeated or deliberate violations.',
    ],
  },
];
