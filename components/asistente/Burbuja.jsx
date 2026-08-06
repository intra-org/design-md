import React from 'react';

/* Burbuja de conversación de Preguntar.
   Pregunta del hotelero: fondo --card (no --tonal: se disolvía en el lienzo
   crema), radius 18/18/4/18, sin borde ni sombra.
   Respuesta del asistente: SIN burbuja — dot verde 6px + texto. La voz del
   asistente es la página, no una caja. */
export function Burbuja({ de = 'usuario', hora, children, style, ...rest }) {
  if (de === 'asistente') {
    return (
      <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', maxWidth: '90%', alignSelf: 'flex-start', ...style }} {...rest}>
        <span style={{ flex: 'none', width: 6, height: 6, borderRadius: 999, background: 'var(--verde,#5BD6A0)', marginTop: 8 }} />
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--tp,#0A0A0A)' }}>{children}</p>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, maxWidth: '78%', alignSelf: 'flex-end', padding: '10px 14px', borderRadius: '18px 18px 4px 18px', background: 'var(--card,#FFFFFF)', boxSizing: 'border-box', ...style }} {...rest}>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: 'var(--tp,#0A0A0A)' }}>{children}</p>
      {hora && <span style={{ flex: 'none', fontSize: 10, fontVariantNumeric: 'tabular-nums', color: 'var(--tt,#8A8C93)' }}>{hora}</span>}
    </div>
  );
}
