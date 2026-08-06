import * as React from 'react';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Nombre del glifo oficial: 'inicio' | 'personas' | 'agenda' | 'preguntar' | 'productos' | 'historial' | 'soporte' | 'descargar' | 'check-circle' | 'amanecer' | 'atardecer' | 'noche' | 'whatsapp' | 'prod-*' */
  name: string;
  size?: number;
  /** Por defecto currentColor: el glifo hereda el color del contenedor. */
  color?: string;
  title?: string;
}

export declare function Icon(props: IconProps): JSX.Element | null;
export declare const ICONOS: Record<string, { vb: string; stroke: boolean; d: string[] }>;
export declare const NOMBRES_ICONO: string[];
