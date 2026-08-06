import React from 'react';
import { Icon } from '../marca/Icon.jsx';

/* Tab bar = pill flotante de dos estados (nunca barra full-width).
   Reposo 64px con labels · contraída 48px solo íconos + dot bajo el activo.
   Se contrae al bajar y NO se reabre al detener el scroll. Valores 1:1 del
   prototipo: tbPillStyle / tabStyle / tabLblStyle / tabDot. */
const SPRING = 'cubic-bezier(0.34,1.2,0.64,1)';

export function TabBar({ items = [], activo, onSelect, contraida = false, onInteract, style, ...rest }) {
  return (
    <div style={{ position: 'sticky', bottom: 24, display: 'flex', justifyContent: 'center', pointerEvents: 'none', ...style }} {...rest}>
      <div onPointerEnter={onInteract} onPointerDown={onInteract}
        style={{
          display: 'flex', alignItems: 'center', gap: contraida ? 2 : 4,
          padding: contraida ? '0 8px' : '0 6px', height: contraida ? 48 : 64,
          background: 'color-mix(in srgb, var(--tabbar,rgba(250,249,245,.92)) 38%, transparent)',
          backdropFilter: 'blur(20px) saturate(170%)', WebkitBackdropFilter: 'blur(20px) saturate(170%)',
          border: '1px solid var(--divider,#EFECE4)', borderRadius: 999,
          boxShadow: contraida
            ? '0 5px 18px -8px rgba(20,16,8,.3), inset 0 1px 0 rgba(255,255,255,.25)'
            : '0 12px 34px -12px rgba(20,16,8,.34), inset 0 1px 0 rgba(255,255,255,.3)',
          pointerEvents: 'auto', boxSizing: 'border-box',
          transition: 'height .3s ' + SPRING + ', padding .3s ' + SPRING + ', gap .3s ' + SPRING + ', box-shadow .3s ease',
        }}>
        {items.map((it) => {
          const on = it.id === activo;
          return (
            <button key={it.id} type="button" onClick={() => onSelect && onSelect(it.id)}
              style={{
                position: 'relative', flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: contraida ? 0 : 3, height: contraida ? 46 : 56, minWidth: contraida ? 46 : 60, paddingBottom: contraida ? 7 : 0,
                border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
                color: on ? 'var(--tp,#0A0A0A)' : 'var(--tt,#8A8C93)', fontSize: 10.5, fontWeight: 600,
                transition: 'color .45s ease, height .3s ' + SPRING + ', min-width .3s ' + SPRING,
              }}>
              <Icon name={it.icono} size={21} />
              <span style={{ fontSize: 10.5, fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap', maxHeight: contraida ? 0 : 14, opacity: contraida ? 0 : 1, overflow: 'hidden', transition: 'opacity .15s ease, max-height .3s ' + SPRING }}>{it.label}</span>
              <span style={{ position: 'absolute', bottom: contraida ? 4 : 8, width: 4, height: 4, borderRadius: 999, background: 'var(--tp,#0A0A0A)', opacity: (contraida && on) ? 1 : 0, transition: 'opacity .2s ease .05s' }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
