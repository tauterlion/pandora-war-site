// Editorial source: CONTENT.md. Keep provisional facts explicitly qualified.
export type MediaAsset =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'animated-image'; src: string; alt: string; stillSrc: string }
  | { kind: 'video'; src: string; poster: string; alt: string };

export const navigation = [
  { id: 'overview', path: '/', label: 'Overview' },
  { id: 'war-system', path: '/war-system', label: 'War System' },
  { id: 'factions', path: '/factions', label: 'Factions' },
  { id: 'mods', path: '/mods', label: 'Mods' },
  { id: 'rules', path: '/rules', label: 'Rules' },
  { id: 'setup', path: '/setup', label: 'Setup' },
];

export const briefing = {
  title: 'PANDORA', subtitle: 'WAR SERVER', period: 'Thanksgiving break',
  intro: 'One week. A world between friends. Build your faction, contest objectives, and decide what you’re willing to risk.',
  facts: ['~12 players', 'Likely 3 factions', '2000 × 2000 blocks'],
  description: 'A private Minecraft war built around factions, territory, raids and uneasy alliances. Vanilla-leaning survival meets objectives that give every expedition something to fight for.',
  secondary: 'Roughly one week of sandbox survival between friends. Build, scout, negotiate and adapt. War Score determines the result; kills alone do not.',
  heroMedia: undefined as MediaAsset | undefined,
};

export const serverSpecs = [
  ['Edition', 'Minecraft Java'], ['Version / loader', '26.2 / Fabric'],
  ['Hosting', 'Exaroton'], ['World border', '2000 × 2000 blocks'],
  ['Planned window', 'Approx. November 21–28'], ['Runtime', 'Roughly one week'],
  ['World generation', 'Custom Tectonic + Terralith'], ['Style', 'Vanilla-leaning survival'],
];
export const serverNote = 'Exaroton can start the server when someone attempts to join and stop it after a short period of inactivity. Dates remain provisional.';

export const gameplay = [
  { title: 'Build.', text: 'Establish a base. Stockpile resources. Lay the infrastructure for plans worth keeping secret.' },
  { title: 'Compete.', text: 'Server-wide objectives put something valuable on the line. Choose your battles and earn War Score.' },
  { title: 'Adapt.', text: 'Scout, raid, trade, negotiate, betray and defend. The week will not go according to plan.' },
];

export const objectives = [
  { id: 'relic', title: 'Relic Extraction', label: 'Major objective', score: '8–10', symbol: 'relic',
    description: 'Secure the Relic. Getting it out is another story.',
    detail: 'Unlock a Relic, carry it to an extraction point, deposit it, then defend extraction. Enemies can contest and steal control. The first fight is only the beginning.',
    steps: ['Unlock', 'Carry', 'Deposit', 'Defend', 'Score'] },
  { id: 'supply', title: 'Supply Drops', label: 'Loot & opportunity', score: '1–2', symbol: 'supply',
    description: 'A temporary location. Supplies worth fighting over.',
    detail: 'Travel to a contested drop and secure valuable loot alongside a smaller War Score reward. A small victory can prepare your faction for a larger one.',
    steps: ['Travel', 'Contest', 'Secure', 'Resupply'] },
  { id: 'control', title: 'Control Points', label: 'Territory under pressure', score: '4–5', symbol: 'control',
    description: 'Take the zone. Keep the opposition outside it.',
    detail: 'Occupy a temporary capture zone to complete the objective. Opposing factions inside the zone freeze capture progress until one side regains control.',
    steps: ['Occupy', 'Contest freezes progress', 'Capture'] },
] as const;
export const warNotes = {
  tuning: 'Planned objectives · approximate rewards · subject to tuning',
  events: 'Events are planned to follow periods with enough players online, with a warning before activation and downtime between objectives. Exact timing is still being tuned.',
  bases: 'Bases are valuable raid targets for loot, information and disruption. Attacking or defending a capital does not automatically award War Score.',
};

