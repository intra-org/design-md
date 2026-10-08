Fila de filtros de estado de Equipo / Ventas: Todos · Por atender · En seguimiento · Confirmado · No confirmado, más los productos elegidos como chips removibles.

```jsx
<ChipFiltro activo={f==='todos'} onClick={()=>setF('todos')}>Todos</ChipFiltro>
<ChipFiltro dot="var(--dot-evento)" onQuitar={()=>quitar('Evento')}>Evento</ChipFiltro>
```

- Fila `flex-wrap` gap 8. Entre estados y productos, un espacio de 8px.
- Cuando hay filtros: a la derecha "mostrando N de M" (12 --ts) + "Limpiar todo" en --link 600.
- Se distingue de `ChipHero` (sobre negro) y de `ChipRemovible` (Personas v1.5): este es el chip de barra de v1.6.
