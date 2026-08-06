# UI kit — intra hotelero · Escritorio (1440×900)

Recreación de la superficie de escritorio de **Hampton Demo** (propiedad estándar). Lienzo fijo de 1440×900 con radio 24: todo cabe sin scroll en Inicio; Personas, Agenda y Productos scrollean dentro del main.

**Abre `index.html`.**

## Qué se puede hacer
- Navegar las 6 entradas del nav lateral (Inicio · Personas · Agenda · Historial · Productos · Preguntar) y colapsar el nav a riel de 84px.
- Ciclar el tema con el toggle fantasma arriba-derecha: auto → Amanecer → Atardecer → Noche.
- **Inicio**: filtrar el hero con los chips de producto (la cifra y el sparkline se recalculan), cambiar el periodo, expandir los grupos de "De dónde vienen", abrir una cita desde Próximas citas.
- **Historial**: la tabla de citas con 3 densidades, filtros de producto y resolución como chips removibles, y fila → panel de detalle.
- **Personas**: filtrar por producto (popover + chip removible), atender → seguimiento → ✓/✕ (write-once), abrir el panel lateral de detalle.
- **Agenda**: Día (cards + mini-mes), Semana (7 columnas) y Mes a pantalla completa. El estado de Atender se comparte con Personas.
- **Productos**: abrir el panel de 480px, cambiar nombre, color, icono y precio (Guardar pasa a negro sólido en cuanto algo cambia), y ver el diálogo centrado del genérico.
- **Preguntar**: sugerencias 2×2, envío con halo "pensando" e historial en el mismo lienzo.

## Archivos
| Archivo | Qué es |
|---|---|
| `index.html` | Lienzo, nav, tema, estado compartido (`flujo`) y panel de detalle |
| `datos.jsx` | Datos demo canónicos de Hampton Demo |
| `PantallaInicio.jsx` | Bento de 12 columnas: hero 7/12 + columna 5/12 + dos widgets |
| `PantallaPersonas.jsx` | Tres grupos con renglón desktop de columnas fijas |
| `PantallaAgenda.jsx` | Día / Semana / Mes + mini-mes |
| `PantallaProductos.jsx` | Lista del catálogo + panel de edición de 480px |
| `PantallaHistorial.jsx` | Tabla de citas (REP_COLS / REP_DATA del prototipo) |
| `PantallaPreguntar.jsx` | Presencia V7, sugerencias, hilo e historial |

## Simplificaciones conscientes
Es una recreación visual, no producción: los datos son estáticos, la Agenda no navega entre semanas/meses reales, el catálogo no persiste y la respuesta de Preguntar es fija. En Historial no están el gestor de columnas ni las vistas guardadas. La captura opcional al resolver está documentada en el sistema pero no reconstruida aquí.
