(() => {
const { RenglonPersona, ChipRemovible, Button, Popover, Card, Toast, CapturaResolver, Chispas } = window.IntraHoteleroDesignSystem_27a6ea;

const GRUPOS = [
  { k: 'pendiente', titulo: 'Por atender' },
  { k: 'seguimiento', titulo: 'En seguimiento' },
  { k: 'atendido', titulo: 'Atendidas' },
];

/* Personas · escritorio. Tres grupos colapsables dentro de tarjetas de radio
   20, resumen del periodo arriba y el protocolo completo al resolver:
   el estado se escribe al instante → chispas si es venta → captura opcional
   160ms después → toast con Deshacer de 5s. */
function PantallaPersonas({ flujo, atender, resolver, abrirDetalle }) {
  const [filtro, setFiltro] = React.useState(null);
  const [estatus, setEstatus] = React.useState(null);
  const [pop, setPop] = React.useState(null);
  const [col, setCol] = React.useState({});
  const [cap, setCap] = React.useState(null);
  const [burst, setBurst] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [datos, setDatos] = React.useState({});
  const snap = React.useRef(null);
  const tCap = React.useRef(0); const tFw = React.useRef(0); const tT = React.useRef(0);

  React.useEffect(() => () => { clearTimeout(tCap.current); clearTimeout(tFw.current); clearTimeout(tT.current); }, []);

  const personas = window.PERSONAS.map((p) => ({ ...p, estado: flujo[p.id] || p.estado, stamp: flujo[p.id + '_stamp'] || p.stamp }));
  const visibles = personas.filter((p) => (!filtro || p.producto === filtro) && (!estatus || (estatus === 'att' ? (p.estado === 'atendido' || p.estado === 'no-confirmado') : estatus === 'pend' ? p.estado === 'pendiente' : p.estado === 'seguimiento')));
  const nPend = personas.filter((p) => p.estado === 'pendiente').length;

  const capResolver = (id, kind) => {
    snap.current = { id, datos: JSON.parse(JSON.stringify(datos)) };
    resolver(id, kind === 'si' ? 'atendido' : 'no-confirmado');
    if (kind === 'si') {
      setBurst(id);
      clearTimeout(tFw.current);
      tFw.current = setTimeout(() => setBurst(null), 1150);
    }
    clearTimeout(tCap.current);
    tCap.current = setTimeout(() => setCap({ id, kind }), 160);
  };
  const guardar = (patch, txt) => {
    setDatos((d) => ({ ...d, [cap.id]: { ...(d[cap.id] || {}), ...patch } }));
    setCap(null); setToast(txt);
    clearTimeout(tT.current);
    tT.current = setTimeout(() => setToast(null), 5000);
  };
  const deshacer = () => { if (snap.current) { resolver(snap.current.id, 'seguimiento'); setDatos(snap.current.datos); } setToast(null); setCap(null); };

  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, overflowY: 'auto', padding: '26px 32px 30px', boxSizing: 'border-box', animation: 'ih-rise .32s cubic-bezier(0.22,0.61,0.36,1) both' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp)' }}>Personas</p>
        <span style={{ flex: 1 }} />
        <div style={{ position: 'relative' }}>
          <Button variant="secondary" size="sm" onClick={() => setPop(pop === 'prod' ? null : 'prod')}>Producto ▾</Button>
          <Popover abierto={pop === 'prod'} value={filtro || 'Todos'} onSelect={(v) => { setFiltro(v === 'Todos' ? null : v); setPop(null); }}
            items={window.PFOPTS.map((o) => ({ label: o, dot: o === 'Todos' ? null : window.chipDe(o).color }))} />
        </div>
        <div style={{ position: 'relative' }}>
          <Button variant="secondary" size="sm" onClick={() => setPop(pop === 'est' ? null : 'est')}>Estatus ▾</Button>
          <Popover abierto={pop === 'est'} value={estatus || 'todos'} onSelect={(v) => { setEstatus(v === 'todos' ? null : v); setPop(null); }}
            items={[{ value: 'todos', label: 'Todos' }, { value: 'pend', label: 'Por atender' }, { value: 'seg', label: 'En seguimiento' }, { value: 'att', label: 'Atendidas' }]} />
        </div>
        <div style={{ position: 'relative' }}>
          <Button variant="secondary" size="sm" onClick={() => setPop(pop === 'exp' ? null : 'exp')}>Exportar ▾</Button>
          <Popover abierto={pop === 'exp'} items={[{ label: 'CSV' }, { label: 'Enviar por correo' }]} onSelect={() => setPop(null)} />
        </div>
      </div>

      <p style={{ margin: '14px 0 0', fontSize: 13, color: 'var(--ts)' }}>{nPend} por atender de {personas.length} personas este mes.</p>

      {(filtro || estatus) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {filtro && <ChipRemovible onQuitar={() => setFiltro(null)}>{filtro}</ChipRemovible>}
          {estatus && <ChipRemovible onQuitar={() => setEstatus(null)}>{window.SFLBL[estatus]}</ChipRemovible>}
        </div>
      )}

      {GRUPOS.map((g) => {
        const lista = visibles.filter((p) => (g.k === 'atendido' ? (p.estado === 'atendido' || p.estado === 'no-confirmado') : p.estado === g.k));
        if (!lista.length) return null;
        const cerrado = !!col[g.k];
        return (
          <div key={g.k} style={{ display: 'flex', flexDirection: 'column' }}>
            <button type="button" onClick={() => setCol((c) => ({ ...c, [g.k]: !c[g.k] }))}
              style={{ display: 'flex', alignItems: 'center', gap: 7, margin: '18px 4px 6px', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-start' }}>
              <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt)' }}>{g.titulo} ({lista.length})</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--tt)', transform: cerrado ? 'rotate(-90deg)' : 'none', transition: 'transform .25s cubic-bezier(0.34,1.2,0.64,1)' }}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div style={{ display: 'grid', gridTemplateRows: cerrado ? '0fr' : '1fr', transition: 'grid-template-rows .3s cubic-bezier(0.34,1.2,0.64,1)' }}>
              <div style={{ overflow: 'hidden', minHeight: 0 }}>
                <Card padding="8px 8px" style={{ display: 'flex', flexDirection: 'column' }}>
                  {lista.map((p, i) => {
                    const c = window.chipDe(p.producto);
                    const d = datos[p.id] || {};
                    const extra = d.monto ? '$' + d.monto.toLocaleString('es-MX') + ' MXN' : (d.motivo || d.nota || null);
                    return (
                      <div key={p.id} style={{ position: 'relative', animation: 'ih-rise .34s cubic-bezier(0.22,0.61,0.36,1) ' + (i * 40) + 'ms both' }}>
                        <RenglonPersona desktop nombre={p.nombre} producto={p.producto} productoColor={c.color} productoFondo={c.fondo}
                          contexto={p.contexto} dato={extra} rel={p.rel} urgente={p.urgente} estado={p.estado} stamp={p.stamp}
                          onClick={() => abrirDetalle(p)}
                          onAtender={() => atender(p.id)}
                          onSi={() => capResolver(p.id, 'si')} onNo={() => capResolver(p.id, 'no')} />
                        {burst === p.id && <Chispas style={{ right: 66, top: '24%' }} />}
                      </div>
                    );
                  })}
                </Card>
              </div>
            </div>
          </div>
        );
      })}

      {visibles.length === 0 && (
        <p style={{ margin: '32px 20px', fontSize: 13, lineHeight: 1.5, color: 'var(--tt)', textAlign: 'center' }}>El asistente está trabajando — las primeras oportunidades del periodo aparecerán aquí.</p>
      )}

      {cap && (
        <CapturaResolver kind={cap.kind} onCerrar={() => setCap(null)}
          onMotivo={(m) => guardar({ motivo: m }, 'Motivo guardado — ' + m)}
          onNota={(n) => guardar({ nota: n }, 'Nota guardada')}
          onMonto={(v) => { const n = +(v || '').replace(/\D/g, ''); if (!n) { setCap(null); return; } guardar({ monto: n }, 'Venta registrada — $' + n.toLocaleString('es-MX') + ' MXN'); }} />
      )}
      {toast && <Toast onDeshacer={deshacer} style={{ bottom: 22 }}>{toast}</Toast>}
    </div>
  );
}

Object.assign(window, { PantallaPersonas });
})();
