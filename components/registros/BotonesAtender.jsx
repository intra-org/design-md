import React from 'react';
import { Icon } from '../marca/Icon.jsx';

/* Par de Atender de la tabla y el kanban de Ventas (v1.6.0): WhatsApp
   (abre la conversación y pasa a seguimiento) + ✓ "Ya lo atendí por otro
   canal". 36×30 outline --sec-bd; hover SÓLIDO igual que ✓/✕ de
   seguimiento (--btn-bg/--btn-tx) y pressed scale .94. Sin transición de
   color: ícono y fondo cambian en el mismo frame. */
export function BotonesAtender({ onWhatsApp, onYaAtendi, style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flex: 'none', ...style }}>
      <Par title="Abrir WhatsApp y pasar a seguimiento" aria="Responder por WhatsApp" onClick={onWhatsApp}><Icon name="whatsapp" size={14} data-wa="" style={{ transition: 'none' }} /></Par>
      <Par title="Ya lo atendí por otro canal" aria="Marcar como ya atendido" onClick={onYaAtendi} color="var(--verde-tx,#1F8A5C)">✓</Par>
    </span>
  );
}

function Par({ children, onClick, title, aria, color = 'var(--tp,#0A0A0A)' }) {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return (
    <button type="button" title={title} aria-label={aria}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(e); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setP(false); }}
      onPointerDown={(e) => { e.stopPropagation(); setP(true); }} onPointerUp={() => setP(false)}
      style={{ position: 'relative', flex: 'none', width: 36, height: 30, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, border: '1px solid ' + (h ? 'var(--btn-bg,#0A0A0A)' : 'var(--sec-bd,#D9D5CC)'), background: h ? 'var(--btn-bg,#0A0A0A)' : 'transparent', color: h ? 'var(--btn-tx,#fff)' : color, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', transform: p ? 'scale(0.94)' : 'none', transition: 'transform .12s ease-out' }}>{children}</button>
  );
}