export type ModEnvironment = 'ridges' | 'strata' | 'signal' | 'cultivation' | 'horizon' | 'archive' | 'system';
export type ModEntry = { id: string; title: string; category: string; description: string; purpose: string; tone: string; visual: string; media?: MediaAsset; icon?: { src: string; alt: string } };
export const modEnvironments: Record<string, ModEnvironment> = { tectonic: 'ridges', terralith: 'strata', voice: 'signal', farmers: 'cultivation', voxy: 'horizon', replay: 'archive', pandora: 'system', performance: 'system' };
export const mods: ModEntry[] = [
  { id: 'tectonic', media: {"kind":"video","src":"/media/mods/tectonic.mp4","poster":"/media/mods/tectonic-poster.png","alt":"Tectonic terrain preview with dramatic mountain ranges"}, title: 'Tectonic', category: 'The shape of the world', description: 'A custom terrain preset for dramatic mountains, rivers and valleys. Geography you’ll learn, remember, and use.', purpose: 'Memorable terrain. Meaningful routes. Long sightlines.', tone: 'slate', visual: 'terrain' },
  { id: 'terralith', media: {"kind":"video","src":"/media/mods/terralith.mp4","poster":"/media/mods/terralith-poster.jpg","alt":"Terralith biome and landscape preview"}, title: 'Terralith', category: 'Beyond the next ridge', description: 'More biome and world variety, while keeping Pandora broadly Minecraft-like.', purpose: 'A varied world that still feels familiar.', tone: 'moss', visual: 'terrain' },
  { id: 'voice', media: {"kind":"image","src":"/media/mods/simplevoicechat.png","alt":"Simple Voice Chat microphone over a Minecraft landscape"}, title: 'Simple Voice Chat', category: 'Within earshot', description: 'Proximity voice communication brings conversations into the world around you.', purpose: 'Talk to the people nearby. Let encounters happen naturally.', tone: 'blue', visual: 'signal' },
  { id: 'farmers', media: {"kind":"video","src":"/media/mods/farmersdelight.mp4","poster":"/media/mods/farmersdelight-poster.png","alt":"Farmer’s Delight cooking and kitchen preview"}, title: 'Farmer’s Delight', category: 'Behind every front line', description: 'Expanded farming, food preparation and cooking within the vanilla-oriented direction.', purpose: 'Farming, cooking and faction logistics.', tone: 'amber', visual: 'field' },
  { id: 'voxy', media: {"kind":"image","src":"/media/mods/voxy.jpeg","alt":"Voxy rendering distant terrain across a broad Minecraft landscape"}, title: 'Voxy / LOD Support', category: 'See the bigger picture', description: 'Long-distance terrain rendering and LOD support. The exact client/server implementation is still being tested.', purpose: 'Let Pandora’s geography extend into the distance.', tone: 'blue', visual: 'terrain' },
  { id: 'replay', media: {"kind":"image","src":"/media/mods/flashback.jpeg","alt":"Flashback camera illustration"}, title: 'ServerReplay / Flashback', category: 'After the dust settles', description: 'Planned server-wide archival recording so the week can be revisited through free-camera replay footage.', purpose: 'Keep the stories that happen here.', tone: 'slate', visual: 'signal' },
  { id: 'pandora', media: {"kind":"image","src":"/media/mods/pandora.jpg","alt":"Minecraft combat illustration for the custom Pandora mod"}, title: 'Custom Pandora Mod', category: 'The rules of engagement', description: 'A planned custom Fabric mod for factions, War Score, objectives, events, persistence and administration.', purpose: 'Connect the sandbox to Pandora’s war systems.', tone: 'slate', visual: 'field' },
  { id: 'performance', media: {"kind":"image","src":"/media/mods/performance.png","alt":"Security shield beside a Minecraft character"}, title: 'Performance & Security', category: 'Behind the scenes', description: 'Additional server-side performance, anti-exploit, anti-Xray, audit and stability mods may be used. The selection is not final.', purpose: 'Support performance, fairness and stability.', tone: 'blue', visual: 'field' },
];

export const playerPreview = {
  title: 'Friends first.\nFactions soon.',
  description: 'Approximately twelve players. Likely three factions. Who stands beside you is still to be decided.',
  bookmarks: [
    { id: 'factions', label: 'Factions', status: 'Identities to be decided', text: 'Faction names, colors, insignias and assignments have not been finalized. This dossier opens once they are.' },
    { id: 'roster', label: 'Player roster', status: 'Roster to be confirmed', text: 'Player names and faction assignments will appear here once confirmed.' },
    { id: 'captains', label: 'Captains', status: 'Leadership to be decided', text: 'Captain assignments are undecided. Pandora does not otherwise require strict player roles.' },
  ],
};

export const world = {
  size: '2000 × 2000 blocks', title: 'Every route\nis a decision.',
  description: 'Mountain spines. Rivers. Chokepoints. Forests that conceal, valleys that connect. A world designed for scouting, movement and bases hidden beneath the surface.',
  generation: 'Custom Tectonic + Terralith', media: undefined as MediaAsset | undefined,
};
export const preparation = {
  status: 'Not yet deployed',
  intro: 'The preparation package will be available before the server begins. The client pack, instructions and connection details are still being finalized.',
  contents: ['Client / modpack download', 'Step-by-step installation instructions', 'Server connection information', 'Required mod verification', 'Voice chat testing', 'Troubleshooting / FAQ'],
  download: undefined as { url: string; label: string } | undefined,
  address: undefined as string | undefined,
  instructions: [] as { title: string; body: string }[],
};
export const overviewClosing = {
  title: 'Before it begins.',
  text: 'The war has not begun. Faction assignments are pending, and the preparation package is still being assembled. Get to know the systems, read the principles, and find your way through the briefing.',
  paths: [
    { path: '/war-system', title: 'War System', detail: 'Understand what is worth fighting for.' },
    { path: '/factions', title: 'Factions', detail: 'The people. The sides still to be decided.' },
    { path: '/rules', title: 'Rules', detail: 'An understanding between friends.' },
    { path: '/setup', title: 'Setup', detail: 'Your preparation package, coming soon.' },
  ],
};
export type Player = { id: string; name: string; factionId?: string; captain?: boolean; description?: string; quote?: string };
export type Faction = { id: string; name: string; color?: string; insignia?: string };
// Intentionally empty. Insert only user-confirmed identities and assignments.
export const roster: Player[] = [];
export const factions: Faction[] = [];
