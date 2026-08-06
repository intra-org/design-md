import React from 'react';

/* Chip de filtro de Personas / Historial. Apagado: --seg-track + --ts.
   Encendido: --btn-bg + --btn-tx. Tap = alternar; el activo se quita al tocarlo.
   padding 8/14 · 12/600 · pill. */
export function ChipRemovible({ children, activo = true, onQuitar, onClick, style, ...rest }) {
  const [press, setPress] = React.useState(false);
  return (
    <button type="button" onClick={onQuitar || onClick}
      onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)} onPointerLeave={() => setPress(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, flex: 'none', padding: '8px 14px', borderRadius: 999, border: 'none',
        background: activo ? 'var(--btn-bg,#0A0A0A)' : 'var(--seg-track,#EFECE4)',
        color: activo ? 'var(--btn-tx,#fff)' : 'var(--ts,#5E6168)',
        fontFamily: 'inherit', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer',
        transform: press ? 'scale(0.97)' : 'scale(1)',
        transition: 'background .15s ease-out, color .15s ease-out, transform .12s ease-out',
        ...style,
      }} {...rest}>
      {children}{activo && <span style={{ opacity: .6 }}>×</span>}
    </button>
  );
}
