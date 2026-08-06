import * as React from 'react';

export interface PanelDetalleProps extends React.HTMLAttributes<HTMLElement> {
  abierto?: boolean;
  nombre: string;
  producto?: string;
  productoColor?: string;
  productoFondo?: string;
  campos?: Array<{ k: string; v: React.ReactNode }>;
  acciones?: React.ReactNode;
  /** 380px para detalle de persona, 480px para el panel de Productos. */
  ancho?: number;
  onCerrar?: () => void;
  children?: React.ReactNode;
}

export declare function PanelDetalle(props: PanelDetalleProps): JSX.Element | null;
