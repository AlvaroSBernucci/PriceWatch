import "./App.css";
import { ROUTES } from "./constants/routes";
import LoginPage from "./auth/pages/LoginPage/LoginPage";
import NavHeader from "./common/components/sections/NavHeader";
import ProductsPage from "./products/pages/ProductsPage";
import { AuthProvider } from "./auth/providers/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./auth/pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./auth/components/routes/ProtectedRoute";
import ResetPasswordPage from "./auth/pages/ResetPasswordPage/ResetPasswordPage";
import ForgotPasswordPage from "./auth/pages/ForgotPasswordPage/ForgotPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavHeader />
        <Routes>
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.AUTH.RESET_PASSWORD_PAGE} element={<ResetPasswordPage />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PRODUCTS.LIST}
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
