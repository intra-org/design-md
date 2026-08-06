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
