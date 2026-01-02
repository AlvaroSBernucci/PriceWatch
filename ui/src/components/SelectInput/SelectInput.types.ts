export interface SelectOption<T = any> {
  label: string;
  value: T;
}

export interface SelectInputInterface<T = any> {
  label: string;
  options: SelectOption<T>[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  disabled?: boolean;
  loading?: boolean;
  isMultiple?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
}
