import React from 'react';

/* "Pregúntale a tu asistente" (Inicio, v1.6.0). Tarjeta --card radio 20
   con el composer IDÉNTICO al de Preguntar: campo pastilla 44px (40 móvil),
   botón ↑ circular FUERA del campo al 45% (100% al hover) y, solo en
   escritorio, dos chips de sugerencia. No es atajo de navegación: Enter, ↑ o
   un chip llaman onPreguntar(texto) y el campo se limpia. */
export function WidgetPregunta({ onPreguntar, sugerencias = ['¿Qué tengo en la agenda esta semana?', '¿Quién sigue sin ser atendido?'], movil = false, placeholder = '¿Cómo vamos este mes?', style, ...rest }) {
  const [q, setQ] = React.useState('');
  const [foco, setFoco] = React.useState(false);
  const [hEnv, setHEnv] = React.useState(false);
  const enviar = (t) => { const v = (t ?? q).trim(); if (!v) return; setQ(''); onPreguntar && onPreguntar(v); };
  const h = movil ? 40 : 44, b = movil ? 35 : 44;
  return (
    <div style={{ borderRadius: 20, background: 'var(--card,#FFFFFF)', padding: '18px 22px 20px', boxShadow: 'var(--card-sh,0 1px 2px rgba(20,16,8,.04), 0 12px 32px -22px rgba(20,16,8,.16))', display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box', ...style }} {...rest}>
      <style>{'input[data-ph-soft]::placeholder{color:var(--tt,#8A8C93);opacity:.62}'}</style>
      <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--tt,#8A8C93)' }}>Pregúntale a tu asistente</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input data-ph-soft="" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && enviar()}
          onFocus={() => setFoco(true)} onBlur={() => setFoco(false)} placeholder={placeholder}
          style={{ flex: 1, minWidth: 0, height: h, padding: '0 18px', borderRadius: 999, boxSizing: 'border-box', border: '1px solid ' + (foco ? 'rgba(20,16,8,.28)' : 'rgba(20,16,8,.12)'), background: 'var(--input-bg,rgba(255,255,255,.85))', color: 'var(--tp,#0A0A0A)', fontFamily: 'inherit', fontSize: movil ? 12.5 : 14, outline: 'none', transition: 'border-color .15s ease-out' }} />
        <button type="button" title="Preguntar" onClick={() => enviar()} onMouseEnter={() => setHEnv(true)} onMouseLeave={() => setHEnv(false)}
          style={{ flex: 'none', width: b, height: b, borderRadius: 999, border: 'none', background: '#E4E0D8', color: '#8A8C93', opacity: hEnv ? 1 : 0.45, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity .15s ease-out, transform .12s ease-out' }}>↑</button>
      </div>
      {!movil && sugerencias.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {sugerencias.map((s) => <Sugerencia key={s} onClick={() => enviar(s)}>{s}</Sugerencia>)}
        </div>
      )}
    </div>
  );
}

function Sugerencia({ children, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding: '8px 13px', borderRadius: 999, border: '1px solid var(--divider,#EFECE4)', background: h ? 'var(--hover,#F7F5EF)' : 'transparent', color: 'var(--ts,#5E6168)', fontFamily: 'inherit', fontSize: 12, textAlign: 'left', cursor: 'pointer', transition: 'background .15s ease-out' }}>{children}</button>
  );
}
