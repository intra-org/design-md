import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** conteo = pastilla tabular del nav · tonal = "Ya está resuelto" · outline = "GENÉRICO" */
  variant?: 'conteo' | 'tonal' | 'outline';
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;
