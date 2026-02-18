import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import type { IForgotPasswordForm } from "@/auth/types";
import EmailInput from "@/auth/components/fields/EmailInput";

function ForgotPasswordPage() {
  const defaultValues: IForgotPasswordForm = {
    email: "",
  };
  const { control, handleSubmit } = useForm<IForgotPasswordForm>({ defaultValues });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <EmailInput name="email" label="Email" control={control} />

        <Button type="submit" variant="contained" size="large" fullWidth>
          Resetar Senha
        </Button>
      </Box>
    </Box>
  );
}

export default ForgotPasswordPage;
