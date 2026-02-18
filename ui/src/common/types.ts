import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface IOptions<T> {
  value: T;
  label: string;
}
export interface IInputTypes<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  placeholder?: string;
  disabled?: boolean;
  rules?: RegisterOptions<T>;
}

export interface ISelectInput<TFieldValues extends FieldValues = any, TValue = any> {
  control?: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  options: IOptions<TValue>[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  isMultiple?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  size?: "small" | "medium";

  value?: TValue | TValue[];
  onChange?: (value: TValue | TValue[]) => void;
  error?: boolean;
  helperText?: string;
}
