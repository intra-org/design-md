import React from 'react';

/* Casilla de selección de filas (Equipo, kanban). 16px radio 5, borde 1.5
   --sec-bd → sólida --btn-bg con palomita --btn-tx. Nunca control nativo. */
export function Checkbox({ checked = false, onChange, size = 16, style, ...rest }) {
  return (
    <span role="checkbox" aria-checked={checked} tabIndex={0}
      onClick={(e) => { e.stopPropagation(); onChange && onChange(!checked); }}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange && onChange(!checked); } }}
      style={{ flex: 'none', width: size, height: size, boxSizing: 'border-box', borderRadius: 5, border: '1.5px solid ' + (checked ? 'var(--btn-bg,#0A0A0A)' : 'var(--sec-bd,#D9D5CC)'), background: checked ? 'var(--btn-bg,#0A0A0A)' : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background .15s ease-out, border-color .15s ease-out', ...style }} {...rest}>
      {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="var(--btn-tx,#fff)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </span>
  );
}
