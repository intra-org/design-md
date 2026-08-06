import React from 'react';

/* Wordmark de intra + la etiqueta "intelligence" (11/600, tracking .34em,
   color --wm-sub). El wordmark nunca se escribe en tipografía: es el asset. */
export function Wordmark({ alto = 22, base = 'assets/logos', intelligence = true, style, ...rest }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, ...style }} {...rest}>
      <span style={{ position: 'relative', display: 'inline-block', height: alto, width: alto * 3.4 }}>
        <img src={base + '/wordmark-dark.png'} alt="intra" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 'var(--iso-dark-op,1)' }} />
        <img src={base + '/wordmark-light.png'} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 'var(--iso-light-op,0)' }} />
      </span>
      {intelligence && <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.34em', textIndent: '.34em', color: 'var(--wm-sub,#8A7B66)' }}>intelligence</span>}
    </span>
  );
}
