Los dos turnos de Preguntar. La pregunta es una caja; la respuesta no.

```jsx
<Burbuja de="usuario" hora="9:40 AM">¿Cómo va julio contra junio?</Burbuja>
<Burbuja de="asistente">22 oportunidades reales en lo que va del mes, 22% arriba de junio.</Burbuja>
```

- Pregunta: `--card`, radius 18/18/4/18, máx 78–82% del ancho, alineada a la derecha.
- Respuesta: sin burbuja, dot verde 6px + texto 14/1.6 — la voz del asistente es la página.
- El contenedor es un `flex column`; las burbujas se alinean solas.
