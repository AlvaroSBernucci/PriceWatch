import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "@/auth/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";
import { useLogout } from "@/auth/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.LOGIN);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ mb: 4 }}>
      <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
        <Box
          component="img"
          src="/logo_negativa.png"
          alt="Logo"
          sx={{ height: 50, cursor: "pointer" }}
          onClick={() => navigate(ROUTES.PANEL)}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {user && (
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: "inherit",
                  lineHeight: 1.2,
                }}
              >
                {user.first_name} {user.last_name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {user.is_superuser ? "Administrador" : "Atendente"}
              </Typography>
            </Box>
          )}
          <Button
            variant="outlined"
            onClick={handleLogout}
            size="small"
            sx={{
              borderColor: "rgba(255,255,255,0.5)",
              color: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
