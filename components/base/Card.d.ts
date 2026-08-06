import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Etiqueta 10.5/600 uppercase .15em en --tt sobre el contenido. */
  eyebrow?: React.ReactNode;
  /** Acción alineada a la derecha del eyebrow (p. ej. "Ver agenda →"). */
  accion?: React.ReactNode;
  /** 20 = tarjeta del sistema · 18 = aviso · 16 = sección de panel · 22 = hero */
  radius?: number;
  padding?: string;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
