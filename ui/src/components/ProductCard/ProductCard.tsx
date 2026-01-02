import { Box, Typography, Button, Card, CardContent, IconButton, Stack, Chip, CardActions } from "@mui/material";
import { TrendingDown, TrendingUp, Delete, ShowChart } from "@mui/icons-material";
import type { ProductCardInterface } from "./ProductCard.types";

function ProductCard({ name, currentPrice, initialPrice, lowestPrice, priceChange }: ProductCardInterface) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: "100%", marginBottom: 2, gap: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
            {name}
          </Typography>
          {priceChange !== undefined && (
            <Chip
              icon={priceChange < 0 ? <TrendingDown /> : <TrendingUp />}
              label={`${priceChange > 0 ? "+" : ""}${priceChange.toFixed(2)}%`}
              size="small"
              color={priceChange < 0 ? "success" : "error"}
            />
          )}
        </Box>
        <Stack spacing={0.5}>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Preço Atual
              </Typography>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                R$ {currentPrice.toFixed(2)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Menor preço: R$ {lowestPrice.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Preço inicial: R$ {initialPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button size="small" startIcon={<ShowChart />} fullWidth variant="outlined">
          Ver Histórico
        </Button>
        <IconButton size="small" color="error">
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
