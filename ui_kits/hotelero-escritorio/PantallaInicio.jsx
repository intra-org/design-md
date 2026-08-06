(() => {
const { Hero, Sparkline, DeDondeVienen, ChipHero, Icon, Card, Aviso, IslaViva, Segmented, FeedItem, ChipProducto, ChipRemovible } = window.IntraHoteleroDesignSystem_27a6ea;

/* Inicio · escritorio — bento de 12 columnas sin scroll, más la vista
   "Actividad" completa que abre el link del widget de goles. */
function PantallaInicio({ periodo, setPeriodo, tema, irPersonas, irAgenda, abrirDetalle }) {
  const [sel, setSel] = React.useState([]);
  const [act, setAct] = React.useState(false);
  const [actF, setActF] = React.useState('Todo');
  const d = window.DATA[periodo];
  const alt = (n) => setSel((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));
  const total = sel.length ? d.chips.filter((c) => sel.includes(c.nombre)).reduce((a, c) => a + c.n, 0) : d.total;
  const firma = periodo + '|' + sel.join(',');
  const display = window.useCountUp(total, 420);
  const serie = window.sparkSeries(periodo, Math.max(1, total));
  const grupos = d.grupos.map((g) => ({
    nombre: g.nombre, n: g.n,
    color: g.nombre === 'Tu campaña' ? 'var(--gol)' : 'var(--tt)',
    canales: g.canales.map(([nombre, n]) => ({ nombre, n })),
  }));
  const ico = (n) => window.chipDe(n === 'Reservas' ? 'Reserva' : n === 'Eventos' ? 'Evento' : 'Day Pass').icono;

  if (act) return <Actividad actF={actF} setActF={setActF} onCerrar={() => setAct(false)} />;

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '22px 32px 26px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', animation: 'ih-rise .32s cubic-bezier(0.22,0.61,0.36,1) both' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 14, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <IslaViva desktop mensajes={['Asistente activo']} separador="Última persona atendida hace unos segundos" />
        </div>
        <div style={{ display: 'flex', minWidth: 0, boxSizing: 'border-box', justifyContent: 'flex-end' }}>
          <Segmented full={false} ancho={348} value={periodo} onChange={setPeriodo}
            options={[{ value: 'hoy', label: 'Hoy' }, { value: 'mes', label: 'Este mes' }, { value: 'junio', label: 'Mes pasado' }, { value: 'd90', label: '90 días' }]} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 14, marginTop: 16, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        <Hero desktop style={{ gridColumn: 'span 7' }} valor={display} delta={d.delta} deltaVs={d.deltaVs} onClick={irPersonas}
          nota={periodo === 'hoy' ? null : <span>De <b style={{ color: '#fff', fontWeight: 600 }}>{d.atendidas} personas atendidas</b>, {total} se convirtieron en oportunidades reales.</span>}>
          <Sparkline puntos={serie} tema={tema} etiquetas={window.XL[periodo]} fechas={window.spkFechas(periodo, serie.length)} rango={window.RANGO[periodo]} firma={firma} />
          <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 8, marginTop: 20 }}>
            {d.chips.map((c) => (
              <ChipHero key={c.nombre} grande icon={<Icon name={ico(c.nombre)} size={16} />}
                n={c.n} activo={sel.includes(c.nombre)} atenuado={sel.length > 0} onClick={() => alt(c.nombre)}>{c.nombre}</ChipHero>
            ))}
          </div>
        </Hero>

        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <Aviso dot="var(--verde)"><b style={{ fontWeight: 600 }}>{d.mensajes} mensajes</b> respondidos {d.frase}.</Aviso>
          <Aviso accion="Ver →" onClick={irPersonas}>{window.PERSONAS.filter((p) => p.estado === 'pendiente').length} oportunidades esperan a tu equipo.</Aviso>
          <Aviso resuelto>Detectamos menos actividad en Eventos esta semana. Ya ajustamos tu campaña — esperamos recuperación en 3–4 días.</Aviso>
          <DeDondeVienen style={{ flex: 1 }} padding={24} grupos={grupos} insight="8 de cada 10 oportunidades vinieron de tu campaña activa." />
        </div>

        <Card style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column' }} padding="18px 22px 10px"
          eyebrow="Últimos goles del asistente"
          accion={<button type="button" onClick={() => setAct(true)} style={{ border: 'none', background: 'transparent', color: 'var(--link)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Ver toda la actividad →</button>}>
          {window.GOLES.map((g) => {
            const c = window.chipDe(g.producto);
            return <FeedItem key={g.t1} t1={g.t1} gol pre={g.pre} texto={g.texto} producto={g.producto} productoColor={c.color} productoFondo={c.fondo} />;
          })}
        </Card>

        <Card style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column' }} padding="18px 22px 10px"
          eyebrow="Próximas citas · hoy"
          accion={<button type="button" onClick={irAgenda} style={{ border: 'none', background: 'transparent', color: 'var(--link)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', padding: 0 }}>Ver agenda →</button>}>
          {window.CITAS_HOY.map((ct) => <FilaCita key={ct.id} ct={ct} onClick={() => abrirDetalle(ct)} />)}
          <p style={{ margin: '12px 0 2px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt)' }}>Próximas citas · mañana</p>
          {window.CITAS_MANANA.map((ct) => <FilaCita key={ct.id} ct={ct} onClick={() => abrirDetalle(ct)} />)}
        </Card>
      </div>
    </div>
  );
}

/* Vista Actividad — la línea del tiempo completa, agrupada por día, con el
   contenedor "Mientras dormías" y los chips de filtro (FOPTS). */
function Actividad({ actF, setActF, onCerrar }) {
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
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '22px 32px 26px', boxSizing: 'border-box', animation: 'ih-rise .32s cubic-bezier(0.22,0.61,0.36,1) both' }}>
      <div style={{ maxWidth: 860 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button type="button" onClick={onCerrar} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 20, lineHeight: 1, color: 'var(--ts)', padding: '2px 8px 2px 0' }}>‹</button>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp)' }}>Actividad</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {window.FOPTS.map((o) => <ChipRemovible key={o} activo={o === actF} onQuitar={() => setActF(o)}>{o}</ChipRemovible>)}
        </div>
        <div style={{ marginTop: 12, borderRadius: 20, background: 'var(--card)', padding: '8px 24px 16px', boxShadow: 'var(--card-sh)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {grupos.map((g) => (
            <div key={g.titulo} style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ margin: '12px 0 2px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt)' }}>{g.titulo}</p>
              <div style={g.night ? { borderRadius: 16, background: 'var(--night-bg)', border: '1px solid var(--night-bd)', padding: '0 14px 6px', marginTop: 4 } : undefined}>
                {g.night && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '12px 2px 8px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flex: 'none', marginTop: 1 }}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" stroke="var(--ambar)" strokeWidth="2.2" strokeLinejoin="round" /></svg>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--tp)' }}>Mientras dormías</span>
                      <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--ts)' }}>{g.resumen}</span>
                    </div>
                  </div>
                )}
                {g.items.map((m, i) => {
                  const c = window.chipDe(m.producto);
                  return <FeedItem key={i} colTiempo={80} t1={m.t1} t2={m.t2} gol={m.gol} pre={m.pre} texto={m.rest} producto={m.producto} productoColor={c.color} productoFondo={c.fondo} seg={m.seg ? '⚡ ' + m.seg : null} />;
                })}
              </div>
            </div>
          ))}
          {grupos.length === 0 && <p style={{ margin: '24px 0', textAlign: 'center', fontSize: 13, color: 'var(--tt)' }}>Sin actividad con este filtro.</p>}
        </div>
      </div>
    </div>
  );
}

