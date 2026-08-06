import * as React from 'react';

export interface CapturaResolverProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'no' → ¿Qué pasó? (motivos) · 'si' → Monto de la venta. */
  kind?: 'no' | 'si';
  onMotivo?: (motivo: string) => void;
  onNota?: (nota: string) => void;
  onMonto?: (monto: string) => void;
  onCerrar?: () => void;
}

export declare function CapturaResolver(props: CapturaResolverProps): JSX.Element;
export declare function Chispas(props: { style?: React.CSSProperties }): JSX.Element;
export declare const CAP_MOTIVOS: Array<[string, string[]]>;
