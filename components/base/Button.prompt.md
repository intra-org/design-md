Botón del sistema: pill 999px, tres pesos (primary sólido, secondary outline, ghost), pressed scale + darken 120ms y cero animación en reposo.

```jsx
<Button onClick={guardar}>Guardar</Button>
<Button variant="secondary" size="sm">Cancelar</Button>
<Button variant="ghost" size="sm">Ver toda la actividad →</Button>
```

- `primary` es el único peso con sombra (`--sh-btn`); úsalo una sola vez por bloque.
- El botón de guardar del catálogo es `secondary` mientras no hay cambios y pasa a `primary` en cuanto algo cambia — el botón habla del cambio.
- Las acciones destructivas también usan `primary` (negro/crema). Cero rojo: `--danger*` es para errores de datos.
- Para "Atender" usa `BotonAtender`, no este componente: lleva el logo de WhatsApp y su propia regla de transición.
