import React from 'react';

/* Presencia V7 — el "Siri" de intra. Vive SOLO en el empty state de Preguntar;
   al enviar el primer mensaje desaparece y no regresa.
   Anatomía: núcleo iridiscente (2 cintas + acento + centro) dentro de una
   esfera clipada r83, contorno luminoso r83 stroke 3.2, y specular rotado -30°.
   Los colores salen de los tokens --siri-*: un solo markup sirve los 3 temas. */
export function Presencia({ size = 190, style, ...rest }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (n) => n + uid;
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" style={{ overflow: 'visible', filter: 'drop-shadow(0 0 40px var(--siri-glow,rgba(90,110,180,.45)))', ...style }} {...rest}>
      <defs>
        <radialGradient id={id('bd')} cx="42%" cy="36%" r="66%">
          <stop offset="0%" style={{ stopColor: 'var(--siri-bodyIn)' }} />
          <stop offset="70%" style={{ stopColor: 'var(--siri-bodyOut)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--siri-bodyOut)' }} />
        </radialGradient>
        <linearGradient id={id('lA')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--siri-lA1)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--siri-lA2)' }} />
        </linearGradient>
        <linearGradient id={id('lB')} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--siri-lB2)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--siri-lB1)' }} />
        </linearGradient>
        <radialGradient id={id('ce')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: 'var(--siri-core)' }} />
          <stop offset="55%" style={{ stopColor: 'var(--siri-core)', stopOpacity: .5 }} />
          <stop offset="100%" style={{ stopColor: 'var(--siri-core)', stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={id('rm')} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--siri-rim)' }} />
          <stop offset="45%" style={{ stopColor: 'var(--siri-rimSoft)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--siri-rim)', stopOpacity: .25 }} />
        </linearGradient>
        <clipPath id={id('cl')}><circle cx="110" cy="110" r="83" /></clipPath>
        <filter id={id('bl')} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" /></filter>
        <filter id={id('bs')} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <circle cx="110" cy="110" r="85" fill={'url(#' + id('bd') + ')'} />
      <g clipPath={'url(#' + id('cl') + ')'}>
        <path d="M112 34 C158 40 176 82 156 116 C144 136 110 130 100 102 C90 78 88 50 112 34 Z" fill={'url(#' + id('lA') + ')'} filter={'url(#' + id('bl') + ')'} style={{ transformBox: 'view-box', transformOrigin: '110px 110px', animation: 'ih-spin 17.8s linear infinite' }} />
        <path d="M108 186 C62 180 44 138 64 104 C76 84 110 90 120 118 C130 142 132 170 108 186 Z" fill={'url(#' + id('lB') + ')'} filter={'url(#' + id('bl') + ')'} style={{ transformBox: 'view-box', transformOrigin: '110px 110px', animation: 'ih-spin-r 22.2s linear infinite' }} />
        <path d="M52 96 C95 78 130 120 172 108" stroke="var(--siri-accent)" strokeWidth="16" fill="none" filter={'url(#' + id('bl') + ')'} opacity=".6" strokeLinecap="round" style={{ transformBox: 'view-box', transformOrigin: '110px 110px', animation: 'ih-spin 25.2s linear infinite' }} />
        <ellipse cx="108" cy="106" rx="48" ry="42" fill={'url(#' + id('ce') + ')'} filter={'url(#' + id('bs') + ')'} style={{ transformBox: 'view-box', transformOrigin: '108px 106px', animation: 'ih-glow 3.3s ease-in-out infinite' }} />
      </g>
      <circle cx="110" cy="110" r="83" fill="none" stroke={'url(#' + id('rm') + ')'} strokeWidth="3.2" />
      <ellipse cx="84" cy="70" rx="34" ry="18" fill="#ffffff" opacity=".3" filter={'url(#' + id('bl') + ')'} transform="rotate(-30 84 70)" />
    </svg>
  );
}
