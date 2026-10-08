Vista kanban de Ventas: cuatro columnas (Por atender · En seguimiento · Atendidas · confirmadas · Atendidas · no confirmadas). Equipo usa una columna por vendedor.

```jsx
<ColumnaKanban titulo="Por atender" conteo={6}>
  <TarjetaKanban nombre="Carlos Ibarra" producto="Evento" productoColor="var(--dot-evento)" productoFondo="var(--chip-evento)"
    contexto="Evento para 80 personas · presupuesto $180,000 validado" acciones={<BotonesAtender … />} />
</ColumnaKanban>
```

- Pie por columna: Por atender → `BotonesAtender`; En seguimiento → `BotonesResolver`; Atendidas → `sello` "✓ Confirmado · hora".
- Cada movimiento (arrastre o botón) lanza `Toast` con Deshacer.
- Densidad compacta oculta contexto y "Llegó"; persiste en `ogkb-dens`.
- Columna vacía: texto informativo centrado en --tt ("Ninguna cerrada sin confirmar.").
