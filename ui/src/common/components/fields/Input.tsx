import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: RegisterOptions<T>;
  onChange?: (value: string) => string;
  multiline?: boolean;
  rows?: number;
}

export function Input<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  disabled,
  rules,
  onChange,
  multiline,
  rows,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          variant="outlined"
          label={label}
          type={type}
          multiline={multiline}
          required={!!rules?.required}
          rows={rows}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e.target.value);
          }}
          placeholder={placeholder}
          disabled={disabled}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}
