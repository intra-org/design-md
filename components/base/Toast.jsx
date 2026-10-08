import React from 'react';

/* Toast del sistema (v1.6.0) — uno solo, dos duraciones (3.6s informativo,
   5s con Deshacer). Pastilla frosted color-mix(--card 74%) + blur 18–20.
   SIEMPRE centrado sobre la columna de contenido, nunca sobre la ventana:
   con navW el wrapper va de left 16+navW+32 a right 28 (bottom 22) y centra
   con flex; sin navW se centra en su contenedor posicionado. */
export function Toast({ children, onDeshacer, visible = true, navW, derecha = 28, abajo = 22, style, ...rest }) {
  if (!visible) return null;
  const pastilla = (
    <div role="status"
      style={{ position: 'relative', pointerEvents: 'auto', maxWidth: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderRadius: 999, background: 'color-mix(in srgb, var(--card,#FFFFFF) 74%, transparent)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)', border: '1px solid var(--divider,#EFECE4)', boxShadow: 'var(--sh-toast,0 14px 34px -14px rgba(0,0,0,.4))', whiteSpace: 'nowrap', animation: 'ih-up .3s cubic-bezier(0.34,1.2,0.64,1) both' }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--tp,#0A0A0A)' }}>{children}</span>
      {onDeshacer && <button type="button" onClick={onDeshacer} style={{ border: 'none', background: 'transparent', padding: 0, color: 'var(--link,#2F5FC0)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>Deshacer</button>}
    </div>
  );
  const left = navW != null ? 'calc(16px + ' + navW + 'px + 32px)' : 0;
  return (
    <div style={{ position: 'absolute', left, right: navW != null ? derecha : 0, bottom: navW != null ? abajo : 16, zIndex: 60, display: 'flex', justifyContent: 'center', pointerEvents: 'none', ...style }} {...rest}>{pastilla}</div>
  );
}
