# intra — Design System

Sistema de diseño de **intra**: Un asistente de IA atiende por WhatsApp a la gente que pregunta, agenda citas y valida presupuestos; este producto es donde el equipo de ventas ve el resultado y toma la conversación cuando hace falta.

**Héroe: el hotelero. Guía: el asistente.** El producto habla de resultados, no de features (StoryBrand). Idioma: **es-MX**, cálido-premium.

---

## Fuentes de este design system

Todo lo que hay aquí sale del paquete portable **`intra_plataforma_09/`** (**v1.6.0**, ago 2026), que sustituye al anterior `Intra_Dashboard_V02/` (v1.5.1). No hubo Figma ni repositorio de GitHub asociado. Los 85 tokens × 3 temas no cambiaron entre versiones (v1.6.0 declara "cero tokens nuevos"). Del paquete se conservan los prototipos, `DESIGN.md` y `components.md` en `ui_kits/prototipo/`; el resto de las fuentes ya está volcado en `tokens/`, `components/` y `assets/`.

| Fuente | Qué aportó |
| --- | --- |
| `DESIGN.md` | Filosofía, tipografía, reglas de color, temas, motion, copy, a11y, changelog |
| `tokens.json` | 85 tokens semánticos × 3 temas, extraídos 1:1 de producción → `tokens/colors.css` |
| `motion.json` | Curvas, duraciones y piezas coreografiadas → `tokens/motion.css` |
| `components.md` | Spec por componente (medidas, estados, transiciones) → `components/` |
| `presencia.md` | Presencia V7 (el "Siri" de intra) → `components/asistente/Presencia.jsx` |
| `themes.md` | Activación por hora, herencia y reglas de los 3 temas |
| `dashboard-hotel-intra.dc.html` (v1.5, retirado) | Prototipo vivo de la versión anterior — hero, nav, bento y Presencia |
| `Productos.dc.html`, `Captura y Reportes…`, `Preguntar historial.dc.html` | Catálogo, captura al resolver, historial de conversaciones |
| `OG_Prototipo.dc.html` (v1.6) | Ventas en tabla y kanban, toggle de vista, encabezados ordenables, botones de Atender con hover sólido |
| `Equipo.dc.html` | Sección Equipo: asignación por vendedor, pila de avatares, barra de selección, administrar equipo |
| `SoporteDesk.dc.html` · `SoporteMovil.dc.html` | Sección Soporte: hero de reportes, bandeja, novedades |
| `Inicio desktop y movil.dc.html` | Widget "Pregúntale a tu asistente" |
| `assets/` | Isotipo y wordmark (dark/light) + 24 iconos SVG del producto |
| `Whatsapp icon.svg` | Logo oficial de WhatsApp del botón Atender → `assets/icons/whatsapp.svg` |

**Regla de oro heredada:** ante cualquier duda entre documento y prototipo, **el prototipo es la verdad**.

---

## Los productos representados

Un solo producto, dos superficies (ambas recreadas como UI kits):

1. **Escritorio 1440×900** — re-arquitectura propia, no móvil ampliado: nav lateral de 248px con contexto vivo (Inicio · **Ventas** · Agenda · Historial · Productos · **Equipo** · **Soporte** · Preguntar), bento de Inicio sin scroll, Ventas en tabla o kanban, panel lateral de detalle, Agenda de 3 vistas, catálogo de Productos, asignación de Equipo, bandeja de Soporte y Preguntar centrado.
2. **Móvil 390×844** — tab bar pill de dos estados, hero de 72px, sheet de detalle con drag-to-dismiss, riel de 7 días en Semana.

Dos propiedades demo definen los dos lenguajes de datos: **Hampton Demo** (estándar: manda el número de oportunidades) y **Nikché Demo** (transaccional: manda el dinero cobrado).

---

## CONTENT FUNDAMENTALS — cómo se escribe

**Vibe:** un colega competente que reporta lo que ya hizo. Nunca vendedor, nunca robot, nunca entusiasta.

