import React from 'react';

/* Capas ambientales del lienzo — el "cielo" de la propiedad. Copiadas 1:1 de
   LG_TH[tema].capas del prototipo. Animan SOLO transform (scale/translate):
   nunca opacidad, porque apaga el color. Van sobre un fondo #060607. */
export const CAPAS = {
  dia: [
    { bg: 'linear-gradient(180deg,#F8F6F0 0%,#F9F7EE 60%,#F9F1E0 84%,#F8EBD2 94%,#F6E5C3 100%)', anim: 'none' },
    { bg: 'radial-gradient(160% 120% at 12% -20%, rgba(168,186,214,.14) 0%, rgba(168,186,214,.07) 40%, transparent 68%)', anim: 'ih-amb3 36s ease-in-out infinite' },
    { bg: 'linear-gradient(180deg, transparent 90%, rgba(255,204,98,.08) 96%, rgba(255,200,90,.12) 100%)', anim: 'ih-amb4 14s ease-in-out infinite' },
    { bg: 'radial-gradient(110% 17% at 50% 103%, rgba(255,208,125,.16) 0%, rgba(254,205,120,.08) 44%, rgba(253,202,115,.04) 64%, transparent 78%)', anim: 'ih-amb4 18s ease-in-out 6s infinite' },
    { bg: 'radial-gradient(46% 7% at 36% 91%, rgba(255,208,125,.09) 0%, transparent 72%)', anim: 'ih-drift 26s ease-in-out infinite' },
    { bg: 'radial-gradient(38% 6% at 66% 95%, rgba(254,205,120,.07) 0%, transparent 72%)', anim: 'ih-drift 34s ease-in-out 8s infinite reverse' },
  ],
  tarde: [
    { bg: 'linear-gradient(180deg,#1C2236 0%,#212840 42%,#2A2F49 62%,#383550 76%,#4E3D52 86%,#68484E 93%,#855147 100%)', anim: 'none' },
    { bg: 'linear-gradient(180deg, rgba(12,16,30,.5) 0%, rgba(12,16,30,.22) 26%, transparent 48%)', anim: 'ih-amb3 38s ease-in-out infinite' },
    { bg: 'linear-gradient(180deg, transparent 76%, rgba(228,132,100,.07) 86%, rgba(238,144,100,.14) 94%, rgba(244,152,104,.2) 100%)', anim: 'ih-amb4 15s ease-in-out infinite' },
    { bg: 'radial-gradient(120% 21% at 50% 104%, rgba(242,152,104,.2) 0%, rgba(238,140,100,.1) 42%, rgba(234,132,96,.04) 62%, transparent 80%)', anim: 'ih-amb4 19s ease-in-out 4s infinite' },
    { bg: 'radial-gradient(46% 7% at 38% 90%, rgba(242,152,104,.12) 0%, transparent 72%)', anim: 'ih-drift 26s ease-in-out infinite' },
    { bg: 'radial-gradient(38% 6% at 64% 95%, rgba(238,144,100,.09) 0%, transparent 72%)', anim: 'ih-drift 34s ease-in-out 8s infinite reverse' },
  ],
  noche: [
    { bg: 'linear-gradient(180deg,#07080C 0%,#090B12 58%,#0B0E17 80%,#0D1322 92%,#111B33 100%)', anim: 'none' },
    { bg: 'linear-gradient(180deg, rgba(96,126,190,.06) 0%, rgba(96,126,190,.02) 24%, transparent 45%)', anim: 'ih-amb3 38s ease-in-out infinite' },
    { bg: 'linear-gradient(180deg, transparent 82%, rgba(92,134,220,.16) 93%, rgba(114,152,228,.26) 100%)', anim: 'ih-amb4 16s ease-in-out infinite' },
    { bg: 'radial-gradient(130% 24% at 50% 105%, rgba(108,150,232,.19) 0%, rgba(108,150,232,.08) 44%, transparent 70%)', anim: 'ih-amb4 20s ease-in-out 5s infinite' },
    { bg: 'radial-gradient(46% 7% at 38% 91%, rgba(108,150,232,.1) 0%, transparent 72%)', anim: 'ih-drift 26s ease-in-out infinite' },
    { bg: 'radial-gradient(38% 6% at 64% 95%, rgba(114,152,228,.08) 0%, transparent 72%)', anim: 'ih-drift 34s ease-in-out 8s infinite reverse' },
  ],
};

export function Ambiente({ tema = 'dia', ...rest }) {
  return (
    <React.Fragment>
      {['dia', 'tarde', 'noche'].map((t) => CAPAS[t].map((c, i) => (
        <div key={t + i} aria-hidden="true"
          style={{ position: 'absolute', inset: 0, background: c.bg, animation: c.anim === 'none' ? undefined : c.anim, opacity: t === tema ? 1 : 0, transition: 'opacity .6s ease', pointerEvents: 'none', willChange: 'transform' }}
          {...rest} />
      )))}
    </React.Fragment>
  );
}
