import { useNavigate } from "react-router-dom";
import useApiForm from "../../hooks/useApiForm";
import { Box, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { TextInput } from "../TextInputs/TextInputs";
import ProductSourceInput from "../ProductSourceInput/ProductSourceInput";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { NewProductFormInterface } from "./NewProductForm.types";

function NewProductForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProductFormInterface>();
  const onSubmit: SubmitHandler<NewProductFormInterface> = async (data) => {
    console.log(data);
    // setLoading(true);
    // try {
    //   const resp = await userLogin(data);
    //   localStorage.setItem("token", resp.data);
    //   navigate("/home");
    // } catch (error) {
    //   const errorMessage = extractErrorMessage(error);
    //   showSnack(errorMessage, "error");
    // } finally {
    //   setLoading(false);
    // }
  };
  const { submit, loading } = useApiForm(onSubmit);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Controller
          name="link"
          control={control}
          rules={{ required: "A url é obrigatória" }}
          render={({ field }) => (
            <TextInput
              label="URL do produto"
              placeholder="Cole o link completo do produto de qualquer loja online"
              error={!!errors.link}
              disabled={loading}
              {...field}
            />
          )}
        />
        <Controller
          name="target_price"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <TextInput
              label="Preço Alvo (Opcional)"
              placeholder="199,00"
              helperText="Se definido, você será notificado quando o preço atingir este valor"
              error={!!errors.target_price}
              disabled={loading}
              {...field}
            />
          )}
        />
        <Controller
          name="product_source"
          control={control}
          rules={{ required: "Selecione a loja" }}
          render={({ field }) => <ProductSourceInput {...field} error={!!errors.product_source} helperText={errors.product_source?.message} />}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
          {loading ? "Adicionando" : "Adicionar Produto"}
        </Button>
      </Box>
    </form>
  );
}

export default NewProductForm;
