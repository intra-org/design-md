# UI kit — intra hotelero · Móvil (390×844)

Recreación del teléfono de **Hampton Demo**. Cuatro pestañas en una tab bar pill flotante de dos estados.

**Abre `index.html`.** Arranca en el login: correo y contraseña → **Entrar** → selector de propiedad (Hampton Demo · Nikché Demo · Casa Áurea) → el dashboard.

## Qué se puede hacer
- Cambiar de pestaña (Inicio · Personas · Agenda · Preguntar) y ciclar el tema desde el toggle fantasma.
- **Scrollear**: la tab bar se contrae a 48px al bajar y **no se reabre al detener el scroll** — vuelve a reposo al llegar arriba o al tocar la pill. La isla pasa a frosted a partir de 40px.
- **Inicio**: isla sticky con mensajes rotando, selector de periodo, hero de 72px con count-up y chips filtrables en riel, "De dónde vienen", el feed de la semana con "Mientras dormías" y **Ver toda la actividad →** (vista completa con los 6 chips de filtro).
- **Personas**: menús de icono para estatus, producto y exportar; chips de filtro activos; tres grupos; y el protocolo completo al resolver — ✓ dispara chispas, la captura llega como **sheet inferior** (motivos o monto) y el toast ofrece Deshacer 5s.
- **Agenda**: Día, Semana (riel de 7 días desde lunes) y Mes con dots proporcionales; navegación ‹ › y botón "Hoy"; tocar un día del mes abre ese día.
- **Preguntar**: Presencia V7, wordmark, las 4 sugerencias reales, respuesta escrita palabra por palabra, halo "pensando" full-bleed e historial con pills de fecha.
- **Sheet de detalle** con drag-to-dismiss (>120px cierra) y el bloque "Lo que pasó".

## Archivos
| Archivo | Qué es |
|---|---|
| `index.html` | Teléfono, tab bar, tema, estado compartido y sheet de detalle |
| `datos.jsx` | Mismos datos demo que el kit de escritorio |
| `LoginM.jsx` | Login + selector de propiedad (dos fases en un lienzo) |
| `InicioM.jsx` | Inicio + la vista completa de Actividad |
| `PersonasM.jsx` · `AgendaM.jsx` · `PreguntarM.jsx` | Las otras tres pestañas |

## Simplificaciones conscientes
Sin login ni picker de propiedades, y sin swipe entre periodos. El status bar es una hora fija (9:41), igual que en el prototipo original.
