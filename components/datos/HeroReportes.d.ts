import * as React from 'react';
export type EstadoReporte = 'pendiente' | 'proceso' | 'resuelto';
export interface HeroReportesProps extends React.HTMLAttributes<HTMLDivElement> {
  pendientes?: number;
  enProceso?: number;
  resueltos?: number;
  /** Estado filtrado: los otros dos bajan a .4. */
  filtro?: EstadoReporte | null;
  /** Clic en una cifra; null al volver a tocar la activa. */
  onFiltrar?: (estado: EstadoReporte | null) => void;
  titulo?: string;
}
export declare function HeroReportes(props: HeroReportesProps): JSX.Element;
