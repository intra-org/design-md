import * as React from 'react';

export interface SparklineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Serie de 12 puntos; el último es la cifra real del hero. */
  puntos: number[];
  /** Paleta del gradiente y del punto final. */
  tema?: 'dia' | 'tarde' | 'noche';
  /** 5 marcas del eje x ("1 jul" · "8 jul" · "16 jul" · "24 jul" · "hoy"). */
  etiquetas?: string[];
  /** Una fecha por punto — la que muestra el tooltip al pasar el mouse. */
  fechas?: string[];
  /** Texto del caption: "Tendencia · {rango}". */
  rango?: string | null;
  /** Cambia cuando cambia periodo o filtro: vuelve a correr el trazo de 1680ms. */
  firma?: string;
}

export declare function Sparkline(props: SparklineProps): JSX.Element;
