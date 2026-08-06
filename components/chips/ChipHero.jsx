import React from 'react';

/* Chip de filtro del hero — vive SOLO sobre el negro del hero. Multi-select:
   cuando hay alguno activo, los no activos bajan a opacity .4.
   gap 7 · padding 8/12 (grande 8/15) · 12/500 (grande 13). */
export function ChipHero({ children, n, icon = null, activo = false, atenuado = false, grande = false, onClick, style, ...rest }) {
  const [press, setPress] = React.useState(false);
  return (
    <button type="button" onClick={onClick}
      onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)} onPointerLeave={() => setPress(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7, flex: 'none',
        padding: grande ? '8px 15px' : '8px 12px', borderRadius: 999,
        border: activo ? '1px solid #fff' : '1px solid rgba(255,255,255,.12)',
        background: activo ? '#FFFFFF' : 'rgba(255,255,255,.08)',
        color: activo ? '#0A0A0A' : 'rgba(255,255,255,.85)',
        opacity: atenuado && !activo ? .4 : 1,
        fontSize: grande ? 13 : 12, fontWeight: 500, fontFamily: 'inherit',
        cursor: 'pointer', whiteSpace: 'nowrap',
        transform: press ? 'scale(0.97)' : 'scale(1)', filter: press ? 'brightness(0.94)' : 'none',
        transition: 'opacity .25s ease-out, background .25s ease-out, color .25s ease-out, border .25s ease-out',
        ...style,
      }} {...rest}>
      {icon}{children}
      {n != null && <span style={{ fontWeight: 700 }}>{n}</span>}
      {activo && <span style={{ marginLeft: 2, opacity: .55 }}>×</span>}
    </button>
  );
}
