// Content.jsx
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Stack,
  Grid,
  Avatar,
  Chip,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  TextField,
  InputAdornment,
  Alert
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import StarIcon from "@mui/icons-material/Star";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export const Content = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Supermercado", amount: 85000, category: "Comida", date: "Hoy", icon: <ShoppingCartIcon /> },
    { id: 2, name: "Cena", amount: 35000, category: "Restaurante", date: "Ayer", icon: <RestaurantIcon /> },
    { id: 3, name: "Gasolina", amount: 120000, category: "Transporte", date: "Ayer", icon: <DirectionsCarIcon /> },
    { id: 4, name: "Arriendo", amount: 800000, category: "Vivienda", date: "5 Mar", icon: <HomeIcon /> },
  ]);

  const totalGastos = expenses.reduce((sum, e) => sum + e.amount, 0);
  const promedioDiario = (totalGastos / 30).toFixed(0);
  const presupuestoRecomendado = 1500000;

  const features = [
    {
      icon: <SpeedIcon sx={{ fontSize: 42, color: "#10b981" }} />,
      title: "Control total",
      desc: "Visualiza y controla cada gasto al instante"
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 42, color: "#10b981" }} />,
      title: "Datos seguros",
      desc: "Tu información financiera protegida"
    }
  ];

  const testimonials = [
    {
      name: "Ana García",
      role: "Usuario frecuente",
      text: "Esta app me ayudó a ahorrar más de $200.000 mensuales. ¡Increíble!",
      rating: 5,
      avatar: "AG"
    }
  ];

  return (
    <main>

      {/* HERO */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          textAlign: "center",
          px: 2
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" justifyContent="center">

            {/* TEXTO */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip
                icon={<FlashOnIcon sx={{ color: "#10b981" }} />}
                label="Control financiero"
                sx={{
                  bgcolor: "rgba(16,185,129,0.15)",
                  color: "#10b981",
                  mb: 3
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  mb: 2
                }}
              >
                Gastos diarios
                <Box component="span" sx={{ color: "#10b981", display: "block" }}>
                  simplificados
                </Box>
              </Typography>

              <Typography sx={{ color: "#94a3b8", mb: 4 }}>
                Controla tus finanzas, ahorra más y alcanza tus metas
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#10b981",
                    color: "#fff",
                    fontWeight: 700,
                    '&:hover': { bgcolor: "#059669" }
                  }}
                >
                  Controla tus gastos
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#10b981",
                    color: "#10b981"
                  }}
                >
                  Manejo de gastos
                </Button>
              </Stack>
            </Grid>

            {/* IMAGEN / ESTADÍSTICAS */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", borderRadius: 4 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>Total gastado</Typography>
                    <Typography variant="h3" sx={{ color: "#10b981", fontWeight: 800 }}>
                      ${totalGastos.toLocaleString()}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderColor: "#334155" }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" sx={{ color: "#94a3b8" }}>Promedio diario</Typography>
                      <Typography variant="h6" sx={{ color: "#fff" }}>${Number(promedioDiario).toLocaleString()}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: "#94a3b8" }}>Presupuesto mensual</Typography>
                      <Typography variant="h6" sx={{ color: "#f59e0b" }}>${presupuestoRecomendado.toLocaleString()}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* FEATURES */}
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={800} mb={6}>
          ¿Por qué usar Gestor de Gastos?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card sx={{ p: 4, textAlign: "center", bgcolor: "#f8fafc" }}>
                {f.icon}
                <Typography fontWeight={700} mt={2}>
                  {f.title}
                </Typography>
                <Typography color="text.secondary">
                  {f.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ p: 4, textAlign: "center", bgcolor: "#f8fafc" }}>
              <SavingsIcon sx={{ fontSize: 42, color: "#10b981" }} />
              <Typography fontWeight={700} mt={2}>Ahorro inteligente</Typography>
              <Typography color="text.secondary">Identifica gastos innecesarios</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* LISTA DE GASTOS RECIENTES - CORREGIDA */}
      <Box sx={{ bgcolor: "#f1f5f9", py: 10 }}>
        <Container>
          <Typography variant="h4" fontWeight={800} mb={6} textAlign="center">
            Gastos recientes
          </Typography>

          <Grid container justifyContent="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper elevation={2}>
                <List>
                  {expenses.map((expense, index) => (
                    <Box key={expense.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#10b981" }}>
                            {expense.icon}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Stack direction="row" justifyContent="space-between">
                              <Typography fontWeight={700}>{expense.name}</Typography>
                              <Typography fontWeight={800} color="#10b981">${expense.amount.toLocaleString()}</Typography>
                            </Stack>
                          }
                          secondary={
                            // CAMBIO IMPORTANTE: Usar Box con component="span" en lugar de Stack directamente
                            <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.5 }}>
                              <Chip label={expense.category} size="small" sx={{ bgcolor: "#e2e8f0" }} />
                              <Typography variant="caption" color="text.secondary" component="span">
                                {expense.date}
                              </Typography>
                            </Box>
                          }
                          // Forzar que secondary no use <p> como contenedor
                          secondaryTypographyProps={{ component: "span" }}
                        />
                      </ListItem>
                      {index < expenses.length - 1 && <Divider variant="inset" component="li" />}
                    </Box>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* TESTIMONIOS */}
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={800} mb={6}>
          Lo que dicen nuestros usuarios
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((t, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={i}>
              <Card sx={{ p: 4, bgcolor: "#f8fafc" }}>
                {[...Array(t.rating)].map((_, i) => (
                  <StarIcon key={i} sx={{ color: "#f59e0b" }} />
                ))}

                <Typography fontStyle="italic" mt={2}>
                  "{t.text}"
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center" mt={3} justifyContent="center">
                  <Avatar sx={{ bgcolor: "#10b981" }}>{t.avatar}</Avatar>
                  <Box>
                    <Typography fontWeight={700}>{t.name}</Typography>
                    <Typography color="text.secondary">{t.role}</Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Box sx={{ bgcolor: "#0f172a", py: 8, textAlign: "center" }}>
        <Container>
          <Typography variant="h4" color="#10b981" fontWeight={800}>
            ¿Listo para tomar control de tus finanzas?
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 3, bgcolor: "#10b981", color: "#fff" }}
          >
            Comienza ahora
          </Button>
        </Container>
      </Box>

      {/* GITHUB - Botón mejorado */}
      <Box sx={{ py: 6, textAlign: "center", bgcolor: "#0a0f1a" }}>
        <Button
          variant="contained"
          href="https://github.com/axebielgalvis-a11y/taller_4_cambiado.git"
          target="_blank"
          startIcon={<GitHubIcon />}
          sx={{
            bgcolor: "#1e293b",
            color: "#fff",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: 3,
            transition: "all 0.3s ease",
            '&:hover': {
              bgcolor: "#10b981",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(16,185,129,0.3)"
            }
          }}
        >
          Ver código en GitHub
        </Button>

        <Typography variant="caption" sx={{ color: "#64748b", display: "block", mt: 2 }}>
          Proyecto open source - Contribuciones bienvenidas
        </Typography>
      </Box>

    </main>
  );
};