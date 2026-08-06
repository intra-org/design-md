import * as React from 'react';

export interface PresenciaProps extends React.SVGAttributes<SVGSVGElement> {
  /** 150 en móvil, 190 en el Preguntar de escritorio. */
  size?: number;
}

export declare function Presencia(props: PresenciaProps): JSX.Element;
