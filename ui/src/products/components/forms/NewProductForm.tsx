import URLInput from "../fields/URLInput";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { PriceInput } from "../fields/PriceInput";
import type { ICreateProduct } from "@/products/types";
import ProductNameInput from "../fields/ProductNameInput";
import ProductSourceInput from "../fields/ProductSourceInput";
import type { ModalState } from "@/products/pages/ProductsPage";
import { useCreateProduct, useProductSource } from "@/products/useProducts";

function NewProductForm({
  onClose,
}: {
  onClose: React.Dispatch<React.SetStateAction<ModalState>>;
}) {
  const { control, handleSubmit } = useForm<ICreateProduct>();
  const { data: productSources } = useProductSource();
  const { mutateAsync: createProduct, isPending } = useCreateProduct();

  const onSubmit = async (data: ICreateProduct) => {
    await createProduct(data, {
      onSuccess: () => {
        onClose(null);
      },
    });
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <ProductNameInput name="name" label="Nome do produto" control={control} />
        <URLInput name="link" label="URL do produto" control={control} />
        <PriceInput name="target_price" label="Preço Alvo (Opcional)" control={control} />
        <ProductSourceInput
          name="product_source"
          label="Nome da Loja"
          options={productSources || []}
          control={control}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isPending ? "Adicionando" : "Adicionar Produto"}
        </Button>
      </Box>
    </Box>
  );
}

export default NewProductForm;
