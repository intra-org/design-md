Selector fantasma de tema: glifo ghost arriba-derecha del contenido, opacidad .55 en reposo.

```jsx
const [modo, setModo] = React.useState('auto');
<ToggleTema modo={modo} onChange={setModo} />
// y en el root de la pantalla:  <div data-tema={modo === 'auto' ? temaPorHora() : modo}>
```

- Cicla auto → Amanecer → Atardecer → Noche. En `auto` el microlabel "auto" es permanente en el dashboard (es estado, no notificación); en el login se desvanece a los 2.6s.
- La selección manual NO persiste entre sesiones.
- Nunca vive dentro del nav lateral: va arriba-derecha del contenido.
