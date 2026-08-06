import React from 'react';
import { ChipProducto } from '../chips/ChipProducto.jsx';

/* Panel lateral de detalle (escritorio) — reemplaza al sheet. Fondo --nav-bg:
   la misma superficie recesada del nav, porque el panel es chrome, no
   contenido. Vive como hermano del contenido en Personas y en Agenda;
   cambiar de pestaña lo cierra. */
export function PanelDetalle({ abierto = true, nombre, producto, productoColor, productoFondo, campos = [], acciones, ancho = 380, children, onCerrar, style, ...rest }) {
  if (!abierto) return null;
  return (
    <aside style={{ flex: 'none', width: ancho, display: 'flex', flexDirection: 'column', gap: 16, padding: '22px 22px 26px', background: 'var(--nav-bg,#F7F5EF)', borderLeft: '1px solid var(--divider,#EFECE4)', overflowY: 'auto', animation: 'ih-fade .25s ease-out both', boxSizing: 'border-box', ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp,#0A0A0A)' }}>{nombre}</span>
        {producto && <ChipProducto color={productoColor} fondo={productoFondo}>{producto}</ChipProducto>}
        <span style={{ flex: 1 }} />
        <button type="button" onClick={onCerrar} title="Cerrar" style={{ border: 'none', background: 'transparent', color: 'var(--tt,#8A8C93)', fontSize: 15, cursor: 'pointer', padding: 2, lineHeight: 1 }}>✕</button>
      </div>
      {campos.length > 0 && (
        <div style={{ borderRadius: 'var(--r-card-sm,16px)', background: 'var(--card,#FFFFFF)', padding: '4px 16px' }}>
          {campos.map((c) => (
            <div key={c.k} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--divider,#EFECE4)' }}>
              <span style={{ flex: 'none', width: 96, fontSize: 12, fontWeight: 600, color: 'var(--tt,#8A8C93)' }}>{c.k}</span>
              <span style={{ flex: 1, fontSize: 13, color: 'var(--tp,#0A0A0A)' }}>{c.v}</span>
            </div>
          ))}
        </div>
      )}
      {acciones && <div style={{ display: 'flex', gap: 8 }}>{acciones}</div>}
      {children}
    </aside>
  );
}
