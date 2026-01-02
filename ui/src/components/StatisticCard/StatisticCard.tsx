import { Card, CardContent, Typography, Stack } from "@mui/material";

function StatisticCard() {
  const totalProducts = 0;

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Total de Produtos
          </Typography>
          {/* <Inventory color="action" /> */}
        </Stack>
        <Typography variant="h3" fontWeight={700}>
          {totalProducts}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          produtos monitorados
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatisticCard;
