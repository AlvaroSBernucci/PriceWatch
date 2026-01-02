import { Container, Box, Typography } from "@mui/material";
import type { ContainerInterface } from "./Container.types";

function CustomContainer({ title, subtitle, children, actions }: ContainerInterface) {
  return (
    <Box sx={{ mt: 8 }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 4 }}>
          <Box>
            <Typography component="h2" sx={{ fontSize: "2rem", fontWeight: "600" }}>
              {title}
            </Typography>
            <Typography component="p" sx={{ fontSize: "1rem", color: "text.secondary" }}>
              {subtitle}
            </Typography>
          </Box>
          {actions && <Box>{actions}</Box>}
        </Box>
        {children}
      </Container>
    </Box>
  );
}

export default CustomContainer;
