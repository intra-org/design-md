# DESIGN.md — intra hotelero · v1.6.0 (ago 2026)

Sistema de diseño AUTÓNOMO del producto hotelero de intra (dashboard "tu asistente comercial").
No hereda ni referencia a ningún otro sistema; todo lo necesario vive en este paquete.

**Cómo leer este paquete (para diseño y desarrollo):**
- `DESIGN.md` (este archivo) — las reglas y la filosofía. El *porqué* y el *qué*.
- `tokens.json` — los 85 tokens semánticos × 3 temas. La única fuente de verdad de color/superficie. Dev consume esto.
- `themes.md` — cómo se derivan Atardecer y Noche desde Amanecer.
- `components.md` — spec de cada componente con medidas, estados y transiciones. El *cómo*.
- `motion.json` — curvas y duraciones nombradas.
- `presencia.md` — spec de la Presencia V7 (el "Siri") y sus estados de vida.
- `dashboard-hotel-intra.dc.html` / prototipo vivo — la referencia ejecutable (2 teléfonos end-to-end + 2 desktops de 5 secciones, 3 temas).
- `Productos.dc.html` — la hoja del catálogo (lista, panel de edición, estado vacío y tokens nuevos), fuente de la sección Productos del desktop.
- `Captura y Reportes -secciones 4a-4e-.dc.html` — la propuesta de captura al resolver + Historial (tabla de citas).
- `Preguntar historial.dc.html` — la hoja del historial de conversaciones de Preguntar (escritorio y móvil), fuente de la pieza integrada al prototipo.
- Exploraciones vivas, NO canon: `Navbar experimento.dc.html`, `Comparacion navbar activo.dc.html`, `comparacion-halo.dc.html`, `dashboard-desktop.dc.html`, `Atender WhatsApp (propuesta).dc.html`.

**Regla de oro para dev:** ningún color hardcoded en pantallas de producto. Todo sale de `var(--token)`. Un `#hex` en una vista de la app es un bug (ver regresiones v1.0.9 §11).

## 1. Filosofía
- **Lujo silencioso**: crema editorial, tinta cálida, superficies mate; la restricción ES el lujo. 1000 no's por cada sí.
- **Un solo protagonista negro por pantalla**: el hero. Nada más compite en valor (la isla viva perdió su fondo negro por esto).
- **El sistema vivo es la firma**: dot verde pulsando + isla viva + presencia. La vida se comunica con luz y movimiento, no con cromo.
- **El número primero**: cifras tabulares siempre; el dinero cobrado manda en propiedades transaccionales, las oportunidades en estándar.
- **StoryBrand**: el héroe es el hotelero; el asistente es el guía. Hablamos de resultados, no de features.

## 2. Tipografía
- **Familia única**: Schibsted Grotesk (400/500/600/700). Sin monospace, sin serifas. Etiquetas = misma sans en MAYÚSCULAS con tracking .12-.15em.
- **Escala de texto (8 tamaños)**: 10.5 / 12 / 13 / 15 / 17 / 20 / 24 / 72. Nada de texto de cuerpo fuera de escala.
- **Familia display (números-héroe, aparte de la escala de texto)**: cifras protagonistas del hero que responden a su contenedor — 56px (hero transaccional Nikché), 72px (hero mobile estándar), 104px (hero desktop). Son *display*, no texto; escalan con el ancho del hero, no con el ritmo de lectura. Cualquier otro número vive en la escala de 8.
- **Ritmo vertical 4pt**: padding/margin/gap solo en múltiplos de 4 (8,12,16,20,24…).
- **tabular-nums en TODA cifra** (font-variant-numeric + "tnum").
- **Moneda**: $86,400 MXN — formato mexicano, MXN solo en la primera mención de cada tarjeta; decimales del MISMO color que el entero.

## 3. Color semántico (regla, no paleta)
- Base **monocromática al 95%**: tinta/grafito/crema. El color responde una pregunta o no va.
- **Azul** = gol del asistente (dot 6px) y links. **Verde** = sistema vivo (dot pulsando) y comparativo positivo (▲). **Ámbar** = urgencia +24h sin atender.
- **Señal nunca solo-color**: gol lleva prefijo en negrita ("Cita confirmada:"), ámbar lleva microtexto "· Sin atender +24 h". Test de escala de grises obligatorio.
- Valores exactos por tema → `tokens.json` (85 tokens semánticos × 3 temas, extraídos 1:1 de producción).
- **Paleta del catálogo (`--chip-1…9`)**: los 9 colores que el hotelero puede asignar a un producto. Distinguen, nunca significan; el dot los lleva y el pill usa `--chip-bg-N` (tonal única por tema).
- **Chips de producto**: además del fondo `--chip-*`, cada chip lleva un **dot mate 5px** antes del label (`--dot-reserva/--dot-evento/--dot-daypass`). En Amanecer conviven fondo + dot; en Atardecer/Noche los fondos colapsan a un tonal y el **dot** conserva la distinción por producto sin arcoíris.

