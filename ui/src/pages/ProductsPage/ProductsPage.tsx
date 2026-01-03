import { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import CustomContainer from "../../components/Helper/Container/Container.tsx";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import CustomModal from "../../components/CustomModal/CustomModal.tsx";
import StatisticCard from "../../components/StatisticCard/StatisticCard";
import NewProductForm from "../../components/Forms/NewProductForm/NewProductForm.tsx";

const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    currentPrice: 7299.99,
    initialPrice: 8499.99,
    lowestPrice: 7199.99,
    priceChange: -14.12,
    lastChecked: "2024-01-15T10:30:00",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 512GB",
    currentPrice: 6899.99,
    initialPrice: 6499.99,
    lowestPrice: 6499.99,
    priceChange: 6.15,
    lastChecked: "2024-01-15T09:15:00",
  },
  {
    id: 3,
    name: 'MacBook Air M3 13" 16GB RAM',
    currentPrice: 9499.99,
    initialPrice: 10999.99,
    lowestPrice: 9499.99,
    priceChange: -13.64,
    lastChecked: "2024-01-15T08:45:00",
  },
];

function ProductsPage() {
  const [products] = useState(mockProducts);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <CustomContainer
      title={"Meus dispositivos"}
      subtitle={"Gerencie seus produtos monitorados"}
      actions={
        <Button variant="contained" onClick={handleOpen}>
          Adicionar Produto
        </Button>
      }>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid sx={{ xs: 12, md: 4 }}>
          <StatisticCard />
        </Grid>
        <Grid sx={{ xs: 12, md: 4 }}>
          <StatisticCard />
        </Grid>
      </Grid>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Produtos Recentes
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {products.map((product) => (
          <Grid sx={{ xs: 12, md: 4 }} key={product.id}>
            <ProductCard
              name={product.name}
              currentPrice={product.currentPrice}
              initialPrice={product.initialPrice}
              lowestPrice={product.lowestPrice}
              priceChange={product.priceChange}
            />
          </Grid>
        ))}
      </Grid>
      <CustomModal
        open={open}
        handleClose={handleClose}
        title="Adicionar Produto"
        subtitle="Cole o link do produto que deseja monitorar. Opcionalmente, defina um preço alvo para receber alertas.">
        <NewProductForm onClose={() => setOpen(false)} />
      </CustomModal>
    </CustomContainer>
  );
}

export default ProductsPage;
