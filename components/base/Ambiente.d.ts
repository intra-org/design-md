import * as React from 'react';

export interface AmbienteProps {
  /** Tema activo: las capas de los otros dos quedan montadas al 0% para el crossfade de 600ms. */
  tema?: 'dia' | 'tarde' | 'noche';
}

export declare function Ambiente(props: AmbienteProps): JSX.Element;
export declare const CAPAS: Record<'dia' | 'tarde' | 'noche', Array<{ bg: string; anim: string }>>;
