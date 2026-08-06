import * as React from 'react';

export interface CardCitaProps extends React.HTMLAttributes<HTMLDivElement> {
  hora: string;
  nombre: string;
  producto?: string;
  productoColor?: string;
  productoFondo?: string;
  contexto?: string;
  /** "Llegó hace 2 h" — alineado con la base del botón. */
  llego?: string;
  /** La cita pasó su hora y sigue por atender. */
  urgente?: boolean;
  /** BotonAtender / BotonesResolver / stamp — el MISMO estado que Personas. */
  accion?: React.ReactNode;
}

export declare function CardCita(props: CardCitaProps): JSX.Element;
