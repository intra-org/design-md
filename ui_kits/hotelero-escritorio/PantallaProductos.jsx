(() => {
const { Card, Switch, Icon, Toast, Badge } = window.IntraHoteleroDesignSystem_27a6ea;

const ICONOS_CATALOGO = ['prod-cama', 'prod-copa', 'prod-sol', 'prod-boda', 'prod-pastel', 'prod-charola', 'prod-cubiertos', 'prod-fiesta', 'prod-maleta', 'prod-podio', 'prod-premio', 'prod-presentacion'];

/* Productos · escritorio, 1:1 del prototipo.
   Panel de 480px que flota; la lista abre hueco con padding-right en 320ms.
   Secciones en orden: Identidad · Color del chip · Icono (con vista previa de
   la pill de Inicio) · Comportamiento · Precio, cada una entrando escalonada.
   Un solo campo de nombre — no hay plural ni identificador.
   "Nuevo producto" es una fila con un + punteado, no un botón de barra.
   "Eliminar producto" es outline neutro y pide confirmación centrada. */
function PantallaProductos() {
  const [lista, setLista] = React.useState(() => window.CATALOGO.map((p) => ({ ...p, sing: p.nombre })));
  const [panel, setPanel] = React.useState(null);
  const [snap, setSnap] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [borrar, setBorrar] = React.useState(false);
  const [confGen, setConfGen] = React.useState(false);
  const tT = React.useRef(0);

  const sel = panel ? lista.find((p) => p.id === panel.id) : null;
  const firma = (p) => (p ? JSON.stringify([p.sing, p.chip, p.icono, p.precio, p.habilitado, p.generico]) : null);
  const sucio = !!(panel && panel.modo === 'edit' && snap != null && firma(sel) !== snap);

  const avisa = (t) => { setToast(t); clearTimeout(tT.current); tT.current = setTimeout(() => setToast(null), 3000); };
  const parche = (id, patch) => setLista((l) => l.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const abrir = (p) => { setPanel({ modo: 'edit', id: p.id }); setSnap(firma(p)); };
  const nuevo = () => {
    const id = Date.now();
    setLista((l) => [...l, { id, sing: '', nombre: '', chip: 6, icono: 'prod-premio', habilitado: true, oportunidades: 0, borrador: true }]);
    setPanel({ modo: 'new', id }); setSnap(null);
  };
  const cerrar = () => { if (panel && panel.modo === 'new') setLista((l) => l.filter((p) => !p.borrador)); setPanel(null); setSnap(null); };
  const crear = () => {
    if (!sel) return;
    const sing = (sel.sing || '').trim();
    if (!sing) { avisa('Ponle un nombre para crearlo'); return; }
    parche(sel.id, { sing, nombre: sing, borrador: false });
    setPanel({ modo: 'edit', id: sel.id }); setSnap(firma({ ...sel, sing }));
    avisa(sing + ' quedó en el catálogo');
  };
  const toggle = (p) => {
    if (p.generico) { avisa('Siempre debe haber un genérico: asígnalo a otro producto para moverlo'); return; }
    parche(p.id, { habilitado: !p.habilitado });
  };

  const visibles = lista.filter((p) => !p.borrador);
  const rise = (n) => ({ animation: 'ih-rise .34s cubic-bezier(0.22,0.61,0.36,1) ' + (n * 45) + 'ms both' });

  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden', animation: 'ih-rise .32s cubic-bezier(0.22,0.61,0.36,1) both' }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', paddingRight: panel ? 480 : 0, transition: 'padding-right .32s cubic-bezier(0.34,1.2,0.64,1)' }}>
        <div style={{ flex: 'none', padding: '26px 32px 0' }}>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp)' }}>Productos</p>
          <p style={{ margin: '10px 0 0', fontSize: 13, lineHeight: 1.5, color: 'var(--ts)', maxWidth: 520 }}>Define los servicios que tu asistente reconoce. El nombre y el color viajan a todo el dashboard; el icono solo a las pills de Inicio.</p>
          <p style={{ margin: '16px 0 0', fontSize: 12.5, color: 'var(--tt)' }}>{visibles.length} productos · {visibles.filter((p) => p.habilitado).length} habilitados</p>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 32px 28px' }}>
          <Card padding="8px 8px">
            {visibles.map((p) => <Fila key={p.id} p={p} activo={panel && panel.id === p.id} onEditar={() => abrir(p)} onToggle={() => toggle(p)} />)}
            <BtnNuevo onClick={nuevo} />
          </Card>
        </div>
      </div>

      {panel && sel && (
        <aside style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 480, zIndex: 60, display: 'flex', flexDirection: 'column', background: 'var(--panel-bg)', borderLeft: '1px solid var(--divider)', boxShadow: '-24px 0 60px -34px rgba(20,16,8,.4)', animation: 'ih-slide .32s cubic-bezier(0.34,1.2,0.64,1) both', boxSizing: 'border-box' }}>
          <div style={{ flex: 'none', display: 'flex', alignItems: 'flex-start', gap: 10, padding: '22px 24px 12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
              <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt)' }}>{panel.modo === 'new' ? 'Nuevo producto' : 'Editar producto'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--tp)' }}>
                {sel.sing || (panel.modo === 'new' ? 'Sin nombre' : '—')}
                {sel.generico && <Badge variant="outline">Genérico</Badge>}
              </span>
            </div>
            <span style={{ flex: 1 }} />
            <button type="button" onClick={cerrar} style={{ border: 'none', background: 'transparent', color: 'var(--tt)', fontSize: 15, cursor: 'pointer', marginTop: 2 }}>✕</button>
          </div>

          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '18px 24px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={rise(0)}>
              <Sec titulo="Identidad">
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--tt)' }}>Nombre</span>
                  <input value={sel.sing || ''} onChange={(e) => parche(sel.id, { sing: e.target.value, nombre: e.target.value })} placeholder="Posada Empresarial"
                    style={{ height: 40, borderRadius: 12, border: '1px solid var(--sec-bd)', background: 'var(--input-bg)', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: '0 13px', outline: 'none', boxSizing: 'border-box', width: '100%' }} />
                </label>
                <Micro>Así lo nombra tu asistente en todo el dashboard, incluidas las pills de Inicio.</Micro>
              </Sec>
            </div>

            <div style={rise(1)}>
              <Sec titulo="Color del chip">
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <button key={n} type="button" onClick={() => parche(sel.id, { chip: n })} title={'Color ' + n}
                      style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--chip-bg-' + n + ')', border: sel.chip === n ? '2px solid var(--tp)' : '1px solid var(--divider)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                      <span style={{ width: 12, height: 12, borderRadius: 999, background: 'var(--chip-' + n + ')' }} />
                    </button>
                  ))}
                </div>
              </Sec>
            </div>

            <div style={rise(2)}>
              <Sec titulo="Icono">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8 }}>
                  {ICONOS_CATALOGO.map((ic) => (
                    <button key={ic} type="button" title={ic} onClick={() => parche(sel.id, { icono: ic })}
                      style={{ height: 42, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, border: sel.icono === ic ? '1.5px solid var(--btn-bg)' : '1px solid transparent', background: sel.icono === ic ? 'var(--tonal)' : 'transparent', color: 'var(--ts)', cursor: 'pointer' }}>
                      <Icon name={ic} size={18} />
                    </button>
                  ))}
                </div>
                <Micro>Solo se refleja en las pills de productos de Inicio; el resto del dashboard usa el nombre y el color.</Micro>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 14, borderRadius: 14, background: 'linear-gradient(170deg,#151518 0%,#0A0A0C 45%,#060607 100%)' }}>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>Así se verá en Inicio</span>
                  <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 15px', borderRadius: 999, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.85)', fontSize: 13, fontWeight: 500 }}>
                    <Icon name={sel.icono} size={16} />{sel.sing || 'Producto'}<span style={{ fontWeight: 700 }}>{sel.oportunidades || 0}</span>
                  </span>
                </div>
              </Sec>
            </div>

            <div style={rise(3)}>
              <Sec titulo="Comportamiento">
                <FilaSw label="Habilitado" micro="Solo los habilitados se enlazan en la ingesta.">
                  <Switch checked={sel.habilitado} bloqueado={sel.generico} onChange={() => (sel.generico ? avisa('Siempre debe haber un genérico: asígnalo a otro producto para moverlo') : parche(sel.id, { habilitado: !sel.habilitado }))} />
                </FilaSw>
                <FilaSw label="Producto genérico" micro="Lo que llega fuera del catálogo cae aquí.">
                  <Switch checked={!!sel.generico} bloqueado={sel.generico} onChange={() => !sel.generico && setConfGen(true)} />
                </FilaSw>
              </Sec>
            </div>

            <div style={rise(4)}>
              <Sec titulo="Precio">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--tp)' }}>Precio establecido</span>
                  <span style={{ fontSize: 12, color: 'var(--tt)' }}>Opcional</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, border: '1px solid var(--sec-bd)', background: 'var(--input-bg)' }}>
                  <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--tt)' }}>$</span>
                  <input value={(sel.precio || '').replace('$', '')} onChange={(e) => parche(sel.id, { precio: '$' + e.target.value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') })} placeholder="0"
                    style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 20, fontWeight: 700, outline: 'none', fontVariantNumeric: 'tabular-nums' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--tt)' }}>MXN</span>
                </div>
                <Micro>El campo vacío es el estado apagado: sin precio, el asistente no lo menciona.</Micro>
              </Sec>
            </div>
          </div>

          <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '14px 24px 20px', borderTop: '1px solid var(--divider)' }}>
            {panel.modo === 'edit' && !sel.generico && <BtnP onClick={() => setBorrar(true)}>Eliminar producto</BtnP>}
            <span style={{ flex: 1 }} />
            {panel.modo === 'new'
              ? <React.Fragment><BtnSec onClick={cerrar}>Descartar</BtnSec><BtnPrim onClick={crear}>Crear</BtnPrim></React.Fragment>
              : (sucio ? <BtnPrim onClick={() => { avisa('Cambios guardados'); cerrar(); }}>Guardar</BtnPrim> : <BtnSec onClick={cerrar}>Guardar</BtnSec>)}
          </div>

          {borrar && (
            <Overlay>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--tp)' }}>¿Eliminar {sel.sing}?</p>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--tt)' }}>Las oportunidades ya registradas conservan su etiqueta.</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 6, justifyContent: 'center' }}>
                <BtnPrim onClick={() => { setLista((l) => l.filter((p) => p.id !== sel.id)); setBorrar(false); setPanel(null); avisa(sel.sing + ' se eliminó del catálogo'); }}>Sí, eliminar</BtnPrim>
                <BtnSec onClick={() => setBorrar(false)}>Cancelar</BtnSec>
              </div>
            </Overlay>
          )}
          {confGen && (
            <Overlay>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--tp)' }}>¿Cambiar el producto genérico?</p>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--tt)' }}>El rol pasará de {(lista.find((p) => p.generico) || {}).sing || 'Consultas generales'} a {sel.sing}.</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 6, justifyContent: 'center' }}>
                <BtnPrim onClick={() => { setLista((l) => l.map((p) => ({ ...p, generico: p.id === sel.id }))); setConfGen(false); avisa('Genérico actualizado'); }}>Sí, cambiarlo</BtnPrim>
                <BtnSec onClick={() => setConfGen(false)}>Cancelar</BtnSec>
              </div>
            </Overlay>
          )}
        </aside>
      )}

      {toast && <Toast style={{ bottom: 22, zIndex: 70 }}>{toast}</Toast>}
    </div>
  );
}

