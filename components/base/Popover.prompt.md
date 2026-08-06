Popover de filtros y export: fondo `--card`, radio 14, entrada `ih-pop` 180ms desde la esquina superior derecha.

```jsx
<div style={{position:'relative'}}>
  <Button variant="secondary" size="sm" onClick={toggle}>Producto ▾</Button>
  <Popover abierto={abierto} value={producto} onSelect={setProducto}
    items={[{value:'todos',label:'Todos'},{value:'reserva',label:'Reservas',dot:'var(--dot-reserva)'}]} />
</div>
```

- Radio behavior: abrir uno cierra los demás (estatus / producto / export son excluyentes).
- Item activo: fondo `--tonal` + peso 700. Nunca un check flotante.
- El padre debe ser `position: relative`.
