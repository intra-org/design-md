import React from 'react';
import { ChipProducto } from '../chips/ChipProducto.jsx';

/* Sheet de detalle (patrón exclusivo de móvil). Fondo --scrim: en Atardecer y
   Noche el sheet es oscuro para que el nombre --tp y las etiquetas lean.
   Handle 36×4 con drag-to-dismiss real (>120px cierra, si no snap-back). */
export function SheetDetalle({ abierto = true, nombre, producto, productoColor, productoFondo, campos = [], acciones, children, onCerrar, style, ...rest }) {
  const [dy, setDy] = React.useState(0);
  const inicio = React.useRef(null);
  if (!abierto) return null;

  const mover = (e) => { if (inicio.current != null) setDy(Math.max(0, e.clientY - inicio.current)); };
  const soltar = () => { if (dy > 120 && onCerrar) onCerrar(); setDy(0); inicio.current = null; };

  return (
    <React.Fragment>
      <div onClick={onCerrar} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.34)', zIndex: 40, animation: 'ih-fade .25s ease both' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 50, maxHeight: '86%', overflowY: 'auto', borderRadius: '24px 24px 0 0', background: 'var(--scrim,#FAF9F5)', padding: '8px 20px 24px', transform: 'translateY(' + dy + 'px)', transition: dy ? 'none' : 'transform 250ms cubic-bezier(0.34,1.2,0.64,1)', animation: 'ih-sheet .3s cubic-bezier(0.34,1.2,0.64,1) both', boxSizing: 'border-box', ...style }} {...rest}>
        <div onPointerDown={(e) => { inicio.current = e.clientY; }} onPointerMove={mover} onPointerUp={soltar} onPointerCancel={soltar}
          style={{ padding: '4px 0 12px', display: 'flex', justifyContent: 'center', cursor: 'grab', touchAction: 'none' }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--sec-bd,#D9D5CC)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--tp,#0A0A0A)' }}>{nombre}</span>
          {producto && <ChipProducto color={productoColor} fondo={productoFondo}>{producto}</ChipProducto>}
        </div>
        {campos.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16, borderRadius: 'var(--r-card-sm,16px)', background: 'var(--card,#FFFFFF)', padding: '4px 16px' }}>
            {campos.map((c) => (
              <div key={c.k} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--divider,#EFECE4)' }}>
                <span style={{ flex: 'none', width: 92, fontSize: 12, fontWeight: 600, color: 'var(--tt,#8A8C93)' }}>{c.k}</span>
                <span style={{ flex: 1, fontSize: 13, color: 'var(--tp,#0A0A0A)' }}>{c.v}</span>
              </div>
            ))}
          </div>
        )}
        {acciones && <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>{acciones}</div>}
        {children}
      </div>
    </React.Fragment>
  );
}
