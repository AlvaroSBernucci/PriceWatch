import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Criar sua conta"
      subtitle="Preencha os dados abaixo para começar a monitorar preços"
      footer={
        <Typography variant="body2" color="text.secondary">
          Já tem uma conta?{" "}
          <Link to="/" style={{ color: "inherit", fontWeight: 600 }}>
            Fazer login
          </Link>
        </Typography>
      }>
      <RegisterForm />
    </AuthLayout>
  );
}
