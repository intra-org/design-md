import React from 'react';

/* Chip de estado (v1.6.0). Mismo cuerpo que el chip de producto (10.5/600,
   radio 6, padding 2/8, fondo tonal) con dot 5px que dice el estado.
   Ventas/Equipo: pend · seg · conf · noconf → dot de la paleta del catálogo
   (--chip-3/1/5/9). Soporte: pendiente · proceso · resuelto → --tt · --ambar · --verde. */
const ESTADOS = {
  pend: ['Por atender', 'var(--chip-3,#D6B06E)'],
  seg: ['En seguimiento', 'var(--chip-1,#ABC4DB)'],
  conf: ['Confirmado', 'var(--chip-5,#8FA89A)'],
  noconf: ['No confirmado', 'var(--chip-9,#E0A090)'],
  pendiente: ['Pendiente', 'var(--tt,#8A8C93)'],
  proceso: ['En proceso', 'var(--ambar,#C8881F)'],
  resuelto: ['Resuelto', 'var(--verde,#5BD6A0)'],
};
export function ChipEstado({ estado = 'pend', children, style, ...rest }) {
  const [txt, dot] = ESTADOS[estado] || ESTADOS.pend;
  return (
    <span style={{ alignSelf: 'center', flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 600, letterSpacing: '.04em', color: 'var(--chip-tx,#5E6168)', background: 'var(--tonal,#F1EFE8)', borderRadius: 6, padding: '2px 8px', whiteSpace: 'nowrap', ...style }} {...rest}>
      <span style={{ flex: 'none', width: 5, height: 5, borderRadius: 999, background: dot }} />
      {children || txt}
    </span>
  );
}
export const ESTADOS_CHIP = Object.keys(ESTADOS);
