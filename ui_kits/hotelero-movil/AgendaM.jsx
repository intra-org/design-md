(() => {
const { Segmented, BotonAtender, BotonesResolver, ChipProducto } = window.IntraHoteleroDesignSystem_27a6ea;

/* Agenda · móvil — Día (cards) · Semana (riel de 7 días siempre visibles) ·
   Mes (dots proporcionales). Navegación real con ‹ › y botón "Hoy".
   Julio 2026; hoy = jue 16. */
const DOW = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MES3 = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const HOY = new Date(2026, 6, 16);
const AG_NOW = 9 * 60 + 41;
const mismo = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const diff = (a, b) => Math.round((a - b) / 86400000);
const minutos = (h) => { const m = h.match(/(\d+):(\d+)\s*(AM|PM)/); if (!m) return 0; let hh = +m[1] % 12; if (m[3] === 'PM') hh += 12; return hh * 60 + +m[2]; };

function AgendaM({ flujo, atender, resolver, abrirDetalle }) {
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
    ? DOW[dDia.getDay()].charAt(0) + DOW[dDia.getDay()].slice(1).toLowerCase() + ' ' + dDia.getDate() + ' ' + MES3[dDia.getMonth()]
    : vista === 'semana'
      ? lunes.getDate() + '–' + new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate() + 6).getDate() + ' ' + MES3[lunes.getMonth()]
      : MESES[mBase.getMonth()].charAt(0).toUpperCase() + MESES[mBase.getMonth()].slice(1) + ' ' + mBase.getFullYear();
  const lejos = vista === 'dia' ? dOff !== 0 : vista === 'semana' ? wOff !== 0 : mOff !== 0;
  const paso = (n) => (vista === 'dia' ? setDOff((v) => v + n) : vista === 'semana' ? setWOff((v) => v + n) : setMOff((v) => v + n));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px 0' }}>
        <span style={{ flex: 1, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp)' }}>Agenda</span>
        {lejos && <button type="button" onClick={() => { setDOff(0); setWOff(0); setMOff(0); }} style={{ flex: 'none', height: 30, padding: '0 12px', borderRadius: 999, border: '1px solid var(--sec-bd)', background: 'transparent', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Hoy</button>}
        <span style={{ fontSize: 15, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--tp)', whiteSpace: 'nowrap' }}>{titulo}</span>
        <Nav onClick={() => paso(-1)}>‹</Nav>
        <Nav onClick={() => paso(1)}>›</Nav>
      </div>

      <div style={{ display: 'flex', padding: '12px 20px 0' }}>
        <Segmented value={vista} onChange={setVista} options={[{ value: 'dia', label: 'Día' }, { value: 'semana', label: 'Semana' }, { value: 'mes', label: 'Mes' }]} />
      </div>

      {vista === 'dia' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '14px 16px 0', animation: 'ih-fade .3s ease-out both' }}>
          {deFecha(dDia).map((c) => {
            const ch = window.chipDe(c.producto);
            const ambar = c.estado === 'pendiente' && c.m < AG_NOW && dOff === 0;
            return (
              <div key={c.id} onClick={() => abrirDetalle(c)}
                style={{ borderRadius: 20, background: 'var(--card)', boxShadow: 'var(--card-sh)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 7, cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {ambar && <Ambar />}
                  <span style={{ flex: 'none', fontSize: 17, fontWeight: 600, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em', color: 'var(--tp)' }}>{c.hora}</span>
                  <span style={{ flex: 1, minWidth: 0, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--tp)' }}>{c.nombre}</span>
                  <ChipProducto color={ch.color} fondo={ch.fondo}>{c.producto}</ChipProducto>
                </div>
                <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--ts)' }}>{c.contexto}</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 2 }}>
                  <span style={{ fontSize: 10.5, color: 'var(--tt)' }}>{'Llegó ' + (c.id === 'mariana' ? 'hace 12 min' : 'anoche')}</span>
                  <span style={{ flex: 1 }} />
                  {c.estado === 'pendiente'
                    ? <BotonAtender ambar={ambar} onClick={() => atender(c.id)} />
                    : c.estado === 'seguimiento'
                      ? <BotonesResolver onSi={() => resolver(c.id, 'atendido')} onNo={() => resolver(c.id, 'no-confirmado')} />
                      : <span style={{ fontSize: 12, fontWeight: 600, color: c.estado === 'no-confirmado' ? 'var(--tt)' : 'var(--verde-tx)' }}>{c.stamp}</span>}
                </div>
              </div>
            );
          })}
          {deFecha(dDia).length === 0 && <p style={{ margin: '40px 0', textAlign: 'center', fontSize: 13, lineHeight: 1.5, color: 'var(--tt)' }}>Sin citas este día. Tu asistente sigue atendiendo.</p>}
        </div>
      )}

      {vista === 'semana' && (
        <div style={{ display: 'flex', flexDirection: 'column', margin: '6px 20px 0', animation: 'ih-fade .3s ease-out both' }}>
          {[...Array(7)].map((_, i) => {
            const dt = new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate() + i);
            const esHoy = mismo(dt, HOY);
            const cs = deFecha(dt);
            return (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--divider)' }}>
                <div style={{ flex: 'none', width: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.08em', color: 'var(--tt)' }}>{DOW[dt.getDay()]}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 999, fontSize: 17, fontWeight: 600, fontVariantNumeric: 'tabular-nums', background: esHoy ? 'var(--btn-bg)' : 'transparent', color: esHoy ? 'var(--btn-tx)' : 'var(--tp)' }}>{dt.getDate()}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
                  {cs.length === 0 && <span style={{ fontSize: 13, color: 'var(--tt)' }}>Sin citas</span>}
                  {cs.map((c) => {
                    const ch = window.chipDe(c.producto);
                    return (
                      <button key={c.id} type="button" onClick={() => abrirDetalle(c)}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 14, border: 'none', background: 'var(--card)', boxShadow: 'var(--card-sh)', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--ts)' }}>{c.hora}</span>
                        <span style={{ flex: 1, minWidth: 0, fontSize: 15, fontWeight: 700, color: 'var(--tp)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.nombre}</span>
                        {c.estado === 'atendido' && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--verde-tx)' }}>✓</span>}
                        <span style={{ flex: 'none', width: 5, height: 5, borderRadius: 999, background: ch.color }} />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {vista === 'mes' && <MesM mBase={mBase} deFecha={deFecha} onDia={(dt) => { setDOff(diff(dt, HOY)); setVista('dia'); }} />}
    </div>
  );
}

function Nav({ children, onClick }) {
  return <button type="button" onClick={onClick} style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, border: '1px solid var(--divider)', background: 'transparent', color: 'var(--ts)', fontFamily: 'inherit', fontSize: 15, lineHeight: 1, cursor: 'pointer' }}>{children}</button>;
}

function Ambar() {
  return (
    <span title="Pasó su hora y sigue sin atender" style={{ position: 'relative', flex: 'none', width: 7, height: 7 }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--ambar)' }} />
      <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--ambar)', animation: 'ih-pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite' }} />
    </span>
  );
}

function MesM({ mBase, deFecha, onDia }) {
  const y = mBase.getFullYear(), mo = mBase.getMonth();
  const nD = new Date(y, mo + 1, 0).getDate();
  const off = mBase.getDay();
  const dots = (n) => (n >= 4 ? 3 : n >= 2 ? 2 : 1);
  return (
    <div style={{ margin: '14px 16px 0', borderRadius: 20, background: 'var(--card)', boxShadow: 'var(--card-sh)', padding: 16, animation: 'ih-fade .3s ease-out both' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginBottom: 8 }}>
        {DOW.map((d, i) => <span key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, color: 'var(--tt)' }}>{d.charAt(0)}</span>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
        {[...Array(off + nD)].map((_, i) => {
          const dd = i - off + 1;
          if (dd < 1) return <span key={i} />;
          const dt = new Date(y, mo, dd);
          const n = deFecha(dt).length;
          const esHoy = mismo(dt, HOY);
          return (
            <button key={i} type="button" onClick={() => onDia(dt)}
              style={{ height: 42, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 999, fontSize: 13, fontWeight: esHoy ? 700 : 500, fontVariantNumeric: 'tabular-nums', background: esHoy ? 'var(--btn-bg)' : 'transparent', color: esHoy ? 'var(--btn-tx)' : 'var(--tp)' }}>{dd}</span>
              <span style={{ display: 'flex', gap: 2, height: 4 }}>
                {n > 0 && Array.from({ length: dots(n) }).map((_, k) => <span key={k} style={{ width: 4, height: 4, borderRadius: 999, background: 'var(--gol)' }} />)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { AgendaM });
})();
