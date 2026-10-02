import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

// The selector moves immediately; its companion environment drains, then arrives.
export function useStagedSelection<T>(initial: T) {
  const [selected, setSelected] = useState(initial);
  const [displayed, setDisplayed] = useState(initial);
  const [stage, setStage] = useState<'settled' | 'leaving' | 'entering'>('settled');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduced = useReducedMotion();
  const select = useCallback((next: T) => {
    if (next === selected) return;
    timers.current.forEach(clearTimeout);
    setSelected(next);
    if (reduced) { setDisplayed(next); setStage('settled'); return; }
    setStage('leaving');
    timers.current = [setTimeout(() => {
      setDisplayed(next); setStage('entering');
      timers.current.push(setTimeout(() => setStage('settled'), 380));
    }, 160)];
  }, [selected, reduced]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  return { selected, displayed, stage, select };
}
