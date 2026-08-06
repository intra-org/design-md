El compositor de Preguntar: input pill + enviar + historial, con el aviso legal debajo.

```jsx
<InputPreguntar desktop value={txt} onChange={setTxt} onEnviar={enviar}
  historial={verHistorial} onHistorial={() => setVerHistorial(v => !v)} />
```

- Enviar se activa con texto (fill `--btn-bg` en 200ms). Historial siempre queda a su derecha; enviar va primero.
- El aviso legal — "intra intelligence es una IA y puede cometer errores…" — es la ÚNICA excepción a la prohibición de decir "IA". Va en `--tt`, nunca destacado.
- El input está anclado al fondo del área (contenedor 720px), no flota sobre el chat.
- La tab bar no se contrae en Preguntar: el chat tiene scroller propio.
