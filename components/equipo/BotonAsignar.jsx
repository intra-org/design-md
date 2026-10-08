import React from 'react';
import { Avatar } from './Avatar.jsx';

/* Botón Asignar (Equipo, v1.6.0). Sin vendedor: pill sólida --btn-bg
   "Asignar ⌄". Con vendedor: outline --divider con avatar 20 + nombre.
   32px de alto, máx 168px. Abre MenuAsignar centrado bajo el botón. */
export function BotonAsignar({ vendedor, opciones = [], onAsignar, onQuitar, abierto, onToggle, arriba = false, style, ...rest }) {
  const [abInt, setAbInt] = React.useState(false);
  const ab = abierto ?? abInt;
  const toggle = (e) => { e.stopPropagation(); onToggle ? onToggle(!ab) : setAbInt(!ab); };
  const cerrar = () => (onToggle ? onToggle(false) : setAbInt(false));
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = vendedor;
  return (
    <div style={{ position: 'relative', display: 'inline-flex', maxWidth: '100%', ...style }} {...rest}>
      <button type="button" onClick={toggle} onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
        onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 32, padding: v ? '0 10px 0 5px' : '0 14px', borderRadius: 999, boxSizing: 'border-box', maxWidth: 168, border: '1px solid ' + (v ? (hover ? 'var(--tt,#8A8C93)' : 'var(--divider,#EFECE4)') : 'var(--btn-bg,#0A0A0A)'), background: v ? 'transparent' : 'var(--btn-bg,#0A0A0A)', color: v ? 'var(--tp,#0A0A0A)' : 'var(--btn-tx,#FFFFFF)', opacity: !v && hover ? 0.85 : 1, fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', transform: press ? 'scale(0.96)' : 'none', transition: 'border-color .15s ease-out, transform .12s ease-out, opacity .15s ease-out' }}>
        {v && <Avatar nombre={v.nombre} size={20} />}
        <span style={{ flex: 1, minWidth: 0, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v ? v.nombre : 'Asignar'}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', opacity: 0.7 }}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {ab && (
        <MenuAsignar opciones={opciones} actual={v && v.id} arriba={arriba}
          onElegir={(id) => { onAsignar && onAsignar(id); cerrar(); }}
          onQuitar={v ? () => { onQuitar && onQuitar(); cerrar(); } : null} />
      )}
    </div>
  );
}

/* Menú "Asignar a" — popover 250px centrado bajo su botón (abre hacia
   arriba si no cabe). Cada opción: avatar 28 · nombre 13/600 · rol 11 --tt ·
   carga a la derecha (12/700 tabular) + "N por atender" con dot --chip-3. */
export function MenuAsignar({ opciones = [], actual, onElegir, onQuitar, arriba = false, centrado = true, titulo = 'Asignar a', style }) {
  const pos = arriba ? { bottom: 38 } : { top: 38 };
  return (
    <div style={{ position: 'absolute', ...pos, ...(centrado ? { left: '50%', marginLeft: -125 } : { right: 0 }), zIndex: 40, width: 250, boxSizing: 'border-box', ...style }}>
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', background: 'var(--card,#FFFFFF)', borderRadius: 14, padding: 8, maxHeight: 320, overflowY: 'auto', boxShadow: '0 12px 40px -12px rgba(20,16,8,.3), 0 1px 2px rgba(20,16,8,.08)', animation: 'ih-pop .18s ease-out both', transformOrigin: arriba ? 'bottom center' : 'top center' }}>
        <span style={{ padding: '6px 10px 8px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt,#8A8C93)' }}>{titulo}</span>
        {opciones.map((o) => <OpcionAsignar key={o.id} o={o} actual={o.id === actual} onClick={() => onElegir && onElegir(o.id)} />)}
        {onQuitar && <>
          <div style={{ height: 1, background: 'var(--divider,#EFECE4)', margin: '6px 4px' }} />
          <ItemMenu onClick={onQuitar}>Quitar asignación</ItemMenu>
        </>}
      </div>
    </div>
  );
}

function OpcionAsignar({ o, actual, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', border: 'none', background: h ? 'var(--hover,#F7F5EF)' : 'transparent', borderRadius: 9, padding: '9px 10px', fontFamily: 'inherit', cursor: 'pointer' }}>
      <Avatar nombre={o.nombre} size={28} />
      <span style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tp,#0A0A0A)' }}>{o.nombre}</span>
        {o.sub && <span style={{ fontSize: 11, color: 'var(--tt,#8A8C93)' }}>{o.sub}</span>}
      </span>
      {o.carga != null && (
        <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, marginLeft: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--tp,#0A0A0A)' }}>{o.carga}</span>
          {o.pend > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, fontWeight: 600, color: 'var(--ts,#5E6168)', whiteSpace: 'nowrap' }}><span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--chip-3,#D6B06E)', flex: 'none' }} />{o.pend} por atender</span>}
        </span>
      )}
      {actual && <span style={{ fontSize: 12, color: 'var(--ts,#5E6168)' }}>✓</span>}
    </button>
  );
}

export function ItemMenu({ children, onClick, activo = false, style }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', border: 'none', background: activo ? 'var(--tonal,#F1EFE8)' : (h ? 'var(--hover,#F7F5EF)' : 'transparent'), borderRadius: 9, padding: '9px 10px', fontFamily: 'inherit', fontSize: 13, fontWeight: activo ? 700 : 500, color: activo ? 'var(--tp,#0A0A0A)' : 'var(--ts,#5E6168)', cursor: 'pointer', ...style }}>{children}</button>
  );
}
