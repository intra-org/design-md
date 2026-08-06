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
