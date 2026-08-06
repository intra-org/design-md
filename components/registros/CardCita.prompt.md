Tarjeta de cita de la Agenda (vista Día). Cada cita trae el contexto que solo intra tiene: producto, presupuesto validado y cuándo llegó la persona.

```jsx
<CardCita hora="11:00 AM" nombre="Mariana Gutiérrez" producto="Reserva"
  contexto="Suite · 3 noches · presupuesto validado" llego="Llegó hace 2 h"
  accion={<BotonAtender onClick={abrir} />} />
```

- Hora y nombre en la misma línea; el chip al extremo derecho.
- La Agenda no es un calendario: un solo tipo de evento, sin categorías, sin creación manual.
- Vacío: "Sin citas hoy. Tu asistente sigue atendiendo."
