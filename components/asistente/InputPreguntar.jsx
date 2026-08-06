import React from 'react';

const AVISO_LEGAL = 'intra intelligence es una IA y puede cometer errores. Por favor, compruebe sus respuestas';

/* Input de Preguntar: pill h48 anclada al fondo del área, botón de enviar que
   se activa con texto y botón de historial a su derecha (mismos colores que
   enviar). Debajo, el aviso legal — la ÚNICA vez que el producto dice "IA". */
export function InputPreguntar({ value = '', onChange, onEnviar, placeholder = 'Pregúntale a tu asistente…', historial = false, onHistorial, avisoLegal = true, desktop = false, style, ...rest }) {
  const activo = value.trim().length > 0;
  const d = desktop ? 48 : 44;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: desktop ? 10 : 4, width: '100%', ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          value={value} onChange={(e) => onChange && onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && activo && onEnviar) onEnviar(); }}
          placeholder={placeholder}
          style={{ flex: 1, minWidth: 0, height: 48, padding: '0 18px', borderRadius: 999, border: '1px solid rgba(20,16,8,.12)', background: 'var(--input-bg,rgba(255,255,255,.85))', color: 'var(--tp,#0A0A0A)', fontFamily: 'inherit', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
        />
        <button type="button" onClick={activo ? onEnviar : undefined} title="Enviar"
          style={{ flex: 'none', width: d, height: d, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, border: 'none', background: activo ? 'var(--btn-bg,#0A0A0A)' : 'var(--tonal,#F1EFE8)', color: activo ? 'var(--btn-tx,#FFFFFF)' : 'var(--tt,#8A8C93)', cursor: activo ? 'pointer' : 'default', transition: 'background 200ms ease-out, color 200ms ease-out' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" onClick={onHistorial} title="Historial"
          style={{ flex: 'none', width: d, height: d, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, border: 'none', background: historial ? 'var(--btn-bg,#0A0A0A)' : 'var(--tonal,#F1EFE8)', color: historial ? 'var(--btn-tx,#FFFFFF)' : 'var(--tt,#8A8C93)', cursor: 'pointer', transition: 'background 200ms ease-out, color 200ms ease-out' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 7v5l3 2M3.5 12a8.5 8.5 0 1 0 2.6-6.1M3 4v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      {avisoLegal && <p style={{ margin: 0, textAlign: 'center', fontSize: desktop ? 11 : 10.5, lineHeight: 1.4, color: 'var(--tt,#8A8C93)' }}>{AVISO_LEGAL}</p>}
    </div>
  );
}
