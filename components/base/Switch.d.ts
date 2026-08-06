import * as React from 'react';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onChange?: () => void;
  /** panel = 44×26 (panel de edición) · fila = 38×22 (lista) */
  size?: 'panel' | 'fila';
  /** Bloqueado: cursor not-allowed y SIN cambio de color — el bloqueo se explica en microcopy + toast. */
  bloqueado?: boolean;
  title?: string;
}

export declare function Switch(props: SwitchProps): JSX.Element;
