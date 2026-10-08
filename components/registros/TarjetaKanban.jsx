import React from 'react';
import { ChipProducto } from '../chips/ChipProducto.jsx';
import { DotAmbar } from './RenglonPersona.jsx';

/* Tarjeta kanban de Ventas / Equipo (v1.6.0). --card radio 12, padding
   14/16, --card-sh. Nombre 15.5/700 (dot ámbar si +24h) · chip de producto ·
   contexto 13 --ts a 2 líneas · rel 11 --tt · pie con acciones o sello.
   Densidad compacta oculta contexto y rel. Seleccionada: anillo inset --tp. */
export function TarjetaKanban({ nombre, producto, productoColor, productoFondo, contexto, rel, urgente = false, densidad = 'extendida', seleccionada = false, objetivo = false, arrastrando = false, acciones, sello, selloColor = 'var(--verde-tx,#1F8A5C)', casilla, onClick, style, ...rest }) {
  const [h, setH] = React.useState(false);
  const anillo = objetivo ? 'inset 0 0 0 2px var(--tp,#0A0A0A), ' : seleccionada ? 'inset 0 0 0 1.5px var(--tp,#0A0A0A), ' : '';
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ boxSizing: 'border-box', flex: 'none', background: 'var(--card,#FFFFFF)', backgroundImage: h ? 'linear-gradient(var(--hover,#F7F5EF),var(--hover,#F7F5EF))' : 'none', borderRadius: 12, boxShadow: anillo + 'var(--card-sh,0 1px 2px rgba(20,16,8,.04), 0 12px 32px -22px rgba(20,16,8,.16))', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, cursor: 'grab', userSelect: 'none', opacity: arrastrando ? 0.35 : 1, transform: objetivo ? 'scale(1.02)' : 'none', transition: 'opacity .15s ease-out, box-shadow .15s ease-out, transform .15s ease-out', ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
        {urgente && <DotAmbar size={6} />}
        <span style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp,#0A0A0A)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nombre}</span>
        <span style={{ flex: 1 }} />
        {casilla}
      </div>
      {producto && <ChipProducto color={productoColor} fondo={productoFondo} style={{ fontSize: 11.5, fontWeight: 500, padding: '3px 9px', borderRadius: 8, letterSpacing: 0, color: 'var(--chip-tx,#5E6168)' }}>{producto}</ChipProducto>}
      {densidad === 'extendida' && (contexto || rel) && (
        <div>
          {contexto && <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--ts,#5E6168)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{contexto}</span>}
          {rel && <span style={{ display: 'block', marginTop: 6, fontSize: 11, lineHeight: 1.4, color: 'var(--tt,#8A8C93)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rel}</span>}
        </div>
      )}
      {(acciones || sello) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, marginTop: 2 }}>
          {sello ? <span style={{ minWidth: 0, fontSize: 12.5, fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: selloColor }}>{sello}</span> : acciones}
        </div>
      )}
    </div>
  );
}

/* Columna kanban: pista tonal radio 16 padding 12, encabezado 12/600
   uppercase .06em --ts + conteo --tt; lista con gap 10. activa = destino
   del arrastre (pista un poco más marcada). */
export function ColumnaKanban({ titulo, conteo, activa = false, vacio, cabecera, children, style }) {
  return (
    <div style={{ flex: '1 0 0', minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: 0, ...style }}>
      <div style={{ boxSizing: 'border-box', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: 12, borderRadius: 16, background: activa ? 'color-mix(in srgb, var(--tonal,#F1EFE8) 34%, transparent)' : 'color-mix(in srgb, var(--tonal,#F1EFE8) 18%, transparent)', transition: 'background .18s ease-out' }}>
        {cabecera || (
          <div style={{ flex: 'none', display: 'flex', alignItems: 'baseline', gap: 8, padding: '2px 4px 10px' }}>
            <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ts,#5E6168)' }}>{titulo}</span>
            {conteo != null && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--tt,#8A8C93)' }}>{conteo}</span>}
          </div>
        )}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, borderRadius: 12 }}>
          {children}
          {vacio && <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px 10px' }}><span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--tt,#8A8C93)' }}>{vacio}</span></div>}
        </div>
      </div>
    </div>
  );
}
