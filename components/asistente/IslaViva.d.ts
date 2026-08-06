import * as React from 'react';

export interface IslaVivaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rotan cada 4.6s con crossfade de 250ms. El marco NO se mueve. */
  mensajes: string[];
  /** Segundo segmento tras un divisor de 1×14 (patrón de escritorio: "Última persona atendida hace unos segundos"). */
  separador?: string;
  intervalo?: number;
  /** scroll > 40px: muta a frosted con texto blanco. */
  sticky?: boolean;
  /** Ancho FIJO — el mismo que el selector de periodo (490px en desktop). */
  ancho?: string | number;
}

export declare function IslaViva(props: IslaVivaProps): JSX.Element;
