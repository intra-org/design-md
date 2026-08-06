import * as React from 'react';

export interface ChipProductoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Dot mate de 5px: --dot-reserva/--dot-evento/--dot-daypass o --chip-N del catálogo. */
  color?: string;
  /** Fondo del pill: --chip-reserva/-evento/-daypass o --chip-bg-N. */
  fondo?: string;
  sinDot?: boolean;
  children?: React.ReactNode;
}

export declare function ChipProducto(props: ChipProductoProps): JSX.Element;
