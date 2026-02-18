import api from "@/utils/axios";
import * as LoginTypes from "./types";
import type { IMeUser } from "@/auth/types";

const authService = {
  login: async (loginData: LoginTypes.ILoginForm) => {
    const { data } = await api.post("/token/", loginData);
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    return data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  getMe: async (): Promise<IMeUser> => {
    const { data } = await api.get<IMeUser>("users/me/");
    return data;
  },

  requestReset: async (email: string) => {
    return await api.post("users/password-reset/", { email });
  },

  confirmReset: async (uid: string, token: string, password: string, confirmPassword: string) => {
    return await api.post("users/password-reset/confirm/", {
      uid,
      token,
      password,
      confirmPassword,
    });
  },
};

export default authService;
