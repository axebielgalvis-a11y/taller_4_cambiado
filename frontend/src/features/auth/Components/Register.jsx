import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ URL del backend desde .env
const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    // 🔥 VALIDACIÓN
    if (
      !form.name ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.phone
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/api/auth/register`, // ✅ CORREGIDO
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);

      alert("Usuario registrado correctamente ✅");
      navigate("/login");

    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message || "Error al registrar ❌"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000, #434343)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            📝 Crear Cuenta
          </Typography>

          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                label="Nombre"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </Grid>

            <Grid size={6}>
              <TextField
                label="Apellido"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Correo"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Teléfono"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              borderRadius: 3,
              backgroundColor: "#000",
              "&:hover": { backgroundColor: "#333" },
            }}
            onClick={handleRegister}
          >
            Registrarse
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" style={{ color: "black", fontWeight: "bold" }}>
              Inicia sesión
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;