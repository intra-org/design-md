import * as React from 'react';

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'oportunidades' = propiedad estándar · 'cobrado' = transaccional (manda el dinero). */
  modo?: 'oportunidades' | 'cobrado';
  /** Etiqueta fija: el periodo vive en el selector, el filtro en el chip. */
  eyebrow?: string;
  valor: React.ReactNode;
  delta?: string;
  deltaVs?: string;
  moneda?: string;
  /** Línea secundaria del modo 'cobrado' (32px). */
  secundarioValor?: React.ReactNode;
  secundarioTexto?: string;
  /** Frase de cierre: "De 34 personas atendidas, 22 se convirtieron…". Se oculta en "Hoy". */
  nota?: React.ReactNode;
  /** 88px de cifra y padding de escritorio; false = 72px móvil. */
  desktop?: boolean;
  /** Sparkline, chips del hero, lo que vaya bajo la cifra. */
  children?: React.ReactNode;
}

export declare function Hero(props: HeroProps): JSX.Element;
