Hero negro de Soporte, sobre la bandeja de reportes. Es el protagonista único de esa pantalla.

```jsx
<HeroReportes pendientes={3} enProceso={4} resueltos={8} filtro={f} onFiltrar={setF} />
```

- Tocar una cifra filtra la tabla (y aparece el chip removible "Pendientes"/"En proceso"/"Resueltos").
- Debajo: buscador "Buscar en mis reportes" + popovers Fechas ▾ y Estado ▾, luego la tabla Reporte · Creado · Estado con `EncabezadoOrdenable` y `ChipEstado`.
- Microcopy fijo por estado: "Recibimos tu reporte." · "Nuestro equipo está trabajando en esto." · "Este caso quedó cerrado." Vacío: "Todo en orden".
