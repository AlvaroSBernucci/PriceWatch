import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUserData } from "../api/user.services";

import type { PropsWithChildren } from "react";
import { clearToken, getToken } from "../utils/auth";

export interface UserContextInterface {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
}

export interface UserContextType {
  userData: UserContextInterface | null;
  logged: boolean;
  loading: boolean;
  login: (token: string, route: string) => void;
  logout: () => void;
  fetchUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) throw new Error("useContext deve estar dentro do Provider");
  return context;
};

export const UserStorage = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const { fetchData } = GetUserData();

  const [userData, setUserData] = useState<UserContextInterface | null>(null);

  const fetchUserData = async () => {
    const token = getToken();
    if (!token) {
      logout();
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const resp = await fetchData(signal);
      if (resp) {
        setUserData(resp);
        setLogged(true);
      }
    } catch (err) {
      console.error(err);
      clearToken();
      setUserData(null);
      setLogged(false);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const login = (token: string, route: string) => {
    localStorage.setItem("token", token);
    setLogged(true);
    fetchUserData();
    navigate(route);
  };

  const logout = () => {
    clearToken();
    setUserData(null);
    setLogged(false);
    navigate("/login");
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return <UserContext.Provider value={{ userData, logged, login, logout, fetchUserData, loading }}>{children}</UserContext.Provider>;
};
