import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = pill negra/crema (--btn-bg). secondary = outline --sec-bd. ghost = sin caja. */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** sm = 34px (barras de herramientas) · md = 44px (default, touch real) · lg = 48px */
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
  disabled?: boolean;
  /** Glifo a la izquierda del label. Nunca botón solo-ícono con significado. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
