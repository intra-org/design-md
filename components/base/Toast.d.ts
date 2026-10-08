import * as React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Muestra "Deshacer" (vive 5s; sin él, 3.6s). */
  onDeshacer?: () => void;
  visible?: boolean;
  /** Ancho del nav lateral (248, u 84 colapsado) cuando el toast vive en el lienzo
   *  completo: lo centra sobre la columna de contenido. Omitir si el contenedor ya es la columna. */
  navW?: number;
  /** Descuento derecho (28; 512 con el panel de Productos abierto). */
  derecha?: number;
  abajo?: number;
}

export declare function Toast(props: ToastProps): JSX.Element;
