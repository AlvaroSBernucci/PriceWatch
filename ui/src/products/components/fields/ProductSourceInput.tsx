import { FieldValues } from "react-hook-form";
import type { ISelectInput } from "@/common/types";
import { TextField, MenuItem } from "@mui/material";
import { CustomSelectInput } from "@/common/components/fields/CustomSelectInput";

const PRODUCT_SOURCE_RULES = {
  required: "A loja é obrigatória",
};

const ProductSourceInput = <TFieldValues extends FieldValues>({
  control,
  options,
  value,
  onChange,
  name,
  label = "Loja",
  placeholder = "Selecione a loja",
  fullWidth = true,
  size = "small",
  rules,
}: ISelectInput<TFieldValues>) => {
  if (control) {
    return (
      <CustomSelectInput
        name={name}
        control={control}
        label={label}
        options={options}
        placeholder={placeholder}
        rules={rules || PRODUCT_SOURCE_RULES}
      />
    );
  }

  return (
    <TextField
      fullWidth={fullWidth}
      select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      size={size}
    >
      <MenuItem value="">Todos</MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ProductSourceInput;
