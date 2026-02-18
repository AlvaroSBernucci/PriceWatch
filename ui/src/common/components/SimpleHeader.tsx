import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

const SimpleHeader = () => {
  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        mb: { xs: 2, md: 4 },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          py: { xs: 1.5, md: 2 },
          minHeight: { xs: 56, md: 64 },
        }}
      >
        <Box
          component="img"
          src="/logo_negativa.png"
          alt="Logo"
          sx={{
            height: { xs: 40, sm: 45, md: 50 },
            maxWidth: "90%",
            objectFit: "contain",
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default SimpleHeader;
