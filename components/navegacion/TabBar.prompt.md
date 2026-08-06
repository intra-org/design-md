Pill flotante de navegación móvil — nunca una barra full-width.

```jsx
<TabBar activo={tab} onSelect={setTab} contraida={contraida} onInteract={() => setContraida(false)}
  items={[
    {id:'inicio', label:'Inicio', icono:'inicio'},
    {id:'personas', label:'Personas', icono:'personas'},
    {id:'agenda', label:'Agenda', icono:'agenda'},
    {id:'preguntar', label:'Preguntar', icono:'preguntar'},
  ]} />
```

- Reposo 64px con labels (scrollTop ≤ 8). Contraída 48px al bajar (scrollTop > 24) con dot de 4px bajo el activo.
- Al DETENER el scroll no se reabre: solo al volver arriba o al interactuar con la pill.
- Glass translúcido `color-mix(--tabbar 38%, transparent)` + blur(20px); elevada ~24px del borde sobre un scrim.
- Aplica en Inicio · Personas · Actividad (comparten scroller). En Preguntar no: el input está anclado.
