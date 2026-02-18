import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import UsernameInput from "../fields/UsernameInput";
import EmailInput from "../fields/EmailInput";
import PasswordInput from "../fields/PasswordInput";
import type { IRegisterUser } from "@/auth/types";

function RegisterForm() {
  const defaultValues: IRegisterUser = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  };
  const { control, handleSubmit } = useForm<IRegisterUser>({ defaultValues });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <UsernameInput name="username" label="Usuário" control={control} />
        <EmailInput name="email" label="E-mail" control={control} placeholder="exemplo@gmail.com" />
        <PasswordInput name="password" label="Senha" control={control} />
        <PasswordInput name="password_confirm" label="Confirmar Senha" control={control} />

        <Button type="submit" variant="contained" size="large" fullWidth>
          Registrar
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterForm;
