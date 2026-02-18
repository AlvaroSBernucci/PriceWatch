import { useForm } from "react-hook-form";
import { ROUTES } from "@/constants/routes";
import { useConfirmReset } from "../../useAuth";
import { styles } from "./ResetPasswordPage.styled";
import { useNavigate, useParams, Link } from "react-router-dom";
import AuthLayout from "@/auth/components/cards/AuthLayout";
import type { IResetPasswordFormValues } from "@/auth/types";
import { Box, Typography} from "@mui/material";
import ResetPasswordForm from "@/auth/components/forms/ResetPasswordForm";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const { mutate: resetPassword, isPending: loading } = useConfirmReset();

  const { control, handleSubmit, watch } = useForm<IResetPasswordFormValues>({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = (data: IResetPasswordFormValues) => {
    resetPassword({
      uid,
      token,
      password: data.password,
      confirmPassword: data.passwordConfirm,
    });
  };

  return (
    <Box sx={styles.container}>
      <AuthLayout
        title="Nova Senha"
        subtitle="Digite sua nova senha para redefinir o acesso."
        footer={
          <Typography variant="body2" color="text.secondary">
            Já tem uma conta?{" "}
            <Link to={ROUTES.AUTH.LOGIN} style={{ color: "inherit", fontWeight: 600 }}>
              Fazer login
            </Link>
          </Typography>
        }
      >
        <ResetPasswordForm/>
      </AuthLayout>
    </Box>
  );
};

export default ResetPasswordPage;
