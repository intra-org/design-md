Navegación de escritorio: una **tarjeta flotante de vidrio**, no una columna pegada al borde.

```jsx
<NavLateral hotel="Hampton Demo" activo="inicio" onSelect={setVista}
  items={[
    {id:'inicio', label:'Inicio', icono:'inicio'},
    {id:'personas', label:'Personas', icono:'personas', conteo:3},
    {id:'agenda', label:'Agenda', icono:'agenda', conteo:3},
    {id:'productos', label:'Productos', icono:'productos', conteo:4},
    {id:'preguntar', label:'Preguntar', icono:'preguntar'},
  ]}
  modo={<BotonModo … />}
  usuario={{iniciales:'LR', nombre:'Lucía Rivas', rol:'Ventas'}} />
```

- Margen 16px por los tres lados, radio 26 (42 al colapsar), fondo `color-mix(--nav-bg 84%, transparent)` + `blur(20px) saturate(1.3)`, borde `--divider` y sombra `0 26px 60px -34px`.
- El contenido va en capas absolutas de 248px: al comprimir a 84px las etiquetas se **recortan**, no se reacomodan.
- Conteos: Personas = por atender, Agenda = citas de hoy, Productos = total del catálogo. Badge `--tonal`, radio 6, 11/700 tabular.
- El botón de modo/tema vive al pie del nav (`modo`), sobre la fila de usuario.
- El botón de colapso anima su posición con exactamente la misma curva y duración que el ancho (`.5s cubic-bezier(0.4,0,0.2,1)`).
