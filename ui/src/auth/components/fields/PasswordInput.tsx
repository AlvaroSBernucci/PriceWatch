import { FieldValues } from "react-hook-form";
import type { IInputTypes } from "@/common/types";
import { Input } from "@/common/components/fields/Input";

const PASSWORD_RULES = {
  required: "Senha é obrigatória",
  // minLength: {
  //   value: 8,
  //   message: "A senha deve ter no mínimo 8 caracteres",
  // },
};

function PasswordInput<T extends FieldValues>({
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
      type="password"
      control={control}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      rules={rules || PASSWORD_RULES}
    />
  );
}

export default PasswordInput;
