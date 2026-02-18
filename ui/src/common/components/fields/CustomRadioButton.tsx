import React, { memo, useMemo } from "react";
import {
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface CustomRadioButtonProps<T extends FieldValues> {
  label: string;
  name?: Path<T>;
  control?: Control<T>;
  options: RadioOption[];
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  helperText?: string;
  row?: boolean;
}

function CustomRadioButtonComponent<T extends FieldValues>(props: CustomRadioButtonProps<T>) {
  const {
    label,
    name,
    control,
    options,
    value,
    onChange,
    disabled = false,
    helperText,
    row = true,
  } = props;

  const renderedOptions = useMemo(
    () =>
      options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio disabled={disabled || option.disabled} />}
          label={option.label}
        />
      )),
    [options, disabled]
  );

  const renderRadioGroup = (fieldProps?: any) => (
    <Box>
      <FormLabel>{label}</FormLabel>
      {helperText && (
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
          {helperText}
        </Typography>
      )}
      <RadioGroup {...fieldProps} row={row}>
        {renderedOptions}
      </RadioGroup>
    </Box>
  );

  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <FormControl fullWidth>{renderRadioGroup(field)}</FormControl>}
      />
    );
  }

  return <FormControl fullWidth>{renderRadioGroup({ value, onChange })}</FormControl>;
}

const CustomRadioButton = memo(CustomRadioButtonComponent) as typeof CustomRadioButtonComponent;

export default CustomRadioButton;
