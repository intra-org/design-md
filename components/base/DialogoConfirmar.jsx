import React from 'react';
import { Button } from './Button.jsx';

/* Diálogo de confirmación centrado con blur. Sustituye a la "zona de peligro".
   Sin rojo: la acción destructiva usa el negro/crema del sistema (--btn-bg). */
export function DialogoConfirmar({ abierto = true, pregunta, microcopy, confirmar = 'Sí, continuar', cancelar = 'Cancelar', onConfirmar, onCancelar, style, ...rest }) {
  if (!abierto) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--panel-scrim,rgba(20,16,8,.14))', backdropFilter: 'var(--glass-dialog,blur(10px) saturate(.9))', animation: 'ih-fade .2s ease-out both', boxSizing: 'border-box', ...style }} {...rest}>
      <div style={{ maxWidth: 330, width: '100%', display: 'flex', flexDirection: 'column', gap: 8, padding: 22, borderRadius: 'var(--r-card-lg,20px)', background: 'var(--card,#FFFFFF)', border: '1px solid var(--divider,#EFECE4)', boxShadow: 'var(--card-sh)', textAlign: 'center', animation: 'ih-up .22s cubic-bezier(0.34,1.2,0.64,1) both', boxSizing: 'border-box' }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--tp,#0A0A0A)' }}>{pregunta}</p>
        {microcopy && <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--tt,#8A8C93)' }}>{microcopy}</p>}
        <div style={{ display: 'flex', gap: 8, marginTop: 6, justifyContent: 'center' }}>
          <Button size="sm" onClick={onConfirmar}>{confirmar}</Button>
          <Button size="sm" variant="secondary" onClick={onCancelar}>{cancelar}</Button>
        </div>
      </div>
    </div>
  );
}
