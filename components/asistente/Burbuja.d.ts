import * as React from 'react';

export interface BurbujaProps extends React.HTMLAttributes<HTMLDivElement> {
  de?: 'usuario' | 'asistente';
  /** Hora exacta dentro de la burbuja de la pregunta (10px tabular --tt). */
  hora?: string;
  children?: React.ReactNode;
}

export declare function Burbuja(props: BurbujaProps): JSX.Element;
