import * as React from 'react';

export interface BotonAtenderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Fila vencida (+24h): borde fuerte + fondo --tonal. Peso adaptativo, no color nuevo. */
  ambar?: boolean;
  children?: React.ReactNode;
}

export declare function BotonAtender(props: BotonAtenderProps): JSX.Element;
