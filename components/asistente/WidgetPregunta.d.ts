import * as React from 'react';
export interface WidgetPreguntaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Navega a Preguntar y envía la pregunta (80ms después del cambio de pestaña). */
  onPreguntar?: (texto: string) => void;
  /** Dos chips en escritorio; en móvil no se muestran. */
  sugerencias?: string[];
  /** Campo 40 / botón 35 / texto 12.5. */
  movil?: boolean;
  placeholder?: string;
}
export declare function WidgetPregunta(props: WidgetPreguntaProps): JSX.Element;
