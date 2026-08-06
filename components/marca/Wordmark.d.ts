import * as React from 'react';

export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  alto?: number;
  base?: string;
  /** Muestra la etiqueta "intelligence" (11/600, tracking .34em, --wm-sub). */
  intelligence?: boolean;
}

export declare function Wordmark(props: WordmarkProps): JSX.Element;
