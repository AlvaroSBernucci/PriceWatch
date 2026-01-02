import { Snackbar, Alert } from '@mui/material';
import type { SnackBarInterface } from './SnackBar.types';

function SnackBar({ message, open, autoHideDuration, severity, closeSnack }: SnackBarInterface) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={closeSnack}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={closeSnack} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
