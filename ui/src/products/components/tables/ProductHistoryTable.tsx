import {
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TableContainer,
} from "@mui/material";

interface PriceHistoryEntry {
  product: number;
  price: string;
  created_at: string;
}

interface ProductHistoryTableProps {
  priceHistory: PriceHistoryEntry[];
  parsePrice: (value: string) => number;
}

export default function ProductHistoryTable({
  priceHistory,
  parsePrice,
}: ProductHistoryTableProps) {
  const reversedHistory = [...priceHistory].reverse();

  return (
    <Card elevation={2} sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Registro de Preços
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Todos os preços coletados para este produto
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    Data
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography variant="body2" fontWeight="bold">
                    Preço
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    Variação
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reversedHistory.map((entry, index, arr) => {
                const price = parsePrice(entry.price);
                const prevEntry = arr[index + 1];
                const prevPrice = prevEntry ? parsePrice(prevEntry.price) : price;

                const diff = price - prevPrice;
                const diffPercent = prevPrice > 0 ? (diff / prevPrice) * 100 : 0;

                return (
                  <TableRow key={index} hover>
                    <TableCell>{entry.created_at}</TableCell>

                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>

                    <TableCell align="right">
                      {diff === 0 ? (
                        <Chip label="Sem alteração" size="small" variant="outlined" />
                      ) : (
                        <Chip
                          label={`${diff > 0 ? "+" : ""}${diffPercent.toFixed(1)}%`}
                          size="small"
                          color={diff < 0 ? "success" : "error"}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
