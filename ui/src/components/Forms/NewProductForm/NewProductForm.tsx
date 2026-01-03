import useApiForm from "../../../hooks/useApiForm";
import ProductSourceInput from "../../ProductSourceInput/ProductSourceInput";
import { Box, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { TextInput } from "../../TextInputs/TextInputs";
import { registerProduct } from "../../../api/product.services";
import { useForm, Controller } from "react-hook-form";
import type { NewProductFormInterface } from "./NewProductForm.types";
import { useUserContext } from "../../../contexts/userContext";

function NewProductForm({ onClose }: { onClose: React.Dispatch<React.SetStateAction<boolean>> }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProductFormInterface>();
  const { userData } = useUserContext();
  const { submit, loading } = useApiForm<NewProductFormInterface>((data) => registerProduct({ ...data, user: userData!.id }), {
    onSuccess: () => onClose(false),
    successMessage: "Produto cadastrado com sucesso",
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <TextInput
              label="Nome do produto"
              placeholder="Ex: SmartWatch Huawei GT 6"
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={loading}
              {...field}
            />
          )}
        />
        <Controller
          name="link"
          control={control}
          rules={{ required: "A url é obrigatória" }}
          render={({ field }) => (
            <TextInput
              label="URL do produto"
              placeholder="Cole o link completo do produto de qualquer loja online"
              error={!!errors.link}
              helperText={errors.link?.message}
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
              error={!!errors.target_price}
              helperText={errors.target_price ? errors.target_price?.message : "Se definido, você será notificado quando o preço atingir este valor"}
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
