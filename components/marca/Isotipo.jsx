import React from 'react';

/* Isotipo de intra — doble <img> superpuesta (dark/light) con opacidad por
   token: versión dark en Amanecer, light en Atardecer/Noche. Nunca recolorear. */
export function Isotipo({ size = 28, base = 'assets/logos', style, ...rest }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: size, height: size, flex: 'none', ...style }} {...rest}>
      <img src={base + '/isotipo-dark.png'} alt="intra" style={{ position: 'absolute', inset: 0, width: size, height: size, objectFit: 'contain', opacity: 'var(--iso-dark-op,1)' }} />
      <img src={base + '/isotipo-light.png'} alt="" style={{ position: 'absolute', inset: 0, width: size, height: size, objectFit: 'contain', opacity: 'var(--iso-light-op,0)' }} />
    </span>
  );
}
