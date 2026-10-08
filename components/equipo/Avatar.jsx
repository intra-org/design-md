import React from 'react';

/* Avatar de iniciales (Equipo). Círculo --tonal, iniciales --tp 700 al 36%
   del lado. Sin fotos: el producto no usa imagen. */
export function iniciales(nombre = '') {
  const p = nombre.trim().split(/\s+/);
  return ((p[0] || '')[0] || '').toUpperCase() + ((p[1] || '')[0] || '').toUpperCase();
}
export function Avatar({ nombre = '', ini, size = 28, style, ...rest }) {
  return (
    <span style={{ flex: 'none', width: size, height: size, borderRadius: 999, background: 'var(--tonal,#F1EFE8)', color: 'var(--tp,#0A0A0A)', fontSize: Math.round(size * 0.36), fontWeight: 700, letterSpacing: '.01em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }} {...rest}>{ini || iniciales(nombre) || nombre.slice(0, 1)}</span>
  );
}

/* Pila de avatares del encabezado de Equipo: 3 visibles solapados -7px +
   contador "+N" en --seg-track. Toda la pila es un botón (abre Administrar). */
export function AvatarStack({ nombres = [], max = 3, onClick, style, ...rest }) {
  const vis = nombres.slice(0, max), resto = nombres.length - vis.length;
  const capa = 'linear-gradient(var(--tonal,#F1EFE8), var(--tonal,#F1EFE8)) var(--card,#FFFFFF)';
  return (
    <button type="button" title="Administrar equipo" onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', ...style }} {...rest}>
      {vis.map((n, i) => <Avatar key={n + i} nombre={n} size={28} style={{ marginLeft: i ? -7 : 0, background: capa, boxShadow: '0 0 0 2px var(--stack-ring, transparent)', fontSize: 10, position: 'relative', zIndex: max - i }} />)}
      {resto > 0 && <span style={{ flex: 'none', width: 28, height: 28, marginLeft: -7, borderRadius: 999, background: 'linear-gradient(var(--seg-track,#EFECE4), var(--seg-track,#EFECE4)) var(--card,#FFFFFF)', boxShadow: '0 0 0 2px var(--stack-ring, transparent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, color: 'var(--ts,#5E6168)' }}>+{resto}</span>}
    </button>
  );
}
