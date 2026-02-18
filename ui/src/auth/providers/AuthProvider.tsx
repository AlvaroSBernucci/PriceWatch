import type { IMeUser } from "../types";
import { useAuthUser } from "../useAuth";
import { ROUTES } from "@/constants/routes";
import { useLocation } from "react-router-dom";
import { createContext, useContext } from "react";

interface IAuthContext {
  user: IMeUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  isAdmin: boolean;
  hasGroup: (group: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }) => {
  const { pathname } = useLocation();

  const PUBLIC_PREFIXES = [
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.FORGOT_PASSWORD,
    ROUTES.AUTH.RESET_PASSWORD_PAGE,
    ROUTES.AUTH.REGISTER,
  ];

  const isPublicRoute = PUBLIC_PREFIXES.some((route) => pathname.startsWith(route));

  const hasToken = !!localStorage.getItem("access_token");

  const { data: user, isLoading } = useAuthUser({
    enabled: !isPublicRoute && hasToken,
  });
  const hasGroup = (group: string) => user?.permissions_groups?.includes(group) ?? false;

  const hasPermission = (permission: string) => user?.permissions?.includes(permission) ?? false;

  const isAdmin = user?.is_superuser || hasGroup("Administrador");

  const value: IAuthContext = {
    user: user || null,
    isAuthenticated: !!user,
    loading: isLoading,
    isAdmin,
    hasGroup,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
