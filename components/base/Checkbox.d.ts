import * as React from 'react';
export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Lado en px. Default 16. */
  size?: number;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
