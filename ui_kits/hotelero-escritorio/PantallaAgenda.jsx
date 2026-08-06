(() => {
const { Segmented, BotonAtender, BotonesResolver, Card, ChipProducto } = window.IntraHoteleroDesignSystem_27a6ea;

/* Agenda · escritorio — Día (cards + mini-mes) · Semana (7 columnas desde
   lunes) · Mes (celdas con borde, incluye días fuera de mes). Julio 2026;
   hoy = jue 16. Navegación real con ‹ › y botón "Hoy" cuando te alejas. */
const AG_DOW = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MES3 = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const HOY = new Date(2026, 6, 16);
const AG_NOW = 9 * 60 + 41;
const mismo = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const diff = (a, b) => Math.round((a - b) / 86400000);
const minutos = (h) => { const m = h.match(/(\d+):(\d+)\s*(AM|PM)/); if (!m) return 0; let hh = +m[1] % 12; if (m[3] === 'PM') hh += 12; return hh * 60 + +m[2]; };

function PantallaAgenda({ flujo, atender, resolver, abrirDetalle }) {
  const [vista, setVista] = React.useState('dia');
  const [dOff, setDOff] = React.useState(0);
  const [wOff, setWOff] = React.useState(0);
  const [mOff, setMOff] = React.useState(0);

  const citas = window.CITAS_MES.map((c) => ({ ...c, estado: flujo[c.id] || c.estado, stamp: flujo[c.id + '_stamp'] || c.stamp, contexto: window.CTX_CITA[c.id], m: minutos(c.hora) }));
  const deFecha = (dt) => (dt.getMonth() === 6 && dt.getFullYear() === 2026 ? citas.filter((c) => c.dia === dt.getDate()).sort((a, b) => a.m - b.m) : []);

  const dDia = new Date(2026, 6, 16 + dOff);
  const lunes = new Date(2026, 6, 13 + 7 * wOff);
  const mBase = new Date(2026, 6 + mOff, 1);

  const titulo = vista === 'dia'
    ? AG_DOW[dDia.getDay()].charAt(0) + AG_DOW[dDia.getDay()].slice(1).toLowerCase() + ' ' + dDia.getDate() + ' ' + MES3[dDia.getMonth()]
    : vista === 'semana'
      ? lunes.getDate() + '–' + new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate() + 6).getDate() + ' ' + MES3[lunes.getMonth()]
      : MESES[mBase.getMonth()].charAt(0).toUpperCase() + MESES[mBase.getMonth()].slice(1) + ' ' + mBase.getFullYear();
  const fuera = vista === 'dia' ? dOff !== 0 : vista === 'semana' ? wOff !== 0 : mOff !== 0;
  const paso = (n) => (vista === 'dia' ? setDOff((v) => v + n) : vista === 'semana' ? setWOff((v) => v + n) : setMOff((v) => v + n));
  const aHoy = () => { setDOff(0); setWOff(0); setMOff(0); };

  const accion = (c) => (c.estado === 'pendiente'
    ? <BotonAtender ambar={c.m < AG_NOW && dOff === 0} onClick={() => atender(c.id)} />
    : c.estado === 'seguimiento'
      ? <BotonesResolver onSi={() => resolver(c.id, 'atendido')} onNo={() => resolver(c.id, 'no-confirmado')} />
      : <span style={{ fontSize: 12, fontWeight: 600, color: c.estado === 'no-confirmado' ? 'var(--tt)' : 'var(--verde-tx)' }}>{c.stamp}</span>);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: '38px 32px 24px', boxSizing: 'border-box', animation: 'ih-rise .32s cubic-bezier(0.22,0.61,0.36,1) both' }}>
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp)' }}>Agenda</span>
        {fuera && <button type="button" onClick={aHoy} style={{ flex: 'none', height: 30, padding: '0 12px', borderRadius: 999, border: '1px solid var(--sec-bd)', background: 'transparent', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Hoy</button>}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums', color: 'var(--tp)' }}>{titulo}</span>
        <Nav onClick={() => paso(-1)}>‹</Nav>
        <Nav onClick={() => paso(1)}>›</Nav>
        <Segmented full={false} ancho={240} value={vista} onChange={setVista}
          options={[{ value: 'dia', label: 'Día' }, { value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]} />
      </div>

      {vista === 'dia' && (
        <div style={{ display: 'flex', gap: 16, marginTop: 16, flex: 1, minHeight: 0, animation: 'ih-fade .3s ease-out both' }}>
          <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {deFecha(dDia).map((c, i) => {
              const ch = window.chipDe(c.producto);
              const ambar = c.estado === 'pendiente' && c.m < AG_NOW && dOff === 0;
              return (
                <div key={c.id} onClick={() => abrirDetalle(c)}
                  style={{ borderRadius: 20, background: 'var(--card)', boxShadow: 'var(--card-sh)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 7, cursor: 'pointer', transition: 'background .15s ease-out', animation: 'ih-rise .34s cubic-bezier(0.22,0.61,0.36,1) ' + (i * 55) + 'ms both' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {ambar && <Ambar />}
                    <span style={{ flex: 'none', fontSize: 16, fontWeight: 600, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em', whiteSpace: 'nowrap', color: 'var(--tp)' }}>{c.hora}</span>
                    <span style={{ flex: 1, minWidth: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--tp)' }}>{c.nombre}</span>
                    <ChipProducto color={ch.color} fondo={ch.fondo}>{c.producto}</ChipProducto>
                  </div>
                  <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--ts)' }}>{c.contexto}</span>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 2 }}>
                    <span style={{ fontSize: 10.5, color: 'var(--tt)' }}>{'Llegó ' + (c.id === 'mariana' ? 'hace 12 min' : 'anoche')}</span>
                    <span style={{ flex: 1 }} />
                    {accion(c)}
                  </div>
                </div>
              );
            })}
            {deFecha(dDia).length === 0 && <p style={{ margin: '40px 0', textAlign: 'center', fontSize: 13, lineHeight: 1.5, color: 'var(--tt)' }}>Sin citas este día. Tu asistente sigue atendiendo.</p>}
          </div>
          <MiniMes sel={dDia} deFecha={deFecha} onDia={(dt) => setDOff(diff(dt, HOY))} />
        </div>
      )}

      {vista === 'semana' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 8, marginTop: 16, flex: 1, minHeight: 0, animation: 'ih-fade .3s ease-out both' }}>
          {[...Array(7)].map((_, i) => {
            const dt = new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate() + i);
            const esHoy = mismo(dt, HOY);
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0, minWidth: 0, padding: '10px 8px', borderRadius: 16, background: esHoy ? 'var(--ag-hoy)' : 'transparent', overflowY: 'auto', boxSizing: 'border-box', animation: 'ih-rise .34s cubic-bezier(0.22,0.61,0.36,1) ' + (i * 40) + 'ms both' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 'none' }}>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', color: 'var(--tt)' }}>{AG_DOW[dt.getDay()]}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 999, fontSize: 13, fontWeight: esHoy ? 700 : 600, fontVariantNumeric: 'tabular-nums', background: esHoy ? 'var(--btn-bg)' : 'transparent', color: esHoy ? 'var(--btn-tx)' : 'var(--tp)' }}>{dt.getDate()}</span>
                </div>
                {deFecha(dt).map((c) => {
                  const ch = window.chipDe(c.producto);
                  return (
                    <button key={c.id} type="button" onClick={() => abrirDetalle(c)}
                      style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 4, padding: '8px 10px', borderRadius: 12, border: 'none', background: 'var(--card)', boxShadow: 'var(--card-sh)', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--ts)' }}>{c.hora}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: 'var(--tp)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <span style={{ flex: 'none', width: 5, height: 5, borderRadius: 999, background: ch.color }} />{c.nombre.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {vista === 'mes' && <Mes mBase={mBase} deFecha={deFecha} abrirDetalle={abrirDetalle} />}
    </div>
  );
}

function Nav({ children, onClick }) {
  const [h, setH] = React.useState(false);
  return <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, border: '1px solid var(--divider)', background: h ? 'var(--hover)' : 'transparent', color: 'var(--ts)', fontFamily: 'inherit', fontSize: 15, lineHeight: 1, cursor: 'pointer' }}>{children}</button>;
}

function Ambar() {
  return (
    <span title="Pasó su hora y sigue sin atender" style={{ position: 'relative', flex: 'none', width: 7, height: 7 }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--ambar)' }} />
      <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--ambar)', animation: 'ih-pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite' }} />
    </span>
  );
}

function MiniMes({ sel, deFecha, onDia }) {
  const base = new Date(sel.getFullYear(), sel.getMonth(), 1);
  const nD = new Date(sel.getFullYear(), sel.getMonth() + 1, 0).getDate();
  const off = base.getDay();
  return (
    <Card eyebrow={MESES[sel.getMonth()].charAt(0).toUpperCase() + MESES[sel.getMonth()].slice(1) + ' ' + sel.getFullYear()} style={{ width: 300, flex: 'none', alignSelf: 'flex-start' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginBottom: 6 }}>
        {AG_DOW.map((d, i) => <span key={i} style={{ textAlign: 'center', fontSize: 9.5, fontWeight: 600, letterSpacing: '.06em', color: 'var(--tt)' }}>{d.charAt(0)}</span>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
        {[...Array(off + nD)].map((_, i) => {
          const dd = i - off + 1;
          if (dd < 1) return <span key={i} />;
          const dt = new Date(sel.getFullYear(), sel.getMonth(), dd);
          const n = deFecha(dt).length;
          const esHoy = mismo(dt, HOY);
          const esSel = mismo(dt, sel);
          return (
            <button key={i} type="button" onClick={() => onDia(dt)}
              style={{ height: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 23, height: 23, borderRadius: 999, fontSize: 12, fontWeight: (esHoy || esSel) ? 700 : 500, fontVariantNumeric: 'tabular-nums', background: esHoy ? 'var(--btn-bg)' : (esSel ? 'var(--tonal)' : 'transparent'), color: esHoy ? 'var(--btn-tx)' : 'var(--tp)' }}>{dd}</span>
              <span style={{ width: 3, height: 3, borderRadius: 999, background: n ? 'var(--gol)' : 'transparent' }} />
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function Mes({ mBase, deFecha, abrirDetalle }) {
  const y = mBase.getFullYear(), mo = mBase.getMonth();
  const nD = new Date(y, mo + 1, 0).getDate();
  const off = mBase.getDay();
  const prevN = new Date(y, mo, 0).getDate();
  const total = Math.ceil((off + nD) / 7) * 7;
  const celda = { display: 'flex', flexDirection: 'column', gap: 4, padding: '7px 8px', borderRadius: 14, border: '1px solid var(--divider)', boxSizing: 'border-box', minWidth: 0, minHeight: 0 };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16, flex: 1, minHeight: 0, animation: 'ih-fade .3s ease-out both' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6, marginBottom: 6, flex: 'none' }}>
        {AG_DOW.map((d) => <span key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, letterSpacing: '.1em', color: 'var(--tt)' }}>{d}</span>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gridAutoRows: '1fr', gap: 6, flex: 1, minHeight: 0 }}>
        {[...Array(total)].map((_, i) => {
          const dd = i - off + 1;
          if (dd < 1) return <div key={i} style={{ ...celda, background: 'transparent' }}><span style={{ height: 26, display: 'inline-flex', alignItems: 'center', fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--tt)', opacity: .5 }}>{prevN + dd}</span></div>;
          if (dd > nD) return <div key={i} style={{ ...celda, background: 'transparent' }}><span style={{ height: 26, display: 'inline-flex', alignItems: 'center', fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--tt)', opacity: .5 }}>{dd - nD}</span></div>;
          const dt = new Date(y, mo, dd);
          const esHoy = mismo(dt, HOY);
          const cs = deFecha(dt);
          return (
            <div key={i} style={{ ...celda, background: esHoy ? 'var(--ag-hoy)' : 'transparent', overflow: 'hidden' }}>
              <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 26, height: 26, borderRadius: 999, fontSize: 13, fontWeight: esHoy ? 700 : 600, fontVariantNumeric: 'tabular-nums', background: esHoy ? 'var(--btn-bg)' : 'transparent', color: esHoy ? 'var(--btn-tx)' : 'var(--tp)' }}>{dd}</span>
              {cs.slice(0, 2).map((c) => {
                const ch = window.chipDe(c.producto);
                return (
                  <button key={c.id} type="button" onClick={() => abrirDetalle(c)}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, border: 'none', textAlign: 'left', fontFamily: 'inherit', fontSize: 11, fontWeight: 600, padding: '3px 6px', borderRadius: 7, background: 'var(--tonal)', color: 'var(--ts)', whiteSpace: 'nowrap', overflow: 'hidden', cursor: 'pointer' }}>
                    <span style={{ flex: 'none', width: 4, height: 4, borderRadius: 999, background: ch.color }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.hora.replace(':00', '')} {c.nombre.split(' ')[0]}</span>
                  </button>
                );
              })}
              {cs.length > 2 && <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--tt)', paddingLeft: 6 }}>+{cs.length - 2} más</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { PantallaAgenda });
})();
