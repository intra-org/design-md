# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repo

El design system de **intra hotelero**, exportado desde un proyecto de Claude Design. No es una app: no hay `package.json`, build, tests ni dependencias locales. Todo es HTML/CSS/JSX estático que se renderiza en el navegador con React 18 + Babel standalone desde unpkg.

`readme.md` es la guía de marca completa (tono es-MX, vocabulario prohibido, fundamentos visuales, iconografía). Léelo antes de diseñar o escribir copy; no se duplica aquí. `SKILL.md` expone el repo como Agent Skill (`intra-hotelero-design`).

## Cómo llegan las actualizaciones

La estratega visual entrega cada versión como una carpeta completa (p. ej. `intra · Design System_V02/`) dentro del repo. Esa carpeta **sustituye** todo el contenido: se refleja sobre la raíz con borrado de lo que ya no existe, se verifica que quede idéntica, se borra la carpeta y se hace commit + push a `main`.

```sh
V="intra · Design System_VNN"
rsync -a --delete --exclude='.git' --exclude='.DS_Store' --exclude="$V" "$V/" ./
diff -rq -x .git -x "$V" -x .DS_Store . "$V"   # sin salida = idéntico
```

No se versionan cambios a `.DS_Store`.

## Previsualizar

Las fichas y prototipos cargan `.jsx` y `support.js` por ruta relativa, así que se abren desde un servidor estático en la raíz (p. ej. `python3 -m http.server`) y no con `file://`.

## Arquitectura

**Tokens → componentes → bundle → fichas.**

- `styles.css` es el único punto de entrada de CSS: solo `@import`s de `tokens/`. `tokens/colors.css` define los 85 tokens semánticos para Amanecer (`:root`) y los redefine bajo `[data-tema="tarde"]` y `[data-tema="noche"]`. Tipografía, radios, espaciado y motion no cambian entre temas.
- Cada componente en `components/<grupo>/` es un trío:
  - `X.jsx`: implementación con named exports y estilos inline que siempre usan `var(--token, fallback)`.
  - `X.d.ts`: contrato de props.
  - `X.prompt.md`: guía de uso con ejemplos y reglas.
  Un `.jsx` puede exportar piezas auxiliares (p. ej. `DotAmbar` desde `RenglonPersona`, `ColumnaKanban` desde `TarjetaKanban`, `CAPAS` desde `Ambiente`).
- `_ds_bundle.js` es un artefacto **generado** por Claude Design que compila todos los `.jsx` y los publica en `window.IntraHoteleroDesignSystem_27a6ea`. Las fichas `*.card.html` consumen el bundle, no los `.jsx`: editar un componente a mano no cambia lo que muestran las fichas hasta que el bundle se regenera en Claude Design.
- `_ds_manifest.json` (componentes, fichas, template, tokens, temas) y `_adherence.oxlintrc.json` también son generados. El segundo es una config de oxlint para proyectos consumidores: avisa de hex o px crudos, fuentes ajenas y props no declaradas por componente (`npx oxlint -c _adherence.oxlintrc.json <archivos>`).
- Los `*.card.html` de `components/` y los de `guidelines/` empiezan con un comentario `<!-- @dsCard group=… viewport=… name=… subtitle=… -->`. De ahí sale la pestaña Design System; el `group` numerado define el orden.

## Fuente de verdad

- `ui_kits/prototipo/` es la copia **sin modificar** del prototipo v1.6 (`OG_Prototipo.dc.html`, `Equipo`, `SoporteDesk`/`SoporteMovil`, etc.), junto con `DESIGN.md` y `components.md` originales. Si un componente difiere del prototipo, gana el prototipo. No edites estos archivos.
- `templates/prototipo-intra/` es el mismo prototipo, autocontenido (con su `support.js` y su `assets/`), para que los proyectos consumidores lo copien. El manifest apunta a `PrototipoIntra.dc.html` como entrada.

## Reglas que el código debe respetar

- En pantallas de producto, nunca escribas un `#hex`: usa `var(--token)`. Los hex solo aparecen como fallback dentro de `var()` en los componentes.
- Los temas se activan con `data-tema` en el root (`tarde` | `noche`; Amanecer es el default). `Ambiente` usa otra nomenclatura: `tema="dia" | "tarde" | "noche"`.
- Los íconos salen solo de `assets/icons/` mediante `Icon`. No uses librerías externas ni emoji.
- Motion: anima solo `transform` y `opacity`, y nada se mueve en reposo (salvo los dots verde y ámbar con `ih-pulse`).
- Copy en es-MX, sin emoji ni signos de admiración, con el vocabulario canónico del `readme.md` ("oportunidades reales", "Ventas", "aviso", "tu asistente").

## Documentación desactualizada conocida

`COMPARTIR.md` aún dice "25 iconos" y "32 componentes en 7 grupos"; `readme.md` (29 SVG, 43 componentes en 8 grupos) está al día. `ui_kits/prototipo/README.md` menciona los kits `hotelero-*`, retirados en v1.6. Estos textos vienen así de la entrega de diseño.
