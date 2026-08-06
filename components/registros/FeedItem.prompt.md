Fila del feed de Actividad y del widget "Últimos goles del asistente".

```jsx
<FeedItem t1="9:41 AM" gol pre="Cita confirmada:" texto="Mariana Gutiérrez, jueves 11:00 AM."
  producto="Reserva" />
```

- El gol lleva dot azul `--gol` **y** prefijo en 600: la señal nunca es solo color.
- La columna de tiempo va alineada a la derecha; usa el mismo ancho en toda la vista.
- Los items nuevos entran con `ih-up` + flash de 1.2s; los viejos no se re-animan.
