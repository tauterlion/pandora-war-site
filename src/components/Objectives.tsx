import { useState } from 'react';
import { objectives, warNotes } from '../content/pandora';
import { ObjectiveSymbol, SectionLabel } from './Primitives';

export function Objectives() {
  const [selected, setSelected] = useState<string>('relic');
  const objective = objectives.find((item) => item.id === selected)!;
  return <section className="section objectives" aria-labelledby="objectives-title">
    <SectionLabel number="02">Points of conflict</SectionLabel>
    <div className="section-heading"><h2 id="objectives-title">Something worth<br />fighting for.</h2><p>{warNotes.tuning}</p></div>
    <div className="objective-select" aria-label="Explore planned objectives">
      {objectives.map((item, index) => <button key={item.id} className={`objective-choice ${item.id === selected ? 'selected' : ''}`} aria-pressed={item.id === selected} aria-controls="objective-detail" onClick={() => setSelected(item.id)}>
        <span className="eyebrow">0{index + 1} / {item.label}</span><ObjectiveSymbol type={item.symbol} /><h3>{item.title}</h3><p>{item.description}</p><span className="objective-score">~{item.score}<span> WAR SCORE</span></span><span className="choice-arrow" aria-hidden="true">↗</span>
      </button>)}
    </div>
    <div id="objective-detail" className="objective-detail" aria-live="polite">
      <div key={selected} className={`state-enter sequence-${selected}`}><span className="eyebrow">{objective.title} / The sequence</span><div className="objective-diagram" aria-hidden="true"><ObjectiveSymbol type={objective.symbol} /><svg viewBox="0 0 700 110" fill="none"><path className="diagram-track" d="M25 55H675" /><path className="diagram-pulse" d="M25 55H675" />{objective.steps.map((step, index) => <g key={step}><circle cx={25 + index * (650 / (objective.steps.length - 1))} cy="55" r="12" /><path d={`M${25 + index * (650 / (objective.steps.length - 1))} 32V16`} /></g>)}</svg></div><ol className="objective-flow">{objective.steps.map((step) => <li key={step}>{step}</li>)}</ol><p>{objective.detail}</p><span className="diagram-caption eyebrow">Sequence illustration / Not live progress</span></div>
    </div>
    <p className="small-note">{warNotes.events}</p>
  </section>;
}
