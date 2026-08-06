El botón más importante del producto: abre la conversación en WhatsApp. Outline en reposo, fill sólido en hover/pressed.

```jsx
<BotonAtender onClick={abrirWhatsApp} />
<BotonAtender ambar onClick={abrirWhatsApp} />   // fila vencida +24h
```

- Logo oficial de WhatsApp 14px a la izquierda del label, `fill: currentColor`, gap 6, padding 10/14 simétrico. Nunca el verde de marca, nunca un glifo macizo, nunca animado.
- Transición: `transform .12s ease-out` y NADA más. Texto e ícono cambian en el mismo frame.
- Nunca existe en versión solo-ícono.
- No lo uses en ✓/✕: esos no abren conversación.
