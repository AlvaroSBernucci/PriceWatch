import { Controller, FieldValues } from "react-hook-form";
import { SelectInput } from "./SelectInput";
import type { ISelectInput } from "@/budgets/types";

export function CustomSelectInput<TFieldValues extends FieldValues, TValue>({
  name,
  control,
  label,
  options,
  placeholder,
  disabled,
  loading,
  isMultiple,
  rules,
}: ISelectInput<TFieldValues, TValue>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <SelectInput
          label={label}
          value={field.value}
          onChange={field.onChange}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          isMultiple={isMultiple}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
