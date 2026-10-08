import React from 'react';

/* Hero "Estado de tus reportes" (Soporte, v1.6.0). El único negro de la
   pantalla: gradiente del hero + horizonte de luz al pie (mismas capas
   --pl-* del login). Tres cifras de 56px separadas por un filo blanco .12;
   el rótulo de cada una lleva el color del estado (pendientes .62 blanco,
   en proceso --ambar, resueltos --verde). Clic = filtrar la tabla. */
const LBL = { pendiente: 'Pendientes', proceso: 'En proceso', resuelto: 'Resueltos' };
const TINTA = { pendiente: 'rgba(255,255,255,.62)', proceso: 'var(--ambar,#C8881F)', resuelto: 'var(--verde,#5BD6A0)' };
export function HeroReportes({ pendientes = 0, enProceso = 0, resueltos = 0, filtro, onFiltrar, titulo = 'Estado de tus reportes', style, ...rest }) {
  const [hov, setHov] = React.useState(null);
  const n = { pendiente: pendientes, proceso: enProceso, resuelto: resueltos };
  const capa = (bg, extra) => <div style={{ position: 'absolute', inset: 0, background: bg, pointerEvents: 'none', ...extra }} />;
  return (
    <div style={{ flex: 'none', position: 'relative', overflow: 'hidden', borderRadius: 22, background: 'linear-gradient(170deg,#151518 0%,#0A0A0C 45%,#060607 100%)', padding: '44px 30px', color: '#fff', ...style }} {...rest}>
      {capa('radial-gradient(120% 634px at 50% calc(100% + 173px), var(--pl-amb,rgba(96,120,190,.20)) 0%, var(--pl-amb2,rgba(96,120,190,.07)) 40%, transparent 62%)')}
      {capa('radial-gradient(85% 465px at 50% calc(100% + 155px), var(--pl-glow,rgba(255,178,110,.2)) 0%, var(--pl-glow2,rgba(255,164,96,.12)) 38%, transparent 58%)', { animation: 'ih-breathe 9s ease-in-out infinite' })}
      {capa('radial-gradient(42% 220px at 50% calc(100% + 86px), var(--pl-core,rgba(255,206,158,.46)) 0%, var(--pl-core2,rgba(255,184,132,.18)) 45%, transparent 68%)', { animation: 'ih-breathe 9s ease-in-out 1.2s infinite' })}
      {capa('radial-gradient(78% 507px at 50% calc(100% + 291px), transparent 59.35%, var(--pl-rim,rgba(255,212,168,.5)) 59.85%, var(--pl-rim2,rgba(160,180,235,.16)) 60.5%, transparent 61.6%)')}
      {capa('radial-gradient(78% 507px at 50% calc(100% + 291px), #050506 59.9%, transparent 60.5%)')}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', fontVariantNumeric: 'proportional-nums' }}>
        <span style={{ alignSelf: 'center', fontSize: 10.5, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)' }}>{titulo}</span>
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', marginTop: 14 }}>
          {['pendiente', 'proceso', 'resuelto'].map((e, i) => (
            <button key={e} type="button" aria-label={n[e] + ' ' + LBL[e].toLowerCase() + ', filtrar'} aria-pressed={filtro === e}
              onClick={() => onFiltrar && onFiltrar(filtro === e ? null : e)} onMouseEnter={() => setHov(e)} onMouseLeave={() => setHov(null)}
              style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 180, padding: '2px 34px', border: 'none', borderLeft: i ? '1px solid rgba(255,255,255,.12)' : 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', opacity: filtro && filtro !== e ? 0.4 : 1, transition: 'opacity .25s ease-out' }}>
              <span style={{ fontSize: 56, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em', color: '#FFFFFF', textShadow: hov === e ? '0 0 14px rgba(255,255,255,.34), 0 0 30px rgba(255,255,255,.16)' : 'none', transition: 'text-shadow .25s ease-out' }}>{n[e]}</span>
              <span style={{ fontSize: 13, fontWeight: 400, color: TINTA[e] }}>{LBL[e]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
