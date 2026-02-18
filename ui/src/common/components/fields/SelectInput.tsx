import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  FormHelperText,
} from "@mui/material";

interface ISelectOption<T = any> {
  label: string;
  value: T;
}

interface ISelectInputInterface<T = any> {
  label: string;
  options: ISelectOption<T>[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  disabled?: boolean;
  loading?: boolean;
  isMultiple?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
}

export function SelectInput<T>({
  label,
  options,
  value,
  onChange,
  disabled = false,
  loading = false,
  isMultiple = false,
  placeholder,
  fullWidth = true,
  error,
  helperText,
}: ISelectInputInterface<T>) {
  return (
    <FormControl fullWidth={fullWidth} error={error} disabled={disabled}>
      <InputLabel>{label}</InputLabel>

      <Select
        label={label}
        multiple={isMultiple}
        value={value ?? (isMultiple ? [] : "")}
        onChange={(e) => onChange(e.target.value as any)}
        renderValue={(selected) => {
          if (!selected || (Array.isArray(selected) && selected.length === 0)) {
            return placeholder || "Selecione...";
          }

          if (isMultiple) {
            return (selected as T[])
              .map((v) => options.find((o) => o.value === v)?.label)
              .join(", ");
          }

          return options.find((o) => o.value === selected)?.label;
        }}
      >
        {loading && (
          <MenuItem disabled>
            <CircularProgress size={18} />
          </MenuItem>
        )}

        {options.map((opt, index) => (
          <MenuItem key={String(opt.value)} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
