import { useState } from 'react';
import { ModEnvironment } from './ModEnvironment';
import type { ComponentProps } from 'react';

type Environment = ComponentProps<typeof ModEnvironment>['kind'];

// An opaque settled layer always remains underneath the incoming atmosphere.
// Interrupted transitions replace only the incoming layer: never an empty frame.
export function ModAtmosphere({ kind }: { kind: Environment }) {
  const [settled, setSettled] = useState(kind);
  return <div className="mod-atmosphere" aria-hidden="true">
    <ModEnvironment kind={settled} stage="base" />
    {kind !== settled && <div key={kind} className="atmosphere-incoming" onAnimationEnd={(event) => {
      if (event.target === event.currentTarget) setSettled(kind);
    }}><ModEnvironment kind={kind} stage="incoming" /></div>}
  </div>;
}
