import React from 'react';

/* Popover de filtros/export. top 44px desde el disparador, radio 14, padding 8,
   sombra 0 12px 40px -12px + 1px de contacto, entrada ih-pop 180ms desde la
   esquina superior derecha. Radio behavior: abrir uno cierra los demás. */
export function Popover({ items = [], value, onSelect, abierto = true, align = 'right', ancho = 170, style, ...rest }) {
  if (!abierto) return null;
  return (
    <div role="menu"
      style={{ position: 'absolute', top: 44, [align]: 0, zIndex: 31, minWidth: ancho, padding: 8, display: 'flex', flexDirection: 'column', borderRadius: 14, background: 'var(--card,#FFFFFF)', boxShadow: '0 12px 40px -12px rgba(20,16,8,.3), 0 1px 2px rgba(20,16,8,.08)', transformOrigin: 'top ' + align, animation: 'ih-pop .18s ease-out both', boxSizing: 'border-box', ...style }}
      {...rest}>
      {items.map((it) => <ItemPopover key={it.value ?? it.label} item={it} activo={(it.value ?? it.label) === value} onSelect={onSelect} />)}
    </div>
  );
}

function ItemPopover({ item, activo, onSelect }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" role="menuitemradio" aria-checked={activo}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => onSelect && onSelect(item.value ?? item.label)}
      style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '10px 12px', border: 'none', borderRadius: 9, background: activo ? 'var(--tonal,#F1EFE8)' : (hover ? 'var(--hover,#F7F5EF)' : 'transparent'), color: 'var(--tp,#0A0A0A)', fontFamily: 'inherit', fontSize: 13, fontWeight: activo ? 700 : 500, textAlign: 'left', cursor: 'pointer' }}>
      {item.dot && <span style={{ flex: 'none', width: 5, height: 5, borderRadius: 999, background: item.dot }} />}
      <span style={{ flex: 1 }}>{item.label ?? item}</span>
      {item.meta && <span style={{ fontSize: 12, color: 'var(--tt,#8A8C93)' }}>{item.meta}</span>}
    </button>
  );
}
