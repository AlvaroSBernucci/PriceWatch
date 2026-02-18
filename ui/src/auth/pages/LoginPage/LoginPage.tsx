import { ROUTES } from "@/constants/routes";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LoginForm from "@/auth/components/forms/LoginForm";
import AuthLayout from "@/auth/components/cards/AuthLayout";

const LoginPage = () => {
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
        title="Entrar na sua conta"
        subtitle="Entre com seu email e senha"
        footer={
          <Typography variant="body2" color="text.secondary">
            Não tem uma conta?{" "}
            <Link
              component={RouterLink}
              to={ROUTES.AUTH.REGISTER}
              style={{ color: "inherit", fontWeight: 600 }}
            >
              Criar conta
            </Link>
          </Typography>
        }
      >
        <LoginForm />
      </AuthLayout>
    </Box>
  );
};
export default LoginPage;
