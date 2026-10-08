import * as React from 'react';
export interface ScrimProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Cierra todos los menús abiertos (se dispara en mousedown). */
  onCerrar?: () => void;
  /** z-index del velo. Default 30 — el popover va encima (31). */
  z?: number;
}
export declare function Scrim(props: ScrimProps): JSX.Element;
