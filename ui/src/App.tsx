import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import NavHeader from "./components/NavHeader/NavHeader";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SnackLayer from "./components/SnackLayer/SnackLayer";
import { SnackProvider } from "./contexts/snackContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <SnackProvider>
      <BrowserRouter>
        <NavHeader />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </BrowserRouter>
      <SnackLayer />
    </SnackProvider>
  );
}

export default App;
