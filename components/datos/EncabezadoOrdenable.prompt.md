Encabezado de columna para toda tabla del producto (Historial, Soporte, Ventas, Equipo).

```jsx
<EncabezadoOrdenable activo={sort.k==='llego'} dir={sort.dir} onOrdenar={()=>ordenar('llego')} style={{width:110}}>Llegó</EncabezadoOrdenable>
<EncabezadoOrdenable ordenable={false} style={{flex:1}}>Contexto</EncabezadoOrdenable>
```

- Clic alterna asc/desc; la flecha solo aparece en la columna activa.
- Ordena "Llegó" con `MinutosDesde(rel)`: `ahora`=0, `anoche`=600, `ayer`=1440, `la semana pasada`=10080.
- Fila de encabezados: padding 6/14/10, borde inferior --divider, gap 16.
