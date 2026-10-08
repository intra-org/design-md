# components.md — spec técnico · intra hotelero v1.6.0

Reglas transversales: touch ≥44pt (hit-area ::after inset -7px en todo botón) · pressed scale(.97) 120ms ease-out · hover filas var(--hover) 150ms · focus-visible outline 2px var(--link) offset 2px · scrollbars ocultos · fades 24px en scroll horizontal. Colores = tokens.json (var(--x, fallbackAmanecer)).

## Chip de producto (badge)
Font 10.5/600, tracking .04em, color --chip-tx (Amanecer/Noche = --ts; Atardecer #E4D8D1 sólido), fondo --chip-{producto} (Amanecer diferencia por producto; oscuros colapsan a tonal), radius 6px, padding 2px 8px. No interactivo.

## Chips del hero (filtro, sobre negro)
Pill 999px, padding 8px 12px (desktop 8px 15px), font 12/500. Inactivo: rgba(255,255,255,.08) + borde .12, texto .85. Activo: fondo #FFF, texto #0A0A0A, borde #fff, "×" al 55%. Multi-select; los no activos bajan a opacity .4. Pressed scale .97 + brightness .94. Transiciones 250ms.

## Chip removible (filtro activo en Personas)
Pill negra --btn-bg, texto --btn-tx 12/600, padding 7px 12px, "×" opacity .6. Tap = quitar. Conviven producto + estatus en fila flex gap 8.

## Botón primary
Pill 999px, altura 44-48px, fondo --btn-bg, texto --btn-tx 13.5/600, sombra 0 10px 24px -12px rgba(0,0,0,.5). Pressed scale .98 + opacity .92.

## Botón secondary / outline
Pill, borde 1px --sec-bd, fondo transparente, texto --tp 13.5/600. Hover: fondo tonal.

## Botón Atender (peso adaptativo)
Outline: borde --sec-bd, texto --tp 13/600, `inline-flex` con **ícono de WhatsApp 14px a la izquierda** + gap 6, padding 10px 14px simétrico (v1.4.2: el ícono queda a la misma distancia del borde izquierdo que el label del derecho; la pill mide ~100px, lo que cabe en la fila de Personas de 375px), min-height 44px. Fila ámbar (+24h): borde #B3ADA0-equiv (--sec-bd fuerte) + fondo --tonal. Hover/pressed: fill --btn-bg + texto --btn-tx (inmediato) + scale .97 (120ms). PROHIBIDO animar en reposo.

**Transición exacta** — `transform .12s ease-out` y nada más. Hover = cambio de estado en un frame (fondo, borde, texto e ícono a la vez); solo el pressed anima su `scale(.97)`. Por qué: el ícono usa `currentColor`, así que cualquier transición de `color` lo arrastra y el glifo de 14px se lee como desvanecido; y si en cambio se anima solo el fondo, el ícono claro "aparece" conforme el fondo se oscurece — el mismo artefacto. `position: relative` para que el hit-area invisible (`button::after` inset -7px) ancle. Referencia viva aislada: `Boton Atender aislado.dc.html` (toggle para comparar con los 120ms).

**Ícono (v1.4.0)** — logo oficial de WhatsApp (contorno dibujado como relleno), `fill: currentColor` y `flex:none`: hereda --tp en reposo y --btn-tx sobre el fill, sin variante por tema. Lleva `transition: none` propia **y en sus `<path>`** (`svg[data-wa],svg[data-wa] *{transition:none!important}`): la regla de coreografía de tema (`[data-screen-label] *`) alcanza también a los paths, que son los que pintan, así que sin esto el ícono se desvanecía en 450ms aunque el `<svg>` ya no tuviera transición — era la causa real del hover desfasado en móvil y desktop. Los paths van en línea en cada instancia (el patrón `<symbol>/<use>` pierde el currentColor al exportar a PNG/PDF). Declara *dónde* ocurre la conversación: atender es abrir WhatsApp. Prohibido: el verde de marca, un glifo macizo tipo app-icon, animarlo, o usarlo en ✓/✕ de seguimiento (esos no abren conversación). Sólo-ícono no existe: rompe "señal nunca sólo-color/ícono". 14 instancias en el prototipo (9 botones + 5 muestras de librería), todas leen el mismo objeto `btnAtender`.

## Botones ✓/✕ (en seguimiento)
36×30px pill outline --sec-bd; ✓ color --verde-tx, ✕ color --ts. Pressed scale .94.

## Isla viva
Pill de ancho FIJO = selector de periodo (margen 20px laterales), padding 9px 14px 9px 30px, fondo --tonal sin borde. Dot verde 7px anclado (absolute left 14px) con doble capa: sólida + ih-pulse 2.4s. Texto 13px --ts alineado izquierda, rotación de 3 mensajes cada 4.6s con crossfade 250ms (el marco NO se mueve). Sticky (scroll>40px): muta a frosted rgba(22,23,27,.78) blur(16px) saturate(180%) borde blanco .12, texto blanco, 300ms. Aparece scrim 88px del color --scrim.

## Selector de periodo (segmented)
Track --seg-track pill full-width, 4 segmentos flex:1 h38, thumb --seg-thumb con sombra, translateX spring 250ms. Texto 13/600: activo --tp, inactivo --ts.

## Sheet de detalle (mobile)
Radius sup 24px, **fondo `--scrim`** (NO hardcoded — en Atardecer/Noche el sheet es oscuro para que el nombre `--tp` y las etiquetas lean; regresión corregida v1.0.9). Handle de arrastre `--sec-bd`. Cards internas `--card`. entrada ih-sheet 300ms spring / salida 250ms ease-in. Handle 36×4 --sec-bd con zona de drag (pointer): >120px suelta = cierra, si no snap-back spring. Contenido: **header** = nombre 20/700 color **--tp** (protagonista sólido, nunca --tt) + chip de producto INMEDIATAMENTE después del nombre (mismo patrón que el renglón de Personas — el nombre NO lleva flex:1; nada empuja el chip a la esquina). El teléfono vive **una sola vez, en la tabla de campos** (info técnica = tabla), nunca como subtítulo del nombre. Luego: campos k/v (Producto · Teléfono · Llegó · … · Cobrado) + timeline "Lo que pasó".

## Tarjeta "De dónde vienen" (fuente de verdad única)
Un solo spec para las 6 instancias (Hampton E + Nikché T × 3 temas); todas consumen el MISMO markup + el mismo builder de grupos (segEstilo/dotEstilo/chevEstilo/subEstilo se calculan una vez en renderVals con el índice v — no hay resolución local por pantalla). Mobile: card radius **20px**, padding **20px**, fondo --card, sombra --card-sh. Header 10.5/600 uppercase .15em --tt "De dónde vienen". Barra de segmentos h10 radius6 gap3. Filas 13px: nombre --ts, conteo 13/600, chevron. Insight de cierre 13px --tp con border-top --divider, padding-top 14. Variante **desktop**: mismo spec, padding 24px, sin margen horizontal (vive en grid). Cualquier diferencia percibida entre E y T es de DATOS (distintos grupos/segmentos), no de spec.

## Nota de gobernanza — swatches de la Librería
Los SVG de muestra de la Presencia en la Librería son estáticos con hex embebido (no `var(--siri-*)`) por ser galería de referencia. Riesgo: derivan del token si no se actualizan en el mismo paso. Al cambiar cualquier --siri-* hay que replicar el valor en el swatch correspondiente. (v1.0.3: Amanecer lA2/lB1 sincronizados.)

## Halo "pensando" (v1.0.8)
Se muestra mientras el asistente piensa (piso 5s), en el empty/conversación de Preguntar. Halo iridiscente full-bleed a nivel del root del teléfono: overlay `inset:0` enmascarado a una banda muy delgada del borde (~22px, apenas roza la orilla; centro transparente para leer), SIN línea/contorno ni caja redondeada. 2 capas conic-gradient con la paleta `--siri-*` completa del tema activo (lA1·lA2·lB1·rimSoft·lB2·rim·accent) → varios tonos y contrastes de la misma familia cromática; blur 26/34px, opacidad .78/.58, rotando 6s y 9.5s (una en reverse) + respiración `ih-siri-breathe` 3.4s. Paleta por tema (Amanecer oro/ámbar sutil · Atardecer coral/malva · Noche violeta/plata). reduced-motion → halo estático.

## Tab bar — pill flotante, dos estados (v1.0.4)
Pill flotante centrada (no barra full-width), glass translúcido `color-mix(--tabbar 38%, transparent)` + blur(20px) saturate(170%) = frosted que deja pasar más luz del fondo, radius 999px, borde `--divider`, sombra bajo la pill, elevada ~24px del borde inferior sobre un scrim `linear-gradient(to top, --scrim, transparent)`. Vive en `position:sticky;bottom:0` dentro del scroller principal (Inicio · Personas · Actividad completa comparten ese scroller). En Preguntar NO aplica: el chat tiene input anclado y scroller propio.
- **Reposo** (scroll top / scrollTop≤8): 64px, labels visibles, gap 4.
- **Contraída** (scroll down + scrollTop>24): 48px, labels fade-out, pill más angosta (gap 2, min-width 46), dot 4px bajo el ícono activo. **Al detener el scroll NO se reabre** — se queda contraída.
- **Expandir**: solo al volver arriba (scrollTop≤8) o al **interactuar con la pill** (pointerenter/pointerdown la reabren). Un tap de tab reabre y navega a la vez.
- **Transición**: 300ms spring `cubic-bezier(0.34,1.2,0.64,1)` (height/padding/gap/min-width); labels 150ms; dirección con threshold 8px anti-jitter.

## Popover (filtros/export)
Fondo --card radius 14px sombra 0 12px 40px -12px, padding 6-8px, min-width 170px. Entrada ih-pop 180ms (scale .96→1, origin top right). Items 13px radius 9px, activo fondo --tonal + 700. Radio behavior; abrir uno cierra los demás.

## Aviso proactivo (card)
Fondo --card radius 18px, dot gris 7px, texto 13px --tp, acción "Ver →" en --link/600. Variante resuelta: badge "Ya está resuelto" fondo --tonal.

## Aviso "Mientras dormías" (en feed)
Contenedor --night-bg + borde --night-bd radius 16px; ícono luna stroke --ambar 2.2; título 13/700; resumen 12px --ts.

## Renglón de Personas
Padding 12px 0, borde inferior --divider. Nombre 15/700 + chip producto + contexto 13px --ts + rel 10.5px --tt. Dot ámbar 7px si +24h (con "· Sin atender +24 h" en texto). Derecha: Atender / ✓✕ / estado ("✓ Atendido · 9:41 AM" en --verde-tx 12/600, "No confirmado" en --tt). Hover --hover. Mudanza: ver motion.json.

**Dot ámbar — pulso (v1.4.2)**: el dot de urgencia NO es plano. Dos capas superpuestas (sólida + copia con `ih-pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite`), idéntico al dot verde de "Asistente activo": la urgencia respira como el sistema vivo. Aplica a las 3 instancias de Personas y a las 7 de Agenda (cards de Día, píldoras de Semana móvil y desktop, fila desktop) + muestra de librería. Es la ÚNICA excepción a "los elementos viven quietos en reposo": señala espera, no invita a tocar.

**Columnas del renglón desktop (v1.4.2)** — nombre 230px · chip 104px · contexto flex:1 ellipsis · **"hace…" 92px alineado a la derecha, nowrap** · **bloque de acción 140px centrado** (Atender / ✓✕ / "✓ Atendido · hora"). Los dos anchos fijos son lo que hace que la columna de tiempo y las acciones caigan en la MISMA x en Por atender, En seguimiento y Atendidas — sin ellos cada grupo se alinea según el ancho de su acción. 140px = el estado más largo ("✓ Atendido · 10:20 AM", ~135px nowrap).

**Encabezado de grupo (desktop)** — botón ghost: título 10.5/600 uppercase .12em --tt + **chevron 13px inmediatamente a su derecha** (rota 180° al expandir, .5s ease-in-out). El chevron viaja con el texto, no al extremo del contenedor.

## Feed item
Col izquierda 62px (t1 12/600 --ts, t2 10.5 --tt) + divider vertical 1px --divider + texto 13px --tp (gol: dot azul 6px --gol + prefijo 600) + chip producto + "⚡ Nseg" --tt. Items nuevos: ih-up spring + ih-flash 1.2s.

## Tab bar (4 pestañas)
Sticky bottom, fondo --tabbar + blur(14px), borde superior --divider. Tab: ícono 21px + label 10.5/600; activo --tp, inactivo --tt. Pestañas: Inicio · Personas · Agenda · ✨ Preguntar.

## Wordmark / isotipo
Doble <img> superpuesta (dark/light) con opacity var(--iso-dark-op)/var(--iso-light-op). Label "intelligence" 11/600 tracking .34em color --wm-sub.

## Toggle fantasma de tema
Botón ghost 20px ícono (sol/media-luna/luna), opacity .55 (hover 1), hit 44pt, arriba-derecha. Cicla dia→tarde→noche→auto; microlabel "auto" **permanente** (opacity .75) en el dashboard móvil — el modo automático es estado, no notificación (v1.4.2). En el login conserva el fade `ih-autofade` 2.6s (ahí sí es un aviso de entrada). Crossfade global 600ms.

## Input de Preguntar
Pill h48, borde 1px rgba(20,16,8,.12), fondo --input-bg, texto --tp 14px, focus borde --tt. Send: círculo 48px, se activa con texto (fill --btn-bg 200ms). Anclado al fondo del área (contenedor 720px flex column).

**Aviso legal (v1.4.2)** — debajo del input, centrado: "intra intelligence es una IA y puede cometer errores. Por favor, compruebe sus respuestas" en --tt, 10.5px móvil / 11px desktop, line-height 1.4. Es la única vez que el producto dice "IA" (excepción explícita a la regla de copy §7: obligación legal, no lenguaje de producto). Pegado al input (padding inferior del input 4px móvil / 10px desktop) y separado de la tab bar (margen inferior 38px móvil / 22px desktop).

## Burbuja de conversación (Preguntar)
Mensaje del usuario: fondo **--card**, sin borde ni sombra, radius 18/18/4/18, padding 10px 14px, texto --tp 14/1.45, max-width 80% móvil / 70% desktop, `align-self:flex-end`. Por qué --card y no --tonal: el lienzo de Preguntar es crema cálido y --tonal se disolvía en él; la superficie de tarjeta es el único tono del sistema que se despega del fondo en los 3 temas sin agregar cromo. Respuesta del asistente: sin burbuja — dot verde 6px + texto 14/1.6 --tp (la voz del asistente es la página, no una caja).


## Chips de producto — dot mate (v1.0.2)
Todo chip de producto lleva un dot mate de 5px antes del label: `--dot-reserva/--dot-evento/--dot-daypass` (3 tokens nuevos × 3 temas). Razón: en Atardecer y Noche los fondos `--chip-*` colapsan a un mismo tonal; el dot conserva la distinción por producto sin arcoíris. En Amanecer convive con los fondos diferenciados. Ámbar Noche recalibrado a #DDB061 (AA sobre superficies oscuras).

Paleta de dots v1.1.1 — Reserva #ABC4DB/#9AB1D6/#8DA3C6, Evento #CEAB8E/#D8AE8F/#B58D71, Day Pass #D6B06E/#E8BC70/#E5B765 (Día/Tarde/Noche). Nuevo token `--chip-tx` para la tipografía del chip (Día #5E6168, Tarde #E4D8D1, Noche rgba(241,237,228,.68)).

## Agenda (v1.2.0)
La vista temporal de las citas que el asistente agendó. NO es un calendario general: un solo tipo de evento, cero configuración, cero categorías. Header "Agenda" 20/700 + botón "Hoy" (pill --tonal 12/600, ih-fade 200ms) SOLO cuando no estás en la fecha actual. Segmented Día · Semana · Mes = mismo track/thumb del selector de periodo pero 3 segmentos (width (100%-6px)/3). Debajo: título del rango 17/700 tabular-nums ("Jue 16 jul" / "13–19 jul" / "Julio 2026") + botones ‹ › (34px círculo outline --sec-bd, texto --ts). Swipe horizontal en las 3 vistas = periodo anterior/siguiente (umbral 56px, dominante en X ×1.4; el swipe suprime el tap del card 250ms).

**Vista Día** — solo los slots con citas (nada de 24 horas vacías). Card por cita: fondo --card radius 20, sombra --card-sh, columna izquierda 64px con hora 17/600 tabular-nums + dot ámbar 7px si la cita ya pasó su hora y sigue por atender (mismo patrón +24h de Personas) + divider vertical --divider. Contenido: nombre 17/700 + chip de producto (mismo componente), contexto 13px --ts (producto · presupuesto validado), "Llegó {rel}" 10.5px --tt, y a la derecha el MISMO botón Atender / ✓✕ / estado "✓ Atendido · hora" de Personas — estado compartido write-once (flujo[key] idéntico). Tap en el card = sheet de detalle. Vacío: ícono calendario --tt + "Sin citas hoy. Tu asistente sigue atendiendo."

**Vista Semana (v1.3.1 — riel de 7 días)** — en móvil vertical NO hay 7 columnas de cards (ilegibles; las columnas son patrón de landscape/desktop). En su lugar un **riel vertical con los 7 días SIEMPRE visibles** (ref. Fantastical lista semanal): una fila por día separada por --divider, riel izquierdo 44px con dow 10.5/600 uppercase --tt + número 17/600 tabular (hoy = pill circular 30px --btn-bg/--btn-tx; tap en el riel = ese día en vista Día). A la derecha: los días sin citas muestran "Sin citas" 13px --tt (el vacío también informa); los días con citas apilan **tarjetas-píldora** --card radius 14 sombra --card-sh, padding 12px 14px, gap 8: hora 13/600 tabular · nombre 15/700 ellipsis · dot ámbar 6px si venció · ✓ --verde-tx si atendida · **dot de producto** 5px al extremo derecho (misma paleta --dot-*). Sin contexto largo: en semana el ojo escanea. Tap en tarjeta = sheet de detalle. Swipe horizontal = semana anterior/siguiente.

**Vista Mes (v1.3.2 — semana inicia domingo)** — card --card radius 20 con grid 7×5/6, **header D L M M J V S** (semana inicia domingo, patrón calendario iOS/mock). Número del día 13px; hoy = pill circular 28px --btn-bg/--btn-tx. Dots bajo el número: 1 cita = 1 dot, 2–3 = 2, 4+ = 3 (proporción visual, patrón Timepage), 4px color --gol. Días sin citas quedan limpios. Tap en un día = vista Día de ese día. Mismo layout y semana-domingo en desktop (celdas grandes, número 17px + pill 38px + dots 5px centrados; se retiraron los chips-con-nombre para igualar la limpieza del mock).

**Card de cita (v1.3.2 — hora en línea)** — mobile y desktop: card --card radius 20, `flex-direction:column`. Fila superior: dot ámbar (si venció) · **hora 16-17/600 tabular · nombre 16-17/700 ellipsis** en la misma línea · chip de producto al extremo derecho (se retiró la columna de hora + divisor vertical). Debajo: contexto 13px --ts. Footer (`align-items:flex-end` desde v1.4.2): "Llegó {rel}" 10.5 --tt alineado con la base del botón Atender / del estado, no centrado con ellos.

**Sheet de detalle** — el mismo de Personas ("Lo que pasó"), con campo "Cita" (Jue 16 jul · 11:00 AM) al inicio de los datos. Personas de agenda que no viven en Personas salen del pool CITAS_P.

## Desktop (v1.3.0) — re-arquitectura, no mobile ampliado
Lienzo fijo 1440×900, radius 24px. Estructura: nav lateral 248px + main flex. TODO cabe sin scroll en Inicio; Personas/Actividad scrollean dentro del main. Cero tokens nuevos.

**Nav lateral (248px, contexto vivo)** — fondo --nav-bg (día #F7F5EF, tarde/noche panel recesado rgba(0,0,0,.20/.24) para que la columna se lea como superficie en los 3 temas), borde derecho --divider, padding 26/14/20. Header: isotipo 28px + nombre de propiedad 15/700 + "Asistente comercial" 10.5 uppercase --tt. Items = navStyle: padding 12, radius 12, 13/600; activo fondo --seg-track + --tp, reposo --ts; ícono 18px. Conteos a la derecha (badge --tonal, 11/700 tabular): Personas = por atender, Agenda = citas de hoy. Abajo del todo: **Próxima cita** (eyebrow 10.5 uppercase + "11:00 AM · Nombre" 13/600 tabular; tap → Agenda · Día) y fila de usuario (avatar iniciales 30px --tonal + nombre 12.5/600 + rol 10.5 --tt) sobre border-top --divider. El toggle fantasma de tema NO vive aquí: va arriba-derecha del contenido (mismo componente del mobile). **Colapsable (experimento):** botón circular (34px, --card + borde --divider + sombra suave) montado sobre la orilla derecha del nav a la altura del logo (fuera del nav, straddling el borde; se desliza con el borde al togglear) comprime a riel de 84px (icon-only): oculta nombre de propiedad, etiquetas, conteos, "Próxima cita" y nombre de usuario; centra isotipo, íconos y avatar; transición de ancho .28s. Estado por variante (navCol+K), arranca expandido.

**Fila 1 de Inicio** — isla viva 490px (padding-left 34, dot verde absolute left 16; cuando el asistente teclea se oculta el segmento derecho para que "Respondiendo a alguien" + dots respiren) + selector de periodo 400px + "N mensajes respondidos {frase}" 13px a la derecha, bajo el toggle de tema.

**Bento de Inicio** — grid 12 columnas, gap 14. Fila 2: hero span 7 + columna span 5 apilada: aviso proactivo (tap → Personas) · aviso resuelto · De dónde vienen (flex:1). Fila 3: **Próximas citas · hoy** (span 6) + **Últimos goles del asistente** (span 6), mismo alto.

**Hero desktop — jerarquía por propiedad (v1.4.2)** — Hampton (estándar): eyebrow "OPORTUNIDADES REALES ›" + número display 88px + delta. Nikché (transaccional): manda el dinero, igual que en móvil — eyebrow "Cobrado por tu asistente" + cifra 56px + "MXN" 17px, una sola línea con "▲ delta · vs periodo · Dinero verificado — cobrado directo por el sistema.", divisor rgba(255,255,255,.12) y debajo la línea secundaria "N oportunidades reales ▲ delta vs periodo ›" (número 32px, margen derecho 6px). La tarjeta "Cobrado por tu asistente" de la columna derecha se eliminó: era el mismo dato dos veces. **Excepción**: si el filtro de chips deja el cobrado en $0 (Eventos no se cobran en línea), el hero vuelve al layout de oportunidades 88px — nunca se muestra un $0 protagonista. El aviso "Detectamos menos actividad…" ahora aparece en las dos propiedades.

**Mini-sparkline del hero** — SVG 300×88 preserveAspectRatio none bajo el delta, gradiente --siri del tema, punto final con glow. Caption "Tendencia · {rango}" 10.5 uppercase blanco .38. Es contexto de tendencia, no gráfica: sin ejes, sin labels de datos. Solo desktop.

**Tooltip del sparkline (v1.4.2)** — al pasar el cursor: píldora frosted (rgba(255,255,255,.16) + blur 5) con la **cifra** 11/700 tabular y **debajo su fecha** 9px uppercase .05em al 72% — horas en Hoy ("10 AM"), día + mes en Este mes / Mes pasado ("15 jun"), mes en 90 días; el último punto siempre dice "hoy" (o "30 jun" en un mes cerrado). Un dato sin cuándo no es un dato.

**Widget Próximas citas · hoy** — card --card radius 20, header 10.5 uppercase --tt + "Ver agenda →" --link 12.5/600. Hasta 4 filas: hora tabular 64px derecha · divider vertical · nombre 14/700 · chip de producto · dot ámbar 7px (venció) o ✓ --verde-tx. Tap → Agenda · Día + panel de detalle. Vacío: "Sin citas hoy. Tu asistente sigue atendiendo."

**Widget Últimos goles del asistente** — los 3 hitos más recientes con gol=true (cita confirmada, presupuesto validado, cobro/liga de pago). Mismo spec del feed item (col tiempo 70px, dot --gol 6px, prefijo 600, chip) pero sin "⚡ seg". Footer del header: "Ver toda la actividad →" abre el feed completo (chips de filtro propios del desktop, col tiempo 80px, max-width 860).

**Panel lateral de detalle (desktop)** — reemplaza al sheet: aside 380px, **fondo --nav-bg** (v1.4.2: la misma superficie recesada del nav lateral — el panel es chrome, no contenido; en Atardecer/Noche hereda el panel oscuro rgba(0,0,0,.20/.24)), borde izquierdo --divider, entrada ih-fade 250ms, botón ✕ ghost. Mismo contenido del sheet (nombre 18/700 + chip, tabla de campos, Estado con Atender/✓✕ write-once, "Lo que pasó"). Vive como hermano del contenido en Personas Y Agenda (comparten estado detD); cambiar de pestaña lo cierra.

**"Lo que pasó" — columna de tiempo (v1.4.2)** — título del bloque con 10px de aire sobre la card (antes 2px). La columna izquierda (76px, "hace 9 min" / hora) va **alineada a la derecha**, 12/600 --ts con `text-align:right` para que los valores que se parten en dos renglones no se desalineen. Mismo tratamiento en el widget "Últimos goles del asistente" (col 70px) y en las hojas móviles: una sola escala de tiempo en todo el producto.

**Entrada de sección (v1.4.2)** — al cambiar de pestaña en desktop (Inicio · Personas · Agenda · Preguntar) el contenido entra con `ih-rise .32s cubic-bezier(0.22,0.61,0.36,1)` (sube 9px + fade), el mismo gesto del panel de detalle. Solo desktop: en móvil las pestañas ya tienen sus propias transiciones de scroller.

**Botón de colapso del nav (v1.4.2)** — círculo 28px montado sobre el borde derecho del nav a `top:46px`, centrado con el isotipo del header. Su `transition: left .5s cubic-bezier(0.4,0,0.2,1)` es EXACTAMENTE la del ancho del nav: si difiere, la flecha se despega del borde a media transición.

**Agenda desktop** — header único: "Agenda" 20/700 + Hoy + título del rango 15/700 tabular + ‹ › + segmented Día/Semana/Mes 280px. **Día**: cards de cita (col hora 72px) a la izquierda + mini-mes 320px a la derecha (celdas 24px, día seleccionado = pill --btn-bg, hoy = 700, dot 3px --gol; tap cambia el día). **Semana**: aquí SÍ 7 columnas (patrón landscape); columna de hoy con fondo --tonal, header dow 10.5 uppercase + número (hoy pill 26px), citas como mini-cards --card (hora 11/600 tabular + dot de producto + nombre corto; tap → Día + detalle). **Mes**: card full-screen, celdas 1fr con número (hoy pill) + hasta 2 citas nombradas (chip --tonal 11/600: "9:00 AM · Nombre") + "+N más"; tap → Día.

**Personas desktop** — renglón horizontal (rowEstiloD): nombre 230px fijos + chip + contexto flex:1 ellipsis + rel + acción write-once. Filtros de estatus/producto/export = mismos popovers, estados de apertura propios del desktop (los valores de filtro sí se comparten con mobile: misma data). Detalle → panel lateral, no sheet.

**Preguntar desktop** — columna centrada max-width 860 (input 720): Presencia V7 a 190px, wordmark + "intelligence", sugerencias en grid 2×2 (cards 12.5px borde --sec-bd radius 14, text-align left). Mismo chat (chSend/typewriter) con estado propio del desktop; halo "pensando" full-bleed a nivel del lienzo 1440×900.

## Switch (control único del sistema, v1.5.0)
Cero controles nativos. Tres capas: **botón-pista transparente** (44×26 en panel, 38×22 en fila) + **pista** `inset:0` radius 999px + **perilla** 20px/16px `--sw-knob` con sombra `0 1px 3px rgba(20,16,8,.28)`.
- Off: pista `--sw-off`. On: pista `--btn-bg`.
- **Opacidad de la pista encendida: 100% en Amanecer, 80% en Atardecer y Noche** (el negro/crema macizo pesaba demasiado sobre superficies oscuras). La perilla SIEMPRE va al 100% — por eso la pista es una capa aparte y no el fondo del botón.
- Perilla: `transform: translateX(ancho − perilla − 6)` con spring 220ms; pista con `background/opacity .2s ease-out`.
- Estado bloqueado (p. ej. el genérico ya asignado): `cursor:not-allowed`, sin cambio de color — el bloqueo se explica en microcopy + toast, nunca solo con gris.

## Diálogo de confirmación centrado (v1.5.0)
Sustituye a la "zona de peligro" al pie del panel. Overlay `inset:0` DENTRO del panel lateral: fondo `--panel-scrim` + `backdrop-filter: blur(10px) saturate(.9)`, entrada ih-fade 200ms. Tarjeta centrada max-width 330px, radius 20px, fondo `--card`, borde `--divider`, sombra `--card-sh`, texto centrado: pregunta 15/700 + microcopy 12.5px `--tt` + par de botones centrados (acción sólida `--btn-bg` + Cancelar outline), entrada ih-up 220ms spring.
**Sin rojo**: la acción destructiva usa el negro/crema del sistema (`--btn-bg`). `--danger*` queda reservado para señales de error de datos, no para confirmaciones.

## Productos — catálogo (v1.5.0)
El cuarto de configuración del catálogo: define los servicios que el asistente reconoce. Vive en el nav lateral del desktop (ítem "Productos" con conteo) y como hoja propia `Productos.dc.html`. Cada propiedad tiene su catálogo.

**Lista** — tarjeta `--card` radius 20px padding 6/8. Fila (padding 9/14, borde inferior `--divider`, radius 12, hover `--hover`, fila del producto abierto `--tonal`, deshabilitado opacity .55, entrada ih-up escalonada 35ms): icono 30px en cuadro `--tonal` radius 9 · chip del producto (dot `--chip-N` + fondo `--chip-bg-N`) · badge "GENÉRICO" (outline `--sec-bd`, 10/600 uppercase) · spacer · **precio** 12px `--ts` tabular alineado a la derecha · oportunidades 12.5/600 `--tp` · switch 38×22 · kebab "···" con popover (Editar · Duplicar · Eliminar). Última fila: "+ Nuevo producto" con círculo dashed.

**Panel lateral** — 480px, fondo `--nav-bg`, borde izquierdo `--divider`, entrada ih-slide 320ms; el contenido de la lista cede con `padding-right` en la misma curva. Head: nombre 18/700 + ↑↓ (navegación entre productos, también con flechas del teclado) + ✕ (Esc). Debajo, el chip del producto en vivo. Secciones en tarjetas `--card` radius 16:
1. **Identidad** — solo *Nombre* (el plural se eliminó en v1.5.0: el asistente usa un único nombre en todo el dashboard).
2. **Color del chip** — 9 swatches `--chip-N` (34px, anillo `--tp` 2px en el activo).
3. **Icono** — grid 6×2 de 12 iconos (40px, activo con borde 1.5px `--btn-bg` + fondo `--tonal`) + preview "Así se verá en Inicio" con la pill real.
4. **Comportamiento** — Habilitado · Producto genérico.
5. **Precio** — "Precio establecido" con la palabra **Opcional** a su lado (sin switch: el campo vacío ES el estado apagado). Input monto: `$` + cifra tabular + sufijo MXN, solo dígitos y un punto decimal.

**Pie** — "Eliminar producto" (outline neutro) a la izquierda de **"Guardar"**; el botón de guardar es outline mientras no hay cambios y **se pone negro sólido (`--btn-bg`) en cuanto algo del producto cambia** (nombre, color, icono, precio, switches) — comparación contra un snapshot tomado al abrir el panel. En modo nuevo: "Descartar" + "Crear producto".

**Regla del genérico (v1.5.0)** — SIEMPRE existe exactamente un producto genérico y no se puede desactivar: los leads fuera del catálogo caen ahí.
- Tap en el switch del genérico actual → no lo apaga; toast "Siempre debe haber un genérico: asígnalo a otro producto para moverlo".
- Tap en otro producto → diálogo centrado "¿Cambiar el producto genérico?" con el detalle "El rol pasará de X a Y"; al confirmar, el rol se mueve en un solo paso.
- Al eliminar el genérico, el rol lo hereda el primer producto habilitado y el toast lo dice.

**Copy** — "oportunidades", nunca "leads" en la UI de lista; microcopy en `--tt`.

## Captura al resolver e Historial (v1.5.0)
Módulo que vivía solo en prototipo (`Captura y Reportes -secciones 4a-4e-.dc.html` + secciones del dashboard desktop).

**Captura opcional al resolver** — al marcar ✓/✕ se ofrece capturar el cierre: popover en escritorio, sheet en móvil, en los 3 temas. Reglas: el estado se guarda al tap (la captura nunca bloquea) · **Deshacer 5s revierte TODO** (estado + captura) · motivo y monto sí son editables después · "Se reagendó" es grupo propio, no un motivo de pérdida.

**Historial — tabla de citas** — tabla densa con 3 densidades (compacta/cómoda/amplia), filtros de producto y resultado como chips removibles, **gestor de columnas** (popover con orden, "Mostrar todas" y "Restablecer"), **vistas guardadas** (incl. "Mi vista" persistida), pill de umbral, panel lateral de detalle con campos editables, y estados default/filtros/cargando/vacío. Cero tokens nuevos: reusa card, popover, chips y panel del sistema.

## Historial de conversaciones de Preguntar (v1.5.1)
Preguntar guarda todo lo que el hotelero ya le preguntó. No es otra pantalla ni un panel lateral: es el MISMO lienzo con otro contenido, y se alterna con un solo botón.

**Botón** — círculo de 48px (44px en móvil) con ícono de reloj y flecha, **a la derecha del botón de enviar** (enviar siempre queda primero). Usa los mismos colores que enviar: reposo fondo `--tonal` + ícono `--tt`; con el historial abierto fondo `--btn-bg` + ícono `--btn-tx`. Pressed scale(.94). Sin dot ni badge: el estado se lee en el propio botón.

**Estado de entrada** — Preguntar sigue abriendo con la Presencia, wordmark, frase y las 4 sugerencias (`chEmpty`, anclado arriba, padding 52/28/0). El historial sustituye esa capa; al volver, la Presencia queda intacta.

**Hilo continuo** — un solo scroll con TODAS las conversaciones, lo más antiguo arriba y lo de hoy abajo; al abrir, el scroll ya está hasta el final (`histFondo`, también en el frame siguiente) y subiendo aparecen los días anteriores hasta el rótulo "Aquí empieza tu historial con el asistente" (11px `--tt`, centrado).

**Pill de fecha** — 24px de alto, fondo `--tonal`, texto 10.5/600 uppercase tracking .1em en `--tt`, centrada sobre el primer mensaje de cada día. Orden: Hoy · Ayer · día de la semana (últimos 7 días) · fecha corta. La hora exacta vive dentro de la burbuja de la pregunta (10px tabular `--tt`).

**Burbujas** — las mismas de la conversación viva: pregunta `--card` radius 18/18/4/18 max-width 78% (82% móvil) con la hora a la derecha; respuesta con dot `--verde` 6px + texto 14/1.6 `--tp`, max-width 90%.

**Datos** — un historial por propiedad (`CH_HIST.E` / `.T`): Hampton habla de oportunidades y tiempos; Nikché de dinero cobrado y ligas de pago. Las preguntas del historial son las mismas del canon de Preguntar, nunca inventadas por superficie.

## Toggle de vista — tabla / kanban (v1.6.0)

Segmented de dos valores, **mismos tokens que el selector de periodo**.

- Track: `position:relative; display:flex; padding:3px; border-radius:999px; background:var(--seg-track,#EFECE4); margin-left:10px; flex:none`.
- Thumb: `top/bottom:3px; left:calc(3px + i*(100% - 6px)/2); width:calc((100% - 6px)/2); border-radius:999px; background:var(--seg-thumb,#FFFFFF); box-shadow:0 1px 2px rgba(20,16,8,.1); transition:left .25s cubic-bezier(0.34,1.2,0.64,1)`.
- Botón: 44×38, icono 15px, `color: on ? var(--tp) : var(--ts)`, `transition:color .15s ease-out`.
- Iconos: tres líneas (lista) y dos columnas (kanban). Nunca texto.

## Encabezado de tabla ordenable (v1.6.0)

Usado en Historial, Soporte y Personas.

- Base: `10.5px / 600 / letter-spacing .12em / uppercase`, `white-space:nowrap; overflow:hidden`, `display:flex; align-items:center; gap:5px`.
- Inactivo `--tt`; activo `--tp`; `style-hover:color:var(--tp)` solo si ordena. `cursor:pointer` y `user-select:none` solo si ordena.
- Flecha ↑/↓ de 11px a la derecha del rótulo, **visible únicamente en la columna activa**.
- `aria-sort="ascending|descending|none"`.
- Columnas de texto libre (Detalle) se declaran no ordenables: mismo estilo, sin cursor, sin hover, sin handler.
- Claves no alfabéticas se normalizan antes de comparar (ver "Llegó" → minutos, DESIGN §15).

## Toast del sistema (v1.6.0)

Uno solo, con dos duraciones.

```
wrapper  position:absolute; left:calc(16px + navW + 32px); right:28px; bottom:22px;
         display:flex; justify-content:center; pointer-events:none;
         animation: ih-up .3s cubic-bezier(0.34,1.2,0.64,1) both
pastilla display:flex; align-items:center; gap:12px; padding:10px 16px; border-radius:999px;
         pointer-events:auto; max-width:100%;
         background:color-mix(in srgb, var(--card,#FFFFFF) 74%, transparent);
         backdrop-filter:blur(18px) saturate(150%);
         border:1px solid var(--divider,#EFECE4);
         box-shadow:0 14px 34px -14px rgba(0,0,0,.4)
texto    12.5px / 600 / var(--tp);   acción "Deshacer" 12.5px / 700 / var(--link)
salida   ih-toast-out .22s ease-in
```

- `navW` = 248px (84px con el nav colapsado).
- Con panel lateral abierto, el wrapper vive dentro de la columna de contenido y descuenta el ancho del panel (Productos: `right: 512px`).
- Duración: 3600ms informativo, 5000ms con Deshacer.

## Menú de barra + scrim (v1.6.0)

- Popover: `position:absolute; top:44px; right:<distancia del botón al borde derecho de la barra>; z-index:31; animation:ih-pop .18s ease-out both; transform-origin:top right; background:var(--card); border-radius:14px; box-shadow:0 12px 40px -12px rgba(20,16,8,.3), 0 1px 2px rgba(20,16,8,.08); padding:8px`.
- El `right` se calcula con los anchos reales de los botones intermedios (32px cada uno + 6px de gap). En Personas: Estatus 76, Filtrar 38, Exportar 0.
- Scrim obligatorio mientras haya un menú abierto: `position:absolute; inset:0; z-index:30` con `onMouseDown` que cierra los tres.

## Widget "Pregúntale a tu asistente" (v1.6.0)

```
card     border-radius:20px; background:var(--card); padding:18px 22px 20px;
         box-shadow:var(--card-sh); display:flex; flex-direction:column; gap:12px
label    10.5px / 600 / .15em / uppercase / var(--tt)
input    height:44px (móvil 40); padding:0 18px; border-radius:999px;
         border:1px solid rgba(20,16,8,.12)  →  foco rgba(20,16,8,.28);
         background:var(--input-bg); color:var(--tp); font-size:14px (móvil 12.5)
         placeholder: input[data-ph-soft]::placeholder{color:var(--tt);opacity:.62}
enviar   44×44 (móvil 35) FUERA del campo; border-radius:999px;
         background:#E4E0D8; color:#8A8C93; opacity:.45 → hover 1; active scale(.94); glifo ↑
chips    solo desktop; flex-wrap; gap:8px; padding:8px 13px; border-radius:999px;
         border:1px solid var(--divider); font-size:12px; color:var(--ts)
```

Enter, ↑ y chips: navegan a Preguntar, limpian el campo y llaman al envío del chat 80ms después.

## Botón Atender — hover sólido (v1.6.0)

WhatsApp y ✓ comparten el hover de los ✓/✕ de En seguimiento:

```
style-hover   background:var(--btn-bg,#0A0A0A); color:var(--btn-tx,#fff); border-color:var(--btn-bg,#0A0A0A)
style-active  transform:scale(0.94)
```

Aplica en tabla, kanban y panel de detalle del desktop.

## Soporte — bandeja (v1.6.0)

Hero negro "Estado de tus reportes", buscador, filtro de fechas (rangos + calendario), campana de novedades con "marcar todo como leído" y tabla Reporte · Creado · Estado con encabezados ordenables. Estados y microcopy fijos: pendiente "Recibimos tu reporte." · en progreso "Nuestro equipo está trabajando en esto." · resuelto "Este caso quedó cerrado.". Empty state: "Todo en orden".

## Menú de columnas con footer sticky (v1.6.0)

- Popover estándar de barra; la lista de columnas scrollea y **el footer no**: `position:sticky; bottom:0` con fondo `var(--card)` y borde superior `--divider`, texto "Se guarda automáticamente" en 11px `--tt`.
- Sin botón Guardar ni Cancelar: cada toggle escribe en `localStorage` (`ih-rep-prefs`).

## Encabezado fijo de Personas — móvil (v1.6.0)

- Título, selector de periodo, resumen y buscador viven en un bloque fijo; la lista scrollea debajo.
- Al scrollear, el bloque gana `backdrop-filter: blur(...)` y fondo semitransparente sobre `--scrim`; en reposo es opaco.

## Composer — móvil (v1.6.0)

Campo 38px · botones 35px · texto 12.5px. No es el composer de escritorio escalado: se recalibra.

## Chip de filtro "Hasta" (v1.6.0)

Chip removible estándar con el rótulo `Hasta <fecha>` (la serie de la gráfica es acumulada). Se limpia al cambiar de periodo.
