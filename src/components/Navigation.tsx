import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigation } from '../content/pandora';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const active = nav.current?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!active || !indicator.current) return;
      indicator.current.style.width = active.offsetWidth + 'px';
      indicator.current.style.transform = 'translateX(' + active.offsetLeft + 'px)';
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (nav.current) observer.observe(nav.current);
    return () => observer.disconnect();
  }, [location.pathname, open]);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);
  return <header ref={header} className="site-header" onKeyDown={(event) => {
    if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); }
  }}>
    <Link to="/" className="brand" aria-label="Pandora overview" onClick={() => setOpen(false)}><span className="brand-mark" aria-hidden="true">P</span><span>PANDORA<span className="brand-caption">WAR SERVER</span></span></Link>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close −' : 'Menu +'}</button>
    <nav ref={nav} id="main-navigation" aria-label="Main navigation" className={open ? 'navigation is-open' : 'navigation'}>
      {navigation.map(({ id, path, label }, index) => <NavLink key={id} to={path} end={path === '/'} onClick={() => setOpen(false)}><span className="nav-number">0{index + 1}</span>{label}{id === 'setup' && <span aria-hidden="true"> ↗</span>}</NavLink>)}
      <span ref={indicator} className="route-indicator" aria-hidden="true" />
    </nav>
  </header>;
}
