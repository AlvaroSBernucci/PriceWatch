import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import NavHeader from "./components/NavHeader/NavHeader";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SnackLayer from "./components/Helper/SnackLayer/SnackLayer";
import { UserStorage } from "./contexts/userContext";
import { SnackProvider } from "./contexts/snackContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Helper/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <SnackProvider>
      <BrowserRouter>
        <UserStorage>
          <NavHeader />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserStorage>
      </BrowserRouter>
      <SnackLayer />
    </SnackProvider>
  );
}

export default App;
