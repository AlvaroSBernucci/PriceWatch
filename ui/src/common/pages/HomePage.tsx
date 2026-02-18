import { Box, Container, Typography, Button, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Footer } from "../components/sections/Footer";
import SecurityIcon from "@mui/icons-material/Security";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { FeatureCard } from "../components/sections/FeatureCard";
import { HowItWorksStep } from "../components/sections/HowItWorksStep";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 10, md: 16 }, textAlign: "center" }}>
          <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, mb: 3 }}>
            Nunca mais perca uma{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              promoção
            </Box>
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 700, mx: "auto" }}>
            Cole o link de qualquer produto e deixe que a gente monitore o preço pra você. Quando o
            preço cair, você recebe uma notificação instantânea.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button variant="contained" size="large" component={Link} to="/register">
              Começar a Monitorar
            </Button>
          </Stack>
        </Box>
      </Container>

      <Box id="features" sx={{ bgcolor: "background.default", py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, mb: 2 }}>
              Por que usar o PriceWatch?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Economize tempo e dinheiro com monitoramento automático
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FeatureCard
                icon={<TrendingDownIcon />}
                title="Monitoramento 24/7"
                description="Verificamos preços constantemente para você não perder oportunidades"
                color="primary.light"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FeatureCard
                icon={<NotificationsActiveIcon />}
                title="Alertas Instantâneos"
                description="Receba notificações em tempo real quando o preço cair"
                color="secondary.light"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FeatureCard
                icon={<SecurityIcon />}
                title="Seguro e Confiável"
                description="Seus dados protegidos com autenticação e criptografia"
                color="warning.light"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FeatureCard
                icon={<FlashOnIcon />}
                title="Simples e Rápido"
                description="Cole o link, defina o preço e pronto"
                color="info.light"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box id="how-it-works" sx={{ py: 10 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, mb: 2 }}>
              Como Funciona
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Três passos simples para economizar
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <HowItWorksStep
                step="1"
                title="Cole o Link"
                description="Copie o link do produto e cole no PriceWatch"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <HowItWorksStep
                step="2"
                title="Deixe com a Gente"
                description="Monitoramos o preço automaticamente"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <HowItWorksStep
                step="3"
                title="Receba Alertas"
                description="Você será avisado quando o preço cair"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: 10 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Pronto para economizar?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Junte-se a milhares de usuários
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              component={Link}
              to="/register"
            >
              Criar Conta Grátis
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
