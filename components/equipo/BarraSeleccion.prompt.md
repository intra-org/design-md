Acciones en lote de Equipo. Aparece al marcar la primera casilla y se va con ✕ o Esc.

```jsx
<BarraSeleccion n={sel.length} opciones={equipo} onAsignar={asignarLote} onIntercambiar={swap} onLimpiar={()=>setSel([])} />
```

- Vive en el contenedor posicionado del contenido, centrada (`bottom: 24`). Mientras se ve, el `Toast` sube a `bottom: 84`.
- "Intercambiar" solo con 2 seleccionadas: cruza sus vendedores en un paso.
