Superficie de tarjeta del sistema (`--card` + `--card-sh`), con eyebrow uppercase opcional y una acción a la derecha.

```jsx
<Card eyebrow="Próximas citas · hoy" accion={<Button variant="ghost" size="sm">Ver agenda →</Button>}>
  …
</Card>
```

- Radio 20 en tarjetas de contenido, 18 en avisos, 16 en secciones dentro de un panel.
- Padding 20px en móvil, 22–24px en desktop.
- No apiles sombras: una tarjeta dentro de otra usa `--tonal` como fondo, no otra `Card`.