function Overlay({ children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--panel-scrim)', backdropFilter: 'blur(10px) saturate(.9)', animation: 'ih-fade .2s ease-out both', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 340, width: '100%', display: 'flex', flexDirection: 'column', gap: 8, padding: 22, borderRadius: 20, background: 'var(--card)', border: '1px solid var(--divider)', boxShadow: 'var(--card-sh)', textAlign: 'center', animation: 'ih-up .22s cubic-bezier(0.34,1.2,0.64,1) both', boxSizing: 'border-box' }}>{children}</div>
    </div>
  );
}

const btnBase = { height: 38, borderRadius: 999, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flex: 'none' };
function BtnPrim({ children, onClick }) { return <button type="button" onClick={onClick} style={{ ...btnBase, padding: '0 18px', border: 'none', background: 'var(--btn-bg)', color: 'var(--btn-tx)' }}>{children}</button>; }
function BtnSec({ children, onClick }) {
  const [h, setH] = React.useState(false);
  return <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...btnBase, padding: '0 16px', border: '1px solid var(--sec-bd)', background: h ? 'var(--hover)' : 'transparent', color: 'var(--tp)' }}>{children}</button>;
}
function BtnP({ children, onClick }) {
  const [h, setH] = React.useState(false);
  return <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...btnBase, padding: '0 16px', border: '1px solid var(--sec-bd)', background: h ? 'var(--hover)' : 'transparent', color: 'var(--ts)' }}>{children}</button>;
}

