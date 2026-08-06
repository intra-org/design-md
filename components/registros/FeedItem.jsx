import React from 'react';
import { ChipProducto } from '../chips/ChipProducto.jsx';

/* Feed item. El gol del asistente lleva dot azul 6px --gol y prefijo en 600
   ("Cita confirmada:"): la señal nunca es solo color. Columna de tiempo
   alineada a la derecha — una sola escala de tiempo en todo el producto. */
export function FeedItem({ t1, t2, gol = false, pre, texto, producto, productoColor = 'var(--dot-reserva)', productoFondo = 'var(--chip-reserva)', seg, colTiempo = 70, nuevo = false, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', gap: 12, padding: '11px 6px', borderRadius: 10, background: hover ? 'var(--hover,#F7F5EF)' : 'transparent', cursor: onClick ? 'pointer' : 'default', transition: 'background 150ms ease-out', animation: nuevo ? 'ih-up .3s cubic-bezier(0.34,1.2,0.64,1) both, ih-flash 1.2s ease-out' : undefined, ...style }} {...rest}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flex: 'none', width: colTiempo }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ts,#5E6168)', textAlign: 'right' }}>{t1}</span>
        {t2 && <span style={{ fontSize: 10.5, color: 'var(--tt,#8A8C93)', textAlign: 'right' }}>{t2}</span>}
      </div>
      <span style={{ flex: 'none', width: 1, alignSelf: 'stretch', background: 'var(--divider,#EFECE4)', margin: '2px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
          {gol && <span style={{ flex: 'none', width: 6, height: 6, borderRadius: 999, background: 'var(--gol,#3E7FE6)', alignSelf: 'center' }} />}
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--tp,#0A0A0A)' }}>
            {pre && <span style={{ fontWeight: 600 }}>{pre} </span>}{texto}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {producto && <ChipProducto color={productoColor} fondo={productoFondo}>{producto}</ChipProducto>}
          {seg && <span style={{ fontSize: 10.5, color: 'var(--tt,#8A8C93)' }}>{seg}</span>}
        </div>
      </div>
    </div>
  );
}
