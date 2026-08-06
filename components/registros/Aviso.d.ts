import * as React from 'react';

export interface AvisoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dot 7px: --tt por defecto, --verde cuando habla el sistema vivo. */
  dot?: string;
  /** Link de cierre, p. ej. "Ver →". */
  accion?: React.ReactNode;
  /** Muestra el badge "Ya está resuelto". */
  resuelto?: boolean;
  children?: React.ReactNode;
}

export declare function Aviso(props: AvisoProps): JSX.Element;
