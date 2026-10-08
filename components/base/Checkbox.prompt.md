Casilla para seleccionar filas o tarjetas y operar en lote (Asignar a · Intercambiar).

```jsx
<Checkbox checked={sel.includes(id)} onChange={() => toggle(id)} />
```

- Detiene la propagación: marcar no abre el detalle de la fila.
- En kanban, mientras no hay selección, la casilla va al 60% de opacidad.
- Al haber selección aparece `BarraSeleccion` al pie.
