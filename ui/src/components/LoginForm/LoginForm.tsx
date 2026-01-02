import useApiForm from "../../hooks/useApiForm";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Box, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { TextInput, PasswordInput } from "../TextInputs/TextInputs";
import { userLogin } from "../../api/user.services";
import type { LoginFormInterface } from "./LoginForm.types";

function LoginForm() {
  const navigate = useNavigate();
  const { submit, loading } = useApiForm<LoginFormInterface>(userLogin, {
    onSuccess: (resp) => {
      localStorage.setItem("token", resp.data);
      navigate("/products");
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInterface>();

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Controller
          name="username"
          control={control}
          rules={{ required: "Usuário é obrigatório" }}
          render={({ field }) => <TextInput label="Usuário" placeholder="" error={!!errors.username} disabled={loading} {...field} />}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Senha é obrigatória" }}
          render={({ field }) => <PasswordInput label="Senha" placeholder="" error={!!errors.password} disabled={loading} {...field} />}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </Box>
    </form>
  );
}

export default LoginForm;
