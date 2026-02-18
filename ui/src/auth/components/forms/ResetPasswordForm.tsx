import { Box, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import PasswordInput from "@/auth/components/fields/PasswordInput";
import type { IResetPasswordFormValues } from "@/auth/types";

function ResetPasswordForm() {
  const defaultValues: IResetPasswordFormValues = {
    password: "",
    password_confirm: "",
  };
  const { control, handleSubmit } = useForm<IResetPasswordFormValues>({ defaultValues });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <PasswordInput name="password" label="Senha" control={control} rules={{ required: true }} />
        <PasswordInput
          name="password_confirm"
          label="Confirmar Senha"
          control={control}
          rules={{ required: true }}
        />

        <Button type="submit" variant="contained" size="large" fullWidth>
          Resetar Senha
        </Button>
      </Box>
    </Box>
  );
}

export default ResetPasswordForm;
