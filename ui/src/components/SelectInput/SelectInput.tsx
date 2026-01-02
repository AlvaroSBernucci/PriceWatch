import { FormControl, InputLabel, MenuItem, Select, CircularProgress, FormHelperText } from "@mui/material";
import type { SelectInputInterface } from "./SelectInput.types";

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
}: SelectInputInterface<T>) {
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
            return (selected as T[]).map((v) => options.find((o) => o.value === v)?.label).join(", ");
          }

          return options.find((o) => o.value === selected)?.label;
        }}>
        {loading && (
          <MenuItem disabled>
            <CircularProgress size={18} />
          </MenuItem>
        )}

        {options.map((opt) => (
          <MenuItem key={String(opt.value)} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
