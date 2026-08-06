Badge de producto: dot mate 5px + nombre, 10.5/600. No es interactivo — identifica, no filtra.

```jsx
<ChipProducto color="var(--dot-reserva)" fondo="var(--chip-reserva)">Reserva</ChipProducto>
<ChipProducto color="var(--chip-3)" fondo="var(--chip-bg-3)">Day Pass</ChipProducto>
```

- Va INMEDIATAMENTE después del nombre de la persona; el nombre no lleva `flex:1` (nada empuja el chip a la esquina).
- En Atardecer/Noche los fondos colapsan a un tonal único: la diferencia por producto la carga el dot.
- Los 9 colores del catálogo (`--chip-N` / `--chip-bg-N`) distinguen, nunca significan.
