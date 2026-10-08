import * as React from 'react';
export interface OpcionVista { value: string; icono: string; titulo?: string; }
export interface ToggleVistaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 'lista' | 'kanban' por defecto. */
  value?: string;
  onChange?: (value: string) => void;
  /** Sobrescribe las dos opciones (icono = nombre de Icon). */
  opciones?: OpcionVista[];
}
export declare function ToggleVista(props: ToggleVistaProps): JSX.Element;
