import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span><span className="label-line" /></div>;
}
export function Action({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  const content = <>{children}<span aria-hidden="true">↗</span></>;
  const className = `action ${secondary ? 'secondary' : ''}`;
  return href.startsWith('#') ? <a className={className} href={href}>{content}</a> : <Link className={className} to={href}>{content}</Link>;
}
export function ObjectiveSymbol({ type }: { type: string }) {
  return <svg className="objective-symbol" viewBox="0 0 100 100" fill="none" aria-hidden="true">
    {type === 'relic' ? <><path d="M50 11 75 49 50 89 25 49Z M50 11V89 M25 49H75" /><path d="M15 24V12H27 M73 12H85V24 M15 76V88H27 M73 88H85V76" /></>
      : type === 'supply' ? <><path d="M23 38H77V80H23Z M23 38 35 22H65L77 38 M50 22V80 M23 54H77" /><path d="M40 10H60 M50 3V16" /></>
      : <><circle cx="50" cy="50" r="31" /><circle cx="50" cy="50" r="18" /><path d="M50 6V27 M50 73V94 M6 50H27 M73 50H94" /></>}
  </svg>;
}
