import * as React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Muestra "Deshacer" (ventana de 5s: revierte estado + captura). */
  onDeshacer?: () => void;
  visible?: boolean;
}

export declare function Toast(props: ToastProps): JSX.Element;