- **Persona.** Se habla de **tu** asistente, **tu** equipo, **tu** campaña. El producto nunca dice "yo". El asistente se menciona en tercera persona: "Cobrado por tu asistente", "Tu asistente sigue atendiendo".
- **Tiempo verbal: pasado y verificable.** "Cita confirmada: Mariana Gutiérrez, jueves 11:00 AM." · "128 mensajes respondidos este mes." · "Dinero verificado — cobrado directo por el sistema." Nada de "podríamos", "quizá", "estamos trabajando en".
- **Casing.** Sentence case en todo el cuerpo. MAYÚSCULAS solo en etiquetas de 10.5px con tracking (`OPORTUNIDADES REALES`, `DE DÓNDE VIENEN`, `PRÓXIMA CITA`). Nunca Title Case a la inglesa.
- **Puntuación.** Punto final en frases completas; `·` como separador de metadatos ("Suite · 3 noches · presupuesto validado"); `—` para la aclaración que remata. **Cero signos de admiración.**
- **Emoji: no.** Ni uno. Los únicos glifos no tipográficos permitidos son `✓` `✕` `▲` `›` `‹` `×` `⚡` y el `·`. El `✦`/`✨` que aparecía junto a "Preguntar" fue sustituido por el icono del set.
- **Números.** Formato mexicano: `$86,400 MXN` (MXN solo en la primera mención de cada tarjeta). Mediana, no promedio. Todo estimado se etiqueta "estimado".

### Vocabulario

| Prohibido | Canon |
| --- | --- |
| leads, leads calificados | **oportunidades reales** |
| conversión, funnel | personas atendidas · se convirtieron |
| dashboard | (no se nombra; es "tu asistente") |
| IA, inteligencia artificial | tu asistente |
| eventos (de calendario) | **citas del asistente** |
| notificación, alerta | aviso |
| Personas (sección) | **Ventas** (v1.6.0; el ícono es el círculo con signo de pesos) |

Frases canónicas que no se reescriben: **"Mientras dormías"**, **"Lo que pasó"**, **"N oportunidades esperan a tu equipo"**, **"Cobrado por tu asistente"**, **"Sin citas hoy. Tu asistente sigue atendiendo."**, **"Ya está resuelto"**, **"· Sin atender +24 h"**.

**Única excepción a "prohibido IA":** el aviso legal bajo el input de Preguntar — *"intra intelligence es una IA y puede cometer errores. Por favor, compruebe sus respuestas"*. Es obligación legal, va en `--tt` y nunca se destaca.

Saludos del login por hora: Buenos días (≤12h) · Buenas tardes · Buenas noches.

---

## VISUAL FOUNDATIONS

**Lujo silencioso.** Crema editorial, tinta cálida, superficies mate. La restricción ES el lujo: mil noes por cada sí.

**Un solo protagonista negro por pantalla.** El hero. Nada más compite en valor — por esta regla la isla viva perdió su fondo negro.

### Color

Base **monocromática al 95%**: tinta (`--tp #0A0A0A`), grafito (`--ts #5E6168`), crema (`--crema #FAF9F5`). El color responde una pregunta o no va: **azul** = gol del asistente y links, **verde** = sistema vivo y comparativo positivo, **ámbar** = urgencia +24h. La señal **nunca es solo color**: el gol lleva prefijo en negrita, el ámbar lleva "· Sin atender +24 h". Test de escala de grises obligatorio. Máximo dos fondos por pantalla: el gradiente ambiental y el negro del hero.

### Temas — un cuarto a tres horas del día

`Amanecer` (6–17h, maestro) · `Atardecer` (17–20h) · `Noche` (20–6h), por hora **local de la propiedad**. Se activan con `data-tema="tarde"` / `"noche"` en el root. Lo que **nunca** cambia entre temas: tipografía, radios, espaciado, estados relativos y motion. Verde/azul/ámbar conservan matiz y solo calibran valor. Las superficies oscuras tienen temperatura, nunca negro puro: Atardecer tinta-ciruela, Noche tinta-azul. Amarillo dominante solo en Amanecer.

### Tipografía

Familia única **Schibsted Grotesk** 400/500/600/700. Sin serifas, sin monospace. Escala de 8: 10.5 / 12 / 13 / 15 / 17 / 20 / 24 / 72. Los números-héroe son *display* aparte (56 transaccional · 72 móvil · 88 escritorio) y van con `proportional-nums`; **todo lo demás va tabular**. Etiquetas: la misma sans en MAYÚSCULAS con tracking .12–.15em.

