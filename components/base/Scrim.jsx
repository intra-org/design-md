import React from 'react';

/* Scrim de clic-fuera (v1.6.0). Todo menú abierto monta este velo invisible
   debajo del popover (z 30; el popover va en 31): un clic fuera cierra sin
   obligar a elegir opción. */
export function Scrim({ onCerrar, z = 30, style, ...rest }) {
  return <div aria-hidden="true" onMouseDown={onCerrar} style={{ position: 'absolute', inset: 0, zIndex: z, ...style }} {...rest} />;
}
