Halo iridiscente full-bleed que roza las 4 orillas mientras el asistente piensa. Reemplaza al viejo pulso de contorno.

```jsx
<div style={{position:'relative', overflow:'hidden'}}>   {/* root del teléfono o del lienzo */}
  <HaloPensando activo={pensando} />
  …
</div>
```

- Se monta en el ROOT de la pantalla, no dentro de la vista de chat: llega a las esquinas.
- Banda de ~22px, sin línea ni caja redondeada; el centro queda transparente para poder leer.
- Piso de 5s: aunque la respuesta llegue antes, el halo se ve. Al llegar la respuesta desaparece.
- Acompáñalo del chip "pensando…" con dot verde.
