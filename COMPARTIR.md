# Cómo usar este design system

Este paquete es el sistema de diseño de **intra hotelero**: tokens, componentes, UI kits y templates listos para que un agente diseñe con la marca sin adivinar nada.

## Opción A — Claude Design (recomendada)

1. En este proyecto, abre el menú de compartir y agrega a las personas o al equipo con quien lo vas a usar. Si están en tu organización, basta con darles acceso.
2. Ellos crean un proyecto nuevo y, en el selector de sistema de diseño, eligen **intra hotelero · Design System**.
3. A partir de ahí escriben lo que quieren ("una pantalla de reportes", "un correo de bienvenida") y el agente ya trabaja con los tokens, los componentes y el tono correctos.

También verán la pestaña **Design System** con las fichas de color, tipografía, espaciado y componentes, y los dos **Templates** como punto de partida:

- **Dashboard de escritorio** — el lienzo 1440×900 completo, con Inicio, Personas, Agenda, Historial, Productos y Preguntar.
- **Pantalla móvil** — la app 390×844, desde el login y el selector de propiedad hasta las cuatro pestañas.

## Opción B — Claude Code u otro agente

Descarga el proyecto como carpeta. `SKILL.md` en la raíz ya está en formato de Agent Skill, así que:

1. Copia la carpeta dentro de `.claude/skills/` de tu repositorio (o donde guardes tus skills).
2. Invoca la skill `intra-hotelero-design` y pide lo que necesites.

El agente leerá `readme.md`, que trae la guía completa: contenido y tono de voz, fundamentos visuales, iconografía e índice de todos los archivos.

## Qué encontrarán dentro

| Ruta | Qué es |
|---|---|
| `styles.css` | El único archivo que hay que enlazar; importa todos los tokens |
| `tokens/` | Color (85 tokens × 3 temas), tipografía, espaciado, elevación y motion |
| `assets/` | Isotipo y wordmark (claro y oscuro) + los 25 iconos oficiales |
| `components/` | 32 componentes en 7 grupos, cada uno con su contrato de props y su guía de uso |
| `ui_kits/` | Recreaciones navegables del producto: escritorio y móvil |
| `templates/` | Puntos de partida que se copian tal cual |
| `guidelines/` | 20 fichas de fundamentos |
| `readme.md` | La guía de marca completa |

## Reglas que conviene repetirles

- Nunca escribas un `#hex` en pantallas de producto: todo sale de `var(--token)`.
- Los tres temas (Amanecer, Atardecer, Noche) se activan con `data-tema` en el root; Amanecer es el maestro.
- Copy en es-MX: "oportunidades reales", nunca "leads"; sin emoji y sin signos de admiración.
- Los iconos salen del set propio (`Icon`), no de librerías externas.

## Nota sobre las fuentes

Schibsted Grotesk se sirve desde Google Fonts porque el paquete original no incluía los binarios. Si tienen los `.woff2` de producción, reemplacen el `@import` de `tokens/fonts.css` por reglas `@font-face` locales.
