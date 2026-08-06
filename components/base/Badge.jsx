import React from 'react';

/* Badge. conteo = pastilla tabular del nav lateral · tonal = "Ya está resuelto"
   outline = "GENÉRICO" del catálogo. Nunca lleva color de señal. */
export function Badge({ variant = 'conteo', children, style, ...rest }) {
  const base = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', fontFamily: 'inherit' };
  const v = {
    conteo: { minWidth: 20, height: 20, padding: '0 6px', borderRadius: 'var(--r-pill,999px)', background: 'var(--tonal,#F1EFE8)', color: 'var(--tp,#0A0A0A)', fontSize: 11, fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
    tonal: { padding: '3px 8px', borderRadius: 'var(--r-badge,6px)', background: 'var(--tonal,#F1EFE8)', color: 'var(--ts,#5E6168)', fontSize: 10.5, fontWeight: 600, letterSpacing: '.06em' },
    outline: { padding: '2px 7px', borderRadius: 'var(--r-badge,6px)', border: '1px solid var(--sec-bd,#D9D5CC)', color: 'var(--tt,#8A8C93)', fontSize: 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' },
  }[variant];
  return <span style={{ ...base, ...v, ...style }} {...rest}>{children}</span>;
}
