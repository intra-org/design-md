import React from 'react';

/* Chip de producto (badge). alignSelf flex-start, dot mate 5px, 10.5/600
   tracking .04em en --ts, fondo --chip-{producto}, radio 6, padding 2/8.
   No interactivo. */
export function ChipProducto({ children, color = 'var(--dot-reserva,#ABC4DB)', fondo = 'var(--chip-reserva,#F1EFE8)', sinDot = false, style, ...rest }) {
  return (
    <span style={{ alignSelf: 'flex-start', flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 600, letterSpacing: '.04em', color: 'var(--ts,#5E6168)', background: fondo, borderRadius: 6, padding: '2px 8px', whiteSpace: 'nowrap', ...style }} {...rest}>
      {!sinDot && <span style={{ flex: 'none', width: 5, height: 5, borderRadius: 999, background: color, transition: 'background .45s ease .24s' }} />}
      {children}
    </span>
  );
}
