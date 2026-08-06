import React from 'react';

/* ✓ / ✕ — resolver una persona en seguimiento. NO abren conversación, por eso
   nunca llevan el ícono de WhatsApp. 36×30 outline; hover = fill --btn-bg;
   pressed scale .94. Detienen la propagación: resolver no abre el detalle. */
export function BotonesResolver({ onSi, onNo, style, ...rest }) {
  return (
    <div style={{ display: 'flex', gap: 8, flex: 'none', ...style }} {...rest}>
      <BtnR onClick={onSi} title="Confirmado" color="var(--verde-tx,#1F8A5C)">✓</BtnR>
      <BtnR onClick={onNo} title="No confirmado" color="var(--ts,#5E6168)">✕</BtnR>
    </div>
  );
}

function BtnR({ onClick, title, color, children }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const fill = hover || press;
  return (
    <button type="button" title={title} onClick={(e) => { e.stopPropagation(); onClick && onClick(e); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)}
      style={{ width: 36, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, boxSizing: 'border-box', border: '1px solid ' + (fill ? 'var(--btn-bg,#0A0A0A)' : 'var(--sec-bd,#D9D5CC)'), background: fill ? 'var(--btn-bg,#0A0A0A)' : 'transparent', color: fill ? 'var(--btn-tx,#fff)' : color, fontFamily: 'inherit', fontSize: 13, cursor: 'pointer', transform: press ? 'scale(0.94)' : 'scale(1)', transition: 'transform .12s ease-out' }}>
      {children}
    </button>
  );
}
