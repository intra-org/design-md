Único control de encendido del sistema (cero controles nativos): pista + perilla en capas separadas.

```jsx
<Switch checked={habilitado} onChange={() => setHabilitado(v => !v)} size="fila" />
```

- Pista apagada `--sw-off`, encendida `--btn-bg` al 100% en Amanecer y al 80% en Atardecer/Noche (`--sw-on-op`). La perilla va SIEMPRE al 100%: por eso es una capa aparte.
- Perilla con spring 220ms; la pista cruza en 200ms ease-out.
- `bloqueado` no cambia de color: el motivo se dice en microcopy y en un toast.
