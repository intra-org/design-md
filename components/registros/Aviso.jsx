import React from 'react';
import { Badge } from '../base/Badge.jsx';

/* Aviso proactivo. El asistente informa un hecho; el dot es gris salvo cuando
   la noticia es del sistema vivo (verde). Acción como link "Ver →", nunca
   como botón: no compite con el hero. */
export function Aviso({ children, dot = 'var(--tt,#8A8C93)', accion, resuelto = false, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '16px 22px', borderRadius: 'var(--r-card,18px)', background: 'var(--card,#FFFFFF)', boxShadow: 'var(--card-sh)', cursor: onClick ? 'pointer' : 'default', transition: 'background 150ms ease-out', backgroundColor: onClick && hover ? 'var(--hover,#F7F5EF)' : undefined, boxSizing: 'border-box', ...style }} {...rest}>
      <span style={{ flex: 'none', width: 7, height: 7, borderRadius: 999, background: dot, marginTop: 6 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'var(--tp,#0A0A0A)' }}>
          {children}{accion && <span style={{ color: 'var(--link,#2F5FC0)', fontWeight: 600, whiteSpace: 'nowrap' }}> {accion}</span>}
        </p>
        {resuelto && <Badge variant="tonal" style={{ alignSelf: 'flex-start' }}>Ya está resuelto</Badge>}
      </div>
    </div>
  );
}
