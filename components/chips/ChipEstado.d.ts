import * as React from 'react';
export type Estado = 'pend' | 'seg' | 'conf' | 'noconf' | 'pendiente' | 'proceso' | 'resuelto';
export interface ChipEstadoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Ventas/Equipo: pend·seg·conf·noconf. Soporte: pendiente·proceso·resuelto. */
  estado?: Estado;
  /** Sustituye el texto canónico (raro). */
  children?: React.ReactNode;
}
export declare function ChipEstado(props: ChipEstadoProps): JSX.Element;
export declare const ESTADOS_CHIP: Estado[];
