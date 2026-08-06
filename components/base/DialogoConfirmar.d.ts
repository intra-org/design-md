import * as React from 'react';

export interface DialogoConfirmarProps extends React.HTMLAttributes<HTMLDivElement> {
  abierto?: boolean;
  pregunta: string;
  microcopy?: string;
  confirmar?: string;
  cancelar?: string;
  onConfirmar?: () => void;
  onCancelar?: () => void;
}

export declare function DialogoConfirmar(props: DialogoConfirmarProps): JSX.Element;
