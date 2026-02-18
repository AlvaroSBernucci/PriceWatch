import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, keyframes } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const shine = keyframes`
  to {
    background-position: 200% center;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: `0 ${theme.spacing(3)}`,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "4rem",
          marginBottom: theme.spacing(3),
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #F3E5AB 50%, ${theme.palette.primary.main} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% auto",
          animation: `${shine} 5s linear infinite`,
        }}
      >
        Soutto Mayor e Você | Orçamentos
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.25rem",
          color: theme.palette.text.secondary,
          marginBottom: theme.spacing(6),
          maxWidth: 600,
        }}
      >
        Gerencie seus orçamentos com sofisticação e eficiência. O sistema completo para eventos
        inesquecíveis.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
        Acessar Sistema
      </Button>
    </Box>
  );
};

export default Home;
