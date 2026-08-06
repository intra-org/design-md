Tarjeta de aviso proactivo: el asistente cuenta algo que ya hizo o algo que espera al equipo.

```jsx
<Aviso dot="var(--verde)"><b>128 mensajes</b> respondidos este mes.</Aviso>
<Aviso accion="Ver →" onClick={irPersonas}>6 oportunidades esperan a tu equipo.</Aviso>
<Aviso resuelto>Detectamos menos actividad en Eventos esta semana. Ya ajustamos tu campaña.</Aviso>
```

- Habla en pasado y verificable. Nada de "podrías", "quizá" ni signos de admiración.
- El aviso resuelto siempre cierra con el badge tonal: primero el problema, luego que ya está atendido.
