import React from "react";
import { FormControlLabel, Checkbox, Box, Typography } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface CustomCheckboxProps<T extends FieldValues> {
  label: string;
  name?: Path<T>;
  control?: Control<T>;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  helperText?: string;
}

function CustomCheckbox<T extends FieldValues>({
  label,
  name,
  control,
  checked,
  onChange,
  disabled = false,
  helperText = "Marque para SIM, deixe desmarcado para NÃO",
}: CustomCheckboxProps<T>) {
  const checkboxLabel = (
    <Box>
      <Typography variant="body2">{label}</Typography>
      {helperText && (
        <Typography variant="caption" color="text.secondary">
          {helperText}
        </Typography>
      )}
    </Box>
  );

  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} disabled={disabled} />}
            label={checkboxLabel}
          />
        )}
      />
    );
  }

  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} disabled={disabled} />}
      label={checkboxLabel}
    />
  );
}

export default CustomCheckbox;
