(() => {
const { CAPAS } = window.IntraHoteleroDesignSystem_27a6ea;

/* Login + selector de propiedad · móvil, 1:1 del prototipo.
   Dos fases dentro del mismo lienzo: formulario y picker. Al elegir una
   propiedad, esa tarjeta queda seleccionada, las otras bajan a .28, el título
   pasa a "Entrando a X…" y 1100ms después el login se desvanece.
   El saludo depende de la hora local de la propiedad. */
const PROPS = [
  { id: 'hampton', n: 'Hampton Demo', sub: 'Mérida · Administrador', ini: 'H' },
  { id: 'nikche', n: 'Nikché Demo', sub: 'Tulum · Administrador', ini: 'N' },
  { id: 'aurea', n: 'Casa Áurea', sub: 'Cancún · Vista financiera', ini: 'A' },
];
const TH = {
  dia: { titulo: '#0A0A0A', sub: '#5E6168', inBg: 'rgba(255,255,255,.72)', inBorder: 'rgba(20,16,8,.12)', inColor: '#0A0A0A', btnBg: '#0A0A0A', btnColor: '#fff', btnSombra: '0 12px 28px -14px rgba(10,10,10,.5)', link: '#2F5FC0', pie: '#5E6168', sel: '#5E6168' },
  tarde: { titulo: '#F6ECE4', sub: 'rgba(246,236,228,.72)', inBg: 'rgba(255,255,255,.09)', inBorder: 'rgba(255,255,255,.18)', inColor: '#F6ECE4', btnBg: '#F4EFE4', btnColor: '#14161C', btnSombra: '0 12px 28px -14px rgba(0,0,0,.6)', link: '#F0B48C', pie: 'rgba(246,236,228,.7)', sel: 'rgba(246,236,228,.8)' },
  noche: { titulo: '#F1EDE4', sub: 'rgba(241,237,228,.66)', inBg: 'rgba(255,255,255,.07)', inBorder: 'rgba(255,255,255,.15)', inColor: '#F1EDE4', btnBg: '#F5F2EA', btnColor: '#0A0A0A', btnSombra: '0 12px 28px -14px rgba(0,0,0,.65)', link: '#8FADEE', pie: 'rgba(241,237,228,.62)', sel: 'rgba(241,237,228,.75)' },
};
const SPR = 'cubic-bezier(0.34,1.2,0.64,1)';
const saludoDe = () => { const h = new Date().getHours(); return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'; };

function LoginM({ tema, modo, onCiclarTema, onEntrar, base }) {
  const [fase, setFase] = React.useState('login');
  const [sel, setSel] = React.useState(null);
  const th = TH[tema] || TH.dia;
  const dark = tema !== 'dia';
  const pk = fase !== 'login';
  const tr = 'color .6s ease, background .6s ease, border-color .6s ease';
  const tSel = React.useRef(0);
  React.useEffect(() => () => clearTimeout(tSel.current), []);

  const elegir = (p) => {
    if (sel) return;
    setSel(p.id);
    tSel.current = setTimeout(() => onEntrar(p), 1100);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 80, background: '#060607', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {['dia', 'tarde', 'noche'].map((t) => CAPAS[t].map((c, i) => (
        <div key={t + i} aria-hidden="true" style={{ position: 'absolute', inset: 0, background: c.bg, animation: c.anim === 'none' ? undefined : c.anim, opacity: t === tema ? 1 : 0, transition: 'opacity .6s ease', pointerEvents: 'none' }} />
      )))}

      <button type="button" title="Cambiar modo" onClick={onCiclarTema}
        style={{ position: 'absolute', top: 64, right: 20, zIndex: 30, display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 8, opacity: .55, color: th.sel, transition: 'color .6s ease, opacity .15s ease-out' }}>
        <window.IntraHoteleroDesignSystem_27a6ea.Icon name={{ dia: 'amanecer', tarde: 'atardecer', noche: 'noche' }[tema]} size={20} />
        {modo === 'auto' && <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', opacity: .75 }}>auto</span>}
      </button>

      <div style={{ position: 'relative', flex: 1, marginTop: -28, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
        <div style={{ position: 'absolute', inset: '0 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: pk ? 0 : 1, transform: pk ? 'translateY(-14px)' : 'none', pointerEvents: pk ? 'none' : 'auto', transition: 'opacity .4s ease, transform .5s ' + SPR }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, marginBottom: 36 }}>
            <div style={{ position: 'relative', width: 106, height: 26 }}>
              <img src={base + '/wordmark-dark.png'} alt="intra" style={{ position: 'absolute', inset: 0, width: 106, height: 26, objectFit: 'contain', opacity: tema === 'dia' ? 1 : 0, transition: 'opacity .6s ease' }} />
              <img src={base + '/wordmark-light.png'} alt="" style={{ position: 'absolute', inset: 0, width: 106, height: 26, objectFit: 'contain', opacity: tema === 'dia' ? 0 : 1, transition: 'opacity .6s ease' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
              <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, color: th.titulo, transition: tr }}>{saludoDe()}</span>
              <span style={{ fontSize: 13, color: th.sub, transition: tr }}>El asistente comercial de tu hotel.</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="email" placeholder="Correo" style={{ boxSizing: 'border-box', width: '100%', height: 52, padding: '0 20px', borderRadius: 16, border: '1px solid ' + th.inBorder, background: th.inBg, fontFamily: 'inherit', fontSize: 15, color: th.inColor, outline: 'none', transition: tr }} />
            <input type="password" placeholder="Contraseña" style={{ boxSizing: 'border-box', width: '100%', height: 52, padding: '0 20px', borderRadius: 16, border: '1px solid ' + th.inBorder, background: th.inBg, fontFamily: 'inherit', fontSize: 15, color: th.inColor, outline: 'none', transition: tr }} />
            <button type="button" onClick={() => setFase('pick')} style={{ height: 52, border: 'none', borderRadius: 16, background: th.btnBg, color: th.btnColor, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 8, boxShadow: th.btnSombra, transition: tr }}>Entrar</button>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ alignSelf: 'center', marginTop: 24, fontSize: 13, fontWeight: 600, color: th.link, transition: tr }}>¿Olvidaste tu contraseña?</a>
        </div>

        <div style={{ position: 'absolute', inset: '0 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: pk ? 1 : 0, pointerEvents: pk ? 'auto' : 'none', transition: 'opacity .4s ease .1s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center', marginBottom: 28 }}>
            <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: th.sub, transition: 'color .6s ease' }}>Tus propiedades</span>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: th.titulo, transition: 'color .6s ease' }}>{sel ? 'Entrando a ' + PROPS.find((p) => p.id === sel).n + '…' : 'Elige tu propiedad'}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 360, alignSelf: 'center' }}>
            {PROPS.map((p, i) => (
              <button key={p.id} type="button" onClick={() => elegir(p)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 16, width: '100%', boxSizing: 'border-box', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
                  background: dark ? 'rgba(255,255,255,.07)' : '#FFFFFF',
                  border: '1px solid ' + (sel === p.id ? (dark ? 'rgba(255,255,255,.75)' : '#0A0A0A') : (dark ? 'rgba(255,255,255,.16)' : '#E4E0D8')),
                  boxShadow: dark ? 'none' : '0 1px 2px rgba(20,16,8,.04), 0 10px 26px -20px rgba(20,16,8,.2)',
                  opacity: pk ? (sel && sel !== p.id ? .28 : 1) : 0,
                  transform: pk ? 'none' : 'translateY(16px)',
                  transition: 'opacity .45s ease ' + (pk && !sel ? (150 + i * 70) + 'ms' : '0ms') + ', transform .5s ' + SPR + ' ' + (pk && !sel ? (150 + i * 70) + 'ms' : '0ms') + ', border-color .3s ease, background .6s ease' }}>
                <span style={{ width: 40, height: 40, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 15, fontWeight: 700, background: dark ? 'rgba(255,255,255,.12)' : '#F1EFE8', color: dark ? '#fff' : '#0A0A0A', transition: 'background .6s ease, color .6s ease' }}>{p.ini}</span>
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: th.titulo, transition: 'color .6s ease' }}>{p.n}</span>
                  <span style={{ fontSize: 12, color: th.sub, transition: 'color .6s ease' }}>{p.sub}</span>
                </span>
                <span style={{ fontSize: 18, lineHeight: 1, color: th.sub, flex: 'none', opacity: sel === p.id ? 0 : 1, transition: 'opacity .2s ease' }}>›</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => { setFase('login'); setSel(null); }} style={{ alignSelf: 'center', marginTop: 24, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: th.link, transition: 'color .6s ease' }}>Salir</button>
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingBottom: 48 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: th.pie, transition: 'color .6s ease' }}>
          <span style={{ position: 'relative', width: 7, height: 7, flex: 'none' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--verde,#5BD6A0)' }} />
            <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--verde,#5BD6A0)', animation: 'ih-pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite' }} />
          </span>
          Tu asistente sigue atendiendo mientras entras
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { LoginM });
})();
