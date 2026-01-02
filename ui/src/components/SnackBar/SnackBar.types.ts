export type Severity = 'success' | 'error' | 'info' | 'warning';

export interface SnackBarInterface {
  message: string;
  open: boolean;
  autoHideDuration: number;
  severity: Severity;
  closeSnack: () => void;
}
