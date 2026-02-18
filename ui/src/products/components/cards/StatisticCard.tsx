import { Card, CardContent, Typography, Stack } from "@mui/material";

export interface StatisticCardInterface {
  title: string;
  text?: string;
  numberValue: number;
}
function StatisticCard({ title, text, numberValue }: StatisticCardInterface) {
  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 1 }}
        >
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            {title}
          </Typography>
          {/* <Inventory color="action" /> */}
        </Stack>
        <Typography variant="h3" fontWeight={700}>
          {numberValue}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatisticCard;
