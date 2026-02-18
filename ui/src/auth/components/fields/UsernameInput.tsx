import { FieldValues } from "react-hook-form";
import type { IInputTypes } from "@/common/types";
import { Input } from "@/common/components/fields/Input";

const USERNAME_RULES = {
  required: "Usuário é obrigatório",
};

function UsernameInput<T extends FieldValues>({
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
      rules={rules || USERNAME_RULES}
    />
  );
}

export default UsernameInput;
