import { createContext, useContext, useState,  useCallback } from "react";

export type ISeverity = "success" | "error" | "info" | "warning";

interface ISnackInterface {
  snackMessage: string;
  open: boolean;
  snackSeverity: ISeverity;
  closeSnack: () => void;
  showSnack: (message: string, severity: ISeverity) => void;
}

const SnackContext = createContext<ISnackInterface | null>(null);

export const useSnack = () => {
  const context = useContext(SnackContext);
  if (context === null) throw new Error("O contexto deve estar dentro do Provider");
  return context;
};

export const SnackProvider = ({ children }) => {
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<ISeverity>();
  const [open, setOpen] = useState(false);

  const showSnack = useCallback((message, severity) => {
    setSnackSeverity(severity);
    setSnackMessage(message);
    setOpen(true);
  }, []);

  const closeSnack = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <SnackContext.Provider value={{ snackMessage, snackSeverity, open, closeSnack, showSnack }}>
      {children}
    </SnackContext.Provider>
  );
};
