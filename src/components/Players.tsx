import { useState } from 'react';
import type { CSSProperties } from 'react';
import { factions, playerPreview, roster } from '../content/pandora';
import { useStagedSelection } from '../hooks/useStagedSelection';
import { SectionLabel } from './Primitives';

export function Players() {
  const [selected, setSelected] = useState<string | null>(null);
  const factionState = useStagedSelection<string | null>(factions[0]?.id ?? null);
  const faction = factions.find((item) => item.id === factionState.displayed);
  const players = faction ? roster.filter((item) => item.factionId === faction.id) : roster;
  const player = players.find((item) => item.id === selected);
  const bookmark = playerPreview.bookmarks.find((item) => item.id === selected);
  return <section className={'section players faction-dossier phase-' + factionState.stage} aria-labelledby="players-title" style={{ '--faction-color': faction?.color ?? '#8b94a2' } as CSSProperties}>
    <div className="faction-atmosphere" aria-hidden="true">{faction?.insignia && <img src={faction.insignia} alt="" />}</div>
    <SectionLabel number="FACTIONS">The people make the war</SectionLabel>
    <div className="player-layout"><div><span className="eyebrow muted">The faction dossier</span><h1 id="players-title">{playerPreview.title}</h1><p>{playerPreview.description}</p>{factions.length ? <div className="faction-switcher" aria-label="Choose faction">{factions.map((item) => <button key={item.id} aria-pressed={item.id === factionState.selected} onClick={() => { setSelected(null); factionState.select(item.id); }}>{item.name}</button>)}</div> : <div className="roster-pending"><p>Player roster will be added soon.</p><p>Faction assignments have not been decided yet.</p></div>}</div>
      <div className="dossier">
        <div className="dossier-sheet" aria-live="polite" id="dossier-content">
          {player ? <div className="state-enter" key={player.id}><span className="eyebrow">{faction?.name ?? 'Faction pending'}</span><h2>{player.name}</h2>{player.captain && <span className="eyebrow">Captain</span>}{player.description && <p>{player.description}</p>}{player.quote && <blockquote>{player.quote}</blockquote>}</div>
            : bookmark ? <div className="state-enter" key={bookmark.id}><span className="eyebrow">{bookmark.label}</span><h2>{bookmark.status}</h2><p>{bookmark.text}</p></div>
            : <div><span className="dossier-placeholder" aria-hidden="true">—</span><p>A story without sides.<br /><span className="muted">For now.</span></p></div>}
        </div>
        <div className="bookmarks" aria-label="Dossier bookmarks">{players.length ? players.map((item) => <button key={item.id} aria-controls="dossier-content" aria-expanded={selected === item.id} onClick={() => setSelected(selected === item.id ? null : item.id)}><span>{item.name}<small>{factions.find((group) => group.id === item.factionId)?.name ?? 'Faction pending'}</small></span><span aria-hidden="true">{selected === item.id ? '−' : '+'}</span></button>) : playerPreview.bookmarks.map((item) => <button key={item.id} aria-controls="dossier-content" aria-expanded={selected === item.id} onClick={() => setSelected(selected === item.id ? null : item.id)}>{item.label}<span aria-hidden="true">{selected === item.id ? '−' : '+'}</span></button>)}</div>
      </div>
    </div>
    <div className="faction-footer eyebrow"><span>Names. Allegiances. Stories.</span><span>Awaiting the people who will write them.</span></div>
  </section>;
}
