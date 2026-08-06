Detalle de persona en móvil, con drag-to-dismiss real. Patrón exclusivo de móvil: en escritorio usa `PanelDetalle`.

```jsx
<SheetDetalle nombre="Mariana Gutiérrez" producto="Reserva"
  campos={[{k:'Producto',v:'Reserva'},{k:'Teléfono',v:'+52 999 123 4567'},{k:'Llegó',v:'hace 2 h'}]}
  acciones={<BotonAtender onClick={abrir} />} onCerrar={cerrar} />
```

- Fondo `--scrim` (nunca un hex fijo): en temas oscuros el sheet es oscuro.
- El nombre va sólido en `--tp` con el chip inmediatamente después; el teléfono vive UNA sola vez, en la tabla.
- Arrastre: >120px cierra, si no snap-back con spring. El contenedor padre debe ser `position: relative`.
