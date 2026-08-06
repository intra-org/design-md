/* GENERADO desde ui_kits/hotelero-movil — no editar a mano.
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


/* ── LoginM.jsx ── */
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


/* ── InicioM.jsx ── */
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


/* ── PersonasM.jsx ── */
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


/* ── AgendaM.jsx ── */
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


/* ── PreguntarM.jsx ── */
(() => {
const { Presencia, PillFecha } = window.IntraHoteleroDesignSystem_27a6ea;

/* Preguntar · móvil — mismas 4 sugerencias, wordmark y escritura palabra por
   palabra que en escritorio; el input queda anclado al fondo y la tab bar no
   se contrae en esta pestaña. */
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

function PreguntarM({ base, setPensando, hotel }) {
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

  const empty = msgs.length === 0 && !hist;

  return (
    <div style={{ position: 'relative', zIndex: 1, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      {(msgs.length > 0 || hist) && (
        <button type="button" onClick={limpiar} title="Nuevo chat"
          style={{ position: 'absolute', top: 4, right: 20, zIndex: 4, display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, border: '1px solid var(--sec-bd)', background: 'var(--card)', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer', animation: 'ih-pop .2s ease-out both' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>Nuevo chat
        </button>
      )}
      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        {hist ? (
          <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, padding: '16px 20px 12px' }}>
            {window.HISTORIAL.map((g) => (
              <React.Fragment key={g.dia}>
                <PillFecha>{g.dia}</PillFecha>
                {g.pares.map((p) => (
                  <React.Fragment key={p[0]}>
                    <div style={{ alignSelf: 'flex-end', maxWidth: '80%', background: 'var(--card)', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 14, lineHeight: 1.45, color: 'var(--tp)', display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      {p[1]}<span style={{ flex: 'none', fontSize: 10, fontVariantNumeric: 'tabular-nums', color: 'var(--tt)' }}>{p[0]}</span>
                    </div>
                    <div style={{ alignSelf: 'flex-start', maxWidth: '90%', display: 'flex', gap: 9 }}>
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
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '28px 24px 0', opacity: empty ? 1 : 0, transform: empty ? 'none' : 'translateY(-10px)', pointerEvents: empty ? 'auto' : 'none', transition: 'opacity .45s ease-out, transform .45s ease-out' }}>
              <div style={{ marginBottom: 22 }}><Presencia size={150} /></div>
              <span style={{ position: 'relative', width: 100, height: 25, display: 'inline-block' }}>
                <img src={base + '/wordmark-dark.png'} alt="intra" style={{ position: 'absolute', inset: 0, width: 100, height: 25, objectFit: 'contain', opacity: 'var(--iso-dark-op,1)' }} />
                <img src={base + '/wordmark-light.png'} alt="" style={{ position: 'absolute', inset: 0, width: 100, height: 25, objectFit: 'contain', opacity: 'var(--iso-light-op,0)' }} />
              </span>
              <span style={{ marginTop: 8, fontSize: 10, fontWeight: 600, letterSpacing: '.34em', textTransform: 'uppercase', color: 'var(--wm-sub)' }}>intelligence</span>
              <span style={{ marginTop: 14, fontSize: 13, color: 'var(--ts)', textAlign: 'center' }}>Pregunta lo que quieras sobre {hotel || 'Hampton Demo'}.</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 28, alignItems: 'center', width: '100%' }}>
                {CH_SUGS.map((q) => <Sug key={q} onClick={() => enviar(q)}>{q}</Sug>)}
              </div>
            </div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', opacity: empty ? 0 : 1, transform: empty ? 'translateY(10px)' : 'none', pointerEvents: empty ? 'none' : 'auto', transition: 'opacity .35s ease-out, transform .35s ease-out' }}>
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 14 }}>
                {msgs.map((m, i) => (m.u ? (
                  <div key={i} style={{ alignSelf: 'flex-end', maxWidth: '80%', background: 'var(--card)', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', fontSize: 14, lineHeight: 1.45, color: 'var(--tp)' }}>{m.text}</div>
                ) : (
                  <div key={i} style={{ alignSelf: 'flex-start', maxWidth: '90%', display: 'flex', gap: 9 }}>
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

      <div style={{ flex: 'none', display: 'flex', gap: 8, alignItems: 'center', padding: '0 20px 6px' }}>
        <input value={txt} onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') enviar(); }}
          placeholder="Pregunta lo que quieras…"
          style={{ flex: 1, minWidth: 0, boxSizing: 'border-box', height: 48, padding: '0 18px', borderRadius: 999, border: '1px solid rgba(20,16,8,.12)', background: 'var(--input-bg)', color: 'var(--tp)', fontFamily: 'inherit', fontSize: 14, outline: 'none' }} />
        <Redondo activo={!!txt.trim()} onClick={() => enviar()} title="Enviar">↑</Redondo>
        <Redondo activo={hist} onClick={() => setHist((v) => !v)} title={hist ? 'Cerrar historial' : 'Historial'}>
          <svg width="18" height="18" viewBox="0 0 103.98 104" fill="currentColor" style={{ flex: 'none' }}><path d="M51.98,0C33.24,0,16.81,11.51,8.11,24.31c.17-3.48.58-7.66,1.19-11.71.33-2.18-1.17-4.22-3.35-4.55-2.19-.33-4.22,1.17-4.55,3.35-2.18,14.36-1.8,23.13,1.13,26.06,1.68,1.68,5.28,2.52,10.76,2.52,4.07,0,9.18-.46,15.3-1.39,2.18-.33,3.69-2.37,3.35-4.55s-2.37-3.69-4.55-3.35c-5.25.8-10.7,1.24-14.58,1.28,6.72-12.23,22.32-23.95,39.19-23.95,24.26,0,44,19.74,44,44s-19.74,44-44,44c-18.7,0-35.4-11.86-41.56-29.5-.73-2.09-3.01-3.19-5.09-2.46-2.09.73-3.19,3.01-2.46,5.09,7.27,20.85,27.01,34.87,49.11,34.87,28.67,0,52-23.33,52-52S80.66,0,51.98,0Z M51.98,21.33c-2.21,0-4,1.79-4,4v26.67c0,1.34.67,2.59,1.78,3.33l16,10.67c.68.46,1.45.67,2.21.67,1.29,0,2.56-.62,3.33-1.78,1.23-1.84.73-4.32-1.11-5.55l-14.22-9.48v-24.53c0-2.21-1.79-4-4-4Z" /></svg>
        </Redondo>
      </div>
      <p style={{ flex: 'none', margin: '0 0 96px', textAlign: 'center', fontSize: 10.5, lineHeight: 1.4, color: 'var(--tt)', padding: '0 24px' }}>intra intelligence es una IA y puede cometer errores. Por favor, compruebe sus respuestas</p>
    </div>
  );
}

function Sug({ children, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ maxWidth: '100%', padding: '9px 18px', borderRadius: 999, border: '1px solid var(--sec-bd)', background: h ? 'var(--tonal)' : 'transparent', fontFamily: 'inherit', fontSize: 12.5, color: 'var(--ts)', cursor: 'pointer', transition: 'background .15s ease-out', textAlign: 'center' }}>{children}</button>
  );
}

function Redondo({ children, activo, onClick, title }) {
  const [p, setP] = React.useState(false);
  return (
    <button type="button" title={title} onClick={onClick}
      onPointerDown={() => setP(true)} onPointerUp={() => setP(false)} onPointerLeave={() => setP(false)}
      style={{ flex: 'none', width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, border: 'none', background: activo ? 'var(--btn-bg)' : 'var(--tonal)', color: activo ? 'var(--btn-tx)' : 'var(--tt)', fontSize: 17, cursor: 'pointer', transform: p ? 'scale(0.94)' : 'scale(1)', transition: 'background .2s ease-out, color .2s ease-out, transform .12s ease-out' }}>{children}</button>
  );
}

Object.assign(window, { PreguntarM });
})();


/* ── shell (index.html) ── */
(() => {

const { TabBar, Ambiente, Icon, SheetDetalle, BotonAtender, BotonesResolver, HaloPensando, FeedItem } = window.IntraHoteleroDesignSystem_27a6ea;
const BASE='../../assets/logos';
const TABS=[{id:'inicio',label:'Inicio',icono:'inicio'},{id:'personas',label:'Personas',icono:'personas'},{id:'agenda',label:'Agenda',icono:'agenda'},{id:'ia',label:'Preguntar',icono:'preguntar'}];
const ICO_TEMA={auto:'amanecer',dia:'amanecer',tarde:'atardecer',noche:'noche'};
const CICLO=['auto','dia','tarde','noche'];
function temaPorHora(){const h=new Date().getHours();return h>=20||h<6?'noche':(h>=17?'tarde':'dia');}

function App(){
  const [logueado,setLogueado]=React.useState(false);
  const [oculto,setOculto]=React.useState(false);
  const [hotel,setHotel]=React.useState('Hampton Demo');
  const [tab,setTab]=React.useState('inicio');
  const [act,setAct]=React.useState(false);
  const [actF,setActF]=React.useState('Todo');
  const [modo,setModo]=React.useState('auto');
  const [periodo,setPeriodo]=React.useState('mes');
  const [flujo,setFlujo]=React.useState({});
  const [detalle,setDetalle]=React.useState(null);
  const [contraida,setContraida]=React.useState(false);
  const [sticky,setSticky]=React.useState(false);
  const [pensando,setPensando]=React.useState(false);
  const ultimo=React.useRef(0);
  const tema=modo==='auto'?temaPorHora():modo;

  const atender=(id)=>setFlujo(f=>({...f,[id]:'seguimiento'}));
  const resolver=(id,estado)=>setFlujo(f=>({...f,[id]:estado,[id+'_stamp']:estado==='atendido'?'✓ Confirmado · 9:41 AM':estado==='seguimiento'?null:'No confirmado'}));
  React.useEffect(()=>{setAct(false);setDetalle(null);setContraida(false);},[tab]);

  /* scroll-edge: la tab bar se contrae al bajar y NO se reabre al detenerse;
     la isla pasa a frosted a partir de 40px. */
  const onScroll=(e)=>{
    const y=e.target.scrollTop;
    setSticky(y>40);
    if(y<=8) setContraida(false);
    else if(y>24 && y-ultimo.current>8) setContraida(true);
    ultimo.current=y;
  };

  const chip=detalle?window.chipDe(detalle.producto):null;
  const estado=detalle?(flujo[detalle.id]||detalle.estado):null;
  const esIA=tab==='ia';

  return (
    <div data-tema={tema} style={{position:'relative',flex:'none',width:390,height:844,display:'flex',flexDirection:'column',borderRadius:38,overflow:'hidden',background:'#060607',color:'var(--tp)',fontFamily:'var(--font-sans)',boxShadow:'0 40px 90px -40px rgba(20,16,8,.55)'}}>
      <Ambiente tema={tema} />
      <HaloPensando activo={pensando} />

      <div style={{position:'relative',zIndex:2,flex:'none',display:'flex',alignItems:'center',height:58,padding:'12px 20px 0',boxSizing:'border-box',fontSize:12,fontWeight:600,fontVariantNumeric:'tabular-nums',color:'var(--tp)'}}>
        <span>9:41</span><span style={{flex:1}} />
        <button type="button" title="Cambiar modo" onClick={()=>setModo(m=>CICLO[(CICLO.indexOf(m)+1)%CICLO.length])}
          style={{display:'inline-flex',alignItems:'center',gap:6,minHeight:28,border:'none',background:'transparent',color:'var(--ts)',opacity:.55,cursor:'pointer',fontFamily:'inherit'}}>
          <Icon name={ICO_TEMA[modo]} size={20} />
          {modo==='auto' && <span style={{fontSize:11,fontWeight:600,color:'var(--tt)'}}>auto</span>}
        </button>
      </div>

      {esIA
        ? <window.PreguntarM base={BASE} setPensando={setPensando} hotel={hotel} />
        : (
          <div onScroll={onScroll} style={{position:'relative',zIndex:1,flex:1,minHeight:0,overflowY:'auto',display:'flex',flexDirection:'column'}}>
            {tab==='inicio' && (act
              ? <window.ActividadM actF={actF} setActF={setActF} onCerrar={()=>setAct(false)} />
              : <window.InicioM sticky={sticky} periodo={periodo} setPeriodo={setPeriodo} irPersonas={()=>setTab('personas')} abrirAct={()=>setAct(true)} />)}
            {tab==='personas' && <window.PersonasM periodo={periodo} setPeriodo={setPeriodo} flujo={flujo} atender={atender} resolver={resolver} abrirDetalle={setDetalle} />}
            {tab==='agenda' && <window.AgendaM flujo={flujo} atender={atender} resolver={resolver} abrirDetalle={setDetalle} />}
            <div style={{height:110,flex:'none'}} />
          </div>
        )}

      {/* La tab bar vive anclada al lienzo, no dentro del scroller: su posición
          no depende de cuánto contenido tenga la pestaña. */}
      <div style={{position:'absolute',left:0,right:0,bottom:24,zIndex:35,display:'flex',justifyContent:'center',pointerEvents:'none'}}>
        <div style={{pointerEvents:'auto'}}>
          <TabBar items={TABS} activo={tab} onSelect={(id)=>{setContraida(false);setTab(id);}} contraida={!esIA && contraida} onInteract={()=>setContraida(false)} style={{position:'static'}} />
        </div>
      </div>

      {detalle && (
        <SheetDetalle nombre={detalle.nombre} producto={detalle.producto} productoColor={chip.color} productoFondo={chip.fondo}
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
          <p style={{margin:'16px 0 6px',fontSize:10.5,fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--tt)'}}>Lo que pasó</p>
          <div style={{borderRadius:16,background:'var(--card)',padding:'4px 14px'}}>
            <FeedItem colTiempo={70} t1="hace 9 min" texto="Llegó por la campaña de Meta Ads." />
            <FeedItem colTiempo={70} t1="hace 8 min" texto="El asistente respondió y validó presupuesto." />
            <FeedItem colTiempo={70} t1="hace 6 min" gol pre="Cita confirmada:" texto="jueves 11:00 AM." />
          </div>
        </SheetDetalle>
      )}

      {!oculto && (
        <div style={{position:'absolute',inset:0,zIndex:80,opacity:logueado?0:1,transform:logueado?'scale(1.04)':'none',pointerEvents:logueado?'none':'auto',transition:'opacity .7s ease, transform .7s cubic-bezier(0.22,1,0.36,1)'}}>
          <window.LoginM tema={tema} modo={modo} base={BASE}
            onCiclarTema={()=>setModo(m=>CICLO[(CICLO.indexOf(m)+1)%CICLO.length])}
            onEntrar={(p)=>{setHotel(p.n);setLogueado(true);setTimeout(()=>setOculto(true),700);}} />
        </div>
      )}
    </div>
  );
}


window.AppIntraMovil = App;
})();
})();
