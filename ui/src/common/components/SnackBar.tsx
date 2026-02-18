import { Snackbar, Alert } from "@mui/material";
import type { ISeverity } from "../providers/SnackContext";

interface ISnackInterface {
  message: string;
  open: boolean;
  autoHideDuration: number;
  severity: ISeverity;
  closeSnack: () => void;
}

function SnackBar({ message, open, autoHideDuration, severity, closeSnack }: ISnackInterface) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={closeSnack}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={closeSnack}
        severity={severity}
        sx={{ width: "100%", whiteSpace: "pre-line" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
