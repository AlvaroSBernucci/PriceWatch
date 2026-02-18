import { FieldValues } from "react-hook-form";
import type { IInputTypes } from "@/common/types";
import { Input } from "@/common/components/fields/Input";

const PRODUCT_RULES = {
  required: "O Nome do produto é obrigatório",
};

function ProductNameInput<T extends FieldValues>({
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
      rules={rules || PRODUCT_RULES}
    />
  );
}

export default ProductNameInput;
