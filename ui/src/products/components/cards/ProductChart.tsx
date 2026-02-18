import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import type { TooltipProps } from "recharts";
import { Paper, Typography, Box } from "@mui/material";

interface PriceHistory {
  date: string;
  price: number;
}

interface ProductChartProps {
  data: PriceHistory[];
  targetPrice: number | null;
}

export function ProductChart({ data, targetPrice }: ProductChartProps) {
  const prices = data.map((item) => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const yMin = Math.floor(minPrice - priceRange * 0.1);
  const yMax = Math.ceil(maxPrice + priceRange * 0.1);

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <Paper elevation={3} sx={{ p: 1.5 }}>
          <Typography variant="caption" display="block">
            {payload[0].payload.date}
          </Typography>
          <Typography variant="body1" fontWeight="bold" color="primary">
            {Number(payload[0].value).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1976d2" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" style={{ fontSize: "12px" }} stroke="#666" />
          <YAxis
            domain={[yMin, yMax]}
            style={{ fontSize: "12px" }}
            stroke="#666"
            tickFormatter={(value) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
              })
            }
          />
          <Tooltip content={<CustomTooltip />} />
          {targetPrice && (
            <ReferenceLine
              y={targetPrice}
              stroke="#4caf50"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: "Preço Alvo",
                position: "insideTopRight",
                fill: "#4caf50",
                fontSize: 12,
              }}
            />
          )}
          <Area
            type="monotone"
            dataKey="price"
            stroke="#1976d2"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
