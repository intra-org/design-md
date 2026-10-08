import * as React from 'react';
export interface EncabezadoOrdenableProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** Columna por la que se ordena ahora. */
  activo?: boolean;
  dir?: 'asc' | 'desc';
  /** false para texto libre (Detalle, Contexto): mismo estilo, sin cursor ni hover. */
  ordenable?: boolean;
  onOrdenar?: () => void;
}
export declare function EncabezadoOrdenable(props: EncabezadoOrdenableProps): JSX.Element;
/** Traduce "hace 2 días", "anoche"… a minutos. asc = más reciente primero. */
export declare function MinutosDesde(rel?: string): number;
