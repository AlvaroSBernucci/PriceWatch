import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Typography, Box } from "@mui/material";
import AuthLayout from "@/auth/components/cards/AuthLayout";
import RegisterForm from "@/auth/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "0 auto",
        px: 3,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AuthLayout
        title="Crie sua conta"
        subtitle="Preencha os dados abaixo para começar a monitorar preços"
        footer={
          <Typography variant="body2" color="text.secondary">
            Já tem uma conta?{" "}
            <Link to={ROUTES.AUTH.LOGIN} style={{ color: "inherit", fontWeight: 600 }}>
              Fazer login
            </Link>
          </Typography>
        }
      >
        <RegisterForm />
      </AuthLayout>
    </Box>
  );
}
