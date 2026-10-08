Entrada al asistente desde Inicio, arriba de "De dónde vienen". Sustituye a los avisos de solo lectura ("N mensajes respondidos", "Ya está resuelto").

```jsx
<WidgetPregunta onPreguntar={(t)=>{ irPreguntar(); setTimeout(()=>enviarChat(t), 80); }} />
<WidgetPregunta movil onPreguntar={…} />
```

- La pregunta llega a Preguntar **ya enviada** y el asistente empieza a responder. Un composer que solo navega es peor que no tenerlo.
- El rótulo es el mismo que "Actividad registrada" y "Próximas citas": es un widget más.
- En móvil va solo con campo.
