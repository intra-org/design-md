Panel lateral de detalle en escritorio. Es chrome, no contenido: comparte la superficie recesada del nav.

```jsx
<PanelDetalle nombre="Mariana Gutiérrez" producto="Reserva" onCerrar={cerrar}
  campos={[{k:'Cita',v:'Jue 16 jul · 11:00 AM'},{k:'Teléfono',v:'+52 999 123 4567'}]}
  acciones={<BotonAtender onClick={abrir} />}>
  <LoQuePaso items={timeline} />
</PanelDetalle>
```

- Ancho 380px (480px en Productos), fondo `--nav-bg`, borde izquierdo `--divider`, entrada `ih-fade` 250ms.
- Vive como hermano del contenido en Personas Y Agenda, compartiendo estado. Cambiar de pestaña lo cierra.
- El bloque "Lo que pasó" lleva su columna de tiempo de 76px alineada a la derecha.
