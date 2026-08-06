import * as React from 'react';

export interface CampoDetalle { k: string; v: React.ReactNode }

export interface SheetDetalleProps extends React.HTMLAttributes<HTMLDivElement> {
  abierto?: boolean;
  nombre: string;
  producto?: string;
  productoColor?: string;
  productoFondo?: string;
  /** Tabla de campos: Producto · Teléfono · Llegó · Cita · Cobrado. */
  campos?: CampoDetalle[];
  /** Atender / ✓✕ — el mismo estado write-once que Personas. */
  acciones?: React.ReactNode;
  onCerrar?: () => void;
  /** Bloque "Lo que pasó" y demás contenido. */
  children?: React.ReactNode;
}

export declare function SheetDetalle(props: SheetDetalleProps): JSX.Element | null;