## 4. Temas (Amanecer / Atardecer / Noche)
Resumen — el sistema completo en `themes.md`:
- **Amanecer es el maestro** (valores de producción); Atardecer y Noche son hermanos: mismo cuarto, otra hora. Identidad se conserva, luminancia se calibra (verde/azul/ámbar ajustan valor/saturación, jamás matiz).
- Activación por hora local de la propiedad: 6-17h Amanecer · 17-20h Atardecer · 20-6h Noche. Sin timezone conocida → Amanecer.
- Lo que NUNCA cambia entre temas: tipografía, radios, espaciado, estados relativos (scale/darken), motion.
- El **hero permanece oscuro en los 3 temas** (regla del protagonista único); solo su glow cálido es temable.
- Chips de producto: diferenciados por producto SOLO en Amanecer; en oscuros colapsan a tonal única.
- Frosted glass (rgba(22,23,27,.78) blur16 sat180) SOLO en estados sticky, nunca en reposo.
- Wordmark/isotipo: versión dark en Amanecer, light en oscuros (doble <img> con opacidad por token).

## 5. Motion
Tokens exactos en `motion.json`. Reglas: solo transform/opacity (GPU); pressed 120ms; spring cubic-bezier(0.34,1.2,0.64,1) 250-300ms para todo lo que entra; salidas 250ms ease-in; los botones viven quietos hasta que se tocan (prohibida la respiración en reposo); prefers-reduced-motion en todo.
Piezas coreografiadas clave (spec en `motion.json`): **entrada-seccion-desktop** (ih-rise 320ms al cambiar de pestaña), **coreografia-tema** (crossfade narrativo al cambiar de tema, ~750ms escalonado superficies→texto→señales→Presencia), **tabbar-shrink** (la pill se contrae al bajar), **pulso-pensando-halo** (halo iridiscente mientras el asistente piensa).

## 6. Componentes
Spec completo con estados y medidas en `components.md`. Reglas transversales:
- Touch target ≥44pt real: hit-area invisible +7px en todo botón (::after inset -7px).
- Pressed: scale(0.97) + darken 120ms. Hover filas: fondo --hover 150ms. Focus-visible: outline 2px --link offset 2px.
- Radios: pills/botones 999px · tarjetas 18-22px · popovers 14px · badges 6px.
- Scrollbars ocultos globalmente; todo scroll horizontal lleva fade de 24px al borde.
- **Tab bar = pill flotante, dos estados** (no barra full-width). Reposo 64px con labels; contraída 48px solo íconos + dot bajo el activo. Glass translúcido `color-mix(--tabbar 38%, transparent)` + blur(20px) = deja pasar la luz del fondo. Elevada ~24px del borde. Se contrae al bajar y NO se reabre al parar el scroll — vuelve a reposo al llegar arriba o al tocar/rozar la pill. Aplica en Inicio · Personas · Actividad (comparten scroller); en Preguntar queda quieta (input anclado). Spec en `components.md`.
- **Halo "pensando"**: mientras el asistente piensa (piso 5s), halo iridiscente full-bleed que roza TODO el borde de la pantalla (banda ~22px, sin línea/contorno), con la paleta `--siri-*` completa del tema activo. Reemplaza al viejo pulso de contorno.
- **Desktop (v1.3.0)**: re-arquitectura completa a 1440×900 — nav lateral 248px con contexto vivo, bento box de Inicio sin scroll, panel lateral de detalle, Agenda con Semana de 7 columnas y Mes full-screen, Preguntar centrado. Las 4 pestañas × 2 propiedades (2a/2b) × 3 temas. Spec en components.md § Desktop.

## 7. Copy (StoryBrand, es-MX cálido-premium)
- **Prohibido**: "calificadas" (es "oportunidades reales"), "leads", "conversión", "dashboard", "IA", jerga técnica, anglicismos evitables.
- **Permitido/canon**: "Tu asistente", "oportunidades reales", "personas atendidas", "Mientras dormías", "Lo que pasó" (detalle de persona), "N oportunidades esperan a tu equipo", "Cobrado por tu asistente".
- Saludos por hora en login: Buenos días / Buenas tardes / Buenas noches.
- El asistente informa logros en pasado y verificable: "Dinero verificado — cobrado directo por el sistema."
- **Única excepción a "prohibido IA"**: el aviso legal bajo el input de Preguntar — "intra intelligence es una IA y puede cometer errores. Por favor, compruebe sus respuestas". Obligación legal, no lenguaje de producto; en --tt, nunca destacado.

