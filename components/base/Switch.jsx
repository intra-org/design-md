import React from 'react';

/* Switch — control único del sistema (cero controles nativos).
   Tres capas: botón-pista transparente + pista + perilla. La pista encendida
   baja a 80% en Atardecer/Noche (--sw-on-op); la perilla SIEMPRE va al 100%. */
export function Switch({ checked = false, onChange, size = 'panel', bloqueado = false, title, style, ...rest }) {
  const w = size === 'fila' ? 38 : 44;
  const h = size === 'fila' ? 22 : 26;
  const k = size === 'fila' ? 16 : 20;
  return (
    <button
      type="button" role="switch" aria-checked={checked} title={title}
      onClick={bloqueado ? undefined : onChange}
      style={{ position: 'relative', flex: 'none', width: w, height: h, padding: 0, border: 'none', background: 'transparent', cursor: bloqueado ? 'not-allowed' : 'pointer', ...style }}
      {...rest}
    >
      <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: checked ? 'var(--btn-bg,#0A0A0A)' : 'var(--sw-off,#DAD6CD)', opacity: checked ? 'var(--sw-on-op,1)' : 1, transition: 'background .2s ease-out, opacity .2s ease-out' }} />
      <span style={{ position: 'absolute', top: (h - k) / 2, left: (h - k) / 2, width: k, height: k, borderRadius: 999, background: 'var(--sw-knob,#FFFFFF)', boxShadow: 'var(--sh-knob,0 1px 3px rgba(20,16,8,.28))', transform: 'translateX(' + (checked ? w - k - (h - k) : 0) + 'px)', transition: 'transform 220ms cubic-bezier(0.34,1.2,0.64,1)' }} />
    </button>
  );
}
