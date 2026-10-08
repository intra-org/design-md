import * as React from 'react';
import { OpcionAsignar } from './BotonAsignar';
export interface BarraSeleccionProps {
  /** Filas/tarjetas seleccionadas. Con 0 no se renderiza. */
  n?: number;
  opciones?: OpcionAsignar[];
  onAsignar?: (id: string) => void;
  onQuitar?: () => void;
  /** Solo aparece con exactamente 2 seleccionadas. */
  onIntercambiar?: () => void;
  onLimpiar?: () => void;
  style?: React.CSSProperties;
}
export declare function BarraSeleccion(props: BarraSeleccionProps): JSX.Element | null;
