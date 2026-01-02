import { TextField } from "@mui/material";
import type { TextInputInterface } from "../../utils/TextInput.types";

export function TextInput({ label, placeholder, disabled, error, helperText, ...rest }: TextInputInterface) {
  return (
    <TextField
      label={label}
      type="text"
      fullWidth
      required
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      helperText={helperText}
      {...rest}
    />
  );
}

export function EmailInput({ label, placeholder, disabled, error, helperText, ...rest }: TextInputInterface) {
  return (
    <TextField
      label={label}
      type="email"
      fullWidth
      required
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      helperText={helperText}
      {...rest}
    />
  );
}
export function PasswordInput({ label, placeholder, disabled, error, helperText, ...rest }: TextInputInterface) {
  return (
    <TextField
      label={label}
      type="password"
      fullWidth
      required
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      helperText={helperText}
      {...rest}
    />
  );
}
