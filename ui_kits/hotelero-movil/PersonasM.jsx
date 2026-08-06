(() => {
const { RenglonPersona, Segmented, Toast, CapturaResolver, Chispas } = window.IntraHoteleroDesignSystem_27a6ea;

const GRUPOS = [
  { k: 'pendiente', titulo: 'Por atender' },
  { k: 'seguimiento', titulo: 'En seguimiento' },
  { k: 'atendido', titulo: 'Atendidas' },
];

/* Personas · móvil — cabecera con los dos menús de icono (estatus y filtro),
   selector de periodo, resumen, chips activos y tres grupos en tarjetas de
   radio 20 con padding 6. Mismo protocolo al resolver que en escritorio, pero
   la captura llega como sheet inferior. */
function PersonasM({ periodo, setPeriodo, flujo, atender, resolver, abrirDetalle }) {
  const [pf, setPf] = React.useState(null);
  const [sf, setSf] = React.useState(null);
  const [menu, setMenu] = React.useState(null);
  const [cap, setCap] = React.useState(null);
  const [burst, setBurst] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [datos, setDatos] = React.useState({});
  const snap = React.useRef(null);
  const tCap = React.useRef(0); const tFw = React.useRef(0); const tT = React.useRef(0);
  React.useEffect(() => () => { clearTimeout(tCap.current); clearTimeout(tFw.current); clearTimeout(tT.current); }, []);

  const personas = window.PERSONAS.map((p) => ({ ...p, estado: flujo[p.id] || p.estado, stamp: flujo[p.id + '_stamp'] || p.stamp }));
  const visibles = personas.filter((p) => (!pf || p.producto === pf) && (!sf || (sf === 'att' ? (p.estado === 'atendido' || p.estado === 'no-confirmado') : sf === 'pend' ? p.estado === 'pendiente' : p.estado === 'seguimiento')));
  const nPend = personas.filter((p) => p.estado === 'pendiente').length;

  const capResolver = (id, kind) => {
    snap.current = { id, datos: JSON.parse(JSON.stringify(datos)) };
    resolver(id, kind === 'si' ? 'atendido' : 'no-confirmado');
    if (kind === 'si') { setBurst(id); clearTimeout(tFw.current); tFw.current = setTimeout(() => setBurst(null), 1150); }
    clearTimeout(tCap.current);
    tCap.current = setTimeout(() => setCap({ id, kind }), 160);
  };
  const guardar = (patch, txt) => {
    setDatos((d) => ({ ...d, [cap.id]: { ...(d[cap.id] || {}), ...patch } }));
    setCap(null); setToast(txt);
    clearTimeout(tT.current); tT.current = setTimeout(() => setToast(null), 5000);
  };
  const deshacer = () => { if (snap.current) { resolver(snap.current.id, 'seguimiento'); setDatos(snap.current.datos); } setToast(null); setCap(null); };

  const menuBox = { position: 'absolute', top: 46, zIndex: 31, animation: 'ih-pop .18s ease-out both', transformOrigin: 'top right', background: 'var(--card)', borderRadius: 14, boxShadow: '0 12px 40px -12px rgba(20,16,8,.3), 0 1px 2px rgba(20,16,8,.08)', padding: 8, display: 'flex', flexDirection: 'column', minWidth: 170 };
  const item = (on) => ({ display: 'flex', alignItems: 'center', width: '100%', padding: '10px 12px', border: 'none', borderRadius: 9, background: on ? 'var(--tonal)' : 'transparent', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 13, fontWeight: on ? 700 : 500, textAlign: 'left', cursor: 'pointer' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 20 }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px 0' }}>
        <span style={{ flex: 1, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp)' }}>Personas</span>
        <button type="button" title="Estatus" onClick={() => setMenu(menu === 'sf' ? null : 'sf')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 8, color: 'var(--ts)', display: 'inline-flex' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-3.5-9 2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" title="Filtrar" onClick={() => setMenu(menu === 'pf' ? null : 'pf')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 8, color: 'var(--ts)', display: 'inline-flex' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
        </button>
        <button type="button" title="Exportar" onClick={() => setMenu(menu === 'exp' ? null : 'exp')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 8, color: 'var(--ts)', display: 'inline-flex' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        {menu === 'sf' && (
          <div style={{ ...menuBox, right: 88 }}>
            {[['todos', 'Todos'], ['pend', 'Por atender'], ['seg', 'En seguimiento'], ['att', 'Atendidas']].map(([v, l]) => (
              <button key={v} type="button" onClick={() => { setSf(v === 'todos' ? null : v); setMenu(null); }} style={item((sf || 'todos') === v)}>{l}</button>
            ))}
          </div>
        )}
        {menu === 'pf' && (
          <div style={{ ...menuBox, right: 48 }}>
            {window.PFOPTS.map((o) => (
              <button key={o} type="button" onClick={() => { setPf(o === 'Todos' ? null : o); setMenu(null); }} style={item((pf || 'Todos') === o)}>{o}</button>
            ))}
          </div>
        )}
        {menu === 'exp' && (
          <div style={{ ...menuBox, right: 20, minWidth: 190 }}>
            <button type="button" onClick={() => setMenu(null)} style={item(false)}>Descargar Excel (.xlsx)</button>
            <button type="button" onClick={() => setMenu(null)} style={item(false)}>Descargar CSV</button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', padding: '12px 20px 0' }}>
        <Segmented value={periodo} onChange={setPeriodo}
          options={[{ value: 'hoy', label: 'Hoy' }, { value: 'mes', label: 'Este mes' }, { value: 'junio', label: 'Mes pasado' }, { value: 'd90', label: '90 días' }]} />
      </div>

      <p style={{ margin: '16px 20px 0', fontSize: 13, color: 'var(--ts)' }}>{nPend} por atender de {personas.length} personas este mes.</p>

      {(pf || sf) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '8px 20px 0' }}>
          {pf && <Chip onQuitar={() => setPf(null)}>{pf}</Chip>}
          {sf && <Chip onQuitar={() => setSf(null)}>{window.SFLBL[sf]}</Chip>}
        </div>
      )}

      {GRUPOS.map((g) => {
        const lista = visibles.filter((p) => (g.k === 'atendido' ? (p.estado === 'atendido' || p.estado === 'no-confirmado') : p.estado === g.k));
        if (!lista.length) return null;
        return (
          <div key={g.k} style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ margin: '16px 20px 4px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt)' }}>{g.titulo} ({lista.length})</p>
            <div style={{ margin: '0 16px', borderRadius: 20, background: 'var(--card)', padding: '6px 6px', boxShadow: 'var(--card-sh)', display: 'flex', flexDirection: 'column' }}>
              {lista.map((p) => {
                const c = window.chipDe(p.producto);
                const dd = datos[p.id] || {};
                const extra = dd.monto ? '$' + dd.monto.toLocaleString('es-MX') + ' MXN' : (dd.motivo || dd.nota || null);
                return (
                  <div key={p.id} style={{ position: 'relative' }}>
                    <RenglonPersona nombre={p.nombre} producto={p.producto} productoColor={c.color} productoFondo={c.fondo}
                      contexto={p.contexto} dato={extra} rel={p.rel} urgente={p.urgente} estado={p.estado} stamp={p.stamp}
                      onClick={() => abrirDetalle(p)} onAtender={() => atender(p.id)}
                      onSi={() => capResolver(p.id, 'si')} onNo={() => capResolver(p.id, 'no')} />
                    {burst === p.id && <Chispas style={{ right: 52, top: '38%' }} />}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {visibles.length === 0 && (
        <p style={{ margin: '32px 20px', fontSize: 13, lineHeight: 1.5, color: 'var(--tt)', textAlign: 'center' }}>El asistente está trabajando — las primeras oportunidades del periodo aparecerán aquí.</p>
      )}

      {cap && (
        <SheetCaptura kind={cap.kind} onCerrar={() => setCap(null)}
          onMotivo={(m) => guardar({ motivo: m }, 'Motivo guardado — ' + m)}
          onNota={(n) => guardar({ nota: n }, 'Nota guardada')}
          onMonto={(v) => { const n = +(v || '').replace(/\D/g, ''); if (!n) { setCap(null); return; } guardar({ monto: n }, 'Venta registrada — $' + n.toLocaleString('es-MX') + ' MXN'); }} />
      )}
      {toast && <Toast onDeshacer={deshacer} style={{ position: 'fixed', bottom: 96 }}>{toast}</Toast>}
    </div>
  );
}

function Chip({ children, onQuitar }) {
  return (
    <button type="button" onClick={onQuitar} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flex: 'none', padding: '8px 14px', borderRadius: 999, border: 'none', background: 'var(--btn-bg)', color: 'var(--btn-tx)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer' }}>
      {children}<span style={{ opacity: .6 }}>×</span>
    </button>
  );
}

/* La captura en móvil es un sheet inferior con handle, no un popover. */
function SheetCaptura(props) {
  return (
    <React.Fragment>
      <div onClick={props.onCerrar} style={{ position: 'fixed', inset: 0, background: 'rgba(20,16,8,.26)', zIndex: 44, animation: 'ih-fade .25s ease both' }} />
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 50, borderRadius: '24px 24px 0 0', background: 'var(--scrim)', padding: '8px 20px 24px', animation: 'ih-sheet .3s cubic-bezier(0.34,1.2,0.64,1) both', boxSizing: 'border-box' }}>
        <div style={{ padding: '4px 0 12px', display: 'flex', justifyContent: 'center' }}><div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--sec-bd)' }} /></div>
        <CapturaResolver {...props} style={{ position: 'static', width: 'auto', padding: 0, background: 'transparent', boxShadow: 'none', animation: 'none' }} />
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { PersonasM });
})();
