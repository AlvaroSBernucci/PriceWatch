import { Box, Button } from "@mui/material";
import useApiForm from "../../../hooks/useApiForm";
import { CircularProgress } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { registerUser } from "../../../api/user.services";
import { TextInput, EmailInput, PasswordInput } from "../../TextInputs/TextInputs";
import type { RegisterFormInterface } from "./RegisterForm.types";

function RegisterForm() {
  const defaultValues: RegisterFormInterface = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  };
  const { control, handleSubmit, reset } = useForm<RegisterFormInterface>({ defaultValues });
  const { submit, loading } = useApiForm<RegisterFormInterface>(registerUser, {
    onSuccess: () => reset(),
    successMessage: "Usuário criado com sucesso",
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextInput label="Usuário" placeholder="" disabled={loading} {...field} />}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <EmailInput label="E-mail" placeholder="exemplo@gmail.com" disabled={loading} {...field} />}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <PasswordInput label="Senha" placeholder="" disabled={loading} {...field} />}
        />
        <Controller
          name="password_confirm"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <PasswordInput label="Confirmar Senha" placeholder="" disabled={loading} {...field} />}
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

export default RegisterForm;
