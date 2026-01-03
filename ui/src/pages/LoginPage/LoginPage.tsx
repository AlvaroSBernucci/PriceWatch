import { Typography } from "@mui/material";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import AuthLayout from "../../components/Helper/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Entrar na sua conta"
      subtitle="Entre com seu email e senha"
      footer={
        <Typography variant="body2" color="text.secondary">
          Não tem uma conta?{" "}
          <Link to="/register" style={{ color: "inherit", fontWeight: 600 }}>
            Criar conta
          </Link>
        </Typography>
      }>
      <LoginForm />
    </AuthLayout>
  );
}
