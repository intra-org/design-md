Chip de filtro que vive sobre el negro del hero. Multi-select; recalcula la cifra con count-up de 420ms.

```jsx
<ChipHero icon={<Icon name="prod-cama" size={13} />} n={12} activo={sel.includes('reserva')}
  atenuado={sel.length > 0} onClick={() => alternar('reserva')}>Reservas</ChipHero>
```

- Inactivo: `rgba(255,255,255,.08)` + borde `.12`, texto al 85%. Activo: fondo blanco, texto tinta, "×" al 55%.
- Solo existe sobre el hero. Fuera de él usa `ChipRemovible` o `Popover`.
- El ícono es el del producto en el catálogo (`Icon`), nunca un emoji.
