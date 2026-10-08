Asignar una oportunidad a un vendedor (Equipo, panel de detalle de Ventas).

```jsx
<BotonAsignar vendedor={v} opciones={equipo.map(x=>({id:x.id,nombre:x.nombre,sub:x.rol,carga:x.carga,pend:x.pend}))}
  onAsignar={(id)=>asignar(op.id,id)} onQuitar={()=>asignar(op.id,null)} />
```

- Sin vendedor = negro sólido (es la acción pendiente de la fila). Con vendedor = outline neutro con avatar.
- El menú se **centra bajo el botón** (250px) y abre hacia arriba en las últimas filas (`arriba`). En el panel de detalle no debe quedar detrás de "Lo que pasó".
- Cada asignación lanza un `Toast` con Deshacer: "Mariana Gutiérrez → Sofía Herrera · Deshacer".
- `ItemMenu` es el renglón genérico de cualquier popover de barra.
