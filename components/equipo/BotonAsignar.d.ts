import * as React from 'react';
export interface Vendedor { id: string; nombre: string; }
export interface OpcionAsignar { id: string; nombre: string; /** Rol: "Supervisora", "Ejecutivo"… */ sub?: string; /** Oportunidades asignadas. */ carga?: number; /** Cuántas siguen por atender. */ pend?: number; }
export interface BotonAsignarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Vendedor asignado; sin él el botón es sólido "Asignar". */
  vendedor?: Vendedor | null;
  opciones?: OpcionAsignar[];
  onAsignar?: (id: string) => void;
  onQuitar?: () => void;
  /** Controlado: abre/cierra el menú. */
  abierto?: boolean;
  onToggle?: (abierto: boolean) => void;
  /** Abre el menú hacia arriba (filas al pie de la tabla). */
  arriba?: boolean;
}
export declare function BotonAsignar(props: BotonAsignarProps): JSX.Element;
export interface MenuAsignarProps {
  opciones?: OpcionAsignar[];
  actual?: string;
  onElegir?: (id: string) => void;
  /** Muestra "Quitar asignación" al pie. */
  onQuitar?: (() => void) | null;
  arriba?: boolean;
  /** Centrado bajo el botón (default) o anclado a la derecha. */
  centrado?: boolean;
  titulo?: string;
  style?: React.CSSProperties;
}
export declare function MenuAsignar(props: MenuAsignarProps): JSX.Element;
export interface ItemMenuProps { children?: React.ReactNode; onClick?: () => void; activo?: boolean; style?: React.CSSProperties; }
export declare function ItemMenu(props: ItemMenuProps): JSX.Element;
