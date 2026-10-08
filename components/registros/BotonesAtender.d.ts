export interface BotonesAtenderProps {
  /** Abre WhatsApp y mueve a En seguimiento. */
  onWhatsApp?: (e: any) => void;
  /** "Ya lo atendí por otro canal" → En seguimiento sin abrir WhatsApp. */
  onYaAtendi?: (e: any) => void;
  style?: any;
}
export declare function BotonesAtender(props: BotonesAtenderProps): JSX.Element;
