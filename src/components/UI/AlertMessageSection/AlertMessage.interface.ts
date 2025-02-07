export type AlertMessageState = 'warning' | 'error';

export interface AlertStateProps {
  state: AlertMessageState;
}

export interface AlertMessageSectionProps {
  description: string;
  onClose: () => void;
  title?: string;
  hideIcon?: boolean;
  state?: AlertMessageState;
}
