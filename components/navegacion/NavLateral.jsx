import React from 'react';
import { Icon } from '../marca/Icon.jsx';
import { Isotipo } from '../marca/Isotipo.jsx';

/* Nav lateral de escritorio — tarjeta FLOTANTE de vidrio, no una columna con
   borde: margen 16px, radio 26 (42 al colapsar), fondo
   color-mix(--nav-bg 84%, transparent) + blur(20px) saturate(1.3).
   El contenido va en capas absolutas de 248px de ancho para que al comprimir
   a 84px las etiquetas se recorten en vez de reacomodarse. */
const EASE = '0.5s cubic-bezier(0.4,0,0.2,1)';
const CW = 248;

export function NavLateral({
  hotel = 'Hampton Demo', items = [], activo, onSelect,
  modo, usuario, colapsado = false, onColapsar, base = 'assets/logos', style, ...rest
}) {
  const w = colapsado ? 84 : CW;
  return (
    <nav style={{
      position: 'relative', flex: 'none', boxSizing: 'border-box', width: w, margin: '16px 0 16px 16px', height: 'calc(100% - 32px)',
      background: 'color-mix(in srgb, var(--nav-bg,#F7F5EF) 84%, transparent)',
      border: '1px solid var(--divider,#EFECE4)', borderRadius: colapsado ? 42 : 26,
      boxShadow: '0 26px 60px -34px rgba(20,16,8,.45), inset 0 1px 0 rgba(255,255,255,.45)',
      backdropFilter: 'blur(20px) saturate(1.3)', WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
      overflow: 'visible', transition: 'width ' + EASE + ', border-radius ' + EASE, ...style,
    }} {...rest}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: CW, boxSizing: 'border-box', padding: '26px 20px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 6px', height: 34 }}>
          <Isotipo size={28} base={base} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0, overflow: 'hidden', opacity: colapsado ? 0 : 1, transition: 'opacity .2s ease', pointerEvents: colapsado ? 'none' : 'auto' }}>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap', color: 'var(--tp,#0A0A0A)' }}>{hotel}</span>
            <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: 'var(--tt,#8A8C93)' }}>Asistente comercial</span>
          </div>
        </div>
        {items.map((it) => <ItemNav key={it.id} item={it} activo={it.id === activo} colapsado={colapsado} onSelect={onSelect} />)}
      </div>

      {modo && (
        <div style={{ position: 'absolute', left: 0, bottom: 74, width: CW, boxSizing: 'border-box', padding: '0 20px', display: 'flex', alignItems: 'center' }}>{modo}</div>
      )}

      {usuario && (
        <div style={{ position: 'absolute', left: 0, bottom: 20, width: CW, boxSizing: 'border-box', padding: '0 26px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: 'var(--tonal,#F1EFE8)', color: 'var(--ts,#5E6168)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{usuario.iniciales}</span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0, overflow: 'hidden', opacity: colapsado ? 0 : 1, transition: 'opacity .2s ease' }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--tp,#0A0A0A)' }}>{usuario.nombre}</span>
            <span style={{ fontSize: 10.5, color: 'var(--tt,#8A8C93)' }}>{usuario.rol}</span>
          </span>
        </div>
      )}
      </div>

      {onColapsar && (
        <button type="button" title="Comprimir menú" onClick={onColapsar}
          style={{ position: 'absolute', top: 46, right: -14, zIndex: 20, width: 28, height: 28, borderRadius: 999, border: '1px solid var(--divider,#EFECE4)', background: 'var(--nav-bg,#F7F5EF)', boxShadow: 'var(--sh-nav-btn,0 1px 3px -1px rgba(20,16,8,.12))', color: 'var(--tt,#8A8C93)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d={colapsado ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      )}
    </nav>
  );
}

function ItemNav({ item, activo, colapsado, onSelect }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" onClick={() => onSelect && onSelect(item.id)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-start',
        width: colapsado ? 44 : '100%', padding: 12, borderRadius: colapsado ? 14 : 12,
        border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
        background: activo ? 'var(--seg-track,#EFECE4)' : (hover ? 'var(--tonal,#F1EFE8)' : 'transparent'),
        color: activo ? 'var(--tp,#0A0A0A)' : 'var(--ts,#5E6168)',
        textAlign: 'left', boxSizing: 'border-box', overflow: 'hidden',
        transition: 'background .15s ease-out, color .15s ease-out, width ' + EASE + ', border-radius ' + EASE,
      }}>
      <Icon name={item.icono} size={18} />
      <span style={{ flex: 1, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', opacity: colapsado ? 0 : 1, maxWidth: colapsado ? 0 : 160, overflow: 'hidden', transition: 'opacity .2s ease, max-width .35s ease' }}>
        {item.label}<span style={{ flex: 1 }} />
        {item.conteo != null && <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--ts,#5E6168)', background: 'var(--tonal,#F1EFE8)', borderRadius: 6, padding: '2px 7px' }}>{item.conteo}</span>}
      </span>
    </button>
  );
}
