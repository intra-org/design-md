import * as React from 'react';
export declare function iniciales(nombre?: string): string;
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  nombre?: string;
  /** Iniciales explícitas; si no, se derivan del nombre. */
  ini?: string;
  /** 20 en botón Asignar, 28 en menú/pila, 34 kanban, 40 fila de vendedor. */
  size?: number;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
export interface AvatarStackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  nombres?: string[];
  /** Visibles antes del "+N". Default 3. */
  max?: number;
}
export declare function AvatarStack(props: AvatarStackProps): JSX.Element;
