import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { Link, useParams } from "react-router-dom";
import { toCurrency, parsePrice } from "@/utils/formater";
import StatisticCard from "../components/cards/StatisticCard";
import { useProduct, useProductHistory } from "../useProducts";
import { ProductChart } from "../components/cards/ProductChart";
import { ProductHeaderCard } from "../components/cards/ProductHeaderCard";
import ProductHistoryTable from "../components/tables/ProductHistoryTable";
import {
  TrendingDown,
  ArrowBack,
  Delete,
  AttachMoney,
  CalendarToday,
  TrendingUp,
  PriceCheck,
} from "@mui/icons-material";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id ?? "";
  const { data: product } = useProduct(productId);
  const { data: priceHistory = [] } = useProductHistory(productId);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const chartData = priceHistory.map((entry) => ({
    date: entry.created_at,
    price: parsePrice(entry.price),
  }));

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja parar de monitorar este produto?")) return;
    // await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/`, { method: "DELETE" })
    window.location.href = "/dashboard";
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          component={Link}
          to={ROUTES.PRODUCTS.LIST}
          startIcon={<ArrowBack />}
          sx={{ mb: 3, color: "text.secondary" }}
        >
          Voltar ao Dashboard
        </Button>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {product && <ProductHeaderCard product={product} />}
            {product && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(5, 1fr)",
                  },
                  gap: 2,
                  mb: 3,
                }}
              >
                <StatisticCard
                  title={"Último Preço"}
                  numberValue={toCurrency(product.last_but_one_price)}
                  icon={PriceCheck}
                  iconColor="secondary.dark"
                />
                <StatisticCard
                  title={"Preço inicial"}
                  numberValue={toCurrency(product.initial_price)}
                  icon={AttachMoney}
                />
                <StatisticCard
                  title={"Menor Preco"}
                  numberValue={toCurrency(product.lowest_price)}
                  icon={TrendingDown}
                  iconColor="secondary.main"
                />
                <StatisticCard
                  title={"Maior Preco"}
                  numberValue={toCurrency(product.highest_price)}
                  icon={TrendingUp}
                  iconColor="error.main"
                />

                <Paper elevation={1} sx={{ p: 2.5, textAlign: "center" }}>
                  <CalendarToday sx={{ color: "text.secondary", mb: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    Verificacoes
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {priceHistory.length}
                  </Typography>
                </Paper>
              </Box>
            )}
            {product && (
              <Card elevation={2} sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Historico de Precos
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Acompanhe a variacao do preco ao longo do tempo
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ProductChart data={chartData} targetPrice={parsePrice(product.target_price)} />
                </CardContent>
              </Card>
            )}
            {product && <ProductHistoryTable priceHistory={priceHistory} parsePrice={parsePrice} />}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={handleDelete}
              >
                Parar de Monitorar
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
