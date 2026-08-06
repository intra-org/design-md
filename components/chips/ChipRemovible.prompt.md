Filtro activo, en negro sólido. El tap entero lo quita — no hay una zona "×" separada.

```jsx
<div style={{display:'flex',gap:8}}>
  <ChipRemovible onQuitar={() => quitar('reserva')}>Reservas</ChipRemovible>
  <ChipRemovible onQuitar={() => quitar('pendiente')}>Por atender</ChipRemovible>
</div>
```

- Producto y estatus conviven en la misma fila; son combinables.
- Mismo patrón exacto en Personas y en la tabla de Historial.
