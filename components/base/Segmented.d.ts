import * as React from 'react';

export interface SegmentedOption { value: string; label: string }

export interface SegmentedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 4 segmentos en el selector de periodo, 3 en las vistas de Agenda. */
  options: Array<SegmentedOption | string>;
  value: string;
  onChange?: (value: string) => void;
  /** true = full-width (patrón móvil). */
  full?: boolean;
  alto?: number;
}

export declare function Segmented(props: SegmentedProps): JSX.Element;
