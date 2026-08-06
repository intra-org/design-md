Fila del catálogo de Productos: icono, chip en vivo, precio, oportunidades, switch y kebab.

```jsx
<FilaProducto nombre="Reservas" icono="prod-cama" chip={1} oportunidades={12}
  precio="$2,400" onEditar={abrirPanel} onToggle={alternar} />
<FilaProducto nombre="Consultas generales" chip={5} generico oportunidades={3} />
```

- El genérico no se puede apagar: el tap muestra el toast "Siempre debe haber un genérico: asígnalo a otro producto para moverlo".
- Copy de la lista: "oportunidades", nunca "leads".
- El icono solo viaja a las pills de Inicio; el nombre y el color viajan a todo el dashboard.
