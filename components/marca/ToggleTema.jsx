import React from 'react';
import { Icon } from './Icon.jsx';

const CICLO = ['auto', 'dia', 'tarde', 'noche'];
const ICONO = { auto: 'amanecer', dia: 'amanecer', tarde: 'atardecer', noche: 'noche' };
const NOMBRE = { auto: 'auto', dia: 'Amanecer', tarde: 'Atardecer', noche: 'Noche' };

/* Toggle fantasma de tema — ghost arriba-derecha, opacity .55 (hover 1),
   hit 44pt. Cicla auto → Amanecer → Atardecer → Noche. La selección manual
   NO persiste: es herramienta de demo, no un setting. */
export function ToggleTema({ modo = 'auto', onChange, conNombre = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const siguiente = () => onChange && onChange(CICLO[(CICLO.indexOf(modo) + 1) % CICLO.length]);
  return (
    <button type="button" title="Cambiar modo" onClick={siguiente}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, minHeight: 44, padding: '0 6px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--ts,#5E6168)', opacity: hover ? 1 : .55, transition: 'opacity .15s ease-out', ...style }}
      {...rest}>
      <Icon name={ICONO[modo]} size={20} />
      {(conNombre || modo === 'auto') && <span style={{ fontFamily: 'inherit', fontSize: 11, fontWeight: 600, color: 'var(--tt,#8A8C93)' }}>{NOMBRE[modo]}</span>}
    </button>
  );
}
