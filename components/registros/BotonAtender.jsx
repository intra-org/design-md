import React from 'react';
import { Icon } from '../marca/Icon.jsx';

/* Botón Atender — peso adaptativo. Logo oficial de WhatsApp 14px a la
   izquierda del label. Transición exacta: transform .12s ease-out y NADA más.
   Hover/pressed: fondo, borde, texto e ícono cambian en el MISMO frame.
   Detiene la propagación: atender no abre el detalle. */
export function BotonAtender({ ambar = false, onClick, children = 'Atender', style, ...rest }) {
  const [activo, setActivo] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const fill = activo || press;
  return (
    <button type="button" onClick={(e) => { e.stopPropagation(); onClick && onClick(e); }}
      onMouseEnter={() => setActivo(true)} onMouseLeave={() => { setActivo(false); setPress(false); }}
      onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, position: 'relative', flex: 'none',
        padding: '10px 14px', minHeight: 44, boxSizing: 'border-box', borderRadius: 999,
        border: '1px solid ' + (fill ? 'var(--btn-bg,#0A0A0A)' : (ambar ? 'var(--sec-bd,#B3ADA0)' : 'var(--sec-bd,#D9D5CC)')),
        background: fill ? 'var(--btn-bg,#0A0A0A)' : (ambar ? 'var(--tonal,#F1EFE8)' : 'transparent'),
        color: fill ? 'var(--btn-tx,#fff)' : 'var(--tp,#0A0A0A)',
        fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
        transform: press ? 'scale(0.97)' : 'scale(1)', transition: 'transform .12s ease-out',
        ...style,
      }} {...rest}>
      <Icon name="whatsapp" size={14} data-wa="" style={{ transition: 'none' }} />
      {children}
    </button>
  );
}