### Espaciado y layout

Escritorio: lienzo fijo 1440×900 con radio 24; el nav es una **tarjeta flotante** de 248px con margen 16 y radio 26 (riel de 84px y radio 42 al colapsar), no una columna con borde. Bento de 12 columnas con gap 14, panel de detalle de 380px (480px en Productos). Móvil: 390px de ancho, isla y selector con margen 16/20, hero y tarjetas con margen 12/16, tab bar flotante elevada \~24px del borde. El renglón de Personas en escritorio fija sus columnas (230 · 104 · flex · 92 · 140) para que tiempo y acciones caigan en la misma x en los tres grupos, y vive dentro de una tarjeta de radio 20 con padding 8.

### Fondos e imágenes

No hay fotografía ni ilustración en el producto: el fondo es **luz**, no imagen. El lienzo se pinta sobre `#060607` con **seis capas de gradiente por tema** (componente `Ambiente`, copiadas de `LG_TH[tema].capas`): base, velo superior, resplandor al pie y dos destellos que derivan. Las tres familias quedan montadas a la vez y el cambio de tema es un crossfade de 600ms. Las capas animan **solo `transform`** (nunca opacidad: apaga el color). El token `--bg-grad` es el atajo para fichas y tarjetas sueltas, no el cielo de una pantalla. Sin texturas, sin patrones repetidos, sin grano.

### Bordes, radios y tarjetas

Pills y botones 999px · tarjetas 18–22px · popovers 14px · badges 6px. La tarjeta es `--card` + `--card-sh` (una sombra de 1px más un halo bajo y muy difuso, `0 12px 32px -22px`) y **sin borde** en Amanecer; el borde aparece solo donde separa superficies (`--divider`). Nada de tarjetas con borde izquierdo de color.

### Transparencia y vidrio

Frosted **solo en estados sticky**, nunca en reposo: la isla al scrollear (`rgba(22,23,27,.78)` + blur 16 sat 180), la tab bar (`color-mix(--tabbar 38%, transparent)` + blur 20 sat 170), el nav lateral (`color-mix(--nav-bg 84%, transparent)` + blur 20 sat 1.3) y el diálogo de confirmación (blur 10 sat .9). El resto del sistema es opaco y mate.

### Sombras

Tres únicas: tarjeta (`--card-sh`, temable), popover (`0 12px 40px -12px`) y botón primary (`0 10px 24px -12px`). El hero suma su propia sombra profunda más un `inset 0 1px 0` de luz superior. No hay sombras internas decorativas fuera del orbe del login.

### Motion

Solo `transform` y `opacity`. Entradas con spring `cubic-bezier(0.34,1.2,0.64,1)` 250–300ms; salidas 250ms ease-in; pressed 120ms. **Los botones viven quietos hasta que se tocan** — prohibida la respiración en reposo. Las dos únicas excepciones: el dot verde del sistema vivo y el dot ámbar de urgencia, ambos con `ih-pulse 2.4s`. El cambio de tema es una coreografía de \~750ms (superficies → texto +120ms → señales +240ms → Presencia +300ms). `prefers-reduced-motion` apaga todo.

### Estados

- **Hover** de fila: fondo `--hover` en 150ms. Hover de botón secundario: fondo `--tonal`.
- **Pressed**: `scale(0.97)` + darken en 120ms (`0.94` en botones circulares y ✓/✕).
- **Focus**: outline 2px `--link` con offset 2px.
- **Touch**: mínimo real de 44pt vía `button::after { inset: -7px }` invisible.
- **Deshabilitado**: opacidad, nunca gris nuevo. Un control bloqueado **no cambia de color**: el motivo se explica en microcopy y toast.
- **Excepción documentada**: el botón Atender no anima el color — texto e ícono cambian en el mismo frame, solo el `scale` del pressed se interpola.

### Overlays (v1.6.0)

