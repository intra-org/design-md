(() => {
const { Card } = window.IntraHoteleroDesignSystem_27a6ea;

/* Historial — la tabla de citas del prototipo, 1:1:
   · barra de píldoras (Vistas · Producto · Resolución · Columnas)
   · chips de filtro removibles + conteo + "Limpiar todo"
   · encabezados ordenables con pulso de columna al reordenar
   · primera columna congelada con sombra al desplazar
   · gestor de columnas con arrastre y check
   · scrollbar horizontal propio + flechas que saltan de columna
   No hay selector de densidad: no existe en el prototipo. */
const COLS = {
  persona: { l: 'Persona', w: 230, frozen: true },
  tipo: { l: 'Tipo de evento', w: 150 },
  fechaEv: { l: 'Fecha del evento', w: 150 },
  personas: { l: 'Personas', w: 104, r: true },
  presu: { l: 'Presupuesto · MXN', w: 180, r: true },
  llego: { l: 'Llegó', w: 140 },
  vel: { l: 'Velocidad de respuesta', w: 200 },
  resol: { l: 'Resolución', w: 160 },
  motivo: { l: 'Motivo / monto', w: 190 },
};
const DEF = ['persona', 'tipo', 'fechaEv', 'personas', 'presu', 'llego', 'vel', 'resol', 'motivo'];
const VISTAS = {
  'Todo el historial': { fp: null, fr: null, sort: null, cols: DEF },
  'Solo eventos grandes': { fp: 'Evento', fr: null, sort: { k: 'presu', d: -1 }, cols: DEF },
  'Pendientes por resolver': { fp: null, fr: 'curso', sort: { k: 'llego', d: 1 }, cols: DEF },
};
const RESOL = {
  curso: ['En curso', { border: '1px solid var(--sec-bd)', color: 'var(--ts)' }],
  si: ['Concretada', { background: 'var(--tonal)', color: 'var(--verde-tx)' }],
  no: ['No concretada', { background: 'var(--tonal)', color: 'var(--tt)' }],
};
const fmt = (n) => '$' + n.toLocaleString('es-MX');
const velTxt = (m) => (m == null ? '—' : m < 60 ? m + ' min' : Math.round(m / 60) + ' h');
const H = 56;

function PantallaHistorial({ abrirDetalle }) {
  const [cols, setCols] = React.useState(DEF);
  const [fp, setFp] = React.useState(null);
  const [fr, setFr] = React.useState(null);
  const [sort, setSort] = React.useState(null);
  const [menu, setMenu] = React.useState(null);
  const [vista, setVista] = React.useState('Todo el historial');
  const [pulso, setPulso] = React.useState(null);
  const [drag, setDrag] = React.useState(null);
  const [m, setM] = React.useState({ sl: 0, sw: 1, cw: 1 });
  const el = React.useRef(null);
  const tP = React.useRef(0);

  let filas = window.REP_DATA.filter((r) => (!fp || r.prod === fp) && (!fr || r.resol === fr));
  if (sort) {
    const k = sort.k;
    filas = [...filas].sort((a, b) => {
      const va = k === 'persona' ? a.n : a[k], vb = k === 'persona' ? b.n : b[k];
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * sort.d;
      return String(va).localeCompare(String(vb), 'es') * sort.d;
    });
  }

  const GT = cols.map((k) => COLS[k].w + 'px').join(' ');

  const medir = React.useCallback(() => {
    const n = el.current; if (!n) return;
    setM({ sl: n.scrollLeft, sw: n.scrollWidth, cw: n.clientWidth });
  }, []);
  React.useEffect(() => { const t = setTimeout(medir, 40); window.addEventListener('resize', medir); return () => { clearTimeout(t); window.removeEventListener('resize', medir); }; }, [medir, cols]);
  React.useEffect(() => () => clearTimeout(tP.current), []);

  const overflow = m.sw - m.cw > 4;
  const maxSL = Math.max(0, m.sw - m.cw);
  const desplazado = m.sl > 2;
  const alFinal = m.sl >= maxSL - 2;
  const snaps = React.useMemo(() => { let a = 0; return [0, ...cols.map((k) => (a += COLS[k].w))]; }, [cols]);
  const anima = (to) => { const n = el.current; if (n) n.scrollTo({ left: Math.max(0, Math.min(maxSL, to)), behavior: 'smooth' }); };

  const ordenar = (k) => {
    setSort((s) => (s && s.k === k ? { k, d: -s.d } : { k, d: 1 }));
    setPulso(k); clearTimeout(tP.current); tP.current = setTimeout(() => setPulso(null), 900);
  };
  const aplicarVista = (n) => { const V = VISTAS[n]; setFp(V.fp); setFr(V.fr); setSort(V.sort); setCols(V.cols); setVista(n); setMenu(null); };
  const chips = [];
  if (fp) chips.push({ t: 'Producto: ' + fp, quitar: () => setFp(null) });
  if (fr) chips.push({ t: 'Resolución: ' + RESOL[fr][0], quitar: () => setFr(null) });

  const barDown = (e) => {
    const track = e.currentTarget; const r = track.getBoundingClientRect();
    const mover = (cx) => { const n = el.current; if (n) n.scrollLeft = Math.max(0, Math.min(maxSL, ((cx - r.left) / r.width) * m.sw - m.cw / 2)); };
    mover(e.clientX);
    const mm = (ev) => mover(ev.clientX);
    const up = () => { window.removeEventListener('pointermove', mm); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', mm); window.addEventListener('pointerup', up);
  };

  const pill = { height: 38, padding: '0 16px', borderRadius: 999, border: 'none', background: 'var(--seg-track)', color: 'var(--ts)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flex: 'none' };
  const pop = { position: 'absolute', top: 46, right: 0, zIndex: 45, minWidth: 200, padding: 8, borderRadius: 14, background: 'var(--card)', boxShadow: '0 12px 40px -12px rgba(20,16,8,.3), 0 1px 2px rgba(20,16,8,.08)', display: 'flex', flexDirection: 'column', transformOrigin: 'top right', animation: 'ih-pop .18s ease-out both', boxSizing: 'border-box' };
  const mi = (on) => ({ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '10px 12px', border: 'none', borderRadius: 9, background: on ? 'var(--tonal)' : 'transparent', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 13, fontWeight: on ? 700 : 500, textAlign: 'left', cursor: 'pointer' });

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', animation: 'ih-rise .32s cubic-bezier(0.22,0.61,0.36,1) both' }}>
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '26px 32px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 'auto', minWidth: 0 }}>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp)' }}>Historial</span>
          <span style={{ fontSize: 11, color: 'var(--tt)', whiteSpace: 'nowrap' }}>Todas las citas que ha traído tu asistente.</span>
        </div>
        <Menu label="Vistas ▾" abierto={menu === 'v'} onToggle={() => setMenu(menu === 'v' ? null : 'v')} pill={pill} pop={pop}>
          {Object.keys(VISTAS).map((n) => <button key={n} type="button" onClick={() => aplicarVista(n)} style={mi(vista === n)}>{n}</button>)}
          <div style={{ height: 1, background: 'var(--divider)', margin: '4px 8px' }} />
          <button type="button" onClick={() => setMenu(null)} style={mi(false)}>Guardar vista actual…</button>
        </Menu>
        <Menu label="Producto ▾" abierto={menu === 'p'} onToggle={() => setMenu(menu === 'p' ? null : 'p')} pill={pill} pop={pop}>
          {['Todos', 'Reserva', 'Evento', 'Day Pass'].map((o) => (
            <button key={o} type="button" onClick={() => { setFp(o === 'Todos' ? null : o); setMenu(null); }} style={mi((fp || 'Todos') === o)}>
              {o !== 'Todos' && <span style={{ width: 6, height: 6, borderRadius: 999, background: window.chipDe(o).color }} />}{o}
            </button>
          ))}
        </Menu>
        <Menu label="Resolución ▾" abierto={menu === 'r'} onToggle={() => setMenu(menu === 'r' ? null : 'r')} pill={pill} pop={pop}>
          {[['todas', 'Todas'], ['curso', 'En curso'], ['si', 'Concretada'], ['no', 'No concretada']].map(([v, l]) => (
            <button key={v} type="button" onClick={() => { setFr(v === 'todas' ? null : v); setMenu(null); }} style={mi((fr || 'todas') === v)}>{l}</button>
          ))}
        </Menu>
        <Menu label="Columnas" abierto={menu === 'c'} onToggle={() => setMenu(menu === 'c' ? null : 'c')} pill={pill} pop={{ ...pop, minWidth: 260 }}>
          {cols.length < DEF.length && <button type="button" onClick={() => setCols(DEF)} style={mi(false)}>Seleccionar todas las columnas</button>}
          <button type="button" onClick={() => { setCols(DEF); setVista('Todo el historial'); }} style={mi(false)}>Restablecer columnas</button>
          <div style={{ height: 1, background: 'var(--divider)', margin: '6px 8px' }} />
          <p style={{ margin: '4px 8px 8px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt)' }}>Columnas — arrastra para reordenar</p>
          {DEF.map((k) => {
            const on = cols.includes(k);
            return (
              <div key={k} draggable
                onDragStart={() => setDrag(k)}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!drag || drag === k) return;
                  setCols((c) => { const n = c.filter((x) => x !== drag); const i = n.indexOf(k); n.splice(i < 0 ? n.length : i, 0, drag); return n; });
                }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 9, fontSize: 13, color: on ? 'var(--tp)' : 'var(--tt)', background: drag === k ? 'var(--tonal)' : 'transparent', cursor: 'default' }}>
                <span style={{ color: 'var(--tt)', fontSize: 13, cursor: 'grab', flex: 'none' }}>≡</span>
                <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{COLS[k].l}</span>
                <button type="button" title="Mostrar u ocultar" onClick={() => setCols((c) => (c.includes(k) ? (c.length > 1 ? c.filter((x) => x !== k) : c) : DEF.filter((x) => c.includes(x) || x === k)))}
                  style={{ flex: 'none', width: 20, height: 20, borderRadius: 6, border: '1px solid ' + (on ? 'var(--btn-bg)' : 'var(--sec-bd)'), background: on ? 'var(--btn-bg)' : 'transparent', color: 'var(--btn-tx)', fontSize: 11, cursor: 'pointer', padding: 0, lineHeight: 1 }}>{on ? '✓' : ''}</button>
              </div>
            );
          })}
        </Menu>
      </div>

      {menu && <div onMouseDown={() => setMenu(null)} style={{ position: 'absolute', inset: 0, zIndex: 44 }} />}

      {chips.length > 0 && (
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '12px 32px 0', flexWrap: 'wrap', animation: 'ih-rise .3s cubic-bezier(0.22,0.61,0.36,1) both' }}>
          {chips.map((c) => (
            <button key={c.t} type="button" onClick={c.quitar}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 30, padding: '0 12px', borderRadius: 999, border: 'none', background: 'var(--btn-bg)', color: 'var(--btn-tx)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{c.t}<span style={{ opacity: .6 }}>×</span></button>
          ))}
          <span style={{ fontSize: 12, color: 'var(--ts)' }}>mostrando {filas.length} de {window.REP_DATA.length}</span>
          <button type="button" onClick={() => { setFp(null); setFr(null); }} style={{ border: 'none', background: 'transparent', padding: 0, color: 'var(--link)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Limpiar todo</button>
        </div>
      )}

      <div style={{ position: 'relative', flex: 1, minHeight: 0, padding: '18px 32px 26px', boxSizing: 'border-box' }}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
          <div ref={el} onScroll={medir} tabIndex={0} role="table" aria-label="Historial de citas"
            style={{ height: '100%', minHeight: 0, borderRadius: 20, background: 'var(--card)', boxShadow: 'var(--card-sh)', overflow: 'auto', outline: 'none', position: 'relative', boxSizing: 'border-box' }}>
            <div role="row" style={{ display: 'grid', gridTemplateColumns: GT, width: 'max-content', minWidth: '100%', position: 'sticky', top: 0, zIndex: 6, borderRadius: '20px 20px 0 0', background: 'var(--card)', borderBottom: '1px solid var(--divider)' }}>
              {cols.map((k) => {
                const on = sort && sort.k === k;
                const C = COLS[k];
                return (
                  <div key={k} role="columnheader" onClick={() => ordenar(k)} title={C.l}
                    style={{ padding: '13px 14px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: on ? 'var(--tp)' : 'var(--tt)', whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: C.r ? 'flex-end' : 'flex-start', minWidth: 0, boxSizing: 'border-box', animation: pulso === k ? 'ih-col-pulse .9s ease-out both' : undefined, ...(C.frozen ? { position: 'sticky', left: 0, zIndex: 7, background: 'var(--card)', boxShadow: desplazado ? '16px 0 22px -16px rgba(20,16,8,.28)' : '0 0 0 0 transparent', transition: 'box-shadow .15s ease-out', borderTopLeftRadius: 20 } : {}) }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, minWidth: 0 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{C.l}</span>
                      {on && <span style={{ fontSize: 10, flex: 'none' }}>{sort.d > 0 ? '↑' : '↓'}</span>}
                    </span>
                  </div>
                );
              })}
            </div>
            <div role="rowgroup">
              {filas.map((r) => <Fila key={r.pid} r={r} cols={cols} GT={GT} desplazado={desplazado} onClick={() => abrirDetalle({ id: r.pid, nombre: r.n, producto: r.prod, tel: r.tel, rel: r.llego, contexto: r.tipo })} />)}
              {filas.length === 0 && <p style={{ margin: '48px 0', textAlign: 'center', fontSize: 13, color: 'var(--tt)' }}>Ninguna cita coincide con estos filtros.</p>}
            </div>
          </div>

          {overflow && (
            <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div onPointerDown={barDown} style={{ flex: 1, minWidth: 0, height: 6, borderRadius: 999, background: 'var(--divider)', position: 'relative', cursor: 'pointer' }}>
                <span style={{ position: 'absolute', top: 0, bottom: 0, borderRadius: 999, background: 'var(--sec-bd)', left: (m.sl / m.sw) * 100 + '%', width: Math.max(8, (m.cw / m.sw) * 100) + '%' }} />
              </div>
              <Flecha activa={desplazado} onClick={() => { const p = snaps.filter((x) => x < m.sl - 2); anima(p.length ? p[p.length - 1] : 0); }} title="Columna anterior">‹</Flecha>
              <Flecha activa={!alFinal} glow={!alFinal} onClick={() => { const n = snaps.find((x) => x > m.sl + 2); anima(n != null ? n : maxSL); }} title="Columna siguiente">›</Flecha>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Menu({ label, abierto, onToggle, pill, pop, children }) {
  const [h, setH] = React.useState(false);
  return (
    <div style={{ position: 'relative', flex: 'none', zIndex: abierto ? 46 : 1 }}>
      <button type="button" onClick={onToggle} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ ...pill, background: h || abierto ? 'var(--hover)' : 'var(--seg-track)' }}>{label}</button>
      {abierto && <div style={pop}>{children}</div>}
    </div>
  );
}

function Flecha({ children, activa, glow, onClick, title }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" title={title} onClick={activa ? onClick : undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ flex: 'none', width: 28, height: 28, borderRadius: 999, border: '1px solid var(--divider)', background: 'transparent', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 14, lineHeight: 1, padding: 0, opacity: activa ? (h ? 1 : 0.45) : 0.18, cursor: activa ? 'pointer' : 'default', transition: 'opacity .15s ease-out', animation: glow ? 'ih-arrow-glow 2.4s cubic-bezier(0.22,1,0.36,1) infinite' : undefined }}>{children}</button>
  );
}

function Fila({ r, cols, GT, desplazado, onClick }) {
  const [hover, setHover] = React.useState(false);
  const [txtR, estR] = RESOL[r.resol];
  const base = { display: 'flex', alignItems: 'center', padding: '0 14px', minHeight: H, fontSize: 13, color: 'var(--tp)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', boxSizing: 'border-box', position: 'relative' };
  const maxP = 180000;

  const celda = (k) => {
    const C = COLS[k];
    const st = { ...base, justifyContent: C.r ? 'flex-end' : 'flex-start', fontVariantNumeric: C.r ? 'tabular-nums' : 'normal',
      ...(C.frozen ? { position: 'sticky', left: 0, zIndex: 3, background: hover ? 'var(--hover)' : 'var(--card)', boxShadow: desplazado ? '16px 0 22px -16px rgba(20,16,8,.28)' : '0 0 0 0 transparent', transition: 'box-shadow .15s ease-out, background .15s ease-out' } : {}) };
    if (k === 'persona') {
      return (
        <div key={k} role="cell" style={st}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, minWidth: 0 }}>
            {r.resol === 'curso' && r.dias > 21 && (
              <span title="Sin resolver +21 días" style={{ position: 'relative', flex: 'none', width: 7, height: 7, marginTop: 5 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--ambar)' }} />
                <span style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--ambar)', animation: 'ih-pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite' }} />
              </span>
            )}
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <span style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.n}</span>
              <span style={{ fontSize: 11, color: 'var(--tt)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r.tel}</span>
            </span>
          </div>
        </div>
      );
    }
    if (k === 'tipo') return <div key={k} role="cell" style={st}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ flex: 'none', width: 5, height: 5, borderRadius: 999, background: window.chipDe(r.prod).color }} />{r.tipo}</span></div>;
    if (k === 'presu') {
      return (
        <div key={k} role="cell" style={st}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ flex: 'none', width: 44, height: 4, borderRadius: 999, background: 'var(--tonal)', overflow: 'hidden' }}>
              <span style={{ display: 'block', height: '100%', borderRadius: 999, background: 'var(--sec-bd)', width: Math.max(6, (r.presu / maxP) * 100) + '%' }} />
            </span>
            <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{fmt(r.presu)}</span>
          </span>
        </div>
      );
    }
    if (k === 'resol') return <div key={k} role="cell" style={st}><span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 600, ...estR }}>{txtR}</span></div>;
    if (k === 'motivo') {
      const t = r.monto ? fmt(r.monto) + ' MXN' : (r.motivo || null);
      return (
        <div key={k} role="cell" style={st}>
          {t ? <span style={{ color: r.monto ? 'var(--verde-tx)' : 'var(--ts)', fontWeight: r.monto ? 600 : 400 }}>{t}</span>
            : <button type="button" title="Agregar" onClick={(e) => e.stopPropagation()} style={{ width: 24, height: 24, borderRadius: 999, border: '1px solid var(--sec-bd)', background: 'transparent', color: 'var(--tt)', fontSize: 13, lineHeight: 1, cursor: 'pointer', opacity: .55, padding: 0 }}>+</button>}
        </div>
      );
    }
    const v = k === 'personas' ? r.personas : k === 'fechaEv' ? r.fechaEv : k === 'llego' ? r.llego : velTxt(r.vel);
    return <div key={k} role="cell" style={{ ...st, color: k === 'llego' || k === 'vel' ? 'var(--ts)' : 'var(--tp)' }}>{v}</div>;
  };

  return (
    <div role="row" onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'grid', gridTemplateColumns: GT, width: 'max-content', minWidth: '100%', borderBottom: '1px solid var(--divider)', background: hover ? 'var(--hover)' : 'transparent', cursor: 'pointer', transition: 'background .15s ease-out' }}>
      {cols.map(celda)}
    </div>
  );
}

Object.assign(window, { PantallaHistorial });
})();
