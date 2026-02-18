import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/providers/AuthProvider";

export const PermissionRoute = ({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) => {
  const { hasPermission, loading } = useAuth();

  if (loading) return null;

  if (!hasPermission(permission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
