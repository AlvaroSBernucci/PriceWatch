import { toCurrency, toPercent } from "@/utils/formater";
import type { ProductsInterface } from "@/products/types";
import { Box, Button, Card, CardContent, Chip, Typography } from "@mui/material";
import { AccessTime, OpenInNew, TrendingDown, TrendingUp } from "@mui/icons-material";

interface ProductHeaderCardProps {
  product: ProductsInterface;
}

export function ProductHeaderCard({ product }: ProductHeaderCardProps) {
  return (
    <Card elevation={2} sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Chip label={`ID: ${product.id}`} size="small" variant="outlined" />
              <Button
                size="small"
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNew fontSize="small" />}
                sx={{ textTransform: "none" }}
              >
                Ver na loja
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTime fontSize="small" sx={{ color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                Ultima verificacao: {product.latest_verification || "-"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Preço Atual: {toCurrency(product.current_price)}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary" fontWeight={700}>
                Diferença do preço anterior:
              </Typography>
              {product.price_change !== undefined && (
                <Chip
                  icon={product.has_changed ? <TrendingUp /> : <TrendingDown />}
                  label={`${product.has_changed ? "+" : ""}${toPercent(product.price_change)}`}
                  size="small"
                  color={product.has_changed ? "error" : "success"}
                />
              )}
            </Box>

            {product.target_price && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Preco alvo: <strong>{toCurrency(product.target_price)}</strong>
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
