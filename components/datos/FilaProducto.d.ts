import * as React from 'react';

export interface FilaProductoProps extends React.HTMLAttributes<HTMLDivElement> {
  nombre: string;
  /** Uno de los 12 iconos del catálogo ('prod-*'). */
  icono?: string;
  /** 1–9: índice de la paleta --chip-N / --chip-bg-N. */
  chip?: number;
  /** SIEMPRE existe exactamente un genérico y no se puede desactivar. */
  generico?: boolean;
  /** "$2,400" — precio establecido, opcional; el campo vacío ES el estado apagado. */
  precio?: string;
  oportunidades?: number;
  habilitado?: boolean;
  /** Fila del producto abierto en el panel: fondo --tonal. */
  activo?: boolean;
  onToggle?: () => void;
  onEditar?: () => void;
  onKebab?: (e: React.MouseEvent) => void;
}

export declare function FilaProducto(props: FilaProductoProps): JSX.Element;
