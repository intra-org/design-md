import React from 'react';

const PAL = {
  dia: { g0: '#8FB0E8', g1: '#F0DEC4', g2: '#FFD79A', dot: '#FFF6EA', dotSh: '0 0 0 2px rgba(255,222,176,.12), 0 0 5px 1px rgba(255,206,150,.5), 0 0 11px 2px rgba(255,178,110,.28)', glow: 'drop-shadow(0 0 3px rgba(255,206,150,.42)) drop-shadow(0 0 8px rgba(255,170,110,.2))' },
  tarde: { g0: '#B98CE6', g1: '#D79BC0', g2: '#F0A65C', dot: '#FFEAD2', dotSh: '0 0 0 2px rgba(224,166,180,.14), 0 0 5px 1px rgba(240,166,92,.5), 0 0 11px 2px rgba(185,140,230,.3)', glow: 'drop-shadow(0 0 3px rgba(240,166,92,.4)) drop-shadow(0 0 8px rgba(185,140,230,.26))' },
  noche: { g0: '#5C7FE0', g1: '#6FA6EA', g2: '#96C6F4', dot: '#EAF3FF', dotSh: '0 0 0 2px rgba(150,198,244,.14), 0 0 5px 1px rgba(111,166,234,.55), 0 0 11px 2px rgba(92,127,224,.32)', glow: 'drop-shadow(0 0 3px rgba(111,166,234,.46)) drop-shadow(0 0 8px rgba(92,127,224,.24))' },
};

const W = 300, H = 88, P = 11;
const SPR = 'cubic-bezier(0.22,1,0.36,1)';

/* Catmull-Rom → Bézier, igual que sparkGeom() del prototipo. */
function geom(s) {
  const min = Math.min(...s), max = Math.max(...s);
  const pts = s.map((n, i) => [P + i * (W - 2 * P) / (s.length - 1), H - P - (n - min) / ((max - min) || 1) * (H - 2 * P)]);
  let d = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += 'C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ',' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)
      + ' ' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ',' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)
      + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
  }
  return { d, pts };
}

/* Mini-sparkline del hero. Tres comportamientos que NO son decorativos:
   1) trazo que se revela en 1680ms al montar y en cada cambio de filtro/periodo,
      con el punto final entrando 810ms después (delay 1230ms);
   2) hover con crosshair: la línea se recorta hasta el punto, el punto final se
      apaga y aparece un dot pulsante con la cifra y su fecha;
   3) sin ejes ni leyenda — es contexto de tendencia, no una gráfica. */
export function Sparkline({ puntos = [], tema = 'dia', etiquetas = [], fechas = [], rango = 'este mes', firma, style, ...rest }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [hi, setHi] = React.useState(null);
  const svgRef = React.useRef(null);
  const dotRef = React.useRef(null);
  const c = PAL[tema] || PAL.dia;
  const vals = puntos.length ? puntos : [0, 1];
  const { d, pts } = geom(vals);
  const N = vals.length;

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => {
      if (svgRef.current) svgRef.current.animate([{ clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }, { clipPath: 'inset(0 0 0 0)', opacity: 1 }], { duration: 1680, easing: 'cubic-bezier(0.33,1,0.68,1)', fill: 'backwards' });
      if (dotRef.current) dotRef.current.animate([{ opacity: 0, transform: 'translate(-50%,-50%) scale(.3)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }], { duration: 810, delay: 1230, easing: SPR, fill: 'backwards' });
    }, 60);
    return () => clearTimeout(t);
  }, [firma]);

  const on = hi != null && !!pts[hi];
  const posL = on ? (pts[hi][0] / W * 100).toFixed(2) + '%' : '0%';
  const posT = on ? (pts[hi][1] / H * 100).toFixed(2) + '%' : '0%';
  const fin = pts[N - 1];

  const mover = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    let idx = Math.round(((e.clientX - r.left) / r.width * W - P) / ((W - 2 * P) / (N - 1)));
    idx = Math.max(0, Math.min(N - 1, idx));
    if (idx !== hi) setHi(idx);
  };

  return (
    <div style={style} {...rest}>
      <div style={{ position: 'relative', marginTop: 16, height: H }}>
        <svg ref={svgRef} width="100%" height={H} viewBox={'0 0 ' + W + ' ' + H} preserveAspectRatio="none"
          style={{ display: 'block', overflow: 'visible', WebkitMaskImage: 'linear-gradient(to right,transparent 0%,#000 58%)', maskImage: 'linear-gradient(to right,transparent 0%,#000 58%)', filter: c.glow, clipPath: on ? 'inset(0 ' + (100 - pts[hi][0] / W * 100).toFixed(2) + '% 0 0)' : 'inset(0 0 0 0)', transition: 'clip-path ' + (on ? '0.12s' : '0.55s') + ' ease' }}>
          <defs>
            <linearGradient id={'spk' + uid} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={c.g0} /><stop offset="52%" stopColor={c.g1} /><stop offset="100%" stopColor={c.g2} />
            </linearGradient>
          </defs>
          <path d={d} fill="none" stroke={'url(#spk' + uid + ')'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <span ref={dotRef} style={{ position: 'absolute', left: (fin[0] / W * 100).toFixed(2) + '%', top: (fin[1] / H * 100).toFixed(2) + '%', width: 7, height: 7, borderRadius: 999, background: c.dot, boxShadow: c.dotSh, transform: 'translate(-50%,-50%)', pointerEvents: 'none', opacity: on ? 0 : 1, transition: 'opacity ' + (on ? '0.15s' : '0.5s') + ' ease' }} />
        {on && (
          <React.Fragment>
            <span style={{ position: 'absolute', left: posL, top: posT, width: 9, height: 9, borderRadius: 999, background: c.dot, transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 4 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: 999, pointerEvents: 'none', animation: 'ih-spk-pulse 1.5s ease-in-out infinite' }} />
            </span>
            <span style={{ position: 'absolute', left: posL, top: posT, transform: 'translate(-50%,-155%)', padding: '3px 8px 4px', borderRadius: 8, background: 'rgba(255,255,255,.16)', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)', color: '#fff', fontSize: 11, fontWeight: 700, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 5, boxShadow: '0 5px 14px -5px rgba(0,0,0,.55)', textAlign: 'center' }}>
              <span style={{ display: 'block' }}>{Math.round(vals[hi])}</span>
              <span style={{ display: 'block', marginTop: 1, fontSize: 9, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,.72)' }}>{fechas[hi] || ''}</span>
            </span>
          </React.Fragment>
        )}
        <div onMouseMove={mover} onMouseLeave={() => setHi(null)} style={{ position: 'absolute', inset: '-34px 0 -44px 0', cursor: 'crosshair', zIndex: 3 }} />
        <span style={{ position: 'absolute', left: 0, top: -3, fontSize: 9, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'rgba(255,255,255,.32)', pointerEvents: 'none' }}>{Math.round(Math.max(...vals))}</span>
        <span style={{ position: 'absolute', left: 0, bottom: -1, fontSize: 9, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'rgba(255,255,255,.22)', pointerEvents: 'none' }}>{Math.round(Math.min(...vals))}</span>
      </div>
      {etiquetas.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,.26)' }}>
          {etiquetas.map((x, i) => <span key={i}>{x}</span>)}
        </div>
      )}
      {rango && <p style={{ margin: '10px 0 0', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.38)' }}>Tendencia · {rango}</p>}
    </div>
  );
}
