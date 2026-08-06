Segmented con thumb deslizante: selector de periodo (Hoy · Este mes · Mes pasado · 90 días) y vistas de Agenda (Día · Semana · Mes).

```jsx
<Segmented value={periodo} onChange={setPeriodo}
  options={[{value:'hoy',label:'Hoy'},{value:'mes',label:'Este mes'},{value:'junio',label:'Mes pasado'},{value:'90d',label:'90 días'}]} />
```

- Track `--seg-track`, thumb `--seg-thumb` con translateX spring 250ms; activo `--tp` 13/600, inactivo `--ts`.
- "Hoy" oculta la frase de cierre del hero: un número de un dígito no cuenta una historia.
- El periodo vive aquí y en ningún otro lado — el label del hero no duplica el estado.
