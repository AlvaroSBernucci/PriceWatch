import { Box, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box sx={{ borderTop: 1, borderColor: "divider", py: 6, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        © 2025 PriceWatch. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}
