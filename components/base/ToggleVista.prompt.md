Toggle tabla / kanban: el segmented del sistema con dos valores e iconos (tres líneas · dos columnas). Vive a la derecha del selector de periodo, con `margin-left: 10px`.

```jsx
<ToggleVista value={vista} onChange={setVista} />
```

- Mismos tokens que `Segmented` (track/thumb/spring 250ms). Nunca texto en los botones.
- Personas/Ventas abre en `lista`; persiste en `localStorage` (`ogkb-vista`).
