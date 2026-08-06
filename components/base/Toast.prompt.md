Pill frosted al pie del lienzo. Confirma lo que ya pasó y, si aplica, ofrece deshacerlo.

```jsx
<Toast onDeshacer={revertir}>No se concretó · Fuera de presupuesto</Toast>
```

- El contenedor padre debe ser `position: relative`: el toast vive dentro del lienzo, no del viewport.
- Deshacer revierte TODO (estado + captura) durante 5s.
- Copy en pasado y verificable; nunca signos de admiración ni emoji.
