import { TextField, Autocomplete } from "@mui/material";

export interface AutocompleteOption<T = any> {
  label: string;
  value: T;
}

interface Props<T = any> {
  label: string;
  name?: string;
  value: T | null;
  onChange: (value: T | null) => void;
  onInputChange?: (inputValue: string) => void;
  options: AutocompleteOption<T>[];
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
}

export function AutocompleteInput<T>({
  label,
  name,
  value,
  onChange,
  onInputChange,
  options,
  placeholder,
  error,
  helperText,
  required,
  fullWidth = true,
}: Props<T>) {
  const selectedOption = options?.find((opt) => opt.value === value) || null;

  return (
    <Autocomplete
      options={options || []}
      getOptionLabel={(opt) => opt.label || ""}
      value={selectedOption}
      isOptionEqualToValue={(opt, val) => opt.value === val.value}
      noOptionsText="Nenhum resultado"
      onChange={(_, newValue) => onChange(newValue?.value ?? null)}
      onInputChange={(_, newInputValue) => onInputChange?.(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          placeholder={placeholder}
          required={required}
          error={error}
          helperText={helperText}
          fullWidth={fullWidth}
        />
      )}
    />
  );
}
