import SnackBar from "./SnackBar";
import { useSnack } from "../providers/SnackContext";

function SnackLayer() {
  const { snackMessage, snackSeverity, open, closeSnack } = useSnack();
  return (
    <SnackBar
      open={open}
      message={snackMessage}
      severity={snackSeverity}
      autoHideDuration={4000}
      closeSnack={closeSnack}
    />
  );
}

export default SnackLayer;
