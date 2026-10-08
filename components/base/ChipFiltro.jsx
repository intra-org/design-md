import React from 'react';

/* Chip de filtro (v1.6.0, Equipo / Ventas). Pill 32px, 12/600: reposo
   --seg-track + --ts, activo --btn-bg + --btn-tx. Con onQuitar muestra "×"
   al 75% (chip removible); con dot, el dot mate del producto. */
export function ChipFiltro({ children, activo = false, dot, onClick, onQuitar, style, ...rest }) {
  const [press, setPress] = React.useState(false);
  const on = activo || !!onQuitar;
  return (
    <button type="button" onClick={onQuitar || onClick} title={typeof children === 'string' ? children : undefined}
      onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)} onPointerLeave={() => setPress(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 32, padding: onQuitar ? '0 10px 0 12px' : '0 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', flex: 'none', maxWidth: 200, background: on ? 'var(--btn-bg,#0A0A0A)' : 'var(--seg-track,#EFECE4)', color: on ? 'var(--btn-tx,#fff)' : 'var(--ts,#5E6168)', transform: press ? 'scale(0.97)' : 'none', transition: 'background .15s ease-out, color .15s ease-out, transform .12s ease-out', ...style }} {...rest}>
      {dot && <span style={{ flex: 'none', width: 5, height: 5, borderRadius: 999, background: on ? 'var(--btn-tx,#fff)' : dot, opacity: on ? 0.7 : 1 }} />}
      <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{children}</span>
      {onQuitar && <span style={{ flex: 'none', fontSize: 13, lineHeight: 1, opacity: 0.75 }}>×</span>}
    </button>
  );
}
