El renglón de Personas, con su acción write-once a la derecha. Es el mismo estado que la Agenda: atender desde un lado mueve a la persona en el otro.

```jsx
<RenglonPersona nombre="Mariana Gutiérrez" producto="Reserva" contexto="Suite · 3 noches · presupuesto validado"
  rel="hace 9 min" urgente estado="pendiente" onAtender={abrir} />
<RenglonPersona desktop nombre="Carlos Ibarra" estado="atendido" stamp="✓ Atendido · 9:41 AM" />
```

- Estados: `pendiente` → BotonAtender · `seguimiento` → ✓/✕ · `atendido` → stamp verde · `no-confirmado` → texto `--tt`.
- El dot ámbar pulsa (ih-pulse 2.4s) y SIEMPRE va acompañado del microtexto "· Sin atender +24 h": la señal nunca es solo color.
- `desktop` fija las columnas para que tiempo y acciones caigan en la misma x en los tres grupos.
- Tap en el renglón abre el sheet (móvil) o el panel lateral (desktop).
