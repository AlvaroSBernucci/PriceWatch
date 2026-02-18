import { ReactNode } from "react";
import { TrendingDown } from "@mui/icons-material";
import { Box, Container, Card, Typography, Stack, Avatar } from "@mui/material";

export interface IAuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footer?: ReactNode;
}

export default function AuthLayout({ children, title, subtitle, footer }: IAuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
              <TrendingDown />
            </Avatar>
            <Typography variant="h5" fontWeight={700}>
              PriceWatch
            </Typography>
          </Stack>

          <Card sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            </Box>

            {children}

            {footer && <Box sx={{ mt: 3, textAlign: "center" }}>{footer}</Box>}
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
