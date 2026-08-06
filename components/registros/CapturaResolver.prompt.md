Captura opcional al resolver. Aparece 160ms **después** de que el estado ya se guardó — nunca bloquea el flujo.

```jsx
{pop && (
  <CapturaResolver kind={pop.kind}
    onMotivo={(m) => guardar(pop.pid, {motivo:m}, 'Motivo guardado — ' + m)}
    onNota={(n) => guardar(pop.pid, {nota:n}, 'Nota guardada')}
    onMonto={(v) => guardar(pop.pid, {monto:+v.replace(/\D/g,'')}, 'Venta registrada — $' + v + ' MXN')}
    onCerrar={() => setPop(null)} />
)}
```

- `kind="no"` muestra los 9 motivos en 3 grupos (Sin contacto · Con contacto · Cerrado por fuera) más "+ Agregar nota".
- `kind="si"` muestra el campo de monto en MXN con miles automáticos.
- Cerrar (clic fuera o Esc) **no revierte** la resolución: el estado ya se escribió. Para revertir está el toast con "Deshacer" (5s).
- Al confirmar una venta se dispara `<Chispas />` sobre el botón ✓ durante 1150ms. El "no" no se celebra.
- Popover anclado abajo a la derecha del lienzo (`right:26 bottom:26`, 340px). El contenedor padre debe ser `position: relative`.
