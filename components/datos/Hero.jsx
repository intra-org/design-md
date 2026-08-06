import React from 'react';

/* Hero — el único protagonista negro de la pantalla. Permanece oscuro en los
   3 temas; solo su glow cálido (--hero-glow) es temable.
   Dos jerarquías: 'oportunidades' (propiedad estándar) y 'cobrado'
   (transaccional: manda el dinero). Si el filtro deja el cobrado en $0,
   vuelve a 'oportunidades' — nunca un $0 protagonista. */
export function Hero({
  modo = 'oportunidades', eyebrow = 'Oportunidades reales', valor, delta, deltaVs,
  moneda = 'MXN', secundarioValor, secundarioTexto = 'oportunidades reales',
  nota, desktop = false, children, onClick, style, ...rest
}) {
  const tamano = desktop ? 88 : 72;
  const [hovEye, setHovEye] = React.useState(false);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--r-hero,22px)', background: 'linear-gradient(170deg,#151518 0%,#0A0A0C 45%,#060607 100%)', padding: desktop ? '30px 36px 64px' : '24px 24px 72px', color: '#fff', boxShadow: '0 30px 60px -28px rgba(20,16,8,.6), inset 0 1px 0 rgba(255,255,255,.08)', boxSizing: 'border-box', ...style }} {...rest}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 75% at 50% 118%, rgba(88,126,214,.13) 0%, rgba(88,126,214,.05) 40%, transparent 62%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(85% 55% at 50% 116%, var(--hero-glow,rgba(255,178,110,.2)) 0%, rgba(255,160,90,.08) 38%, transparent 58%)', pointerEvents: 'none', animation: 'ih-breathe 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(42% 26% at 50% 108%, rgba(255,216,170,.3) 0%, rgba(255,190,130,.1) 45%, transparent 68%)', pointerEvents: 'none', animation: 'ih-breathe 9s ease-in-out 1.2s infinite' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(78% 60% at 50% 132%, #060607 59.9%, transparent 60.5%), radial-gradient(78% 60% at 50% 132%, transparent 59.35%, rgba(255,212,168,.5) 59.85%, rgba(160,180,235,.16) 60.5%, transparent 61.6%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', fontVariantNumeric: 'proportional-nums' }}>
        {modo === 'cobrado' ? (
          <React.Fragment>
            <p style={{ margin: 0, fontSize: 10.5, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.62)' }}>{eyebrow}</p>
            <p style={{ margin: '10px 0 0', fontSize: 56, lineHeight: 1, fontWeight: 600, letterSpacing: '-0.035em' }}>{valor} <span style={{ fontSize: 17, fontWeight: 600, color: 'rgba(255,255,255,.62)' }}>{moneda}</span></p>
            <p style={{ margin: '10px 0 0', fontSize: 13, color: 'rgba(255,255,255,.62)' }}>
              {delta && <React.Fragment><span style={{ color: 'var(--verde,#5BD6A0)', fontWeight: 600 }}>▲ {delta}</span> <span>{deltaVs}</span> <span style={{ color: 'rgba(255,255,255,.32)' }}>·</span> </React.Fragment>}
              Dinero verificado — cobrado directo por el sistema.
            </p>
            <div style={{ height: 1, background: 'rgba(255,255,255,.12)', margin: '14px 0 0' }} />
            <p style={{ margin: '14px 0 0' }}>
              <span style={{ fontSize: 32, lineHeight: 1, fontWeight: 600, letterSpacing: '-0.02em', marginRight: 6 }}>{secundarioValor}</span>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,.75)' }}>{secundarioTexto}</span>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,.8)', marginLeft: 6 }}>›</span>
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
          <div onClick={onClick} onMouseEnter={() => setHovEye(true)} onMouseLeave={() => setHovEye(false)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <p style={{ margin: 0, fontSize: 10.5, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.62)' }}>{eyebrow} <span style={{ display: 'inline-block', color: hovEye ? '#FFFFFF' : 'rgba(255,255,255,.8)', transform: hovEye ? 'translateX(2px)' : 'none', transition: 'color .15s ease-out, transform .15s ease-out' }}>›</span></p>
            <p style={{ margin: desktop ? '14px 0 0' : '16px 0 0', fontSize: tamano, lineHeight: 1, fontWeight: 600, letterSpacing: '-0.035em' }}>{valor}</p>
            {delta && <p style={{ margin: desktop ? '14px 0 0' : '12px 0 0', fontSize: desktop ? 14 : 13 }}><span style={{ color: 'var(--verde,#5BD6A0)', fontWeight: 600 }}>▲ {delta}</span> <span style={{ color: 'rgba(255,255,255,.6)' }}>{deltaVs}</span></p>}
          </div>
          </React.Fragment>
        )}
        {children}
        {nota && <p style={{ margin: desktop ? '20px 0 0' : '16px 0 0', fontSize: desktop ? 14 : 13, lineHeight: 1.5, color: 'rgba(255,255,255,.68)' }}>{nota}</p>}
      </div>    </div>
  );
}
