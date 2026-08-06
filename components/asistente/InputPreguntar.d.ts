import * as React from 'react';

export interface InputPreguntarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onChange?: (value: string) => void;
  onEnviar?: () => void;
  placeholder?: string;
  /** Historial abierto: el botón de reloj pasa a --btn-bg. */
  historial?: boolean;
  onHistorial?: () => void;
  /** El aviso legal es obligatorio en producto; solo se apaga en muestras. */
  avisoLegal?: boolean;
  desktop?: boolean;
}

export declare function InputPreguntar(props: InputPreguntarProps): JSX.Element;