## 8. Accesibilidad
- AA en toda combinación texto/fondo en los 3 temas (auditado; p.ej. insight en Noche a rgba(241,237,228,.84), text-secondary Atardecer a .8).
- Touch ≥44pt, focus visible, haptics (impactOccurred light) al marcar atendido y confirmar filtro, reduced-motion, color nunca única señal.

## 9. Arquitectura de datos y estados
- **Write-once**: el stamp "✓ Atendido · hora" se escribe una vez y no se recalcula.
- **Deduplicación**: una persona = una oportunidad viva; los eventos del feed enlazan a la misma persona (pid).
- **Timezone de la propiedad** manda (hora del demo fija 9:41 AM).
- Estadística honesta: mediana, no promedio; todo estimado se etiqueta "estimado".
- **El handoff termina en atendido → seguimiento → confirmado/no confirmado. NO somos CRM**: cero estados post-handoff.
- Flujo de Personas: Por atender → (Atender) → En seguimiento → ✓/✕ → Atendidas. Filtros por producto y por estatus combinables, chips removibles.

## 10. Extras extraídos (decisiones que solo vivían en código/chat)
1. Tokens nacidos al aplicar temas en pantalla real: --hover, --seg-track/--seg-thumb, --night-bg/--night-bd, --scrim, --wm-sub, --chip-{reserva,evento,daypass}, --dot-{reserva,evento,daypass}, --tabbar, --input-bg, --siri-* (11). Total del sistema: 52 tokens × 3 temas.
2. La isla viva: ancho fijo = selector de periodo, dot anclado izquierda (absolute left:14px), texto alineado a la izquierda, crossfade 250ms; NUNCA cambia de tamaño al rotar (patrón Now Playing).
3. Selector de periodo: 4 segmentos (Hoy · Este mes · Mes pasado · 90 días) full-width, thumb deslizante spring 250ms; "Hoy" oculta la frase de cierre del hero (números de un dígito no cuentan historia).
4. Hero: label sin estado duplicado ("OPORTUNIDADES REALES ›" fijo — el periodo vive en el selector, el filtro en el chip).
5. Filtro de chips del hero: multi-select, recalcula count-up 420ms y "De dónde vienen" con reparto proporcional (splitCanales con residuo mayor).
6. Login: picker de propiedades post-auth (misma escena, form cede con fade 450ms, cascada 70ms stagger); selección manual de tema NO persiste (siempre Auto al volver); el overlay del login se DESMONTA tras entrar (bloqueaba el scroll).
7. Scroll-edge effect: scrim 88px + isla frosted; el status bar del frame sigue el tema del login.
8. Feed: "Mientras dormías" es contenedor propio (--night-bg + filo cálido) con ícono luna ámbar; items nuevos entran con ih-up + flash 1.2s; timestamps col 62px + divider vertical.
9. Botón Atender: outline reposo, fill SOLO hover/pressed, peso adaptativo en filas ámbar (borde #B3ADA0 + fondo tonal). Sin animación en reposo. **Lleva el logo oficial de WhatsApp 14px a la izquierda del label** (`fill: currentColor`, gap 6, padding 10/14 simétrico desde v1.4.2): el ícono dice dónde ocurre la conversación, no adorna. Nunca el verde de marca ni un glifo macizo. La transición del botón NO incluye `color` — si el color se anima, arrastra al ícono por `currentColor` y el glifo se lee como desvanecido; texto e ícono deben cambiar en el mismo frame.
10. Popovers se cierran mutuamente (estatus/producto/export); radio behavior; chip removible reutiliza el patrón exacto del de producto.
11. Sheet de detalle: drag-to-dismiss real (>120px cierra, si no snap-back spring), handle 36×4.
12. Datos demo canónicos: Hampton Demo (estándar) y Nikché Demo (transaccional), nombres yucatecos, periodos hoy/mes/junio/90d coherentes entre hero, chips, atribución y Personas.

## 11. Agenda (v1.2.0)
El cuarto donde vive el compromiso temporal. Personas responde "quién falta atender"; Agenda responde "cuándo tengo qué hacer".
- **Regla de oro**: NO es un calendario general. Un solo tipo de evento (citas del asistente), cero configuración, cero categorías, cero eventos externos. Restricción como lujo — esa es la ventaja sobre un calendario genérico.
- **Diferenciador**: cada cita trae el contexto que solo intra tiene — producto, presupuesto validado, cuándo llegó la persona y estado por atender/atendido. Ese contexto es el switching cost.
- **3 vistas** (Día default · Semana · Mes) con el mismo segmented del sistema; navegación ‹ ›, swipe horizontal y botón "Hoy" solo cuando no estás en hoy. Spec completo en components.md § Agenda.
- **Write-once compartido**: el botón Atender de una cita es el MISMO componente y el MISMO estado que en Personas; atender desde Agenda mueve a la persona en Personas y viceversa.
- **Señales**: ámbar = la cita pasó su hora y sigue por atender (mismo patrón +24h); --gol = dots del mes (la cita es el gol del asistente). Cero tokens nuevos.
- **Sin creación manual**: el asistente crea las citas; el vendedor solo las gestiona. Notificaciones viven en WhatsApp, no aquí.
- **Copy**: "citas del asistente", "Sin citas hoy. Tu asistente sigue atendiendo." Nada de "eventos" ni jerga de calendario.


## 12. Productos — el catálogo (v1.5.0)
El cuarto de configuración: define los servicios que el asistente reconoce y que alimentan chips, pills e ingesta. Spec en `components.md § Productos`.
- **Nombre único** (el plural se eliminó): un solo nombre viaja a todo el dashboard. El color viaja a todo; el **icono solo a las pills de Inicio**.
- **Siempre existe exactamente un producto genérico** y no se puede desactivar: los leads fuera del catálogo caen ahí. Moverlo es un cambio explícito con advertencia ("El rol pasará de X a Y"); al eliminar el genérico, el rol lo hereda el primer producto habilitado.
- **Precio establecido opcional**: monto libre en MXN por producto, sin unidad ni switch — el campo vacío es el estado apagado. Es referencia comercial, no tarifario.
- **Guardar habla del cambio**: el botón del pie es outline en reposo y negro sólido cuando hay cambios sin guardar; "Eliminar producto" vive a su izquierda, en gris del sistema (cero rojo).
- **Confirmaciones centradas con blur** dentro del panel, nunca zonas de peligro al pie.
- Cada propiedad tiene su catálogo (Hampton 4 productos, Nikché 5 con uno deshabilitado).

## 13. Historial de conversaciones de Preguntar (v1.5.1)
Preguntar deja de ser un cuarto sin memoria: guarda lo que ya le preguntaste. Spec en `components.md § Historial de conversaciones`.
- **Mismo lienzo, un botón**: el reloj a la derecha de enviar cambia la Presencia por el hilo y el mismo tap regresa. No hay panel lateral ni pantalla nueva — el historial no compite con la conversación viva.
- **Hilo de mensajería, no lista de sesiones**: todo en un scroll continuo, lo reciente abajo, días separados por su pill de fecha. Abre hasta el final y se sube para recordar.
- **Pill de fecha única** para el hilo (Hoy · Ayer · día de la semana · fecha corta); la hora exacta vive en la burbuja de la pregunta.
- **Colores del sistema, no señales nuevas**: el botón usa exactamente los estados del botón de enviar (tonal → `--btn-bg`); cero tokens nuevos y cero indicadores de "no leído" (el historial no reclama atención).
- Un historial por propiedad, con el lenguaje de cada una: oportunidades y tiempos en Hampton, dinero cobrado y ligas de pago en Nikché.

## 14. Captura al resolver e Historial de citas (v1.5.0)
- **Captura opcional al cerrar**: marcar ✓/✕ guarda el estado al instante; la captura de motivo/monto es un extra que nunca bloquea. **Deshacer 5s revierte estado + captura.** "Se reagendó" es grupo propio, no un motivo de pérdida.
- **Historial** es la tabla de citas: 3 densidades, filtros como chips removibles, gestor de columnas, vistas guardadas y panel lateral de detalle. Sigue sin ser CRM: no agrega estados post-handoff.

---
## 15. Personas — dos vistas: tabla y kanban (v1.6.0)

Personas abre **en tabla**. El toggle de vista vive en la barra de la sección, a la derecha del selector de periodo, y usa exactamente los mismos tokens que ese selector: track `--seg-track`, thumb `--seg-thumb` con sombra `0 1px 2px rgba(20,16,8,.1)`, alto de botón 38px (44px de ancho) y deslizamiento de 250ms en `cubic-bezier(0.34,1.2,0.64,1)`. Un control de vista no es un botón de icono suelto: es el mismo segmented del sistema con dos valores.

**Tabla.** Agrupada por estatus (Por atender / En seguimiento / Atendidas), cada grupo colapsable desde su título. Columnas: Persona · Producto · Detalle · Llegó · Atender/Estado (la última cambia de rótulo según el grupo).

Los encabezados **ordenan**, con la misma gramática que Historial y Soporte: clic alterna ascendente/descendente, la columna activa se pinta `--tp` y muestra ↑/↓ de 11px, las inactivas quedan en `--tt` y solo se aclaran al hover. **Detalle no ordena** — es texto libre, ordenarlo no significa nada — y por eso ni tiene cursor ni hover. "Llegó" ordena por **recencia real**, no alfabéticamente: la cadena relativa se traduce a minutos (`ahora`=0, `anoche`=600, `ayer`=1440, `hace N min/h/días/semanas`, `la semana pasada`=10080), así que asc = más reciente primero.

**Kanban.** Cuatro columnas (Por atender / En seguimiento / Confirmadas / No confirmadas) con arrastre entre columnas, dos densidades de tarjeta (extendida / compacta) y toast de confirmación con Deshacer en cada movimiento.

**Los botones de Atender pesan igual que los de Estado.** WhatsApp y ✓ (Ya atendí) usan el mismo hover que los ✓/✕ de En seguimiento: relleno `--btn-bg`, contenido `--btn-tx`, borde `--btn-bg`, y `scale(0.94)` al presionar. Antes bajaban opacidad, lo que los hacía leer como controles de segunda.

## 16. Reglas transversales de overlays (v1.6.0)

**Toasts.** Un solo tipo en todo el producto: pastilla de `color-mix(in srgb, var(--card) 74%, transparent)` con `backdrop-filter: blur(18–20px) saturate(150–160%)`, borde `--divider`, sombra `0 14px 34px -14px rgba(0,0,0,.4)`, radio 999, texto 12.5/600 y, cuando la acción es reversible, "Deshacer" en `--link` 700. Entra con `ih-up .3s` spring y sale con `ih-toast-out .22s`. Vive 3.6s (informativo) o 5s (con Deshacer).

**Un toast siempre se centra sobre la tabla, nunca sobre la ventana.** En desktop el wrapper es absoluto con `left = 16 + ancho del nav (248, u 84 colapsado) + 32`, `right: 28px`, `bottom: 22px`, `display:flex; justify-content:center` y `pointer-events:none` (la pastilla los recupera). Centrarlo con `left:50%` lo corre media columna de nav hacia la izquierda y rompe la relación con el contenido al que se refiere. Cuando la sección tiene panel lateral (Productos), el wrapper vive dentro de la columna de la lista y descuenta el ancho del panel.

**Menús de barra.** Cada popover ancla su **borde derecho al borde derecho de su botón** (no a la barra): en Personas eso da 76 / 38 / 0 px para Estatus, Filtrar y Exportar. Abren a `top: 44px` con `ih-pop .18s` y origen `top right`.

**Salir siempre es posible.** Todo menú abierto monta un scrim `position:absolute; inset:0; z-index:30` bajo el popover: un clic fuera cierra sin obligar a elegir opción.

## 17. Inicio — "Pregúntale a tu asistente" (v1.6.0)

La columna derecha de Inicio dejó de acumular avisos de solo lectura. Salieron el widget de "N mensajes respondidos" (el dato ya vive en la isla) y el aviso de "Ya está resuelto" (una campaña ajustada no es noticia recurrente), y en su lugar entró **una entrada al asistente**, arriba de "De dónde vienen".

Estructura: label `Pregúntale a tu asistente` en 10.5/600/.15em/uppercase `--tt` — el mismo rótulo que "Actividad registrada" y "Próximas citas", porque es un widget más, no una pieza aparte. Debajo, el composer **idéntico al de Preguntar**: campo pastilla de 44px (40 en móvil) con borde `rgba(20,16,8,.12)` que pasa a `.28` en foco, placeholder "¿Cómo vamos este mes?" en `--tt` al 62% (`input[data-ph-soft]::placeholder`, ya que el color del placeholder no se puede declarar inline) y botón ↑ circular **fuera** del campo en `#E4E0D8`/`#8A8C93` al 45% de opacidad, 100% al hover. En desktop cierran el widget dos chips píldora con borde `--divider` que envuelven a dos líneas: "¿Qué tengo en la agenda esta semana?" y "¿Quién sigue sin ser atendido?". En móvil el widget va solo con campo: el espacio es caro y las sugerencias ya viven dentro de Preguntar.

**No es un atajo de navegación, es una pregunta.** Enter, el botón ↑ o un chip llevan a Preguntar **con la pregunta ya enviada** y el asistente empieza a responder (80ms de retraso para que la transición de pestaña no se coma la animación); el campo se limpia al enviar. Un composer que solo navega y te hace volver a escribir es peor que no tenerlo.

El hero negro bajó 26px de alto (padding inferior 64→38) para que Actividad registrada y Próximas citas ganen ese aire.

## 18. Soporte — la bandeja de reportes (v1.6.0)

Sección propia en el nav (con badge de casos abiertos) y archivos independientes para desktop y móvil. Hero negro "Estado de tus reportes" sobre la bandeja, buscador, filtro de fechas con rangos y calendario personalizable, y campana de novedades con "marcar todo como leído".

La tabla usa las mismas reglas que Historial: columnas Reporte · Creado · Estado, encabezados ordenables con ↑/↓, densidad y vacíos propios. Tres estados con microcopy fijo — pendiente ("Recibimos tu reporte."), en progreso ("Nuestro equipo está trabajando en esto.") y resuelto ("Este caso quedó cerrado.") — y un empty state honesto: "Todo en orden".

## 19. Reglas que estaban solo en el código (v1.6.0)

**El periodo es global, no un filtro de la gráfica.** Hoy / Este mes / Mes pasado / 90 días manda sobre el hero, la gráfica, el título y la agrupación de Actividad registrada y los filtros de Personas. En desktop el track mide 388px para que "Mes pasado" respire; los botones siguen en 38px de alto.

**Filtrar desde la gráfica se llama "Hasta".** Un clic en un punto de la serie no aísla ese día: la serie es acumulada, así que el chip resultante dice `Hasta <fecha>`. Cambiar de periodo lo limpia, porque el corte dejaría de significar lo mismo.

**Las preferencias de tabla se guardan solas.** El menú de Columnas de Historial lleva un footer sticky con "Se guarda automáticamente" sobre la lista — no hay botón Guardar. Persisten en `localStorage`: `ih-rep-prefs` (columnas, densidad, vista) y `ogkb-vista` / `ogkb-dens` (vista y densidad de Personas).

**En móvil el encabezado de Personas no se va.** Título, filtros de tiempo, resumen y buscador quedan fijos y ganan blur al scrollear; solo se mueve la lista. En pantallas chicas perder el buscador al bajar cuesta más que el alto que ocupa.

**Composer móvil comprimido.** Campo de 38px, botones de 35px y texto de 12.5px: el composer de escritorio no se reduce proporcionalmente, se recalibra.

**Glifos vs iconos.** Solo la navegación por chevrones (‹ ›) usa SVG centrado; ✓, ✕, ↑, ··· y demás siguen siendo texto. Mezclar sin criterio hace que unos controles se vean ópticamente más pesados que otros.

**Títulos de sección alineados entre sí.** El título de una sección sin barra de controles (Productos) lleva `padding-top: 48px`, que es donde cae el título de las secciones que sí la tienen (Personas: 38 + fila de 44; Historial: 41 + fila de 38). Alinear al texto, no al contenedor.

**Cada tabla trae sus cuatro estados.** Cargando, error con reintento, vacío sin filtros y vacío por filtros, con copy distinto en cada uno; el vacío por filtros siempre ofrece cómo quitarlos.

**El catálogo siempre tiene un genérico.** Un producto marcado como genérico recibe los leads fuera de catálogo y no se puede desmarcar: para moverlo hay que activarlo en otro producto, y el toast lo explica en vez de bloquear en silencio.

## CHANGELOG
- **v1.6.0** — Personas gana vista de tabla (por defecto) y kanban, con toggle segmented homologado al selector de periodo y encabezados ordenables (Detalle no ordena; "Llegó" ordena por recencia real). Reglas transversales de overlays: un solo tipo de toast, siempre centrado sobre la columna de contenido y no sobre la ventana; popovers anclados al borde derecho de su botón; scrim de clic-fuera en todo menú. Los botones de Atender adoptan el hover sólido de los ✓/✕. Inicio cambia dos avisos de solo lectura por el widget "Pregúntale a tu asistente", que envía la pregunta a Preguntar y dispara la respuesta; hero negro 26px más bajo. Soporte documentado como sección. Se documentan además las reglas que solo vivían en código: periodo global, filtro "Hasta" desde la gráfica, persistencia de preferencias de tabla, encabezado fijo de Personas en móvil, composer móvil comprimido, criterio glifo/icono, alineación de títulos de sección, los cuatro estados de tabla y la regla del producto genérico. Cero tokens nuevos.
- **v1.0** — Freeze del sprint visual completo: sistema de 3 temas token-driven aplicado al prototipo vivo, isla viva, Personas con 3 estatus, Preguntar con Presencia V7 + pulso de contorno, login con temas por hora + picker. Consolidación de todo lo decidido en chat y código a documentación autónoma.
- **v1.0.1** — Fila Desktop Inicio Estándar (1440px, nav lateral) tokenizada en 3 temas. Conteo de tokens corregido a 49→52.
- **v1.0.2** — Chips de producto: dot mate 5px con `--dot-reserva/--dot-evento/--dot-daypass` (3 tokens × 3 temas = +9, total 52) para conservar distinción por producto en temas oscuros. Ámbar Noche recalibrado #D9A54F→#DDB061 (AA sobre superficies oscuras). Coreografía de cambio de tema escalonada. Micro-pulidos: chevrones del hero, input de Preguntar con placeholder animado, sombra entre pisos del hero Nikché.
- **v1.0.3** — Presencia V7 Amanecer: contraste interno recuperado (lA2 #F5E6C8→#CE9A44, lB1 #D4A85E→#B07E2C) para pasar el test de escala de grises (≥3 tonos migrando), igualando a Atardecer/Noche. Sheet de detalle homologado (nombre `--tp` sólido + chip junto al nombre; teléfono en la tabla, no como subtítulo).
- **v1.0.4** — Tab bar convertida a pill flotante de dos estados (reposo 64 / contraída 48) con shrink spring al scrollear. Librería muestra ambos estados.
- **v1.0.5** — Halo "pensando": reemplaza el pulso de contorno por un halo iridiscente multicolor (paleta `--siri-*` del tema) sin línea. Piso de latencia 1.5s→5s.
- **v1.0.6** — Tab bar frosted más translúcida; halo movido a full-bleed (4 orillas, a nivel del root del teléfono).
- **v1.0.7** — Tab bar: al parar el scroll NO se reabre (solo al subir o al interactuar); pill más transparente y más baja. Halo más delgado y con más tonos de la paleta.
- **v1.0.8** — Halo reducido a banda ~22px (deja de invadir la pantalla). Input de Preguntar elevado para no encimarse con la pill.
- **v1.0.9** — Auditoría de temas oscuros. Regresiones de hardcode corregidas: sheet de detalle a `var(--scrim)` (era `#FAF9F5` fijo → texto invisible en Atardecer/Noche) y conteo de "De dónde vienen" a `var(--tp)` (heredaba negro). Handle del sheet a `--sec-bd`.
- **v1.1.0** — Tema Día recalibrado a familia solar. Halo "pensando" y Presencia Amanecer: `--siri-lA1/lA2/lB1` #E8C97A/#CE9A44/#B07E2C → #FBA356/#FED767/#FEF1C8. Fondo del login Día: base termina en #F6E5C3 (antes #F6ECC8, pasos intermedios re-derivados #F9F1E0/#F8EBD2) y capas doradas a familia #FFD07D/#FFC85A con alfas rebajados (.26→.16, .2→.12, .14→.09, .11→.07) para que el borde inferior lea amarillo cálido, no naranja. Actualizado en prototipo, tokens.json y presencia.md.
- **v1.1.1** — Dots de chips de producto recalibrados en los 3 temas: Reserva #ABC4DB/#9AB1D6/#8DA3C6, Evento #CEAB8E/#D8AE8F/#B58D71, Day Pass #D6B06E/#E8BC70/#E5B765 (Día/Tarde/Noche). Nuevo token `--chip-tx` (53 tokens × 3 temas): tipografía del chip separada de `--ts` para poder aclarar Atardecer a #E4D8D1 sin tocar el resto del texto secundario. Actualizado en prototipo, tokens.json y components.md.

- **v1.2.0** — Agenda funcional (deja de ser placeholder): vistas Día/Semana/Mes en ambos teléfonos × 3 temas, citas con contexto del asistente, Atender compartido write-once con Personas, dot ámbar por hora vencida, dots de mes proporcionales (Timepage), swipe entre periodos, sheet de detalle reutilizado con campo Cita, empty states. Cero tokens nuevos; motion reusa spring/ease-out del sistema + crossfade ih-fade 300ms entre vistas. Freeze definitivo del alcance del sprint visual.
- **v1.2.1** — Vista Semana rediseñada al patrón móvil correcto (ticker + agenda, ref. Fantastical/Apple): tira de 7 días con hoy como pill y dots --gol + lista de la semana agrupada por día con filas hora · nombre · chip. Las 7 columnas quedan documentadas como patrón exclusivo de landscape/desktop.
- **v1.3.0** — Desktop re-arquitecturado (no mobile ampliado; ref. Linear/Vercel/Mercury/Apple Music desktop): lienzo 1440×900 sin scroll en Inicio, nav lateral 248px con contexto vivo (conteos por atender/citas de hoy, próxima cita, usuario), bento 12 col (hero 7/12 con **mini-sparkline 90 días** + stack 5/12 de avisos y De dónde vienen; Nikché suma tarjeta Cobrado), widgets nuevos **Próximas citas · hoy** y **Últimos goles del asistente**, Personas con **panel lateral de detalle** (el sheet queda como patrón mobile), Agenda desktop (Día + mini-mes · Semana 7 columnas · Mes full-screen con citas nombradas), Preguntar centrado con Presencia a 190px y sugerencias 2×2, Actividad completa como vista de drill-down. Las 4 pestañas × 2 propiedades (2a Hampton / 2b Nikché) × 3 temas con el toggle fantasma arriba-derecha. Cero tokens nuevos; el tab bar pill y el sheet quedan documentados como patrones exclusivos de mobile.
- **v1.3.1** — Vista Semana mobile rediseñada a **riel de 7 días** (los 7 días siempre visibles, hoy como pill 30px, "Sin citas" como estado informativo, citas como tarjetas-píldora hora · nombre · dot de producto, dot ámbar/✓ como señales). Sustituye al ticker+agenda de v1.2.1. Cero tokens nuevos.
- **v1.4.0** — **Botón Atender con ícono de WhatsApp**: logo oficial (contorno como relleno) 14px a la izquierda del label, `fill: currentColor` para que herede --tp en reposo y --btn-tx sobre el fill en los 3 temas; pill de 84→100px con padding 10/16/10/12 + gap 6 (medido para que el nombre de la fila de Personas de 375px no se recorte). Aplicado a las 9 instancias del producto (Personas móvil, cards de Agenda, sheet, fila y panel desktop) más las 5 muestras de la librería. Paths en línea por instancia — `<symbol>/<use>` pierde el currentColor al exportar. Cero tokens nuevos. Hoja de propuesta: `Atender WhatsApp (propuesta).dc.html`; botón aislado para probar el hover: `Boton Atender aislado.dc.html`.
- **v1.4.1** — Hover del botón Atender: el cambio de estado es inmediato (transición reducida a `transform .12s` para el pressed). La causa del desfase era que la regla de coreografía de tema alcanza a los `<path>` del ícono —donde ocurre el pintado—, no solo al `<svg>`: se marcan con `data-wa` y se les fuerza `transition:none`. `position: relative` añadido al botón para que el hit-area de +7px ancle.
- **v1.4.2** — Pulido de sistema (auditoría completa). **Señales**: el dot ámbar de urgencia pulsa como el dot vivo (ih-pulse 2.4s) en las 10 instancias de Personas y Agenda. **Hero desktop transaccional**: el dinero pasa a protagonista (56px + delta + "Dinero verificado" en una línea, divisor, oportunidades reales 32px como línea secundaria) y se elimina la tarjeta Cobrado duplicada de la columna derecha; con filtro de Eventos (cobrado $0) el hero vuelve al layout de oportunidades. El aviso "Detectamos menos actividad…" ya aparece en las dos propiedades desktop. **Preguntar**: aviso legal bajo el input y burbuja del usuario a --card (con --tonal se disolvía en el lienzo crema). **Personas desktop**: columnas fijas para "hace…" (92px, derecha) y acciones (140px, centradas) para que los tres grupos alineen; chevron del encabezado junto al título. **Detalle**: panel lateral con fondo --nav-bg; "Lo que pasó" con más aire y columna de tiempo homologada (12/600 --ts, derecha) también en móvil y en "Últimos goles". **Navegación**: entrada ih-rise 320ms al cambiar de sección en desktop; botón de colapso del nav centrado con el isotipo (top 46px) y con la misma curva/duración que el ancho del nav (.5s). **Otros**: tooltip del sparkline con fecha bajo la cifra, "auto" permanente en el toggle de tema móvil, padding simétrico 10/14 del botón Atender, "Llegó…" alineado a la base en las cards de Agenda desktop. Cero tokens nuevos (el token --burbuja explorado en el camino se eliminó al no usarse).
- **v1.5.1** — **Historial de conversaciones en Preguntar.** El botón de reloj (mismos colores que enviar, a su derecha) alterna la Presencia por un hilo continuo con todo lo preguntado: pills de fecha Hoy · Ayer · día de la semana · fecha corta, apertura hasta abajo y scroll hacia arriba para los días anteriores. Aplicado a las 4 superficies del prototipo (2 teléfonos + 2 escritorios) con un historial por propiedad; hoja de exploración: `Preguntar historial.dc.html`. Cero tokens nuevos.
- **v1.5.0** — **Productos (catálogo) + captura/Historial documentados.** Nueva sección Productos en el nav lateral de los dos desktops (2a Hampton / 2b Nikché) con lista, panel de edición de 480px, duplicar/eliminar y toasts. Reglas nuevas: un único genérico permanente (cambio con advertencia, herencia al eliminar), precio establecido opcional en MXN, campo plural eliminado. **Tokens**: +30 por tema (`--chip-1…9`, `--chip-bg-1…9`, `--sw-off`, `--sw-knob`, `--chip-in-bg/bd`, `--panel-bg`, `--panel-scrim`, `--warn`, `--warn-bg`, `--danger`, `--danger-bg`, `--danger-bd`, `--bg-grad`) → 85 × 3 temas; se regularizan también `--nav-bg` y `--ag-hoy`, que ya vivían en el prototipo sin estar contados (de ahí el salto 53→85). **Switch** documentado como componente propio: pista al 80% de opacidad en Atardecer/Noche con la perilla siempre al 100%. **Confirmación centrada con blur** reemplaza la zona de peligro y las acciones destructivas dejan el rojo (usan `--btn-bg`). **Nomenclatura**: el tema del medio es **Atardecer** en todo el paquete (el desktop decía "Atardecer"). Se documenta el módulo de captura al resolver e Historial, y se marcan como exploraciones no-canon las hojas de navbar/halo/dashboard-desktop.
  · *Nota de versionado*: el changelog embebido en la vitrina usó v1.3.1/v1.3.2 para los tokens `--nav-bg` y `--ag-hoy`, numeración que choca con este archivo (donde v1.3.1 es el riel de Semana móvil). Manda DESIGN.md: esos dos tokens quedan registrados aquí en v1.5.0.