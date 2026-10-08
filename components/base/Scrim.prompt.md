Velo invisible de clic-fuera. Obligatorio mientras haya un popover de barra abierto.

```jsx
{menu && <Scrim onCerrar={() => setMenu(null)} />}
{menu && <Popover style={{ zIndex: 31 }} … />}
```

- Se monta en el contenedor posicionado de la sección (`position: relative`), no en `body`.
- Un solo scrim cierra los tres menús de la barra (Estatus · Filtrar · Exportar).
