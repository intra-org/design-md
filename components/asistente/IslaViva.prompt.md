La isla viva: dot verde pulsando + una frase que rota. Es la prueba de que el asistente está trabajando ahora.

```jsx
<IslaViva ancho={490} mensajes={[
  'Asistente activo · 34 personas atendidas este mes',
  'Respondiendo a alguien…',
  '128 mensajes respondidos este mes',
]} />
```

- Ancho FIJO, igual al del selector de periodo: nunca cambia de tamaño al rotar (patrón Now Playing).
- El dot va anclado a la izquierda en `absolute`, no en el flujo del texto.
- Sticky solo en scroll; en reposo es tonal mate. Frosted jamás en reposo.
