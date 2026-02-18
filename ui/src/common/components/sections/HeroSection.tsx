import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { Box, Container, Button, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: 10 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, mb: 2 }}>
            Pronto para economizar?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Junte-se a milhares de usuários que já estão economizando com o PriceWatch
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            component={Link}
            to={ROUTES.AUTH.REGISTER}
          >
            Criar Conta Grátis
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
