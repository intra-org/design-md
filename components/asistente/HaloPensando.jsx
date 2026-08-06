import React from 'react';

const BANDA = 22;
const mascara = 'linear-gradient(to right,#000 0 ' + BANDA + 'px,transparent ' + BANDA + 'px calc(100% - ' + BANDA + 'px),#000 calc(100% - ' + BANDA + 'px) 100%), linear-gradient(to bottom,#000 0 ' + BANDA + 'px,transparent ' + BANDA + 'px calc(100% - ' + BANDA + 'px),#000 calc(100% - ' + BANDA + 'px) 100%)';
const PALETA = 'var(--siri-lA1), var(--siri-lA2), var(--siri-lB1), var(--siri-rimSoft), var(--siri-lB2), var(--siri-rim), var(--siri-accent), var(--siri-lA1)';

/* Halo "pensando" — mientras el asistente piensa (piso 5s). Banda de ~22px que
   roza las 4 orillas del lienzo, SIN línea ni contorno; el centro queda
   transparente para poder leer. Dos capas conic-gradient con la paleta
   --siri-* completa del tema activo. Reemplazó al viejo pulso de contorno. */
export function HaloPensando({ activo = true, style, ...rest }) {
  if (!activo) return null;
  const capa = { position: 'absolute', inset: '-30%', borderRadius: '50%' };
  return (
    <div aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 30, WebkitMaskImage: mascara, maskImage: mascara, animation: 'ih-siri-breathe 3.4s ease-in-out infinite', ...style }} {...rest}>
      <div style={{ ...capa, background: 'conic-gradient(from 0deg, ' + PALETA + ')', filter: 'blur(26px)', opacity: .78, animation: 'ih-siri-flow 6s linear infinite' }} />
      <div style={{ ...capa, background: 'conic-gradient(from 140deg, ' + PALETA + ')', filter: 'blur(34px)', opacity: .58, animation: 'ih-siri-flow 9.5s linear infinite reverse' }} />
    </div>
  );
}
