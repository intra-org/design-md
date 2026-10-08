import * as React from 'react';
export interface ChipFiltroProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** Activo = --btn-bg sólido. */
  activo?: boolean;
  /** Color del dot de producto (p.ej. 'var(--dot-evento)'). */
  dot?: string;
  /** Lo vuelve chip removible: activo + "×". */
  onQuitar?: () => void;
}
export declare function ChipFiltro(props: ChipFiltroProps): JSX.Element;
