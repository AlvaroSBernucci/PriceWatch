import { FieldValues } from "react-hook-form";
import type { IInputTypes } from "@/common/types";
import { Input } from "@/common/components/fields/Input";

const URL_RULES = {
  validate: (value: string) => {
    if (!value) return true;

    try {
      new URL(value);
      return true;
    } catch {
      return "Informe uma URL válida";
    }
  },
};

function URLInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  disabled,
  rules,
}: IInputTypes<T>) {
  return (
    <Input
      name={name}
      control={control}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      rules={rules || URL_RULES}
    />
  );
}

export default URLInput;
