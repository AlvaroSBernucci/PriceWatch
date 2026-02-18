import { FieldValues } from "react-hook-form";
import type { IInputTypes } from "@/common/types";
import { Input } from "@/common/components/fields/Input";

const EMAIL_RULES = {
  required: "Email é obrigatório",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Email inválido",
  },
};

function EmailInput<T extends FieldValues>({
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
      type="email"
      control={control}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      rules={rules || EMAIL_RULES}
    />
  );
}

export default EmailInput;
