Par compacto de Atender para la tabla y las tarjetas kanban de Ventas (columna "Atender").

```jsx
<BotonesAtender onWhatsApp={()=>atender(id)} onYaAtendi={()=>atender(id)} />
```

- Mismo peso que `BotonesResolver` (✓/✕ de En seguimiento): hover sólido `--btn-bg`, nunca bajar opacidad.
- WhatsApp siempre primero; el ✓ va en `--verde-tx`.
- En renglones móviles y en el panel de detalle se sigue usando `BotonAtender` (pill con label).
