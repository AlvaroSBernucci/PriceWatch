import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Stack,
} from "@mui/material";
import { TrendingDown } from "@mui/icons-material";
import { useLogout } from "@/auth/useAuth";
import { useAuth } from "@/auth/providers/AuthProvider";

export default function NavHeader() {
  const { mutate: logout } = useLogout();
  const settings = [
    { label: "Meus produtos", to: ROUTES.PRODUCTS.LIST },
    { label: "Minha conta", to: "/account" },
    { label: "Sair", to: ROUTES.AUTH.LOGIN, action: logout },
  ];
  const { pathname } = useLocation();

  const { user } = useAuth();

  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ height: 72 }}>
          <Box
            component={Link}
            to={ROUTES.HOME}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <TrendingDown />
            </Avatar>
            <Typography variant="h6" color="text.primary" fontWeight={700}>
              PriceWatch
            </Typography>
          </Box>

          {user ? (
            <>
              <Tooltip title="Conta">
                <IconButton onClick={(e) => setAnchorUser(e.currentTarget)}>
                  <Avatar src={user.avatar || ""}>{user.username}</Avatar>
                </IconButton>
              </Tooltip>

              <Menu anchorEl={anchorUser} open={!!anchorUser} onClose={() => setAnchorUser(null)}>
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => {
                      setting.action?.();
                      setAnchorUser(null);
                    }}
                    component={Link}
                    to={setting.to}
                  >
                    {setting.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Stack direction="row" spacing={3} sx={{ display: { xs: "none", md: "flex" } }}>
              {pathname === ROUTES.HOME && (
                <>
                  <Button onClick={() => scrollTo("features")} color="inherit">
                    Recursos
                  </Button>
                  <Button onClick={() => scrollTo("how-it-works")} color="inherit">
                    Como Funciona
                  </Button>
                </>
              )}
              <Button component={Link} to={ROUTES.AUTH.LOGIN} color="inherit">
                Login
              </Button>
              <Button variant="contained" component={Link} to={ROUTES.AUTH.REGISTER}>
                Começar Grátis
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