function BtnNuevo({ onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 14px', borderRadius: 14, border: 'none', background: h ? 'var(--hover)' : 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, color: 'var(--tp)', textAlign: 'left', transition: 'background .15s ease-out' }}>
      <span style={{ flex: 'none', width: 22, height: 22, borderRadius: 999, border: '1px dashed var(--sec-bd)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--tt)' }}>+</span>
      Nuevo producto
    </button>
  );
}

function Fila({ p, activo, onEditar, onToggle }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onEditar} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', borderRadius: 14, borderBottom: '1px solid var(--divider)', background: activo ? 'var(--tonal)' : (hover ? 'var(--hover)' : 'transparent'), opacity: p.habilitado ? 1 : 0.55, cursor: 'pointer', transition: 'background .15s ease-out, opacity .2s ease-out' }}>
      <span style={{ flex: 'none', width: 30, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 9, background: 'var(--tonal)', color: 'var(--ts)' }}><Icon name={p.icono} size={16} /></span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, background: 'var(--chip-bg-' + p.chip + ')', color: 'var(--chip-tx)', fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap' }}>
          <span style={{ flex: 'none', width: 6, height: 6, borderRadius: 999, background: 'var(--chip-' + p.chip + ')' }} />{p.sing || p.nombre}
        </span>
        {p.generico && <Badge variant="outline">Genérico</Badge>}
      </span>
      <span style={{ flex: 1 }} />
      {p.precio && <span style={{ fontSize: 12, color: 'var(--ts)', fontVariantNumeric: 'tabular-nums' }}>{p.precio}</span>}
      <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--tp)', fontVariantNumeric: 'tabular-nums', width: 26, textAlign: 'right' }}>{p.oportunidades}</span>
      <span onClick={(e) => e.stopPropagation()} style={{ display: 'flex' }}><Switch size="fila" checked={p.habilitado} bloqueado={p.generico} onChange={onToggle} /></span>
    </div>
  );
}

function Sec({ titulo, children }) {
  return (
    <div>
      <p style={{ margin: '0 0 10px', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--tt)' }}>{titulo}</p>
      <div style={{ borderRadius: 16, background: 'var(--card)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  );
}
function Micro({ children }) { return <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.45, color: 'var(--tt)' }}>{children}</p>; }
function FilaSw({ label, micro, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: 'var(--tp)' }}>{label}</span>
        {children}
      </div>
      <Micro>{micro}</Micro>
    </div>
  );
}

Object.assign(window, { PantallaProductos });
})();
