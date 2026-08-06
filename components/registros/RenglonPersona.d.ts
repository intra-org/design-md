import * as React from 'react';

export interface RenglonPersonaProps extends React.HTMLAttributes<HTMLDivElement> {
  nombre: string;
  producto?: string;
  productoColor?: string;
  productoFondo?: string;
  /** Una línea: producto · presupuesto validado · fecha. */
  contexto?: string;
  /** "hace 9 min" — 92px alineado a la derecha en desktop. */
  rel?: string;
  /** +24h sin atender: dot ámbar pulsante + microtexto en el contexto. */
  urgente?: boolean;
  estado?: 'pendiente' | 'seguimiento' | 'atendido' | 'no-confirmado';
  /** Write-once: "✓ Atendido · 9:41 AM". Se escribe una vez y no se recalcula. */
  stamp?: string;
  /** Columnas fijas del renglón desktop (nombre 230 · chip 104 · rel 92 · acción 140). */
  desktop?: boolean;
  onAtender?: () => void;
  onSi?: () => void;
  onNo?: () => void;
}

export declare function RenglonPersona(props: RenglonPersonaProps): JSX.Element;
export declare function DotAmbar(props: { size?: number }): JSX.Element;
