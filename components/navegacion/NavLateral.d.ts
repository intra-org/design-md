import * as React from 'react';

export interface ItemNav { id: string; label: string; icono: string; conteo?: number }

export interface NavLateralProps extends React.HTMLAttributes<HTMLElement> {
  /** Nombre de la propiedad, no de la empresa. */
  hotel?: string;
  items: ItemNav[];
  activo?: string;
  onSelect?: (id: string) => void;
  /** Slot del pie (bottom 74px): el botón de modo/tema vive aquí, no arriba a la derecha. */
  modo?: React.ReactNode;
  usuario?: { iniciales: string; nombre: string; rol: string };
  /** Riel de 84px icon-only (radio 42). */
  colapsado?: boolean;
  onColapsar?: () => void;
  base?: string;
}

export declare function NavLateral(props: NavLateralProps): JSX.Element;
