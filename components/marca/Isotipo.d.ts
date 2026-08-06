import * as React from 'react';

export interface IsotipoProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  /** Ruta relativa a la carpeta de logos (por defecto 'assets/logos'). */
  base?: string;
}

export declare function Isotipo(props: IsotipoProps): JSX.Element;
