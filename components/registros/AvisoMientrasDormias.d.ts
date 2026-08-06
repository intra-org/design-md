import * as React from 'react';

export interface AvisoMientrasDormiasProps extends React.HTMLAttributes<HTMLDivElement> {
  resumen?: string;
  titulo?: string;
  /** Los items del feed nocturno, dentro del mismo contenedor. */
  children?: React.ReactNode;
}

export declare function AvisoMientrasDormias(props: AvisoMientrasDormiasProps): JSX.Element;
