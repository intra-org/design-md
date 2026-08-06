(() => {
const { Hero, ChipHero, Icon, IslaViva, Segmented, DeDondeVienen, FeedItem } = window.IntraHoteleroDesignSystem_27a6ea;

/* Inicio · móvil — 1:1 del prototipo: isla sticky a 58px, selector de periodo,
   hero de 72px con chips en riel, "De dónde vienen" y el feed de la semana
   rematado por "Ver toda la actividad →". */
function InicioM({ periodo, setPeriodo, irPersonas, abrirAct, sticky }) {
  const [sel, setSel] = React.useState([]);
  const d = window.DATA[periodo];
  const alt = (n) => setSel((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));
  const total = sel.length ? d.chips.filter((c) => sel.includes(c.nombre)).reduce((a, c) => a + c.n, 0) : d.total;
  const display = window.useCountUp(total, 420);
  const grupos = d.grupos.map((g) => ({ nombre: g.nombre, n: g.n, color: g.nombre === 'Tu campaña' ? 'var(--gol)' : 'var(--tt)', canales: g.canales.map(([nombre, n]) => ({ nombre, n })) }));
  const ico = (n) => window.chipDe(n === 'Reservas' ? 'Reserva' : n === 'Eventos' ? 'Evento' : 'Day Pass').icono;
  const semana = window.FEED_DIAS.slice(0, 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 22, margin: '16px 20px 0', display: 'flex' }}>
        <IslaViva sticky={sticky} mensajes={['Asistente activo · ' + d.atendidas + ' personas atendidas', d.mensajes + ' mensajes respondidos ' + d.frase, 'Respondiendo a alguien…']} />
      </div>
      <div style={{ display: 'flex', padding: '16px 20px 0' }}>
        <Segmented value={periodo} onChange={setPeriodo}
          options={[{ value: 'hoy', label: 'Hoy' }, { value: 'mes', label: 'Este mes' }, { value: 'junio', label: 'Mes pasado' }, { value: 'd90', label: '90 días' }]} />
      </div>
      <Hero style={{ margin: '12px 16px 0' }} valor={display} delta={d.delta} deltaVs={d.deltaVs} onClick={irPersonas}
        nota={periodo === 'hoy' ? null : <span>De <b style={{ color: '#fff', fontWeight: 600 }}>{d.atendidas} personas atendidas</b>, {total} se convirtieron en oportunidades reales.</span>}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 8, marginTop: 18, overflowX: 'auto', paddingBottom: 2, WebkitMaskImage: 'linear-gradient(90deg,#000 calc(100% - 24px),transparent)', maskImage: 'linear-gradient(90deg,#000 calc(100% - 24px),transparent)' }}>
          {d.chips.map((c) => (
            <ChipHero key={c.nombre} icon={<Icon name={ico(c.nombre)} size={13} />} n={c.n}
              activo={sel.includes(c.nombre)} atenuado={sel.length > 0} onClick={() => alt(c.nombre)}>{c.nombre}</ChipHero>
          ))}
        </div>
      </Hero>

      <DeDondeVienen style={{ margin: '12px 16px 0' }} padding={20} grupos={grupos} insight="8 de cada 10 oportunidades vinieron de tu campaña activa." />

      <div style={{ margin: '12px 16px 0', borderRadius: 20, background: 'var(--card)', padding: '18px 20px 4px', boxShadow: 'var(--card-sh)' }}>
        <p style={{ margin: 0, fontSize: 10.5, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--tt)' }}>Actividad</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
          {semana.map((g) => (
            <div key={g.titulo} style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: '10px 0 2px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt)' }}>{g.titulo}</p>
              <div style={g.night ? { borderRadius: 16, background: 'var(--night-bg)', border: '1px solid var(--night-bd)', padding: '0 12px 6px', marginTop: 4 } : undefined}>
                {g.night && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '12px 2px 8px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" stroke="var(--ambar)" strokeWidth="2.2" strokeLinejoin="round" /></svg>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--tp)' }}>Mientras dormías</span>
                      <span style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--ts)' }}>{g.resumen}</span>
                    </div>
                  </div>
                )}
                {g.items.slice(0, 3).map((m, i) => {
                  const c = window.chipDe(m.producto);
                  return <FeedItem key={i} colTiempo={62} t1={m.t1} t2={m.t2} gol={m.gol} pre={m.pre} texto={m.rest} producto={m.producto} productoColor={c.color} productoFondo={c.fondo} seg={m.seg ? '⚡ ' + m.seg : null} />;
                })}
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={abrirAct} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: 'var(--link)', padding: '12px 0 10px', textAlign: 'left' }}>Ver toda la actividad →</button>
      </div>
    </div>
  );
}

