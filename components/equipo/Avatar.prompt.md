Avatar de iniciales y pila de avatares de Equipo. El producto no usa fotos de perfil.

```jsx
<Avatar nombre="Sofía Herrera" size={40} />
<AvatarStack nombres={equipo.map(v=>v.nombre)} onClick={abrirAdmin} />
```

- Tamaños: 20 (dentro del botón Asignar), 28 (menú, pila), 34 (cabecera kanban), 40 (fila de vendedor).
- La pila va a la izquierda del botón "+" (28px --seg-track) y del `ToggleVista`.
