import React from "react";
import { TextField } from "@mui/material";
import type { ISelectInput } from "@/budgets/types";
import { Controller, FieldValues } from "react-hook-form";

export interface ITimeInput<TFieldValues extends FieldValues = unknown> extends Omit<
  ISelectInput<TFieldValues>,
  "options" | "isMultiple" | "loading" | "value" | "onChange"
> {
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TimeInput = <T extends FieldValues = FieldValues>({
  name,
  label,
  control,
  value,
  onChange,
  placeholder,
  disabled,
  fullWidth = true,
  required,
  error,
  helperText,
  rules,
  size = "medium",
}: ITimeInput<T>) => {
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="time"
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            required={!!rules?.required}
            fullWidth={fullWidth}
            size={size}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    );
  }

  return (
    <TextField
      name={name}
      type="time"
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      value={value ?? ""}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      fullWidth={fullWidth}
      size={size}
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default TimeInput;
