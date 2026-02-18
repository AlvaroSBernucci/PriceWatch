import { Card, CardContent, Typography, Avatar } from "@mui/material";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <Card>
      <CardContent sx={{ textAlign: "center", py: 4 }}>
        <Avatar sx={{ bgcolor: color, width: 60, height: 60, mx: "auto", mb: 2 }}>{icon}</Avatar>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
