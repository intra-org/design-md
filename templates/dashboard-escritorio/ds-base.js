(() => {
  const base = '../..';
  for (const p of ['styles.css']) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  const cargar = (src) => new Promise((ok, err) => {
    const s = document.createElement('script');
    s.src = src; s.onload = ok; s.onerror = () => err(new Error(src));
    document.head.appendChild(s);
  });
  const listo = () => new Promise((ok) => {
    (function esperar() {
      if (window.React && window.ReactDOM && document.getElementById('intra-app')) return ok();
      setTimeout(esperar, 20);
    })();
  });
  cargar(base + '/_ds_bundle.js')
    .then(() => cargar('https://unpkg.com/@babel/standalone@7.29.0/babel.min.js'))
    .then(() => fetch('./App.jsx').then((r) => r.text()))
    .then((src) => {
      const s = document.createElement('script');
      s.textContent = window.Babel.transform(src, { presets: ['react'] }).code;
      document.body.appendChild(s);
      return listo();
    })
    .then(() => new Promise((ok) => {
      (function esperarApp() {
        if (window.AppIntraEscritorio) return ok();
        setTimeout(esperarApp, 20);
      })();
    }))
    .then(() => {
      const nodo = document.getElementById('intra-app');
      if (nodo._montado) return;
      nodo._montado = 1;
      window.ReactDOM.createRoot(nodo).render(window.React.createElement(window.AppIntraEscritorio));
    })
    .catch((e) => console.error('ds-base.js: no se pudo montar AppIntraEscritorio —', e));
})();
