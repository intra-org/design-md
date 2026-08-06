import * as React from 'react';

export interface ChipRemovibleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onQuitar?: () => void;
  children?: React.ReactNode;
}

export declare function ChipRemovible(props: ChipRemovibleProps): JSX.Element;
