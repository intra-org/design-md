import * as React from 'react';

export interface ItemTab { id: string; label: string; icono: string }

export interface TabBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ItemTab[];
  activo?: string;
  onSelect?: (id: string) => void;
  /** 48px solo íconos + dot bajo el activo. */
  contraida?: boolean;
  /** pointerenter/pointerdown sobre la pill la reabren. */
  onInteract?: () => void;
}

export declare function TabBar(props: TabBarProps): JSX.Element;