function FilaCita({ ct, onClick }) {
  const [hover, setHover] = React.useState(false);
  const c = window.chipDe(ct.producto);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 6px', border: 'none', background: hover ? 'var(--hover)' : 'transparent', borderBottom: '1px solid var(--divider)', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', borderRadius: 10, transition: 'background .15s ease-out' }}>
      <span style={{ flex: 'none', width: 64, textAlign: 'right', fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--ts)', whiteSpace: 'nowrap' }}>{ct.hora}</span>
      <span style={{ flex: 'none', width: 1, alignSelf: 'stretch', background: 'var(--divider)' }} />
      <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--tp)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ct.nombre}</span>
      <ChipProducto color={c.color} fondo={c.fondo}>{ct.producto}</ChipProducto>
      <span style={{ flex: 1 }} />
      {ct.urgente && <span title="Pasó su hora y sigue sin atender" style={{ position: 'relative', flex: 'none', width: 7, height: 7 }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--ambar)' }} />
        <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--ambar)', animation: 'ih-pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite' }} />
      </span>}
      {ct.estado === 'atendido' && <span style={{ flex: 'none', fontSize: 12, fontWeight: 600, color: 'var(--verde-tx)' }}>✓</span>}
    </button>
  );
}

Object.assign(window, { PantallaInicio });
})();
