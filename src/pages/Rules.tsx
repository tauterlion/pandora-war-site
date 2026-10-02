import { coreRules, ruleClarifications } from '../content/rules';
import { SectionLabel } from '../components/Primitives';

export function Rules() {
  return <div className="rules-page section">
    <SectionLabel number="RULES">An understanding between friends</SectionLabel>
    <div className="rules-opening"><span className="eyebrow">The principle</span><h1>Conflict is expected.<br /><span>Ruining somebody’s<br />week isn’t.</span></h1><p>Seven rules everyone should know. Details when you need them.</p></div>
    <div className="rules-document"><aside><a href="#core-rules">01 / Core rules</a><a href="#expanded-rules">02 / Optional clarifications</a><span className="eyebrow muted">Read the essentials.<br />Play with purpose.</span></aside><div>
      <section id="core-rules"><SectionLabel number="01">Core rules / Read before playing</SectionLabel>{coreRules.map((rule, index) => <article className="rule-entry" key={rule.title}><span className="eyebrow">0{index + 1}</span><div><h2>{rule.title}</h2><p>{rule.text}</p></div></article>)}</section>
      <section id="expanded-rules" className="expanded-rules"><SectionLabel number="02">Optional clarifications</SectionLabel><h2>When the situation gets complicated.</h2><p>Examples and edge cases from the expanded rules. Open only what you need.</p>{ruleClarifications.map((rule) => <details className="rule-clarification" key={rule.id}><summary>{rule.title}<span aria-hidden="true">+</span></summary><div>{rule.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></details>)}</section>
    </div></div>
  </div>;
}
