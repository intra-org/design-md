import * as React from 'react';
export interface TarjetaKanbanProps extends React.HTMLAttributes<HTMLDivElement> {
  nombre: string;
  producto?: string;
  productoColor?: string;
  productoFondo?: string;
  contexto?: string;
  rel?: string;
  /** +24h sin atender → dot ámbar pulsante. */
  urgente?: boolean;
  densidad?: 'extendida' | 'compacta';
  seleccionada?: boolean;
  /** Destino del arrastre: anillo 2px + scale 1.02. */
  objetivo?: boolean;
  /** Tarjeta de origen mientras se arrastra (35%). */
  arrastrando?: boolean;
  /** Pie: BotonesAtender o BotonesResolver. */
  acciones?: React.ReactNode;
  /** Pie alternativo: "✓ Confirmado · 9:15 AM". Gana sobre acciones. */
  sello?: string;
  selloColor?: string;
  /** Checkbox de selección (Equipo). */
  casilla?: React.ReactNode;
}
export declare function TarjetaKanban(props: TarjetaKanbanProps): JSX.Element;
export interface ColumnaKanbanProps {
  titulo?: string;
  conteo?: number;
  activa?: boolean;
  /** Texto del vacío: "Ninguna cerrada sin confirmar." */
  vacio?: string;
  /** Sustituye el encabezado (Equipo: avatar + vendedor). */
  cabecera?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function ColumnaKanban(props: ColumnaKanbanProps): JSX.Element;
