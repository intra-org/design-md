Confirmación centrada con blur DENTRO del panel (nunca una zona de peligro al pie).

```jsx
<DialogoConfirmar
  pregunta="¿Cambiar el producto genérico?"
  microcopy="El rol pasará de Reservas a Day Pass."
  confirmar="Sí, cambiarlo" onConfirmar={aplicar} onCancelar={cerrar} />
```

- Overlay `inset:0` con `--panel-scrim` + blur(10px) saturate(.9); tarjeta máx. 330px centrada.
- Sin rojo: la acción destructiva usa el botón primary del sistema.
- El padre debe ser `position: relative` (el panel lateral, no la ventana).
