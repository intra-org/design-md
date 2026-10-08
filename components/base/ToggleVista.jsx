import React from 'react';
import { Icon } from '../marca/Icon.jsx';

/* Toggle de vista lista / kanban (v1.6.0). NO es un botón de icono suelto: es
   el mismo segmented del selector de periodo con dos valores — track
   --seg-track, thumb --seg-thumb, botones 44×38, icono 15px, spring 250ms. */
export function ToggleVista({ value = 'lista', onChange, opciones, style, ...rest }) {
  const ops = opciones || [{ value: 'lista', icono: 'lista', titulo: 'Vista de lista' }, { value: 'kanban', icono: 'kanban', titulo: 'Vista de columnas' }];
  const i = Math.max(0, ops.findIndex((o) => o.value === value));
  return (
    <div role="group" aria-label="Vista" style={{ position: 'relative', flex: 'none', display: 'flex', padding: 3, borderRadius: 999, background: 'var(--seg-track,#EFECE4)', ...style }} {...rest}>
      <span style={{ position: 'absolute', top: 3, bottom: 3, left: 'calc(3px + ' + i + ' * (100% - 6px) / ' + ops.length + ')', width: 'calc((100% - 6px) / ' + ops.length + ')', borderRadius: 999, background: 'var(--seg-thumb,#FFFFFF)', boxShadow: '0 1px 2px rgba(20,16,8,.1)', transition: 'left .25s cubic-bezier(0.34,1.2,0.64,1)' }} />
      {ops.map((o) => (
        <button key={o.value} type="button" title={o.titulo} aria-pressed={o.value === value} onClick={() => onChange && onChange(o.value)}
          style={{ position: 'relative', zIndex: 1, width: 44, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, color: o.value === value ? 'var(--tp,#0A0A0A)' : 'var(--ts,#5E6168)', transition: 'color .15s ease-out' }}>
          <Icon name={o.icono} size={15} />
        </button>
      ))}
    </div>
  );
}