- **Un solo toast**: pastilla frosted, 3.6s informativo o 5s con Deshacer. Se **centra sobre la columna de contenido, nunca sobre la ventana**: `left = 16 + ancho del nav (248 u 84) + 32`, `right: 28`, `bottom: 22`. Con panel lateral descuenta su ancho.
- **Menús de barra**: cada popover ancla su borde derecho al de su botón (`top: 44px`, `ih-pop .18s`, origen `top right`). El menú de Asignar se centra bajo su botón.
- **Salir siempre es posible**: todo menú abierto monta un `Scrim` (`inset:0; z-index:30`) — clic fuera cierra.
- **Cada tabla trae sus cuatro estados**: cargando, error con reintento, vacío sin filtros y vacío por filtros (que siempre ofrece cómo quitarlos).

### Scroll

Scrollbars ocultos globalmente. Todo scroll horizontal lleva un fade de 24px al borde. El scroll vertical del móvil produce el *scroll-edge*: scrim de 88px del color `--scrim` y la isla mutando a frosted.

---

## ICONOGRAPHY

**Un solo set, propio.** 24 SVG del producto + el logo oficial de WhatsApp, copiados tal cual a `assets/icons/` y expuestos por el componente `Icon`. **No se usa ninguna librería externa** (nada de Lucide, Heroicons o Font Awesome) y no hay icon font ni sprite: cada glifo es un `<path>` con `fill: currentColor`.

- **Navegación**: `inicio` `ventas` `personas` (también Equipo) `agenda` `preguntar` `productos` `historial` `soporte` `descargar` `check-circle` `campana` (novedades de Soporte).
- **Vista**: `lista` `kanban` — solo dentro de `ToggleVista`.
- **Tema**: `amanecer` `atardecer` `noche` (sol / media luna / luna).
- **Catálogo (12, asignables a un producto)**: `prod-cama` `prod-copa` `prod-sol` `prod-boda` `prod-pastel` `prod-charola` `prod-cubiertos` `prod-fiesta` `prod-maleta` `prod-podio` `prod-premio` `prod-presentacion`.
- **WhatsApp**: contorno dibujado como relleno, 14px, `fill: currentColor` — solo dentro del botón Atender. Prohibido el verde de marca, el glifo macizo tipo app-icon y animarlo.

Detalles del set: casi todos son **fill** sobre viewBox propios (≈104–115 unidades); `descargar`, `soporte` y `lista` son **stroke** sobre grid de 24; `ventas` y `campana` son fill sobre 24; `kanban` es fill sobre 800. Tamaños de uso: 18px en el nav lateral, 21px en la tab bar, 16–17px en filas y chips, 14px en el botón Atender. Un ícono solo, sin label, nunca carga significado ("señal nunca sólo-color/ícono").

**Emoji: nunca.** Unicode como icono: solo `✓ ✕ ▲ › ‹ × ⚡ ·`. Si falta un glifo, se dibuja en el set y se copia aquí — no se sustituye por emoji ni por otra librería.

---

## Índice

**Raíz**

- `styles.css` — punto de entrada: solo `@import`s.
- `readme.md` — este documento. · `SKILL.md` — versión Agent Skill.
- `thumbnail.html` — tile del sistema.

**`tokens/`** — `fonts.css` (Schibsted Grotesk) · `colors.css` (85 tokens × 3 temas) · `typography.css` · `spacing.css` · `elevation.css` · `motion.css` (curvas + keyframes `ih-*`) · `base.css` (resets, hit-area, coreografía de tema).

**`assets/`** — `logos/` (isotipo y wordmark, dark + light) · `icons/` (29 SVG).

**`components/`** — 43 componentes en 8 grupos:

- `base/` — Button · Card · Badge · Switch · Segmented · **ToggleVista** · Popover · **Scrim** · Toast · DialogoConfirmar · Ambiente · **ChipFiltro** · **Checkbox**
- `chips/` — ChipProducto · ChipHero · ChipRemovible · PillFecha · **ChipEstado**
- `marca/` — Icon · Isotipo · Wordmark · ToggleTema
- `registros/` — RenglonPersona (+ DotAmbar) · BotonAtender · **BotonesAtender** · BotonesResolver · CapturaResolver (+ Chispas) · FeedItem · CardCita · Aviso · AvisoMientrasDormias · **TarjetaKanban** (+ **ColumnaKanban**)
- `equipo/` — **Avatar** (+ **AvatarStack**) · **BotonAsignar** (+ **MenuAsignar**, **ItemMenu**) · **BarraSeleccion**
- `asistente/` — Presencia · HaloPensando · IslaViva · Burbuja · InputPreguntar · **WidgetPregunta**
- `datos/` — Hero · Sparkline · DeDondeVienen · FilaProducto · **EncabezadoOrdenable** (+ `MinutosDesde`) · **HeroReportes**

