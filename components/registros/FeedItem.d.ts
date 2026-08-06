import * as React from 'react';

export interface FeedItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hora o "hace 9 min" — columna derecha, 12/600 --ts. */
  t1: string;
  t2?: string;
  /** Gol del asistente: dot azul --gol 6px + prefijo en 600. */
  gol?: boolean;
  /** Prefijo en negrita: "Cita confirmada:" */
  pre?: string;
  texto: React.ReactNode;
  producto?: string;
  productoColor?: string;
  productoFondo?: string;
  /** "⚡ 12seg" — solo en el feed completo. */
  seg?: string;
  /** 70 en widgets, 80 en la Actividad completa, 62 en móvil. */
  colTiempo?: number;
  /** Item recién llegado: ih-up + flash 1.2s. */
  nuevo?: boolean;
}

export declare function FeedItem(props: FeedItemProps): JSX.Element;
