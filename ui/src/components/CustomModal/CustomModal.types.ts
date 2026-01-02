export interface ModalInterface {
  title: string;
  open: boolean;
  subtitle?: string;
  children?: React.ReactNode;
  handleClose: (value: React.SetStateAction<boolean>) => void;
}
