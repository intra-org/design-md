import * as React from 'react';

export interface ToggleTemaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  modo?: 'auto' | 'dia' | 'tarde' | 'noche';
  onChange?: (modo: 'auto' | 'dia' | 'tarde' | 'noche') => void;
  /** Muestra el nombre del tema junto al glifo (en 'auto' se muestra siempre). */
  conNombre?: boolean;
}

export declare function ToggleTema(props: ToggleTemaProps): JSX.Element;
