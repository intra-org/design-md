import * as React from 'react';

export interface PopoverItem { value?: string; label: string; meta?: string; dot?: string }

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<PopoverItem | string>;
  value?: string;
  onSelect?: (value: string) => void;
  abierto?: boolean;
  align?: 'left' | 'right';
  ancho?: number;
}

export declare function Popover(props: PopoverProps): JSX.Element;