/* Actividad completa · móvil — mismo feed agrupado, con el riel de chips de
   filtro que se desvanece al borde. */
function ActividadM({ actF, setActF, onCerrar }) {
  const pasa = (m) => {
    if (actF === 'Todo') return true;
    if (actF === 'Confirmados') return !!m.gol;
    if (actF === 'Mientras dormías') return false;
    return m.producto === ({ Reservas: 'Reserva', Eventos: 'Evento', 'Day Pass': 'Day Pass' })[actF];
  };
  const grupos = window.FEED_DIAS
    .map((g) => ({ ...g, items: actF === 'Mientras dormías' ? (g.night ? g.items : []) : g.items.filter(pasa) }))
    .filter((g) => g.items.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px 0' }}>
        <button type="button" onClick={onCerrar} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 20, lineHeight: 1, color: 'var(--ts)', padding: '2px 8px 2px 0' }}>‹</button>
        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp)' }}>Actividad</span>
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 20px 2px', WebkitMaskImage: 'linear-gradient(90deg,#000 calc(100% - 24px),transparent)', maskImage: 'linear-gradient(90deg,#000 calc(100% - 24px),transparent)' }}>
        {window.FOPTS.map((o) => (
          <button key={o} type="button" onClick={() => setActF(o)}
            style={{ flex: 'none', padding: '8px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', background: o === actF ? 'var(--btn-bg)' : 'var(--seg-track)', color: o === actF ? 'var(--btn-tx)' : 'var(--ts)', transition: 'background .15s ease-out, color .15s ease-out' }}>{o}</button>
        ))}
      </div>
      <div style={{ margin: '12px 16px 0', borderRadius: 20, background: 'var(--card)', padding: '6px 18px 12px', boxShadow: 'var(--card-sh)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {grupos.map((g) => (
          <div key={g.titulo} style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ margin: '10px 0 2px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt)' }}>{g.titulo}</p>
            <div style={g.night ? { borderRadius: 16, background: 'var(--night-bg)', border: '1px solid var(--night-bd)', padding: '0 12px 6px', marginTop: 4 } : undefined}>
              {g.night && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '12px 2px 8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" stroke="var(--ambar)" strokeWidth="2.2" strokeLinejoin="round" /></svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--tp)' }}>Mientras dormías</span>
                    <span style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--ts)' }}>{g.resumen}</span>
                  </div>
                </div>
              )}
              {g.items.map((m, i) => {
                const c = window.chipDe(m.producto);
                return <FeedItem key={i} colTiempo={62} t1={m.t1} t2={m.t2} gol={m.gol} pre={m.pre} texto={m.rest} producto={m.producto} productoColor={c.color} productoFondo={c.fondo} seg={m.seg ? '⚡ ' + m.seg : null} />;
              })}
            </div>
          </div>
        ))}
        {grupos.length === 0 && <p style={{ margin: '24px 0', textAlign: 'center', fontSize: 13, color: 'var(--tt)' }}>Sin actividad con este filtro.</p>}
      </div>
    </div>
  );
}

Object.assign(window, { InicioM, ActividadM });
})();
