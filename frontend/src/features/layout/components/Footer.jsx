// Footer.jsx
import { Box, Container, Typography, IconButton, Stack, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SavingsIcon from "@mui/icons-material/Savings";

export const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#0f172a", color: "white", pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", md: "row" }} spacing={5} justifyContent="space-between">
          {/* Logo y descripción */}
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <SavingsIcon sx={{ fontSize: 32, color: "#10b981" }} />
              <Typography variant="h4" component="h2" fontWeight="800" sx={{ letterSpacing: "-0.5px", color: "#10b981" }}>
                GestorGastos
              </Typography>
            </Stack>
            <Typography variant="body2" component="div" sx={{ color: "#94a3b8", mt: 1, maxWidth: 280, lineHeight: 1.6 }}>
              Controla tus gastos diarios, ahorra de forma inteligente y alcanza tus metas financieras.
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <IconButton href="#" sx={{ color: "#10b981", "&:hover": { color: "#059669" } }}><GitHubIcon /></IconButton>
              <IconButton href="#" sx={{ color: "#10b981", "&:hover": { color: "#059669" } }}><TwitterIcon /></IconButton>
              <IconButton href="#" sx={{ color: "#10b981", "&:hover": { color: "#059669" } }}><LinkedInIcon /></IconButton>
              <IconButton href="#" sx={{ color: "#10b981", "&:hover": { color: "#059669" } }}><InstagramIcon /></IconButton>
            </Stack>
          </Box>

          {/* Enlaces rápidos */}
          <Box>
            <Typography variant="h6" fontWeight="700" gutterBottom sx={{ letterSpacing: "-0.3px", color: "#10b981" }}>Secciones</Typography>
            <Stack spacing={1.5}>
              <Typography component="a" href="/" sx={{ color: "#94a3b8", textDecoration: "none", "&:hover": { color: "#10b981" }, transition: "color 0.2s" }}>Inicio</Typography>
              <Typography component="a" href="/reportes" sx={{ color: "#94a3b8", textDecoration: "none", "&:hover": { color: "#10b981" }, transition: "color 0.2s" }}>Reportes</Typography>
              <Typography component="a" href="/consejos" sx={{ color: "#94a3b8", textDecoration: "none", "&:hover": { color: "#10b981" }, transition: "color 0.2s" }}>Consejos de ahorro</Typography>
              <Typography component="a" href="/login" sx={{ color: "#94a3b8", textDecoration: "none", "&:hover": { color: "#10b981" }, transition: "color 0.2s" }}>Iniciar Sesión</Typography>
            </Stack>
          </Box>

          {/* Contacto */}
          <Box>
            <Typography variant="h6" fontWeight="700" gutterBottom sx={{ letterSpacing: "-0.3px", color: "#10b981" }}>Contacto</Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneIcon sx={{ fontSize: 20, color: "#10b981" }} />
                <Typography variant="body2" component="div" sx={{ color: "#94a3b8" }}>
                  +57 300 000 0000
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <EmailIcon sx={{ fontSize: 20, color: "#10b981" }} />
                <Typography variant="body2" component="div" sx={{ color: "#94a3b8" }}>
                  contacto@gestorgastos.com
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <LocationOnIcon sx={{ fontSize: 20, color: "#10b981" }} />
                <Typography variant="body2" component="div" sx={{ color: "#94a3b8" }}>
                  Bogotá, Colombia
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 4, borderColor: "#334155" }} />

        <Typography variant="body2" component="div" textAlign="center" sx={{ color: "#64748b" }}>
          © 2026 GestorGastos. Todos los derechos reservados. | Hecho con ❤️ para tu libertad financiera
        </Typography>
      </Container>
    </Box>
  );
};