/* GENERADO desde ui_kits/hotelero-escritorio — no editar a mano.
   Espera a que _ds_bundle.js registre el namespace y luego monta el mismo
   dashboard completo del UI kit. */
(function boot(){
  if(!window.IntraHoteleroDesignSystem_27a6ea || !window.React){ setTimeout(boot, 20); return; }
  const React = window.React;

/* ── datos.jsx ── */
/* Datos canónicos de Hampton Demo (propiedad estándar), extraídos 1:1 de
   V.E del prototipo. Hora del demo fija 9:41 AM. */

const CHIP = {
  Reserva: { color: 'var(--dot-reserva,#ABC4DB)', fondo: 'var(--chip-reserva,#F1EFE8)', icono: 'prod-cama' },
  Evento: { color: 'var(--dot-evento,#CEAB8E)', fondo: 'var(--chip-evento,#ECEAE3)', icono: 'prod-fiesta' },
  'Day Pass': { color: 'var(--dot-daypass,#D6B06E)', fondo: 'var(--chip-daypass,#F5F0E4)', icono: 'prod-sol' },
};
const chipDe = (p) => CHIP[p] || CHIP.Reserva;

const DATA = {
  hoy: { label: 'Hoy', frase: 'hoy', total: 4, delta: '33%', deltaVs: 'vs ayer', atendidas: 6, mensajes: 14,
    chips: [{ nombre: 'Reservas', n: 2 }, { nombre: 'Eventos', n: 1 }, { nombre: 'Day Pass', n: 1 }],
    grupos: [{ nombre: 'Tu campaña', n: 3, canales: [['Meta', 2], ['Google', 1]] }, { nombre: 'Orgánico', n: 1, canales: [['WhatsApp directo', 1]] }] },
  mes: { label: 'Este mes', frase: 'este mes', total: 22, delta: '22%', deltaVs: 'vs junio', atendidas: 34, mensajes: 128,
    chips: [{ nombre: 'Reservas', n: 12 }, { nombre: 'Eventos', n: 4 }, { nombre: 'Day Pass', n: 6 }],
    grupos: [{ nombre: 'Tu campaña', n: 18, canales: [['Meta', 14], ['Google', 3], ['WhatsApp', 1]] }, { nombre: 'Orgánico', n: 4, canales: [['WhatsApp directo', 2], ['Búsqueda', 2]] }] },
  junio: { label: 'Junio', frase: 'en junio', total: 18, delta: '6%', deltaVs: 'vs mayo', atendidas: 29, mensajes: 102,
    chips: [{ nombre: 'Reservas', n: 10 }, { nombre: 'Eventos', n: 3 }, { nombre: 'Day Pass', n: 5 }],
    grupos: [{ nombre: 'Tu campaña', n: 14, canales: [['Meta', 10], ['Google', 3], ['WhatsApp', 1]] }, { nombre: 'Orgánico', n: 4, canales: [['WhatsApp directo', 2], ['Búsqueda', 2]] }] },
  d90: { label: 'Últimos 90 días', frase: 'en 90 días', total: 61, delta: '31%', deltaVs: 'vs los 90 días anteriores', atendidas: 96, mensajes: 371,
    chips: [{ nombre: 'Reservas', n: 34 }, { nombre: 'Eventos', n: 11 }, { nombre: 'Day Pass', n: 16 }],
    grupos: [{ nombre: 'Tu campaña', n: 49, canales: [['Meta', 38], ['Google', 8], ['WhatsApp', 3]] }, { nombre: 'Orgánico', n: 12, canales: [['WhatsApp directo', 7], ['Búsqueda', 5]] }] },
};

const XL = {
  hoy: ['8 AM', '11 AM', '1 PM', '4 PM', 'ahora'],
  mes: ['1 jul', '8 jul', '16 jul', '24 jul', 'hoy'],
  junio: ['1 jun', '8 jun', '15 jun', '22 jun', '30 jun'],
  d90: ['abr', 'may', 'jun', 'jul', 'hoy'],
};
const RANGO = { hoy: 'hoy', mes: 'este mes', junio: 'mes pasado', d90: 'últimos 90 días' };

/* sparkSeries() del prototipo: 12 puntos deterministas que aterrizan en la
   cifra real del hero. */
function sparkSeries(periodo, end) {
  const d = DATA[periodo];
  const deltaPct = Math.max(0.06, (parseFloat(d.delta) || 15) / 100);
  const start = end / (1 + deltaPct * 2.2);
  const N = 12;
  let seed = 7 + periodo.length * 5 + Math.round(end * 3);
  const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const arr = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const base = start + (end - start) * Math.pow(t, 1.18);
    const amp = (end - start || end * 0.4) * 0.42 * (1 - t * 0.55);
    arr.push(Math.max(0, base + (rand() - 0.5) * amp));
  }
  arr[N - 1] = end;
  return arr;
}

/* Personas — PEND + ATT de V.E */
const PERSONAS = [
  { id: 'sofia', nombre: 'Sofía Delgado', producto: 'Reserva', contexto: '2 noches, llegada 12 ago · 2 adultos', rel: 'hace 2 h', tel: '+52 999 314 7208', estado: 'seguimiento' },
  { id: 'carlos', nombre: 'Carlos Ibarra', producto: 'Evento', contexto: 'Evento para 80 personas · presupuesto $180,000 validado', rel: 'anoche', tel: '+52 999 205 8841', estado: 'pendiente' },
  { id: 'renata', nombre: 'Renata Villaseñor', producto: 'Day Pass', contexto: 'Liga de pago enviada · 2 adultos', rel: 'anoche', tel: '+52 998 441 0923', estado: 'pendiente' },
  { id: 'ep4', nombre: 'Andrés Cauich', producto: 'Reserva', contexto: '3 noches, llegada 2 ago · Sin atender +24 h', rel: 'hace 2 días', urgente: true, estado: 'pendiente' },
  { id: 'ep5', nombre: 'Fernanda Solís', producto: 'Evento', contexto: 'Junta corporativa · 25 personas · Sin atender +24 h', rel: 'hace 2 días', urgente: true, estado: 'pendiente' },
  { id: 'ep7', nombre: 'Regina Castillo', producto: 'Reserva', contexto: '1 noche, fin de semana', rel: 'hace 4 h', estado: 'pendiente' },
  { id: 'mariana', nombre: 'Mariana Gutiérrez', producto: 'Evento', contexto: 'Cita jueves 11:00 AM · evento 60 personas', rel: 'hace 12 min', estado: 'atendido', stamp: '✓ Atendido · 9:15 AM', tel: '+52 999 187 3350' },
];

/* Citas de hoy (jue 16 jul) y de mañana, de V.E.CITAS */
const CITAS_HOY = [
  { id: 'carlos', hora: '9:00 AM', nombre: 'Carlos Ibarra', producto: 'Evento', contexto: 'Evento para 80 personas · presupuesto $180,000 validado', llego: 'Llegó anoche', estado: 'pendiente', urgente: true },
  { id: 'mariana', hora: '11:00 AM', nombre: 'Mariana Gutiérrez', producto: 'Evento', contexto: 'Cita jueves 11:00 AM · evento 60 personas', llego: 'Llegó hace 12 min', estado: 'atendido', stamp: '✓ Atendido · 9:15 AM' },
];
const CITAS_MANANA = [
  { id: 'sofia', hora: '10:00 AM', nombre: 'Sofía Delgado', producto: 'Reserva', contexto: '2 noches, llegada 12 ago · 2 adultos', llego: 'Llegó hace 2 h', estado: 'pendiente' },
  { id: 'ep5', hora: '1:00 PM', nombre: 'Fernanda Solís', producto: 'Evento', contexto: 'Junta corporativa · 25 personas', llego: 'Llegó hace 2 días', estado: 'pendiente' },
];

/* Últimos goles del asistente — los 3 hitos con gol=true de HOY + NOCHE */
const GOLES = [
  { t1: 'hace 12 min', pre: 'Cita confirmada:', texto: 'jueves 11:00 AM con Mariana Gutiérrez', producto: 'Evento' },
  { t1: '12:07 AM', pre: 'Presupuesto validado:', texto: '$180,000 para evento corporativo', producto: 'Evento' },
  { t1: '10:48 PM', pre: 'Day Pass:', texto: 'liga de pago enviada a Renata Villaseñor', producto: 'Day Pass' },
];

const RESUMEN_NOCHE = 'Tu asistente atendió a 4 personas y confirmó 1 cita.';

const CATALOGO = [
  { id: 1, nombre: 'Reservas', icono: 'prod-cama', chip: 1, oportunidades: 12, precio: '$2,400', habilitado: true },
  { id: 2, nombre: 'Eventos', icono: 'prod-fiesta', chip: 2, oportunidades: 4, precio: '$48,000', habilitado: true },
  { id: 3, nombre: 'Day Pass', icono: 'prod-sol', chip: 3, oportunidades: 6, precio: '$650', habilitado: true },
  { id: 4, nombre: 'Consultas generales', icono: 'prod-charola', chip: 5, oportunidades: 3, generico: true, habilitado: true },
];

const SUGERENCIAS = [
  '¿Cómo va julio contra junio?',
  '¿Quién falta por atender hoy?',
  '¿De dónde vienen mis oportunidades?',
  '¿Cuánto cobró el asistente este mes?',
];

const HISTORIAL = [
  { dia: 'Ayer', pares: [['6:12 PM', '¿Quién falta por atender hoy?', 'Quedan 6 personas por atender. Andrés Cauich y Fernanda Solís llevan más de 24 horas esperando.']] },
  { dia: 'Hoy', pares: [['9:40 AM', '¿Cómo va julio contra junio?', '22 oportunidades reales en lo que va del mes, 22% arriba de junio. Reservas es lo que más creció.']] },
];



/* V.E.CITAS — julio 2026. Hoy = jue 16. */
const CITAS_MES = [
  { id:'agE2', dia:3,  hora:'10:25 AM', nombre:'Alejandro Baeza',   producto:'Reserva', estado:'atendido', stamp:'✓ Atendido · 10:25 AM' },
  { id:'agE1', dia:13, hora:'12:00 PM', nombre:'Valentina Rosado',  producto:'Evento',  estado:'atendido', stamp:'✓ Atendido · 12:40 PM' },
  { id:'carlos', dia:16, hora:'9:00 AM',  nombre:'Carlos Ibarra',     producto:'Evento',  estado:'pendiente', urgente:true },
  { id:'mariana', dia:16, hora:'11:00 AM', nombre:'Mariana Gutiérrez', producto:'Evento', estado:'atendido', stamp:'✓ Atendido · 9:15 AM' },
  { id:'sofia', dia:17, hora:'10:00 AM', nombre:'Sofía Delgado',     producto:'Reserva', estado:'pendiente' },
  { id:'ep5',  dia:17, hora:'1:00 PM',  nombre:'Fernanda Solís',    producto:'Evento',  estado:'pendiente' },
  { id:'ep4',  dia:20, hora:'11:30 AM', nombre:'Andrés Cauich',     producto:'Reserva', estado:'pendiente' },
  { id:'ep7',  dia:21, hora:'4:00 PM',  nombre:'Regina Castillo',   producto:'Reserva', estado:'pendiente' },
  { id:'agE3', dia:23, hora:'12:00 PM', nombre:'Paulina Escalante', producto:'Evento',  estado:'pendiente' },
  { id:'agE4', dia:28, hora:'11:00 AM', nombre:'Diego Manrique',    producto:'Reserva', estado:'pendiente' }
];
const CTX_CITA = {
  carlos:'Evento para 80 personas · presupuesto $180,000 validado',
  mariana:'Cita jueves 11:00 AM · evento 60 personas',
  sofia:'2 noches, llegada 12 ago · 2 adultos',
  ep5:'Junta corporativa · 25 personas',
  ep4:'3 noches, llegada 2 ago',
  ep7:'1 noche, fin de semana',
  agE1:'Evento social · 60 personas',
  agE2:'3 noches, llegada 9 ago',
  agE3:'Cumpleaños · 40 personas',
  agE4:'2 noches, fin de semana'
};



/* spkFecha() del prototipo: la fecha que muestra el tooltip por punto. */
function spkFechas(periodo, N) {
  const out = [];
  for (let i = 0; i < N; i++) {
    const ult = i === N - 1;
    if (periodo === 'hoy') { out.push(['8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','ahora'][i] || 'ahora'); continue; }
    if (periodo === 'd90') { out.push(ult ? 'hoy' : ['abr','abr','abr','may','may','may','jun','jun','jun','jul','jul'][i]); continue; }
    const mes = periodo === 'junio' ? 'jun' : 'jul';
    if (ult) { out.push(periodo === 'junio' ? '30 jun' : 'hoy'); continue; }
    out.push((1 + Math.round(i * 29 / (N - 1))) + ' ' + mes);
  }
  return out;
}


const PFOPTS = ['Todos', 'Reserva', 'Evento', 'Day Pass'];
const SFLBL = { pend: 'Por atender', seg: 'En seguimiento', att: 'Atendidas' };

/* Feed completo de Actividad, agrupado por día. El grupo "night" es el
   contenedor "Mientras dormías". FOPTS filtra sobre estos items. */
const FOPTS = ['Todo', 'Mientras dormías', 'Reservas', 'Eventos', 'Day Pass', 'Confirmados'];

const FEED_DIAS = [
  { titulo: 'Hoy', items: [
    { t1:'hace 12 min', gol:true, pre:'Cita confirmada:', rest:'jueves 11:00 AM con Mariana Gutiérrez', producto:'Evento' },
    { t1:'8:52 AM', pre:'Respondió a', rest:'Sofía Delgado sobre disponibilidad de suite', producto:'Reserva', seg:'12 seg' },
    { t1:'8:20 AM', pre:'Respondió a', rest:'Regina Castillo sobre tarifas de fin de semana', producto:'Reserva', seg:'8 seg' },
    { t1:'7:41 AM', pre:'Seguimiento enviado a', rest:'Andrés Cauich — segundo intento', producto:'Reserva', seg:'15 seg' },
  ] },
  { titulo: 'Anoche', night: true, resumen: 'Tu asistente atendió a 4 personas y confirmó 1 cita.', items: [
    { t1:'12:07 AM', t2:'anoche', gol:true, pre:'Presupuesto validado:', rest:'$180,000 para evento corporativo', producto:'Evento' },
    { t1:'10:48 PM', t2:'anoche', gol:true, pre:'Day Pass:', rest:'liga de pago enviada a Renata Villaseñor', producto:'Day Pass' },
    { t1:'10:12 PM', t2:'anoche', pre:'Respondió a', rest:'Carlos Ibarra sobre capacidad del salón', producto:'Evento', seg:'9 seg' },
    { t1:'9:35 PM', t2:'anoche', pre:'Respondió a', rest:'Miguel Tun sobre horarios de Day Pass', producto:'Day Pass', seg:'11 seg' },
  ] },
  { titulo: 'Ayer', items: [
    { t1:'6:40 PM', pre:'Respondió a', rest:'Fernanda Solís sobre menú de junta corporativa', producto:'Evento', seg:'14 seg' },
    { t1:'3:12 PM', gol:true, pre:'Cita confirmada:', rest:'viernes 1:00 PM con Fernanda Solís', producto:'Evento' },
    { t1:'11:05 AM', pre:'Respondió a', rest:'Alejandro Baeza sobre check-in temprano', producto:'Reserva', seg:'7 seg' },
  ] },
];

/* Historial — REP_DATA del prototipo (14 citas) */
const REP_DATA = [
  { pid:'r1', n:'Ricardo Osorio', tel:'999 ··· 41 28', tipo:'Boda', prod:'Evento', fechaEv:'14 mar 2027', personas:150, presu:180000, llego:'21 jul · 10:12', vel:38, resol:'curso', dias:2 },
  { pid:'r2', n:'María Pech', tel:'999 ··· 88 03', tipo:'Reserva estancia', prod:'Reserva', fechaEv:'2 ago 2026', personas:2, presu:4600, llego:'21 jul · 08:55', vel:6, resol:'si', monto:4820, dias:1 },
  { pid:'r3', n:'Jorge Canul', tel:'999 ··· 15 77', tipo:'Day Pass', prod:'Day Pass', fechaEv:'26 jul 2026', personas:4, presu:2400, llego:'20 jul · 17:40', vel:108, resol:'si', monto:2400, dias:1 },
  { pid:'r4', n:'Fernanda Solís', tel:'999 ··· 62 90', tipo:'XV años', prod:'Evento', fechaEv:'9 nov 2026', personas:90, presu:96000, llego:'19 jul · 12:03', vel:312, resol:'curso', dias:4 },
  { pid:'r5', n:'Andrés Cauich', tel:'999 ··· 30 46', tipo:'Reserva estancia', prod:'Reserva', fechaEv:'30 jul 2026', personas:3, presu:5100, llego:'19 jul · 09:26', vel:12, resol:'no', motivo:'Eligió otra opción', dias:1 },
  { pid:'r6', n:'Daniela Uc', tel:'999 ··· 74 19', tipo:'Corporativo', prod:'Evento', fechaEv:'18 sep 2026', personas:40, presu:64000, llego:'18 jul · 15:11', vel:22, resol:'si', monto:71500, dias:3 },
  { pid:'r7', n:'Héctor Balam', tel:'999 ··· 52 84', tipo:'Reserva estancia', prod:'Reserva', fechaEv:'24 jul 2026', personas:2, presu:3800, llego:'18 jul · 11:47', vel:41, resol:'no', motivo:'No contestó', dias:2 },
  { pid:'r8', n:'Gabriela Novelo', tel:'999 ··· 09 31', tipo:'Day Pass', prod:'Day Pass', fechaEv:'27 jul 2026', personas:6, presu:3600, llego:'17 jul · 13:29', vel:15, resol:'si', monto:3600, dias:1 },
  { pid:'r9', n:'Raúl Cámara', tel:'999 ··· 47 65', tipo:'Reserva estancia', prod:'Reserva', fechaEv:'12 ago 2026', personas:4, presu:8900, llego:'16 jul · 10:05', vel:156, resol:'curso', dias:7 },
  { pid:'r10', n:'Regina Castillo', tel:'999 ··· 28 50', tipo:'Boda', prod:'Evento', fechaEv:'21 feb 2027', personas:120, presu:150000, llego:'15 jul · 18:22', vel:18, resol:'curso', dias:8 },
  { pid:'r11', n:'Óscar Dzul', tel:'999 ··· 93 12', tipo:'Reserva estancia', prod:'Reserva', fechaEv:'22 jul 2026', personas:1, presu:2100, llego:'14 jul · 09:14', vel:390, resol:'no', motivo:'Se reagendó', dias:3 },
  { pid:'r12', n:'María Cocom', tel:'999 ··· 66 08', tipo:'Day Pass', prod:'Day Pass', fechaEv:'20 jul 2026', personas:3, presu:1800, llego:'13 jul · 16:38', vel:25, resol:'si', monto:1800, dias:1 },
  { pid:'r13', n:'Iván Chi', tel:'999 ··· 21 73', tipo:'Reserva estancia', prod:'Reserva', fechaEv:'5 ago 2026', personas:2, presu:4200, llego:'12 jul · 11:52', vel:55, resol:'no', motivo:'Fuera de presupuesto', dias:4 },
  { pid:'r14', n:'Miguel Tun', tel:'999 ··· 84 37', tipo:'Corporativo', prod:'Evento', fechaEv:'2 oct 2026', personas:60, presu:88000, llego:'11 jul · 14:07', vel:66, resol:'curso', dias:12 }
];

const USUARIO = { iniciales: 'MR', nombre: 'Marcela Ríos', rol: 'Administradora' };

Object.assign(window, { CHIP, chipDe, DATA, XL, RANGO, sparkSeries, PERSONAS, CITAS_HOY, CITAS_MANANA, GOLES, RESUMEN_NOCHE, CATALOGO, SUGERENCIAS, HISTORIAL, REP_DATA, CITAS_MES, CTX_CITA, FOPTS, PFOPTS, SFLBL, FEED_DIAS, USUARIO, useCountUp, spkFechas });

/* animateTo() del prototipo: count-up con easing cúbico. 650ms al montar,
   420ms al cambiar de filtro o periodo. Respeta prefers-reduced-motion. */
function useCountUp(target, dur) {
  const reduced = React.useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [n, setN] = React.useState(reduced.current ? target : 0);
  const from = React.useRef(reduced.current ? target : 0);
  const raf = React.useRef(0);
  React.useEffect(() => {
    if (reduced.current) { from.current = target; setN(target); return undefined; }
    const t0 = performance.now(); const ini = from.current;
    cancelAnimationFrame(raf.current);
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const val = Math.round(ini + (target - ini) * (1 - Math.pow(1 - k, 3)));
      from.current = val; setN(val);
      if (k < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, dur]);
  return n;
}
window.useCountUp = useCountUp;


/* ── PantallaInicio.jsx ── */
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


/* ── PantallaPersonas.jsx ── */
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


/* ── PantallaAgenda.jsx ── */
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


/* ── PantallaProductos.jsx ── */
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


/* ── PantallaHistorial.jsx ── */
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


/* ── PantallaPreguntar.jsx ── */
(() => {
const { Presencia, PillFecha } = window.IntraHoteleroDesignSystem_27a6ea;

/* Preguntar · escritorio. El empty state (Presencia 190 + wordmark 116×29 +
   sugerencias) se desvanece al enviar y no regresa hasta limpiar el chat.
   La respuesta se escribe palabra por palabra; mientras piensa, el dot verde
   late a 1.1s y el halo iridiscente roza las 4 orillas del lienzo. */
const CH_SUGS = [
  '¿Cuántas bodas trajimos este mes?',
  '¿Qué día de la semana atendemos más rápido?',
  '¿Cuánto vale una oportunidad de Eventos vs Reservas?',
  '¿Quién no ha atendido sus oportunidades?',
];
const CH_QA = [
  ['bodas', 'De las 4 oportunidades de Eventos de julio, 2 son bodas. La más grande — Ricardo Osorio, 150 personas — vale ≈ $180,000 MXN y sigue sin atender desde hace 2 días.'],
  ['día', 'Los martes. El equipo responde en 18 minutos en promedio; los domingos tarda 4 horas. Tu asistente responde en 12 segundos todos los días.'],
  ['vale', 'Una oportunidad de Eventos vale ≈ $96,000 MXN y una de Reservas ≈ $4,600. Eventos convierte menos, pero cada cierre pesa 20 veces más.'],
  ['atendido', 'Quedan 6 personas por atender. Andrés Cauich y Fernanda Solís llevan más de 24 horas esperando.'],
];
const responder = (q) => {
  const l = q.toLowerCase();
  const hit = CH_QA.find(([k]) => l.includes(k));
  return hit ? hit[1] : '22 oportunidades reales en lo que va del mes, 22% arriba de junio. Reservas es lo que más creció.';
};

function PantallaPreguntar({ base, setPensando }) {
  const [txt, setTxt] = React.useState('');
  const [msgs, setMsgs] = React.useState([]);
  const [think, setThink] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [hist, setHist] = React.useState(false);
  const tT = React.useRef(0); const tI = React.useRef(0);
  React.useEffect(() => () => { clearTimeout(tT.current); clearInterval(tI.current); }, []);
  React.useEffect(() => { if (setPensando) setPensando(think); }, [think, setPensando]);

  const limpiar = () => { clearTimeout(tT.current); clearInterval(tI.current); setMsgs([]); setThink(false); setTyping(false); setTxt(''); setHist(false); };

  const enviar = (q) => {
    const p = (q || txt).trim();
    if (!p || think || typing) return;
    setTxt(''); setMsgs((m) => [...m, { u: true, text: p }]); setThink(true);
    clearTimeout(tT.current);
    tT.current = setTimeout(() => {
      const ans = responder(p);
      setThink(false); setTyping(true);
      setMsgs((m) => [...m, { a: true, shown: '' }]);
      const words = ans.split(' ');
      let i = 0;
      clearInterval(tI.current);
      tI.current = setInterval(() => {
        i += 1;
        setMsgs((m) => { const n = [...m]; n[n.length - 1] = { a: true, shown: words.slice(0, i).join(' ') }; return n; });
        if (i >= words.length) { clearInterval(tI.current); setTyping(false); }
      }, 42);
    }, 1500);
  };

  const empty = msgs.length === 0;

  return (
    <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', animation: 'ih-rise .32s cubic-bezier(0.22,0.61,0.36,1) both' }}>
      {(msgs.length > 0 || hist) && (
        <button type="button" onClick={limpiar} title="Nuevo chat"
          style={{ position: 'absolute', top: 14, right: 24, zIndex: 4, display: 'inline-flex', alignItems: 'center', gap: 7, height: 34, padding: '0 14px', borderRadius: 999, border: '1px solid var(--sec-bd)', background: 'var(--card)', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', animation: 'ih-pop .2s ease-out both' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>Nuevo chat
        </button>
      )}
      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        {hist ? (
          <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, padding: '20px 24px 12px', maxWidth: 720, margin: '0 auto', width: '100%', boxSizing: 'border-box', animation: 'ih-rise .32s cubic-bezier(0.22,0.61,0.36,1) both' }}>
            {window.HISTORIAL.map((g, gi) => (
              <React.Fragment key={g.dia}>
                <div style={{ animation: 'ih-up .34s cubic-bezier(0.34,1.2,0.64,1) ' + (gi * 90) + 'ms both' }}><PillFecha>{g.dia}</PillFecha></div>
                {g.pares.map((p, pi) => (
                  <React.Fragment key={p[0]}>
                    <div style={{ alignSelf: 'flex-end', maxWidth: '70%', background: 'var(--card)', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 14, lineHeight: 1.45, color: 'var(--tp)', display: 'flex', alignItems: 'baseline', gap: 8, animation: 'ih-up .34s cubic-bezier(0.34,1.2,0.64,1) ' + (gi * 90 + pi * 60 + 60) + 'ms both' }}>
                      {p[1]}<span style={{ flex: 'none', fontSize: 10, fontVariantNumeric: 'tabular-nums', color: 'var(--tt)' }}>{p[0]}</span>
                    </div>
                    <div style={{ alignSelf: 'flex-start', maxWidth: '86%', display: 'flex', gap: 9, animation: 'ih-up .34s cubic-bezier(0.34,1.2,0.64,1) ' + (gi * 90 + pi * 60 + 130) + 'ms both' }}>
                      <span style={{ flex: 'none', width: 6, height: 6, borderRadius: 999, background: 'var(--verde)', marginTop: 7 }} />
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--tp)', textWrap: 'pretty' }}>{p[2]}</p>
                    </div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <React.Fragment>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', opacity: empty ? 1 : 0, transform: empty ? 'none' : 'translateY(-10px)', pointerEvents: empty ? 'auto' : 'none', transition: 'opacity .45s ease-out, transform .45s ease-out' }}>
              <div style={{ marginBottom: 26 }}><Presencia size={190} /></div>
              <span style={{ position: 'relative', width: 116, height: 29, display: 'inline-block' }}>
                <img src={base + '/wordmark-dark.png'} alt="intra" style={{ position: 'absolute', inset: 0, width: 116, height: 29, objectFit: 'contain', opacity: 'var(--iso-dark-op,1)' }} />
                <img src={base + '/wordmark-light.png'} alt="" style={{ position: 'absolute', inset: 0, width: 116, height: 29, objectFit: 'contain', opacity: 'var(--iso-light-op,0)' }} />
              </span>
              <span style={{ marginTop: 8, fontSize: 11, fontWeight: 600, letterSpacing: '.34em', textTransform: 'uppercase', color: 'var(--wm-sub)' }}>intelligence</span>
              <span style={{ marginTop: 14, fontSize: 13, color: 'var(--ts)', textAlign: 'center' }}>Pregunta lo que quieras sobre Hampton Demo.</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 30, width: '100%', maxWidth: 660 }}>
                {CH_SUGS.map((q) => <Sug key={q} onClick={() => enviar(q)}>{q}</Sug>)}
              </div>
            </div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', opacity: empty ? 0 : 1, transform: empty ? 'translateY(10px)' : 'none', pointerEvents: empty ? 'none' : 'auto', transition: 'opacity .35s ease-out, transform .35s ease-out' }}>
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 14, maxWidth: 760, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                {msgs.map((m, i) => (m.u ? (
                  <div key={i} style={{ alignSelf: 'flex-end', maxWidth: '70%', background: 'var(--card)', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 14, lineHeight: 1.45, color: 'var(--tp)' }}>{m.text}</div>
                ) : (
                  <div key={i} style={{ alignSelf: 'flex-start', maxWidth: '86%', display: 'flex', gap: 9 }}>
                    <span style={{ flex: 'none', width: 6, height: 6, borderRadius: 999, background: 'var(--verde)', marginTop: 7 }} />
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--tp)', fontVariantNumeric: 'tabular-nums', textWrap: 'pretty' }}>{m.shown}</p>
                  </div>
                )))}
                {think && (
                  <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 9, alignItems: 'center' }}>
                    <span style={{ flex: 'none', width: 6, height: 6, borderRadius: 999, background: 'var(--verde)', animation: 'ih-pulse 1.1s cubic-bezier(0.22,1,0.36,1) infinite' }} />
                    <span style={{ fontSize: 13, color: 'var(--tt)' }}>pensando…</span>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>

      <div style={{ position: 'relative', display: 'flex', gap: 10, alignItems: 'center', width: '100%', maxWidth: 720, margin: '0 auto', boxSizing: 'border-box', padding: '0 16px 10px' }}>
        <input value={txt} onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') enviar(); }}
          placeholder="Pregunta lo que quieras…"
          style={{ flex: 1, boxSizing: 'border-box', height: 48, padding: '0 18px', borderRadius: 999, border: '1px solid rgba(20,16,8,.12)', background: 'var(--input-bg)', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 14, outline: 'none', transition: 'border-color .2s ease-out' }} />
        <Redondo activo={!!txt.trim()} onClick={() => enviar()} title="Enviar">↑</Redondo>
        <Redondo activo={hist} onClick={() => setHist((v) => !v)} title={hist ? 'Cerrar historial' : 'Historial'}>
          <svg width="19" height="19" viewBox="0 0 103.98 104" fill="currentColor" style={{ flex: 'none' }}><path d="M51.98,0C33.24,0,16.81,11.51,8.11,24.31c.17-3.48.58-7.66,1.19-11.71.33-2.18-1.17-4.22-3.35-4.55-2.19-.33-4.22,1.17-4.55,3.35-2.18,14.36-1.8,23.13,1.13,26.06,1.68,1.68,5.28,2.52,10.76,2.52,4.07,0,9.18-.46,15.3-1.39,2.18-.33,3.69-2.37,3.35-4.55s-2.37-3.69-4.55-3.35c-5.25.8-10.7,1.24-14.58,1.28,6.72-12.23,22.32-23.95,39.19-23.95,24.26,0,44,19.74,44,44s-19.74,44-44,44c-18.7,0-35.4-11.86-41.56-29.5-.73-2.09-3.01-3.19-5.09-2.46-2.09.73-3.19,3.01-2.46,5.09,7.27,20.85,27.01,34.87,49.11,34.87,28.67,0,52-23.33,52-52S80.66,0,51.98,0Z M51.98,21.33c-2.21,0-4,1.79-4,4v26.67c0,1.34.67,2.59,1.78,3.33l16,10.67c.68.46,1.45.67,2.21.67,1.29,0,2.56-.62,3.33-1.78,1.23-1.84.73-4.32-1.11-5.55l-14.22-9.48v-24.53c0-2.21-1.79-4-4-4Z" /></svg>
        </Redondo>
      </div>
      <p style={{ margin: '0 0 14px', textAlign: 'center', fontSize: 11, lineHeight: 1.4, color: 'var(--tt)' }}>intra intelligence es una IA y puede cometer errores. Por favor, compruebe sus respuestas</p>
    </div>
  );
}

function Sug({ children, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ padding: '9px 18px', borderRadius: 999, border: '1px solid var(--sec-bd)', background: h ? 'var(--tonal)' : 'transparent', fontFamily: 'inherit', fontSize: 12.5, color: 'var(--ts)', cursor: 'pointer', transition: 'background .15s ease-out', textAlign: 'center', whiteSpace: 'nowrap' }}>{children}</button>
  );
}

function Redondo({ children, activo, onClick, title }) {
  const [p, setP] = React.useState(false);
  return (
    <button type="button" title={title} onClick={onClick}
      onPointerDown={() => setP(true)} onPointerUp={() => setP(false)} onPointerLeave={() => setP(false)}
      style={{ flex: 'none', width: 48, height: 48, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, border: 'none', background: activo ? 'var(--btn-bg)' : 'var(--tonal)', color: activo ? 'var(--btn-tx)' : 'var(--tt)', fontSize: 18, cursor: 'pointer', transform: p ? 'scale(0.94)' : 'scale(1)', transition: 'background .2s ease-out, color .2s ease-out, transform .12s ease-out' }}>{children}</button>
  );
}

Object.assign(window, { PantallaPreguntar });
})();


/* ── shell (index.html) ── */
(() => {

const { NavLateral, Ambiente, Icon, PanelDetalle, BotonAtender, BotonesResolver, FeedItem, HaloPensando } = window.IntraHoteleroDesignSystem_27a6ea;
const BASE = '../../assets/logos';
const NAV = [
  {id:'inicio',label:'Inicio',icono:'inicio'},
  {id:'personas',label:'Personas',icono:'personas',conteo:6},
  {id:'agenda',label:'Agenda',icono:'agenda',conteo:2},
  {id:'historial',label:'Historial',icono:'historial'},
  {id:'productos',label:'Productos',icono:'productos',conteo:4},
  {id:'preguntar',label:'Preguntar',icono:'preguntar'},
];
const ICO_TEMA={auto:'amanecer',dia:'amanecer',tarde:'atardecer',noche:'noche'};
const NOM_TEMA={dia:'Amanecer',tarde:'Atardecer',noche:'Noche'};
const CICLO=['auto','dia','tarde','noche'];
function temaPorHora(){const h=new Date().getHours();return h>=20||h<6?'noche':(h>=17?'tarde':'dia');}

/* Botón de modo — vive al pie del nav lateral (gnMode), no arriba a la derecha. */
function BotonModo({modo,tema,onChange,colapsado}){
  const [hover,setHover]=React.useState(false);
  return (
    <button type="button" title="Cambiar modo" onClick={()=>onChange(CICLO[(CICLO.indexOf(modo)+1)%CICLO.length])}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{display:'flex',alignItems:'center',justifyContent:'flex-start',gap:10,width:colapsado?44:'100%',boxSizing:'border-box',padding:12,border:'none',borderRadius:colapsado?14:12,background:hover?'var(--tonal)':'transparent',color:'var(--ts)',cursor:'pointer',fontFamily:'inherit',overflow:'hidden'}}>
      <Icon name={ICO_TEMA[modo]} size={18} />
      <span style={{fontSize:13,fontWeight:500,whiteSpace:'nowrap',overflow:'hidden',color:'var(--ts)',opacity:colapsado?0:1,maxWidth:colapsado?0:160,transition:'opacity .2s ease, max-width .35s ease'}}>{NOM_TEMA[tema]}</span>
    </button>
  );
}

function App(){
  const [vista,setVista]=React.useState('inicio');
  const [modo,setModo]=React.useState('auto');
  const [colapsado,setColapsado]=React.useState(false);
  const [periodo,setPeriodo]=React.useState('mes');
  const [flujo,setFlujo]=React.useState({});
  const [detalle,setDetalle]=React.useState(null);
  const [pensando,setPensando]=React.useState(false);
  const tema = modo==='auto'?temaPorHora():modo;

  const atender=(id)=>setFlujo(f=>({...f,[id]:'seguimiento'}));
  const resolver=(id,estado)=>setFlujo(f=>({...f,[id]:estado,[id+'_stamp']:estado==='atendido'?'✓ Confirmado · 9:41 AM':'No confirmado'}));
  const abrirDetalle=(p)=>setDetalle(p);
  React.useEffect(()=>{setDetalle(null);},[vista]);

  const chip = detalle ? window.chipDe(detalle.producto) : null;
  const estado = detalle ? (flujo[detalle.id]||detalle.estado) : null;

  return (
    <div data-tema={tema} style={{position:'relative',flex:'none',width:1440,height:900,display:'flex',borderRadius:24,overflow:'hidden',background:'#060607',color:'var(--tp)',fontFamily:'var(--font-sans)',boxShadow:'0 40px 90px -40px rgba(20,16,8,.55)'}}>
      <Ambiente tema={tema} />
      <HaloPensando activo={pensando} />
      <NavLateral hotel="Hampton Demo" items={NAV} activo={vista} onSelect={setVista} base={BASE}
        colapsado={colapsado} onColapsar={()=>setColapsado(v=>!v)}
        modo={<BotonModo modo={modo} tema={tema} onChange={setModo} colapsado={colapsado} />}
        usuario={window.USUARIO}
        style={{zIndex:2}} />
      <main style={{position:'relative',zIndex:1,flex:1,minWidth:0,display:'flex',minHeight:0}}>
        <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',minHeight:0}}>
          {vista==='inicio' && <window.PantallaInicio periodo={periodo} setPeriodo={setPeriodo} tema={tema} irPersonas={()=>setVista('personas')} irAgenda={()=>setVista('agenda')} abrirDetalle={abrirDetalle} />}
          {vista==='personas' && <window.PantallaPersonas flujo={flujo} atender={atender} resolver={resolver} abrirDetalle={abrirDetalle} />}
          {vista==='agenda' && <window.PantallaAgenda flujo={flujo} atender={atender} resolver={resolver} abrirDetalle={abrirDetalle} />}
          {vista==='productos' && <window.PantallaProductos />}
          {vista==='historial' && <window.PantallaHistorial abrirDetalle={abrirDetalle} />}
          {vista==='preguntar' && <window.PantallaPreguntar base={BASE} setPensando={setPensando} />}
        </div>
        {detalle && (
          <PanelDetalle nombre={detalle.nombre} producto={detalle.producto} productoColor={chip.color} productoFondo={chip.fondo}
            onCerrar={()=>setDetalle(null)}
            campos={[
              {k:'Producto',v:detalle.producto},
              {k:'Teléfono',v:detalle.tel||'+52 999 318 4402'},
              {k:'Llegó',v:detalle.llego||detalle.rel||'hace 9 min'},
              detalle.hora?{k:'Cita',v:'Jue 16 jul · '+detalle.hora}:null,
            ].filter(Boolean)}
            acciones={estado==='pendiente'
              ? <BotonAtender onClick={()=>atender(detalle.id)} />
              : estado==='seguimiento'
                ? <BotonesResolver onSi={()=>resolver(detalle.id,'atendido')} onNo={()=>resolver(detalle.id,'no-confirmado')} />
                : <span style={{fontSize:12,fontWeight:600,color:'var(--verde-tx)'}}>{flujo[detalle.id+'_stamp']||detalle.stamp}</span>}>
            <p style={{margin:'10px 0 0',fontSize:10.5,fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--tt)'}}>Lo que pasó</p>
            <div style={{borderRadius:16,background:'var(--card)',padding:'6px 14px'}}>
              <FeedItem colTiempo={76} t1="hace 9 min" texto="Llegó por la campaña de Meta Ads." />
              <FeedItem colTiempo={76} t1="hace 8 min" texto="El asistente respondió y validó presupuesto." />
              <FeedItem colTiempo={76} t1="hace 6 min" gol pre="Cita confirmada:" texto="jueves 11:00 AM." />
            </div>
          </PanelDetalle>
        )}
      </main>
    </div>
  );
}


window.AppIntraEscritorio = App;
})();
})();
