import { useEffect, useRef } from 'react';
import type { MediaAsset, ModEnvironment } from '../content/pandora';
import { EnvironmentArtwork } from './ModEnvironment';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Media({ asset, visual = 'terrain', label = 'Abstract terrain study', className = '' }: { asset?: MediaAsset; visual?: string; label?: string; className?: string }) {
  const reduced = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const node = video.current;
    if (!node || reduced) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) void node.play().catch(() => {}); else node.pause();
    });
    const pause = () => { if (document.hidden) node.pause(); };
    observer.observe(node); document.addEventListener('visibilitychange', pause);
    return () => { observer.disconnect(); node.pause(); document.removeEventListener('visibilitychange', pause); };
  }, [asset, reduced]);
  if (asset?.kind === 'image' || asset?.kind === 'animated-image') return <img className={`media ${className}`} src={reduced && asset.kind === 'animated-image' ? asset.stillSrc : asset.src} alt={asset.alt} loading="lazy" />;
  if (asset?.kind === 'video') return reduced
    ? <img className={`media ${className}`} src={asset.poster} alt={asset.alt} loading="lazy" />
    : <video ref={video} className={`media ${className}`} src={asset.src} poster={asset.poster} aria-label={asset.alt} muted loop playsInline controls preload="none" />;
  return <div className={`media abstract-media ${visual} ${className}`} role="img" aria-label={label}>
    {['ridges', 'strata', 'signal', 'cultivation', 'horizon', 'archive', 'system'].includes(visual) ? <EnvironmentArtwork kind={visual as ModEnvironment} /> : <svg viewBox="0 0 640 340" fill="none" aria-hidden="true">
      {visual === 'terrain' ? Array.from({ length: 21 }, (_, i) => <path key={i} d={`M-50 ${300 - i * 6} Q60 ${240 - i * 13} 170 ${265 - i * 7} T340 ${210 - i * 9} T710 ${250 - i * 11}`} />)
        : visual === 'signal' ? Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx="320" cy="170" rx={25 + i * 25} ry={18 + i * 16} />)
        : Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${i * 40 - 140} 340 L${i * 23 + 80} 40 L${i * 23 + 100} 40 L${i * 40 - 115} 340`} />)}
    </svg>}
    <span className="media-corner">+ </span><span className="media-label">{label} <span> / Media forthcoming</span></span>
  </div>;
}
