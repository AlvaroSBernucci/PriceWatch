import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import { TrendingDown } from "@mui/icons-material";
import { useLogout } from "@/auth/useAuth";

export default function NavHeader() {
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);
  const { mutate: logout } = useLogout();
  const settings = [
    { label: "Meus produtos", to: ROUTES.PRODUCTS },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Minha conta", to: "/account" },
    { label: "Sair", to: ROUTES.AUTH.LOGIN, action: logout },
  ];

  const isLogged = true;
  const user = { name: "Álvaro", avatar: "" };

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ height: 72 }}>
          <Box
            component={Link}
            to="/home"
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

          {isLogged ? (
            <>
              <Tooltip title="Conta">
                <IconButton onClick={(e) => setAnchorUser(e.currentTarget)}>
                  <Avatar src={user.avatar}>{user.name[0]}</Avatar>
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
            <Button variant="contained" color="primary" component={Link} to="/login">
              Entrar
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
