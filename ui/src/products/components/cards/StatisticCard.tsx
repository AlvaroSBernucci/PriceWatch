import { Paper, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

export interface StatisticCardInterface {
  title: string;
  numberValue: number | string;
  icon?: SvgIconComponent;
  iconColor?: string;
}
function StatisticCard({
  title,
  numberValue,
  icon: Icon,
  iconColor = "primary.main",
}: StatisticCardInterface) {
  return (
    <Paper elevation={1} sx={{ p: 2.5, textAlign: "center" }}>
      {Icon && (
        <Icon
          sx={{
            color: iconColor,
            mb: 0.5,
          }}
        />
      )}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        {numberValue}
      </Typography>
    </Paper>
  );
}

export default StatisticCard;
