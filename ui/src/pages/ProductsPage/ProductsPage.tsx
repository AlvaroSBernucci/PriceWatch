import { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { deleteProduct } from "../../api/product.services.ts";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import CustomModal from "../../components/CustomModal/CustomModal.tsx";
import StatisticCard from "../../components/StatisticCard/StatisticCard";
import CustomContainer from "../../components/Helper/Container/Container.tsx";
import NewProductForm from "../../components/Forms/NewProductForm/NewProductForm.tsx";
import { GetProducts } from "../../api/product.services.ts";

type ModalState = { type: "add" } | { type: "delete"; productId: number } | null;
function ProductsPage() {
  const { data: products, fetchData: refetchProducts } = GetProducts();
  const [modal, setModal] = useState<ModalState>(null);
  const [open, setOpen] = useState(false);
  const openAdd = () => setModal({ type: "add" });
  const openDelete = (productId: number) => setModal({ type: "delete", productId });
  const closeModal = () => setModal(null);

  const handleDelete = async () => {
    if (modal?.type === "delete") {
      const controller = new AbortController();
      const signal = controller.signal;
      deleteProduct(modal.productId);
      refetchProducts(signal);
      await setModal(null);
    }
  };

  return (
    <CustomContainer
      title={"Meus dispositivos"}
      subtitle={"Gerencie seus produtos monitorados"}
      actions={
        <Button variant="contained" onClick={openAdd}>
          Adicionar Produto
        </Button>
      }>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid sx={{ xs: 12, md: 4 }}>
          <StatisticCard title="Total de produtos" text="Produtos monitorados" numberValue={products?.length} />
        </Grid>
      </Grid>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Produtos Recentes
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {products?.length ? (
          products.map((product) => (
            <Grid sx={{ xs: 12, md: 4 }} key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                current_price={product.current_price}
                initial_price={product.initial_price}
                lowest_price={product.lowest_price}
                last_but_one_price={product.last_but_one_price}
                price_change={product.price_change}
                has_changed={product.has_changed}
                openDelete={openDelete}
              />
            </Grid>
          ))
        ) : (
          <Typography color="text.secondary">Sem produtos cadastrados</Typography>
        )}
      </Grid>
      <CustomModal
        open={modal?.type === "add"}
        handleClose={closeModal}
        title="Adicionar Produto"
        subtitle="Cole o link do produto que deseja monitorar. Opcionalmente, defina um preço alvo para receber alertas.">
        <NewProductForm onClose={() => setOpen(false)} />
      </CustomModal>
      <CustomModal
        open={modal?.type === "delete"}
        handleClose={closeModal}
        title="Excluir Produto"
        subtitle="Tem certeza que deseja excluir esse produto?">
        <Button variant="contained" color="error" sx={{ mr: 4 }} onClick={closeModal}>
          Não
        </Button>
        <Button variant="outlined" onClick={handleDelete}>
          Sim
        </Button>
      </CustomModal>
    </CustomContainer>
  );
}

export default ProductsPage;
