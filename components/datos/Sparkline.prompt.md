Línea de tendencia dentro del hero. Es contexto, no una gráfica — pero sí es interactiva.

```jsx
<Sparkline puntos={serie} tema={tema} etiquetas={XL[periodo]} fechas={fechasPorPunto}
  rango={RANGO[periodo]} firma={periodo + '|' + filtros.join(',')} />
```

- **Trazo revelado**: al montar y cada vez que cambia `firma` (periodo o filtro), la línea se dibuja de izquierda a derecha en 1680ms (`cubic-bezier(0.33,1,0.68,1)`) y el punto final entra 810ms con delay de 1230ms.
- **Hover**: una capa `inset:-34px 0 -44px 0` con cursor crosshair recorta la línea hasta el punto más cercano (`clip-path` .12s), apaga el punto final y muestra un dot de 9px pulsando (`ih-spk-pulse`) con la cifra y su fecha en una etiqueta de vidrio.
- Sin ejes, sin labels de datos, sin leyenda: solo las cifras extremas al margen izquierdo.
- Solo escritorio; en móvil el hero va sin sparkline.
