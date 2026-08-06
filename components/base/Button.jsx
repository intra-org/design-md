import React from 'react';

/* Botón del sistema. Pill 999px siempre; el peso lo da la variante.
   Pressed: scale + darken 120ms. Prohibida cualquier animación en reposo. */
export function Button({ variant = 'primary', size = 'md', full = false, disabled = false, icon = null, children, style, onClick, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const alto = size === 'sm' ? 34 : size === 'lg' ? 48 : 44;
  const fs = size === 'sm' ? 12.5 : 13.5;
  const pad = size === 'sm' ? '0 14px' : '0 20px';

  const base = {
    position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    height: alto, padding: pad, borderRadius: 'var(--r-pill,999px)', boxSizing: 'border-box',
    fontFamily: 'inherit', fontSize: fs, fontWeight: 600, letterSpacing: '-0.005em', whiteSpace: 'nowrap',
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
    transition: 'transform 120ms ease-out, opacity 120ms ease-out, background 150ms ease-out',
    transform: press && !disabled ? 'scale(0.98)' : 'scale(1)',
    width: full ? '100%' : undefined,
  };
  const porVariante = {
    primary: { border: 'none', background: 'var(--btn-bg,#0A0A0A)', color: 'var(--btn-tx,#FFFFFF)', boxShadow: 'var(--sh-btn,0 10px 24px -12px rgba(0,0,0,.5))', opacity: press ? 0.92 : (disabled ? 0.45 : 1) },
    secondary: { border: '1px solid var(--sec-bd,#D9D5CC)', background: hover && !disabled ? 'var(--tonal,#F1EFE8)' : 'transparent', color: 'var(--tp,#0A0A0A)' },
    ghost: { border: 'none', background: hover && !disabled ? 'var(--hover,#F7F5EF)' : 'transparent', color: 'var(--ts,#5E6168)' },
  }[variant];

  return (
    <button
      type="button" disabled={disabled} onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)}
      style={{ ...base, ...porVariante, ...style }} {...rest}
    >
      {icon}{children}
    </button>
  );
}
