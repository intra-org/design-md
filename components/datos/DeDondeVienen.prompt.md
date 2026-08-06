La tarjeta de atribución: barra de segmentos, filas expandibles por canal e insight de cierre.

```jsx
<DeDondeVienen
  grupos={[
    {nombre:'Tu campaña', n:14, color:'var(--gol)', canales:[{nombre:'Meta Ads',n:9},{nombre:'Google',n:5}]},
    {nombre:'Orgánico', n:8, color:'var(--tt)', canales:[{nombre:'WhatsApp directo',n:8}]},
  ]}
  insight="Tu campaña trajo 2 de cada 3 oportunidades este mes." />
```

- Un solo spec para todas las instancias: si dos pantallas se ven distintas, es por los datos, no por el estilo.
- El reparto por canal es proporcional con residuo mayor; los conteos siempre suman el total del grupo.
- El insight se escribe en lenguaje del hotelero, sin porcentajes de más.
