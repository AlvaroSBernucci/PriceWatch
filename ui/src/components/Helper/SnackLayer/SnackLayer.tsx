import SnackBar from "../../SnackBar/SnackBar";
import { useSnack } from "../../../contexts/snackContext";

export default function SnackLayer() {
  const { snackbarMessage, snackbarSeverity, snackbarOpen, closeSnack } = useSnack();

  return <SnackBar message={snackbarMessage} open={snackbarOpen} severity={snackbarSeverity} closeSnack={closeSnack} autoHideDuration={4000} />;
}
