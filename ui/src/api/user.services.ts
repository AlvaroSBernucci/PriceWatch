import { api } from "../utils/axios";
import type { LoginFormInterface } from "../components/LoginForm/LoginForm.types";
import type { RegisterFormInterface } from "../components/RegisterForm/RegisterForm.types";

export const registerUser = async (data: RegisterFormInterface) => {
  if (data.password !== data.password_confirm) {
    throw new Error("As senhas não conferem");
  }
  if (data.password.length < 8) {
    throw new Error("Senha Fraca");
  }

  return api.post("/api/users/register/", data);
};
export const userLogin = async (data: LoginFormInterface) => {
  return api.post("/api/token/", data);
};
