import React from 'react';

/* Pill de fecha del hilo de Historial de Preguntar.
   Orden del sistema: Hoy · Ayer · día de la semana (últimos 7) · fecha corta. */
export function PillFecha({ children, style, ...rest }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', ...style }} {...rest}>
      <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 12px', borderRadius: 999, background: 'var(--tonal,#F1EFE8)', color: 'var(--tt,#8A8C93)', fontSize: 10.5, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase' }}>{children}</span>
    </div>
  );
}
