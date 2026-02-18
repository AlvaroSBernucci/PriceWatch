import { Box, Avatar, Typography } from "@mui/material";

interface Props {
  step: string;
  title: string;
  description: string;
}

export function HowItWorksStep({ step, title, description }: Props) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Avatar
        sx={{
          bgcolor: "primary.main",
          width: 64,
          height: 64,
          mx: "auto",
          mb: 2,
          fontSize: "1.5rem",
          fontWeight: 700,
        }}
      >
        {step}
      </Avatar>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}
