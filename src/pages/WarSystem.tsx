import { gameplay, warNotes, world } from '../content/pandora';
import { Objectives } from '../components/Objectives';
import { SectionLabel } from '../components/Primitives';
import { Media } from '../components/Media';
export function WarSystem() {
  return <div className="war-page">
    <section className="section chapter-opening"><SectionLabel number="WAR SYSTEM">The shape of conflict</SectionLabel><h1>Make every<br /><span>move matter.</span></h1><p>Build your position. Choose your battles. Adapt to what comes next.</p><div className="tactical-line" aria-hidden="true"><i /><i /><i /><i /><i /></div></section>
    <section className="section war" aria-labelledby="war-title"><SectionLabel number="01">How the war works</SectionLabel><h2 id="war-title" className="sr-only">Build, compete, adapt</h2><div className="gameplay">{gameplay.map((item, index) => <article key={item.title}><span className="eyebrow">/ 0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div className="score-statement"><span className="eyebrow">The deciding factor</span><p>War Score determines the result.<br /><span>Kills alone do not.</span></p><span className="statement-cross" aria-hidden="true">+</span></div></section>
    <Objectives />
    <section className="section war-ground"><SectionLabel number="03">Between the objectives</SectionLabel><div className="world-composition"><Media asset={world.media} label="Terrain study / Not a world map" /><div className="world-copy"><h2>{world.title}</h2><p>{world.description}</p><p>{warNotes.bases}</p></div></div></section>
  </div>;
}
