export interface ILoginForm {
  username: string;
  password: string;
}
export interface IForgotPasswordForm {
  email: string;
}
export interface IResetPasswordFormValues {
  password: string;
  password_confirm: string;
}
export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

const permissions_groups = ["Administrador", "Vendedor"] as const;
type PermissionsGroups = (typeof permissions_groups)[number];

const permissions = [
  "budgets.add_budget",
  "budgets.change_budget",
  "budgets.delete_budget",
  "users.deactivate_user",
  "users.reset_user_password",
] as const;
export type Permission = (typeof permissions)[number];

export interface IMeUser {
  id: number;
  username: string;
  email?: string;
  is_superuser?: boolean;
  permissions_groups: PermissionsGroups[];
  permissions: Permission;
  avatar?: string;
}

export interface IAuthContext {
  user: IMeUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}
