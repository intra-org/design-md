import React from 'react';
import { ChipProducto } from '../chips/ChipProducto.jsx';
import { DotAmbar } from './RenglonPersona.jsx';

/* Card de cita (Agenda · Día). Hora y nombre en la MISMA línea, chip al
   extremo derecho; el contexto debajo. "Llegó…" alineado con la base del
   botón, no centrado con él. El botón Atender es el mismo de Personas y
   comparte estado write-once. */
export function CardCita({ hora, nombre, producto, productoColor = 'var(--dot-reserva)', productoFondo = 'var(--chip-reserva)', contexto, llego, urgente = false, accion, onClick, style, ...rest }) {
  return (
    <div onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '16px 18px', borderRadius: 'var(--r-card-lg,20px)', background: 'var(--card,#FFFFFF)', boxShadow: 'var(--card-sh)', cursor: onClick ? 'pointer' : 'default', boxSizing: 'border-box', ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {urgente && <DotAmbar />}
        <span style={{ fontSize: 17, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--tp,#0A0A0A)', whiteSpace: 'nowrap' }}>{hora}</span>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--tp,#0A0A0A)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nombre}</span>
        <span style={{ flex: 1 }} />
        {producto && <ChipProducto color={productoColor} fondo={productoFondo}>{producto}</ChipProducto>}
      </div>
      {contexto && <span style={{ fontSize: 13, color: 'var(--ts,#5E6168)' }}>{contexto}</span>}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 2 }}>
        {llego && <span style={{ fontSize: 10.5, color: 'var(--tt,#8A8C93)' }}>{llego}</span>}
        <span style={{ flex: 1 }} />
        {accion}
      </div>
    </div>
  );
}
