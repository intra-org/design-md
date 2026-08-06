import React from 'react';
import { ChipProducto } from '../chips/ChipProducto.jsx';
import { BotonAtender } from './BotonAtender.jsx';
import { BotonesResolver } from './BotonesResolver.jsx';

/* Dot ámbar de urgencia (+24h): sólida + copia pulsando. Única excepción a
   "los elementos viven quietos en reposo" junto al dot verde. */
export function DotAmbar({ size = 7 }) {
  return (
    <span title="Sin atender +24 h" style={{ position: 'relative', flex: 'none', width: size, height: size }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--ambar,#D99A2B)' }} />
      <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--ambar,#D99A2B)', animation: 'ih-pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite' }} />
    </span>
  );
}

const ROW_BASE = { position: 'relative', borderBottom: '1px solid var(--divider,#F1EFE8)', borderRadius: 12, cursor: 'pointer', transition: 'background .15s ease-out' };

/* Renglón de Personas. Write-once. Móvil: gap 12, padding 12/12, columna
   derecha con "rel" arriba y la acción abajo. Escritorio: gap 16, padding
   13/14 y columnas fijas 230 · 104 · flex · 92 · 140 para que tiempo y
   acciones caigan en la MISMA x en los tres grupos. */
export function RenglonPersona({
  nombre, producto, productoColor, productoFondo,
  contexto, dato, rel, urgente = false, estado = 'pendiente', stamp,
  desktop = false, onAtender, onSi, onNo, onClick, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const fondo = hover ? 'var(--hover,#F7F5EF)' : 'transparent';
  const accion = <Accion estado={estado} stamp={stamp} urgente={urgente} onAtender={onAtender} onSi={onSi} onNo={onNo} />;

  if (desktop) {
    return (
      <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '13px 14px', background: fondo, ...ROW_BASE, ...style }} {...rest}>
        <div style={{ flex: 'none', width: 230, display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          {urgente && <DotAmbar />}
          <span style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--tp,#0A0A0A)' }}>{nombre}</span>
        </div>
        <span style={{ flex: 'none', width: 104, display: 'flex', alignItems: 'center' }}>
          {producto && <ChipProducto color={productoColor} fondo={productoFondo}>{producto}</ChipProducto>}
        </span>
        <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, color: 'var(--ts,#5E6168)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contexto}</span>
          {dato && <span style={{ fontSize: 10.5, color: 'var(--tt,#8A8C93)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', animation: 'ih-up .3s cubic-bezier(0.34,1.2,0.64,1) both' }}>{dato}</span>}
        </span>
        <span style={{ flex: 'none', width: 92, textAlign: 'right', whiteSpace: 'nowrap', fontSize: 10.5, color: 'var(--tt,#8A8C93)' }}>{rel}</span>
        <div style={{ flex: 'none', width: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{accion}</div>
      </div>
    );
  }

  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 12px', background: fondo, ...ROW_BASE, ...style }} {...rest}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          {urgente && <DotAmbar />}
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--tp,#0A0A0A)' }}>{nombre}</span>
          {producto && <ChipProducto color={productoColor} fondo={productoFondo}>{producto}</ChipProducto>}
        </div>
        <span style={{ fontSize: 13, color: 'var(--ts,#5E6168)' }}>{contexto}</span>
        {dato && <span style={{ fontSize: 11, color: 'var(--tt,#8A8C93)', animation: 'ih-up .3s cubic-bezier(0.34,1.2,0.64,1) both' }}>{dato}</span>}
      </div>
      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
        {rel && <span style={{ fontSize: 10.5, color: 'var(--tt,#8A8C93)' }}>{rel}</span>}
        {accion}
      </div>
    </div>
  );
}

function Accion({ estado, stamp, urgente, onAtender, onSi, onNo }) {
  if (estado === 'pendiente') return <BotonAtender ambar={urgente} onClick={onAtender} />;
  if (estado === 'seguimiento') return <BotonesResolver onSi={onSi} onNo={onNo} />;
  const color = estado === 'no-confirmado' ? 'var(--tt,#8A8C93)' : 'var(--verde-tx,#1F8A5C)';
  return <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', color, animation: 'ih-up .34s cubic-bezier(0.34,1.2,0.64,1) both' }}>{stamp || (estado === 'no-confirmado' ? 'No confirmado' : '✓ Atendido')}</span>;
}
