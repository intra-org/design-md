import * as React from 'react';

export interface HaloPensandoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visible mientras el asistente piensa (piso de latencia 5s). */
  activo?: boolean;
}

export declare function HaloPensando(props: HaloPensandoProps): JSX.Element | null;
