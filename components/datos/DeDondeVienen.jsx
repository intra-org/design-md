import React from 'react';

/* "De dónde vienen" — fuente de verdad única para las 6 instancias del
   producto: barra de segmentos + filas expandibles + insight de cierre.
   Los segmentos crecen desde 0 al montar (600ms) y se reacomodan con spring
   cuando cambia el periodo; el sub-nivel abre con grid-template-rows y el
   chevron gira 90°. Cualquier diferencia entre propiedades es de DATOS. */
export function DeDondeVienen({ grupos = [], insight, padding = 22, style, ...rest }) {
  const [abierto, setAbierto] = React.useState(null);
  const [listo, setListo] = React.useState(false);
  const total = grupos.reduce((s, g) => s + g.n, 0) || 1;
  const firma = grupos.map((g) => g.nombre + g.n).join('|');

  React.useEffect(() => {
    setListo(false);
    const t = requestAnimationFrame(() => requestAnimationFrame(() => setListo(true)));
    return () => cancelAnimationFrame(t);
  }, [firma]);

  return (
    <div style={{ borderRadius: 'var(--r-card-lg,20px)', background: 'var(--card,#FFFFFF)', boxShadow: 'var(--card-sh)', padding: padding + 'px', boxSizing: 'border-box', ...style }} {...rest}>
      <p style={{ margin: 0, fontSize: 10.5, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--tt,#8A8C93)' }}>De dónde vienen</p>
      <div style={{ display: 'flex', gap: 3, height: 10, borderRadius: 6, overflow: 'hidden', marginTop: 14 }}>
        {grupos.map((g, i) => (
          <span key={g.nombre} style={{ flex: listo ? g.n / total : 0.0001, minWidth: listo ? 6 : 0, background: g.color || 'var(--tonal,#F1EFE8)', borderRadius: 6, transition: 'flex .6s cubic-bezier(0.22,1,0.36,1) ' + (i * 70) + 'ms, min-width .6s cubic-bezier(0.22,1,0.36,1) ' + (i * 70) + 'ms' }} />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
        {grupos.map((g) => {
          const on = abierto === g.nombre;
          return (
            <div key={g.nombre} style={{ display: 'flex', flexDirection: 'column' }}>
              <FilaGrupo g={g} on={on} onToggle={() => setAbierto(on ? null : g.nombre)} />
              <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', transition: 'grid-template-rows .3s cubic-bezier(0.34,1.2,0.64,1)' }}>
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  {(g.canales || []).map((c, i) => (
                    <div key={c.nombre} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0 3px 17px', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(-4px)', transition: 'opacity .25s ease-out ' + (i * 40 + 60) + 'ms, transform .25s ease-out ' + (i * 40 + 60) + 'ms' }}>
                      <span style={{ flex: 1, fontSize: 13, color: 'var(--tt,#8A8C93)' }}>{c.nombre}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ts,#5E6168)', fontVariantNumeric: 'tabular-nums' }}>{c.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {insight && <p style={{ margin: '10px 0 0', paddingTop: 12, borderTop: '1px solid var(--divider,#EFECE4)', fontSize: 13.5, lineHeight: 1.5, color: 'var(--tp,#0A0A0A)' }}>{insight}</p>}
    </div>
  );
}

function FilaGrupo({ g, on, onToggle }) {
  const [press, setPress] = React.useState(false);
  return (
    <button type="button" onClick={onToggle}
      onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)} onPointerLeave={() => setPress(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', opacity: press ? .6 : 1 }}>
      <span style={{ flex: 'none', width: 7, height: 7, borderRadius: 999, background: g.color || 'var(--tt,#8A8C93)' }} />
      <span style={{ flex: 1, fontSize: 13, color: 'var(--ts,#5E6168)' }}>{g.nombre}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tp,#0A0A0A)', fontVariantNumeric: 'tabular-nums' }}>{g.n}</span>
      <span style={{ fontSize: 13, color: 'var(--tt,#8A8C93)', transform: on ? 'rotate(90deg)' : 'none', transition: 'transform .25s cubic-bezier(0.34,1.2,0.64,1)' }}>›</span>
    </button>
  );
}
