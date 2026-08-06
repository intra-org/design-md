import React from 'react';

/* "Mientras dormías" — contenedor propio dentro del feed: --night-bg con filo
   cálido --night-bd e ícono de luna en ámbar. Es el resumen de la noche, no
   un item más. */
export function AvisoMientrasDormias({ resumen, titulo = 'Mientras dormías', children, style, ...rest }) {
  return (
    <div style={{ borderRadius: 'var(--r-card-sm,16px)', background: 'var(--night-bg,#F7F4EC)', border: '1px solid var(--night-bd,transparent)', padding: '12px 14px', boxSizing: 'border-box', ...style }} {...rest}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}>
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" stroke="var(--ambar,#C8881F)" strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--tp,#0A0A0A)' }}>{titulo}</span>
          {resumen && <span style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--ts,#5E6168)' }}>{resumen}</span>}
        </div>
      </div>
      {children}
    </div>
  );
}
