import { api } from "../utils/axios";
import useAxios from "../hooks/useAxios";
import type { UserContextInterface } from "../contexts/userContext";
import type { LoginFormInterface } from "../components/Forms/LoginForm/LoginForm.types";
import type { RegisterFormInterface } from "../components/Forms/RegisterForm/RegisterForm.types";

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

export const GetUserData = () => {
  return useAxios<UserContextInterface>("/api/users/me/");
};
