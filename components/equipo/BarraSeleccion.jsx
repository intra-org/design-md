import React from 'react';
import { MenuAsignar } from './BotonAsignar.jsx';

/* Barra de selección (Equipo). Pastilla frosted centrada al pie — mismo
   vidrio que el Toast — con "N seleccionada(s)" · divisor · Asignar a ⌄ ·
   Intercambiar (solo con 2) · ✕. El toast sube a 84px mientras está visible. */
export function BarraSeleccion({ n = 0, opciones = [], onAsignar, onQuitar, onIntercambiar, onLimpiar, style }) {
  const [menu, setMenu] = React.useState(false);
  if (!n) return null;
  const btn = { display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, border: '1px solid var(--divider,#EFECE4)', background: 'var(--tonal,#F1EFE8)', color: 'var(--tp,#0A0A0A)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' };
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 24, zIndex: 50, display: 'flex', justifyContent: 'center', pointerEvents: 'none', ...style }}>
      <div style={{ position: 'relative', pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 10, background: 'color-mix(in srgb, var(--card,#FFFFFF) 74%, transparent)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)', border: '1px solid var(--divider,#EFECE4)', color: 'var(--tp,#0A0A0A)', borderRadius: 999, padding: '8px 10px 8px 18px', boxShadow: '0 12px 32px -14px rgba(0,0,0,.4)', animation: 'ih-up .3s cubic-bezier(0.34,1.2,0.64,1) both' }}>
        <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{n} {n === 1 ? 'seleccionada' : 'seleccionadas'}</span>
        <span style={{ flex: 'none', width: 1, height: 16, background: 'var(--divider,#EFECE4)' }} />
        <div style={{ position: 'relative', display: 'flex' }}>
          <button type="button" onClick={() => setMenu(!menu)} style={btn}>Asignar a<svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', opacity: 0.8 }}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          {menu && <MenuAsignar arriba centrado={false} opciones={opciones} onElegir={(id) => { setMenu(false); onAsignar && onAsignar(id); }} onQuitar={onQuitar ? () => { setMenu(false); onQuitar(); } : null} style={{ bottom: 42 }} />}
        </div>
        {n === 2 && onIntercambiar && <button type="button" title="Intercambiar vendedores" onClick={onIntercambiar} style={btn}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flex: 'none' }}><path d="M4 8h13m0 0-3-3m3 3-3 3M20 16H7m0 0 3 3m-3-3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>Intercambiar</button>}
        <button type="button" title="Quitar selección (Esc)" onClick={onLimpiar} style={{ border: 'none', background: 'transparent', color: 'var(--ts,#5E6168)', width: 32, height: 32, borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}>✕</button>
      </div>
    </div>
  );
}
