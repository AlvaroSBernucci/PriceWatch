import { Box, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import UsernameInput from "../fields/UsernameInput";
import PasswordInput from "../fields/PasswordInput";
import { useForm } from "react-hook-form";
import { useLogin } from "@/auth/useAuth";

export interface LoginFormInterface {
  username: string;
  password: string;
}

function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginFormInterface) => {
    login(data);
  };

  const { control, handleSubmit } = useForm<LoginFormInterface>();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <UsernameInput name="username" label="Usuário" control={control} />
        <PasswordInput name="password" label="Senha" control={control} />
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
