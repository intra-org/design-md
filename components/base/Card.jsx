import React from 'react';

/* Tarjeta del sistema: --card + --card-sh. Radio 20 por defecto
   (18 en avisos, 22 en el hero, 16 en secciones de panel). */
export function Card({ eyebrow, accion, radius = 20, padding = '18px 22px', children, style, ...rest }) {
  return (
    <div style={{ borderRadius: radius, background: 'var(--card,#FFFFFF)', boxShadow: 'var(--card-sh,0 1px 2px rgba(20,16,8,.04), 0 12px 32px -22px rgba(20,16,8,.16))', padding, boxSizing: 'border-box', ...style }} {...rest}>
      {(eyebrow || accion) && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          {eyebrow && <p style={{ margin: 0, flex: 1, fontSize: 10.5, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--tt,#8A8C93)' }}>{eyebrow}</p>}
          {accion}
        </div>
      )}
      {children}
    </div>
  );
}
