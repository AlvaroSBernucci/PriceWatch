import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import TextField from "@mui/material/TextField";

export interface INumberInput<T extends FieldValues = FieldValues> {
  name?: Path<T>;
  control?: Control<T>;
  rules?: RegisterOptions<T>;

  value?: number;
  onChange?: (value: number) => void;

  label: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  error?: boolean;
}

export function NumberInput<T extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  value,
  onChange,
  label,
  placeholder,
  disabled,
  min = 1,
}: INumberInput<T>) {
  if (control) {
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
            type="number"
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{
              htmlInput: {
                min,
                step: "any",
              },
              inputLabel: { shrink: true },
            }}
            onChange={(e) => {
              const val = e.target.value;
              field.onChange(val === "" ? "" : Number(val));
            }}
          />
        )}
      />
    );
  }

  return (
    <TextField
      fullWidth
      variant="outlined"
      type="number"
      label={label}
      value={value ?? ""}
      placeholder={placeholder}
      disabled={disabled}
      slotProps={{
        htmlInput: { min },
        inputLabel: { shrink: true },
      }}
      onChange={(e) => {
        const val = e.target.value;
        if (val === "") {
          onChange?.(0);
        } else {
          onChange?.(Number(val));
        }
      }}
    />
  );
}
