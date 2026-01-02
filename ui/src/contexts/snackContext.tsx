import { createContext, useContext, useState, useCallback } from "react";
import type { Severity } from "../components/SnackBar/SnackBar.types";

interface SnackContextInterface {
  snackbarMessage: string;
  snackbarSeverity: Severity;
  snackbarOpen: boolean;
  showSnack: (message: string, severity: Severity) => void;
  closeSnack: () => void;
}

const SnackContext = createContext<SnackContextInterface | null>(null);

export function useSnack() {
  const context = useContext(SnackContext);
  if (!context) {
    throw new Error("useSnack must be used inside the SnackProvider");
  }
  return context;
}

export function SnackProvider({ children }: { children: React.ReactNode }) {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnack = useCallback((message: string, severity: Severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const closeSnack = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  return <SnackContext.Provider value={{ snackbarMessage, snackbarSeverity, snackbarOpen, showSnack, closeSnack }}>{children}</SnackContext.Provider>;
}
