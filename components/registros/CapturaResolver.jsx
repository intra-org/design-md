import React from 'react';

export const CAP_MOTIVOS = [
  ['Sin contacto', ['No contestó', 'Teléfono equivocado']],
  ['Con contacto', ['Fuera de presupuesto', 'Fecha no disponible', 'Eligió otra opción', 'Ya no le interesa']],
  ['Cerrado por fuera', ['Reservó por otro canal', 'Se pospuso']],
];

const fmtMiles = (v) => (v || '').replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/* Captura opcional al resolver. El estado se guarda en el instante del tap;
   este popover llega 160ms después y NUNCA bloquea: cerrarlo no revierte nada.
   kind 'no' → ¿Qué pasó? (motivos en 3 grupos + nota de una línea)
   kind 'si' → Monto de la venta (opcional, MXN). */
export function CapturaResolver({ kind = 'no', onMotivo, onNota, onMonto, onCerrar, style, ...rest }) {
  const [nota, setNota] = React.useState(false);
  const [txtNota, setTxtNota] = React.useState('');
  const [monto, setMonto] = React.useState('');
  const ref = React.useRef(null);
  React.useEffect(() => { const t = setTimeout(() => ref.current && ref.current.focus({ preventScroll: true }), 30); return () => clearTimeout(t); }, [kind]);

  return (
    <React.Fragment>
      <div onClick={onCerrar} style={{ position: 'absolute', inset: 0, zIndex: 58 }} />
      <div tabIndex={-1} onKeyDown={(e) => { if (e.key === 'Escape') onCerrar && onCerrar(); }}
        style={{ position: 'absolute', right: 26, bottom: 26, zIndex: 60, width: 340, borderRadius: 16, background: 'var(--card,#FFFFFF)', boxShadow: '0 20px 54px -16px rgba(0,0,0,.45)', padding: 18, boxSizing: 'border-box', transformOrigin: 'bottom right', animation: 'ih-pop .18s ease-out both', outline: 'none', ...style }} {...rest}>
        {kind === 'no' ? (
          <React.Fragment>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--tp,#0A0A0A)' }}>¿Qué pasó?</span>
              <span style={{ fontSize: 10.5, color: 'var(--tt,#8A8C93)' }}>Opcional — ya quedó guardado</span>
            </div>
            {CAP_MOTIVOS.map(([g, chips]) => (
              <div key={g} style={{ marginBottom: 11 }}>
                <p style={{ margin: '0 0 7px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt,#8A8C93)' }}>{g}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {chips.map((t) => <ChipMotivo key={t} onClick={() => onMotivo && onMotivo(t)}>{t}</ChipMotivo>)}
                </div>
              </div>
            ))}
            {!nota ? (
              <button type="button" onClick={() => setNota(true)} style={{ border: 'none', background: 'transparent', padding: '2px 0', color: 'var(--tt,#8A8C93)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ Agregar nota</button>
            ) : (
              <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                <input ref={ref} value={txtNota} onChange={(e) => setTxtNota(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && txtNota.trim()) onNota && onNota(txtNota.trim()); if (e.key === 'Escape') onCerrar && onCerrar(); }}
                  placeholder="Una línea, opcional"
                  style={{ flex: 1, minWidth: 0, height: 34, borderRadius: 999, border: '1px solid var(--sec-bd,#D9D5CC)', background: 'var(--input-bg,rgba(255,255,255,.85))', color: 'var(--tp,#0A0A0A)', fontFamily: 'inherit', fontSize: 12.5, padding: '0 14px', outline: 'none', boxSizing: 'border-box' }} />
                <BtnGuardar onClick={() => txtNota.trim() ? onNota && onNota(txtNota.trim()) : onCerrar && onCerrar()} />
              </div>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--tp,#0A0A0A)' }}>Monto de la venta</span>
              <span style={{ fontSize: 10.5, color: 'var(--tt,#8A8C93)' }}>Opcional</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--sec-bd,#D9D5CC)', borderRadius: 12, background: 'var(--input-bg,rgba(255,255,255,.85))', padding: '10px 14px' }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--tt,#8A8C93)' }}>$</span>
              <input ref={ref} inputMode="numeric" value={monto} onChange={(e) => setMonto(fmtMiles(e.target.value))}
                onKeyDown={(e) => { if (e.key === 'Enter') onMonto && onMonto(monto); if (e.key === 'Escape') onCerrar && onCerrar(); }}
                placeholder="0"
                style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', color: 'var(--tp,#0A0A0A)', fontFamily: 'inherit', fontSize: 20, fontWeight: 700, outline: 'none', fontVariantNumeric: 'tabular-nums' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--tt,#8A8C93)' }}>MXN</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
              <span />
              <BtnGuardar onClick={() => onMonto && onMonto(monto)} />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

function ChipMotivo({ children, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ flex: 'none', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', height: 32, padding: '0 14px', borderRadius: 999, border: '1px solid var(--sec-bd,#D9D5CC)', background: h ? 'var(--hover,#F7F5EF)' : 'transparent', color: 'var(--tp,#0A0A0A)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}>
      {children}
    </button>
  );
}

function BtnGuardar({ onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ flex: 'none', height: 34, padding: '0 16px', borderRadius: 999, border: '1px solid var(--sec-bd,#D9D5CC)', background: h ? 'var(--hover,#F7F5EF)' : 'transparent', color: 'var(--tp,#0A0A0A)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>Guardar</button>
  );
}

/* Chispas — el burst de 1150ms al confirmar una venta. Anillo + glow + 9
   partículas. Solo en "sí": el "no" no se celebra. */
export function Chispas({ style }) {
  const parts = React.useMemo(() => Array.from({ length: 9 }).map((_, i) => {
    const a = (i / 9) * Math.PI * 2 + 0.4;
    const r = 26 + (i % 3) * 9;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r, d: i * 26, c: ['var(--siri-lA1)', 'var(--siri-lA2)', 'var(--siri-rim)'][i % 3] };
  }), []);
  return (
    <div style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', zIndex: 30, ...style }}>
      <span style={{ position: 'absolute', left: -30, top: -30, width: 60, height: 60, borderRadius: 999, border: '2px solid var(--siri-rimSoft,rgba(232,201,122,.55))', animation: 'ih-fw-ring .95s cubic-bezier(0.22,1,0.36,1) both' }} />
      <span style={{ position: 'absolute', left: -34, top: -34, width: 68, height: 68, borderRadius: 999, background: 'radial-gradient(circle, var(--siri-glow,rgba(232,201,122,.5)) 0%, transparent 68%)', animation: 'ih-fw-glow 1.05s ease-out both' }} />
      {parts.map((p, i) => (
        <span key={i} style={{ position: 'absolute', left: -2, top: -2, width: 4, height: 4, borderRadius: 999, background: p.c, animation: 'ih-fw-spark .9s cubic-bezier(0.22,1,0.36,1) ' + p.d + 'ms both', '--fx': p.x + 'px', '--fy': p.y + 'px' }} />
      ))}
    </div>
  );
}
