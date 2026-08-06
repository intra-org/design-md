Presencia V7 — la firma visual del asistente. Ubicación única: el empty state de Preguntar.

```jsx
<Presencia size={190} />
```

- Al enviar el primer mensaje el empty completo (Presencia + wordmark + sugerencias) se desvanece en 250–450ms y NO regresa hasta limpiar el chat.
- No existe una mini-versión ni un avatar. Si necesitas señalar "el asistente habló", usa el dot verde de 6px de `Burbuja`.
- Los colores salen de `--siri-*`: Amanecer naranja solar, Atardecer coral/malva, Noche violeta/plata. Nunca hardcodees los stops.
- `prefers-reduced-motion` deja el frame estático: la asimetría ya comunica vida.
