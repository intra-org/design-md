import * as React from 'react';

export interface ChipHeroProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Conteo del producto dentro del periodo activo. */
  n?: number;
  icon?: React.ReactNode;
  activo?: boolean;
  /** true cuando hay otro chip activo: baja a opacity .4. */
  atenuado?: boolean;
  children?: React.ReactNode;
}

export declare function ChipHero(props: ChipHeroProps): JSX.Element;
