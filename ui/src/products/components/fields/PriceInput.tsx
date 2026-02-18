import { FieldValues } from "react-hook-form";
import { NumberInput } from "@/common/components/fields/NumberInput";
import type { INumberInput } from "@/common/components/fields/NumberInput";

export type IPriceInput<T extends FieldValues = FieldValues> = Omit<
  INumberInput<T>,
  "label" | "min"
> & {
  label?: string;
};

export function PriceInput<T extends FieldValues = FieldValues>({
  label = "Preço",
  ...props
}: IPriceInput<T>) {
  return <NumberInput label={label} min={0} {...props} />;
}
