import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Decorative contour field, not a map of Pandora. No per-frame React updates.
export function Topography() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;
    let width = 0, height = 0, frame = 0, last = 0, phase = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, targetStrength: 0 };
    let bounds = canvas.getBoundingClientRect();
    function draw() {
      ctx.clearRect(0, 0, width, height);
      const scale = Math.max(width / 1440, height / 950);
      for (let ring = 0; ring < 40; ring++) {
        ctx.beginPath();
        for (let point = 0; point <= 160; point++) {
          const angle = point / 160 * Math.PI * 2;
          const radius = 48 + ring * 17;
          const wave = Math.sin(angle * 3 + phase + ring * .095) * 33
            + Math.cos(angle * 5 - phase * .6 + ring * .04) * 20
            + Math.sin(angle * 2 + ring * .12) * 38
            + Math.sin(angle * 7 + phase * 1.4 - ring * .18) * 8;
          let x = width * .67 + Math.cos(angle) * (radius + wave) * scale * 1.6;
          let y = height * .42 + Math.sin(angle) * (radius + wave) * scale * .82;
          if (!reduced) {
            const dx = x - pointer.x, dy = y - pointer.y;
            const distance = Math.hypot(dx, dy);
            const pressure = Math.exp(-distance * distance / 52000)
              * (32 + Math.sin(distance / 52 - phase * 2) * 14) * pointer.strength;
            x += dx / Math.max(distance, 1) * pressure;
            y += dy / Math.max(distance, 1) * pressure;
          }
          if (point === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = ring % 5 === 0 ? 'rgba(155,174,237,.38)'
          : ring % 3 === 0 ? 'rgba(161,132,209,.22)' : 'rgba(122,156,199,.19)';
        ctx.lineWidth = ring % 5 === 0 ? 1 : .7;
        ctx.stroke();
      }
    }
    function tick(time: number) {
      if (time - last >= 32) {
        phase += .008;
        pointer.x += (pointer.targetX - pointer.x) * .2;
        pointer.y += (pointer.targetY - pointer.y) * .2;
        pointer.strength += (pointer.targetStrength - pointer.strength) * .1;
        draw();
        last = time;
      }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      if (!reduced && visible && !document.hidden) frame = requestAnimationFrame(tick);
      else draw();
    }
    const resize = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect(); bounds = rect;
      width = rect.width; height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const parent = canvas.parentElement!;
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || reduced) return;
      pointer.targetX = event.clientX - bounds.left; pointer.targetY = event.clientY - bounds.top;
      if (pointer.strength < .01) { pointer.x = pointer.targetX; pointer.y = pointer.targetY; }
      pointer.targetStrength = 1;
    };
    const leave = () => { pointer.targetStrength = 0; };
    const updateBounds = () => { bounds = canvas.getBoundingClientRect(); };
    resize.observe(canvas); intersection.observe(canvas);
    parent.addEventListener('pointermove', move, { passive: true });
    parent.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', updateBounds, { passive: true });
    document.addEventListener('visibilitychange', sync); sync();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); intersection.disconnect();
      parent.removeEventListener('pointermove', move); parent.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', updateBounds);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [reduced]);
  return <canvas ref={ref} className="topography" aria-hidden="true" />;
}
