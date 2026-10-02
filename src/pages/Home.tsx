import { Link } from 'react-router-dom';
import { briefing, overviewClosing, serverNote, serverSpecs } from '../content/pandora';
import { Action, SectionLabel } from '../components/Primitives';
import { Topography } from '../components/Topography';
import { Media } from '../components/Media';

export function Home() {
  return <div className="overview-page">
    <section className="hero" id="overview" aria-labelledby="hero-title">
      {briefing.heroMedia && <Media asset={briefing.heroMedia} className="hero-media" />}
      <Topography />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-topline eyebrow"><span>A private Minecraft campaign</span><span>{briefing.period} <span className="tiny-cross">+</span></span></div>
      <div className="hero-title"><span className="hero-overline eyebrow">Build. Compete. Adapt.</span><h1 id="hero-title">{briefing.title}</h1><div className="hero-subtitle"><span />{briefing.subtitle}<span /></div></div>
      <div className="hero-bottom"><div className="hero-copy"><p>{briefing.intro}</p><div className="actions"><Action href="/war-system">How the war works</Action><Action href="#server" secondary>Server info</Action></div></div><div className="hero-facts">{briefing.facts.map((fact) => <span key={fact}>{fact}</span>)}</div></div>
      <a className="hero-scroll eyebrow" href="#introduction"><span aria-hidden="true">↓</span> Open the briefing<span>Overview / Begin here</span></a>
    </section>
    <section id="introduction" className="section introduction" aria-labelledby="intro-title"><SectionLabel number="01">This is Pandora</SectionLabel><div className="intro-layout"><h2 id="intro-title">One week.<br />Long memories.</h2><div><p className="lead">{briefing.description}</p><p>{briefing.secondary}</p><div className="inline-tags"><span>Private friend group</span><span>Sandbox survival</span><span>PvP enabled</span></div></div></div></section>
    <section id="server" className="section server" aria-labelledby="server-title"><SectionLabel number="02">Field specifications</SectionLabel><div className="server-layout"><div><h2 id="server-title">The ground<br />we stand on.</h2><p>Server information.<br />The essentials, in one place.</p><span className="document-stamp eyebrow">Pandora / Server reference</span></div><div><dl className="spec-list">{serverSpecs.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl><p className="small-note">{serverNote}</p></div></div></section>
    <section className="section overview-closing"><SectionLabel number="→">Continue the briefing</SectionLabel><div className="section-heading"><h2>{overviewClosing.title}</h2><p>{overviewClosing.text}</p></div><div className="chapter-paths">{overviewClosing.paths.map((item, index) => <Link to={item.path} key={item.path}><span className="eyebrow">0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p><span aria-hidden="true">↗</span></Link>)}</div></section>
  </div>;
}
