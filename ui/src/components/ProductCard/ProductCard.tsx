import { toCurrency, toPercent } from "../../utils/formater";
import { Box, Typography, Button, Card, CardContent, IconButton, Stack, Chip, CardActions } from "@mui/material";
import { TrendingDown, TrendingUp, Delete, ShowChart } from "@mui/icons-material";
import type { ProductCardType } from "./ProductCard.types";

function ProductCard({
  id,
  name,
  current_price,
  initial_price,
  lowest_price,
  last_but_one_price,
  price_change,
  has_changed,
  openDelete,
}: ProductCardType) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: "100%", marginBottom: 2, gap: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
            {name}
          </Typography>
          {price_change !== undefined && (
            <Chip
              icon={has_changed ? <TrendingUp /> : <TrendingDown />}
              label={`${has_changed ? "+" : ""}${toPercent(price_change)}`}
              size="small"
              color={has_changed ? "error" : "success"}
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
                {toCurrency(current_price)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                {toCurrency(last_but_one_price)}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {toCurrency(lowest_price)}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {toCurrency(initial_price)}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button size="small" startIcon={<ShowChart />} fullWidth variant="outlined">
          Ver Histórico
        </Button>
        <IconButton size="small" color="error" onClick={() => openDelete(id)}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
