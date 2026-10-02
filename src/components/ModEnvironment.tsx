import type { ModEnvironment as Environment } from '../content/pandora';

// Abstract motifs only: no fabricated screenshots, faction marks or telemetry.
export function EnvironmentArtwork({ kind }: { kind: Environment }) {
  return <svg className={`environment-art art-${kind}`} viewBox="0 0 1200 760" fill="none" aria-hidden="true">
    {kind === 'ridges' && <g>{Array.from({ length: 28 }, (_, i) => <path key={i} d={`M-80 ${740 - i * 12} Q100 ${700 - i * 20} 260 ${670 - i * 15} T500 ${550 - i * 14} Q650 ${650 - i * 29} 770 ${540 - i * 12} T1280 ${640 - i * 10}`} />)}</g>}
    {kind === 'strata' && <g>{Array.from({ length: 18 }, (_, i) => <path key={i} d={`M-20 ${170 + i * 28} Q240 ${70 + i * 27} 480 ${240 + i * 20} T880 ${160 + i * 28} T1240 ${250 + i * 24}`} style={{ opacity: .35 + i % 3 * .25 }} />)}</g>}
    {kind === 'signal' && <g className="signal-rings">{Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx="800" cy="390" rx={40 + i * 51} ry={40 + i * 42} />)}<path d="M800 50V730 M350 390H1250" strokeDasharray="2 15" /></g>}
    {kind === 'cultivation' && <g>{Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${i * 85 - 300} 780 Q${i * 60} 350 ${i * 38 + 280} 60`} />)}{Array.from({ length: 10 }, (_, i) => <path key={i} d={`M0 ${250 + i * 55} Q650 ${160 + i * 55} 1200 ${310 + i * 45}`} opacity=".5" />)}</g>}
    {kind === 'horizon' && <g>{Array.from({ length: 23 }, (_, i) => <path key={i} d={`M600 255 L${i * 110 - 600} 800`} />)}{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M0 ${258 + i * i * 4}H1200`} />)}<path d="M0 255H1200" strokeWidth="3" /></g>}
    {kind === 'archive' && <g>{Array.from({ length: 5 }, (_, i) => <rect key={i} x={280 + i * 65} y={90 + i * 38} width="530" height="350" opacity={.2 + i * .15} />)}<path d="M90 650H1150" />{Array.from({ length: 31 }, (_, i) => <path key={i} d={`M${90 + i * 35} 638V${i % 5 === 0 ? 680 : 660}`} />)}<path className="archive-playhead" d="M450 625V690" strokeWidth="3" /></g>}
    {kind === 'system' && <g><path d="M790 145 970 385 790 625 610 385Z M790 220 910 385 790 550 670 385Z M610 385H270V220H80 M970 385H1120V580H1200 M790 145V50 M790 625V740" /><circle cx="790" cy="385" r="65" /><circle cx="790" cy="385" r="90" strokeDasharray="5 18" />{[230,350,470,590].map((y) => <path key={y} d={`M70 ${y}H200 M70 ${y + 12}H140`} />)}</g>}
  </svg>;
}

export function ModEnvironment({ kind, stage }: { kind: Environment; stage: string }) {
  return <div className={`mod-environment environment-${kind} phase-${stage}`} aria-hidden="true"><div className="environment-light" /><EnvironmentArtwork kind={kind} /></div>;
}
