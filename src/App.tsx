import { useLayoutEffect, useRef } from 'react';
import { Link, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { WarSystem } from './pages/WarSystem';
import { Factions } from './pages/Factions';
import { Mods } from './pages/Mods';
import { Rules } from './pages/Rules';
import { Setup } from './pages/Setup';
import { navigation } from './content/pandora';

export function App() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const main = useRef<HTMLElement>(null);
  const positions = useRef(new Map<string, number>());
  const initial = useRef(true);
  const chapter = navigation.find((item) => item.path === (location.pathname.replace(/\/+$/, '') || '/'))?.label ?? 'Page not found';
  useLayoutEffect(() => {
    document.title = chapter + ' — Pandora War Server';
    const hashTarget = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (hashTarget) hashTarget.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: navigationType === 'POP' ? positions.current.get(location.key) ?? 0 : 0, behavior: 'instant' });
    if (!initial.current) main.current?.focus({ preventScroll: true });
    initial.current = false;
    const savedPositions = positions.current;
    return () => { savedPositions.set(location.key, window.scrollY); };
  }, [location.key, location.hash, navigationType, chapter]);
  return <><a className="skip-link" href="#main-content">Skip to content</a><Navigation />
    <main ref={main} id="main-content" tabIndex={-1} aria-label={chapter + ' chapter'} className="route-view" key={location.pathname}>
      <Routes><Route path="/" element={<Home />} /><Route path="/war-system" element={<WarSystem />} /><Route path="/factions" element={<Factions />} /><Route path="/mods" element={<Mods />} /><Route path="/rules" element={<Rules />} /><Route path="/setup" element={<Setup />} /><Route path="*" element={<section className="section chapter-opening"><h1>Uncharted territory.</h1><p>This page isn’t part of the briefing.</p><Link className="action" to="/">Return to Overview ↗</Link></section>} /></Routes>
    </main><footer className="site-footer"><Link to="/" className="footer-brand">PANDORA</Link><span>A Minecraft war between friends.</span><span>{chapter} / End of chapter</span></footer></>;
}
