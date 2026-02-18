import { toCurrency, toPercent } from "../../../utils/formater";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Chip,
  CardActions,
  Divider,
} from "@mui/material";
import { TrendingDown, TrendingUp, Delete, ShowChart } from "@mui/icons-material";
import type { ProductsInterface } from "@/products/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export type ProductCardType = Pick<
  ProductsInterface,
  | "id"
  | "name"
  | "current_price"
  | "target_price"
  | "lowest_price"
  | "last_but_one_price"
  | "price_change"
  | "has_changed"
> & {
  openDelete: (productId: number) => void;
};

function ProductCard({
  id,
  name,
  current_price,
  target_price,
  lowest_price,
  last_but_one_price,
  price_change,
  has_changed,
  openDelete,
}: ProductCardType) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        backgroundColor: "#fff",
        border: "1px solid",
        borderColor: "primary.main",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ maxWidth: "75%" }} noWrap>
            {name}
          </Typography>

          {price_change !== undefined && (
            <Chip
              icon={has_changed ? <TrendingUp /> : <TrendingDown />}
              label={`${has_changed ? "+" : ""}${toPercent(price_change)}`}
              size="small"
              sx={{
                fontWeight: 600,
                color: has_changed ? "error.main" : "success.main",
              }}
            />
          )}
        </Box>

        <Stack spacing={1.5}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Preço Atual
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              color="primary.main"
              sx={{ letterSpacing: "-0.5px" }}
            >
              {toCurrency(current_price)}
            </Typography>
          </Box>

          <Divider />

          <Box display="flex" justifyContent="space-between">
            {last_but_one_price && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Último preço
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {toCurrency(last_but_one_price)}
                </Typography>
              </Box>
            )}
            {target_price && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Preço Alvo
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {toCurrency(target_price)}
                </Typography>
              </Box>
            )}

            <Box textAlign="right">
              <Typography variant="caption" color="text.secondary">
                Menor preço
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {toCurrency(lowest_price)}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
        <Button
          size="small"
          startIcon={<ShowChart />}
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={() => navigate(ROUTES.PRODUCTS.DETAIL(id))}
        >
          Ver Histórico
        </Button>

        <IconButton
          size="small"
          color="error"
          onClick={() => openDelete(id)}
          sx={{
            borderRadius: 2,
            backgroundColor: "rgba(244,67,54,0.08)",
            "&:hover": {
              backgroundColor: "rgba(244,67,54,0.16)",
            },
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
