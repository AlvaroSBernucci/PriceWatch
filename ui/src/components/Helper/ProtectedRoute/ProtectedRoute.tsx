import { useUserContext } from "../../../contexts/userContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { logged, loading } = useUserContext();

  if (loading) {
    return null;
  }

  return logged ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
