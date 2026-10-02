import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { mods, modEnvironments } from '../content/pandora';
import { useStagedSelection } from '../hooks/useStagedSelection';
import { Media } from './Media';
import { ModAtmosphere } from './ModAtmosphere';
import { SectionLabel } from './Primitives';

export function ModBrowser() {
  const { selected, displayed, stage, select } = useStagedSelection(0);
  const viewport = useRef<HTMLDivElement>(null);
  const wheel = useRef({ amount: 0, last: 0, consumed: false, direction: 0 });
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const mod = mods[displayed];
  const environment = modEnvironments[mod.id];
  const go = (index: number) => select(Math.max(0, Math.min(mods.length - 1, index)));
  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.deltaY === 0) return;
      const direction = Math.sign(event.deltaY);
      // Release normal page scrolling at either end. Never intercept outside this viewport.
      if ((direction < 0 && selected === 0) || (direction > 0 && selected === mods.length - 1)) return;
      event.preventDefault();
      const now = performance.now();
      if (now - wheel.current.last > 180 || wheel.current.direction !== direction) {
        wheel.current.amount = 0;
        wheel.current.consumed = false;
      }
      wheel.current.last = now;
      wheel.current.direction = direction;
      if (wheel.current.consumed) return;
      wheel.current.amount += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 300 : 1);
      if (Math.abs(wheel.current.amount) < 36) return;
      select(selected + direction);
      wheel.current.amount = 0;
      wheel.current.consumed = true;
    };
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [selected, select]);

  return <div className={'mods-page environment-' + environment}>
    <ModAtmosphere kind={modEnvironments[mods[selected].id]} />
    <div className="section mods-room">
      <SectionLabel number="MODS">What Pandora adds</SectionLabel>
      <div className="mods-heading"><h1>Familiar world.<br /><span>Different possibilities.</span></h1><p>Selected additions. Still Minecraft.<br /><span className="pending-label eyebrow">Candidates / Not a final mod list</span></p></div>
      <div className="focused-browser">
        <div className="selector-column">
          <div className="selector-toolbar"><span className="eyebrow">Explore the selection</span><span className="eyebrow">{String(selected + 1).padStart(2, '0')} / {String(mods.length).padStart(2, '0')}</span></div>
          <div ref={viewport} className="selector-viewport" role="listbox" aria-label="Featured mod candidates" aria-orientation="vertical" aria-activedescendant={'mod-option-' + mods[selected].id} aria-describedby="selector-help" tabIndex={0}
            onKeyDown={(event) => {
              let next: number;
              if (event.key === 'ArrowDown') next = selected + 1;
              else if (event.key === 'ArrowUp') next = selected - 1;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = mods.length - 1;
              else return;
              event.preventDefault(); go(next);
            }}
            onTouchStart={(event) => { const touch = event.touches[0]; swipe.current = { x: touch.clientX, y: touch.clientY }; }}
            onTouchEnd={(event) => {
              if (!swipe.current) return;
              const touch = event.changedTouches[0];
              const dy = swipe.current.y - touch.clientY;
              const dx = swipe.current.x - touch.clientX;
              if (Math.abs(dy) > 35 && Math.abs(dy) > Math.abs(dx)) go(selected + Math.sign(dy));
              swipe.current = null;
            }}
            onTouchCancel={() => { swipe.current = null; }}>
            <div className="selector-focus-line" aria-hidden="true">›</div>
            <div className="selector-track" style={{ '--selected': selected } as CSSProperties}>
              {mods.map((item, index) => <div key={item.id} id={'mod-option-' + item.id} role="option" aria-selected={selected === index} aria-posinset={index + 1} aria-setsize={mods.length} className={'selector-option distance-' + Math.min(Math.abs(selected - index), 3)} onClick={() => { go(index); viewport.current?.focus({ preventScroll: true }); }}><span className="mod-index">{String(index + 1).padStart(2, '0')}</span><span>{item.title}</span></div>)}
            </div>
          </div>
          <div className="selector-controls"><button aria-label="Previous mod" disabled={selected === 0} onClick={() => go(selected - 1)}>↑</button><p id="selector-help">Scroll here · ↑ ↓ keys · Swipe<br /><span>Scroll outside to move through the page.</span></p><button aria-label="Next mod" disabled={selected === mods.length - 1} onClick={() => go(selected + 1)}>↓</button></div>
        </div>
        <section className={'focused-content phase-' + stage} aria-labelledby="selected-mod-title" aria-live="polite" aria-busy={stage === 'leaving'}>
          <div className="mod-content-copy"><span className="eyebrow">{mod.category}</span><h2 id="selected-mod-title">{mod.icon && <img src={mod.icon.src} alt={mod.icon.alt} />}{mod.title}</h2><p>{mod.description}</p></div>
          <div className="focused-media"><Media asset={mod.media} visual={environment} label={mod.title + ' / Abstract study'} /></div>
          <p className="mod-purpose"><span>Why Pandora uses it</span>{mod.purpose}</p>
        </section>
      </div>
      <div className="mods-footnote eyebrow"><span>Explore the possibilities / {mods.length} candidates</span><span>Mod previews / Images & video</span></div>
    </div>
  </div>;
}
