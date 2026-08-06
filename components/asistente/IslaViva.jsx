import React from 'react';

/* Isla viva — pill de ancho FIJO con el dot verde anclado a la izquierda
   (absolute) y crossfade de 250ms entre mensajes; el marco nunca se mueve.
   Escritorio: 490px, padding 9/16/9/34, gap 10, dot en left 16.
   Móvil: ancho del contenedor, padding 9/14/9/30, dot en left 14.
   Sticky (scroll > 40px): muta a frosted con texto blanco. */
export function IslaViva({ mensajes = [], separador, intervalo = 4600, sticky = false, desktop = false, ancho, style, ...rest }) {
  const [i, setI] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    if (mensajes.length < 2) return undefined;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setI((v) => (v + 1) % mensajes.length); setVisible(true); }, 250);
    }, intervalo);
    return () => clearInterval(t);
  }, [mensajes.length, intervalo]);

  return (
    <div style={{
      position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: desktop ? 10 : 8,
      width: ancho != null ? ancho : (desktop ? 490 : '100%'), minHeight: 18, boxSizing: 'border-box',
      padding: desktop ? '9px 16px 9px 34px' : '9px 14px 9px 30px', borderRadius: 999, overflow: 'hidden', whiteSpace: 'nowrap',
      background: sticky ? 'rgba(22,23,27,.78)' : 'var(--tonal,#F1EFE8)',
      backdropFilter: sticky ? 'blur(16px) saturate(180%)' : undefined,
      WebkitBackdropFilter: sticky ? 'blur(16px) saturate(180%)' : undefined,
      border: sticky ? '1px solid rgba(255,255,255,.12)' : '1px solid transparent',
      transition: 'background .3s ease-out, border-color .3s ease-out, box-shadow .3s ease-out',
      ...style,
    }} {...rest}>
      <span style={{ position: 'absolute', left: desktop ? 16 : 14, top: '50%', marginTop: -4, width: 8, height: 8 }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--verde,#5BD6A0)', transition: 'background .45s ease .24s' }} />
        <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--verde,#5BD6A0)', animation: 'ih-pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite' }} />
      </span>
      <span style={{ fontSize: 13, fontWeight: separador ? 600 : 400, color: sticky ? '#FFFFFF' : (separador ? 'var(--tp,#0A0A0A)' : 'var(--ts,#5E6168)'), textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', opacity: visible ? 1 : 0, transition: 'opacity 250ms ease-out' }}>
        {mensajes[i]}
      </span>
      {separador && <React.Fragment>
        <span style={{ width: 1, height: 14, background: 'var(--divider,#EFECE4)', flex: 'none' }} />
        <span style={{ fontSize: 13, color: sticky ? 'rgba(255,255,255,.8)' : 'var(--ts,#5E6168)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{separador}</span>
      </React.Fragment>}
    </div>
  );
}
