import * as React from 'react';

export interface GrupoOrigen {
  nombre: string;
  n: number;
  /** Color del segmento y del dot (--gol para campaña, --tt para orgánico…). */
  color?: string;
  canales?: Array<{ nombre: string; n: number }>;
}

export interface DeDondeVienenProps extends React.HTMLAttributes<HTMLDivElement> {
  grupos: GrupoOrigen[];
  /** Frase de cierre con border-top; es la lectura, no el dato. */
  insight?: React.ReactNode;
  /** 20 en móvil, 22–24 en desktop. */
  padding?: number;
}

export declare function DeDondeVienen(props: DeDondeVienenProps): JSX.Element;
