import authService from "./services";
import { ROUTES } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import { useSnack } from "@/common/providers/SnackContext";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuthUser = (options = { enabled: true }) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.getMe,
    retry: false,
    staleTime: Infinity,
    ...options,
  });
};

export const useLogin = () => {
  const qc = useQueryClient();
  const { showSnack } = useSnack();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["auth", "me"] });
      showSnack("Login realizado com sucesso!", "success");
      navigate(ROUTES.PRODUCTS.LIST);
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error);
      showSnack(errorMessage, "error");
    },
  });
};

export const useLogout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => authService.logout(),
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["auth", "me"] });
    },
  });
};

export const useResetPassword = () => {
  const qc = useQueryClient();
  const { showSnack } = useSnack();

  return useMutation({
    mutationFn: (email: string) => authService.requestReset(email),
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["auth", "me"] });
      showSnack("Link enviado com sucesso! Verifique seu e-mail", "success");
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error);
      showSnack(errorMessage, "error");
    },
  });
};

export const useConfirmReset = () => {
  const qc = useQueryClient();
  const { showSnack } = useSnack();

  return useMutation({
    mutationFn: ({
      uid,
      token,
      password,
      confirmPassword,
    }: {
      uid: string;
      token: string;
      password: string;
      confirmPassword: string;
    }) => authService.confirmReset(uid, token, password, confirmPassword),
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["auth", "me"] });
      showSnack("Senha atualizada com sucesso!", "success");
    },
    onError: (error: unknown) => {
      const errorMessage = extractErrorMessage(error);
      showSnack(errorMessage, "error");
    },
  });
};
