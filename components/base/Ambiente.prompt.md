El cielo del lienzo: 6 capas de gradiente por tema, montadas las tres familias a la vez para que el cambio de tema sea un crossfade y no un salto.

```jsx
<div data-tema={tema} style={{position:'relative', overflow:'hidden', background:'#060607'}}>
  <Ambiente tema={tema} />
  {/* todo el contenido va con position:relative y z-index:1 */}
</div>
```

- El fondo base del lienzo es `#060607`; las capas lo cubren. **No uses `--bg-grad` en pantallas de producto** — ese token es el atajo para tarjetas y fichas, no el cielo real.
- Las capas animan solo `transform` (`ih-amb3`, `ih-amb4`, `ih-drift`). Animar su opacidad apaga el color.
- El contenedor debe ser `position: relative` + `overflow: hidden`.
