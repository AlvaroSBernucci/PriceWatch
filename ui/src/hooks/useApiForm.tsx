import { useState } from "react";
import { useSnack } from "../contexts/snackContext";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import type { SubmitHandler } from "react-hook-form";

function useApiForm<T>(
  apiCall: (data: T) => Promise<any>,
  options?: {
    onSuccess?: (res: any) => void;
    successMessage?: string;
  }
) {
  const [loading, setLoading] = useState(false);
  const { showSnack } = useSnack();

  const submit: SubmitHandler<T> = async (data) => {
    setLoading(true);
    try {
      const res = await apiCall(data);
      options?.onSuccess?.(res);
      if (options?.successMessage) {
        showSnack(options.successMessage, "success");
      }
    } catch (err) {
      showSnack(extractErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
}

export default useApiForm;
