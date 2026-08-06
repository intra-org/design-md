import React from 'react';
import { Icon } from '../marca/Icon.jsx';
import { Badge } from '../base/Badge.jsx';
import { Switch } from '../base/Switch.jsx';

/* Fila del catálogo de Productos. El nombre y el color viajan a todo el
   dashboard; el icono solo a las pills de Inicio. */
export function FilaProducto({
  nombre, icono = 'prod-cama', chip = 1, generico = false, precio, oportunidades,
  habilitado = true, activo = false, onToggle, onEditar, onKebab, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onEditar} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', borderRadius: 12, borderBottom: '1px solid var(--divider,#EFECE4)', background: activo ? 'var(--tonal,#F1EFE8)' : (hover ? 'var(--hover,#F7F5EF)' : 'transparent'), opacity: habilitado ? 1 : .55, cursor: 'pointer', transition: 'background 150ms ease-out', ...style }} {...rest}>
      <span style={{ flex: 'none', width: 30, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 9, background: 'var(--tonal,#F1EFE8)', color: 'var(--ts,#5E6168)' }}>
        <Icon name={icono} size={16} />
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, background: 'var(--chip-bg-' + chip + ',var(--tonal,#F1EFE8))', color: 'var(--chip-tx,#5E6168)', fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap' }}>
          <span style={{ flex: 'none', width: 6, height: 6, borderRadius: 999, background: 'var(--chip-' + chip + ')' }} />{nombre}
        </span>
        {generico && <Badge variant="outline">Genérico</Badge>}
      </span>
      <span style={{ flex: 1 }} />
      {precio && <span style={{ fontSize: 12, color: 'var(--ts,#5E6168)', fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{precio}</span>}
      {oportunidades != null && <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--tp,#0A0A0A)', fontVariantNumeric: 'tabular-nums' }}>{oportunidades}</span>}
      <Switch size="fila" checked={habilitado} bloqueado={generico} onChange={onToggle} />
      <button type="button" onClick={(e) => { e.stopPropagation(); onKebab && onKebab(e); }}
        style={{ flex: 'none', width: 26, height: 26, border: 'none', background: 'transparent', color: 'var(--tt,#8A8C93)', fontSize: 15, cursor: 'pointer', lineHeight: 1 }}>···</button>
    </div>
  );
}
