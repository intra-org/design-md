import * as React from 'react';

export interface BotonesResolverProps extends React.HTMLAttributes<HTMLDivElement> {
  onSi?: () => void;
  onNo?: () => void;
}

export declare function BotonesResolver(props: BotonesResolverProps): JSX.Element;
