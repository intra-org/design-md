import React from 'react';

/* Toast — pill frosted centrada al pie del lienzo. Con "Deshacer" cuando la
   acción es reversible (ventana de 5s en captura al resolver). */
export function Toast({ children, onDeshacer, visible = true, style, ...rest }) {
  if (!visible) return null;
  return (
    <div role="status"
      style={{ position: 'absolute', left: '50%', bottom: 16, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderRadius: 999, background: 'color-mix(in srgb, var(--card,#FFFFFF) 74%, transparent)', backdropFilter: 'blur(20px) saturate(160%)', border: '1px solid var(--divider,#EFECE4)', boxShadow: 'var(--sh-toast,0 12px 32px -14px rgba(0,0,0,.4))', animation: 'ih-up .3s cubic-bezier(0.34,1.2,0.64,1) both', whiteSpace: 'nowrap', ...style }}
      {...rest}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--tp,#0A0A0A)' }}>{children}</span>
      {onDeshacer && <button type="button" onClick={onDeshacer} style={{ border: 'none', background: 'transparent', padding: 0, color: 'var(--link,#2F5FC0)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>Deshacer</button>}
    </div>
  );
}
