import React from 'react';

/* Segmented — selector de periodo (4 segmentos, 348px en escritorio) y vistas
   de Agenda (3 segmentos, 240px). Track --seg-track con padding 3, botones de
   38px y thumb --seg-thumb deslizante con spring 250ms. */
export function Segmented({ options = [], value, onChange, full = true, ancho, style, ...rest }) {
  const i = Math.max(0, options.findIndex((o) => (o.value ?? o) === value));
  const n = options.length || 1;
  return (
    <div style={{ position: 'relative', display: 'flex', padding: 3, borderRadius: 999, background: 'var(--seg-track,#EFECE4)', flex: full ? 1 : 'none', minWidth: full ? 320 : 0, width: ancho, boxSizing: 'border-box', ...style }} {...rest}>
      <span style={{ position: 'absolute', top: 3, bottom: 3, left: 3, width: 'calc((100% - 6px)/' + n + ')', borderRadius: 999, background: 'var(--seg-thumb,#FFFFFF)', boxShadow: '0 1px 2px rgba(20,16,8,.1)', transform: 'translateX(' + i * 100 + '%)', transition: 'transform .25s cubic-bezier(0.34,1.2,0.64,1)', willChange: 'transform' }} />
      {options.map((o) => {
        const val = o.value ?? o;
        const activo = val === value;
        return (
          <button key={val} type="button" onClick={() => onChange && onChange(val)}
            style={{ flex: 1, position: 'relative', zIndex: 1, height: 38, padding: 0, border: 'none', background: 'transparent', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', color: activo ? 'var(--tp,#0A0A0A)' : 'var(--ts,#5E6168)', transition: 'color .15s ease-out' }}>
            {o.label ?? o}
          </button>
        );
      })}
    </div>
  );
}