En **negrita**, lo nuevo de v1.6.0.
- `navegacion/` — NavLateral · TabBar · SheetDetalle · PanelDetalle

**`ui_kits/prototipo/`** — el prototipo v1.6 original, copiado sin modificar: `OG_Prototipo.dc.html` (escritorio + móvil, 3 temas), `Equipo`, `SoporteDesk`, `SoporteMovil`, `Productos`, `Inicio`, `Preguntar historial`, `Halo`, más `DESIGN.md` y `components.md`. **Es la fuente de verdad**: ante cualquier diferencia con un componente, gana el prototipo.

**`templates/`** — puntos de partida que los proyectos consumidores copian: `prototipo-intra/` — el prototipo v1.6 completo e idéntico al original, autocontenido (trae su `support.js` y `assets/`).

**`guidelines/`** — 20 fichas de fundamentos (Colors, Type, Spacing, Brand, Motion) que pueblan la pestaña Design System.

---

## Adiciones intencionales

El inventario de componentes sale de `components.md`. Tres piezas se agregaron por necesidad técnica, no de diseño:

1. **`Icon`** — envoltorio del set de glifos. El paquete original los inlinea en cada instancia; aquí viven en un componente para que no se dibujen a mano.
2. **`Card`** — la superficie `--card` + `--card-sh` que el paquete repite en cada tarjeta, extraída como primitiva.
3. **`Ambiente`** — las capas de fondo del lienzo, extraídas de `LG_TH[tema].capas` para no repetirlas en cada pantalla.
4. **`DotAmbar`** (exportado desde `RenglonPersona`) — el dot pulsante de urgencia, usado en 10 instancias del producto.

Token nuevo: **`--sw-on-op`** (1 en Amanecer, .8 en Atardecer/Noche). No inventa un valor: codifica la regla ya documentada de la pista del switch en temas oscuros.

## v1.6.0 — qué cambió

- **Personas pasa a llamarse Ventas** en nav, tab bar y título; abre en tabla y el `ToggleVista` cambia a kanban de 4 columnas. Encabezados ordenables (Detalle no ordena; "Llegó" por recencia real).
- **Botones de Atender con hover sólido** (`BotonesAtender`): mismo peso que los ✓/✕ de seguimiento.
- **Inicio**: "Pregúntale a tu asistente" sustituye los avisos de mensajes respondidos y de campaña resuelta; envía la pregunta a Preguntar ya respondiendo.
- **Secciones nuevas**: Equipo (asignación por vendedor) y Soporte (bandeja de reportes).
- **Overlays**: un solo toast centrado sobre el contenido, popovers anclados a su botón y scrim de clic-fuera.
- Cero tokens nuevos.

## Notas y pendientes

- **Fuentes**: el paquete no incluía binarios de Schibsted Grotesk. Se sirve la **misma familia** desde Google Fonts (`tokens/fonts.css`). Si tienen los `.woff2` de producción, reemplacen el `@import` por `@font-face` locales.
- **Iconos de enviar / historial** en `InputPreguntar`: son dos glifos geométricos (flecha y reloj) descritos en `components.md` pero no incluidos como SVG en el paquete. Si existen los archivos, se copian a `assets/icons/` y se agregan a `Icon`.
- **Móvil v1.6**: el UI kit móvil conserva Personas; los cambios de v1.6 móvil (encabezado fijo de Ventas con blur, composer comprimido 38/35/12.5) están documentados pero aún no recreados. `SoporteMovil.dc.html` tampoco.
- **Administrar equipo** (alta/edición de integrantes, roles Supervisor/Ejecutivo, reasignación al eliminar) vive en `Equipo.dc.html` y no se recreó en el kit.
- **Nikché Demo** (propiedad transaccional) está soportada por los componentes (`Hero modo="cobrado"`) pero los UI kits muestran solo Hampton Demo.
- Las hojas marcadas como exploración en el paquete original (`Navbar experimento`, `comparacion-halo`, `dashboard-desktop`, `Atender WhatsApp (propuesta)`) **no** se consideraron canon.
