import React from 'react';

/* Encabezado de tabla ordenable (v1.6.0) — misma gramática en Historial,
   Soporte, Ventas y Equipo. 10.5/600/.12em uppercase. Inactivo --tt,
   activo --tp con ↑/↓ de 11px. Columnas de texto libre: ordenable=false
   (sin cursor, sin hover, sin handler). */
export function EncabezadoOrdenable({ children, activo = false, dir = 'asc', ordenable = true, onOrdenar, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const aria = !ordenable ? undefined : (activo ? (dir === 'asc' ? 'ascending' : 'descending') : 'none');
  return (
    <span role="columnheader" aria-sort={aria}
      onClick={ordenable ? onOrdenar : undefined}
      onMouseEnter={() => ordenable && setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', userSelect: ordenable ? 'none' : 'auto', cursor: ordenable ? 'pointer' : 'default', color: activo || hover ? 'var(--tp,#0A0A0A)' : 'var(--tt,#8A8C93)', transition: 'color .15s ease-out', ...style }} {...rest}>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{children}</span>
      {ordenable && activo && <span style={{ flex: 'none', fontSize: 11, lineHeight: 1, letterSpacing: 0 }}>{dir === 'asc' ? '↑' : '↓'}</span>}
    </span>
  );
}

/* "Llegó" ordena por recencia real, no alfabéticamente (DESIGN §15). */
export function MinutosDesde(rel = '') {
  const t = rel.toLowerCase().trim();
  if (t === 'ahora') return 0;
  if (t === 'anoche') return 600;
  if (t === 'ayer') return 1440;
  if (t === 'la semana pasada') return 10080;
  const m = t.match(/hace\s+(\d+)\s*(min|h|d[ií]as?|semanas?)/);
  if (!m) return 99999;
  const n = +m[1], u = m[2];
  return u === 'min' ? n : u === 'h' ? n * 60 : u.startsWith('d') ? n * 1440 : n * 10080;
}
