import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 🔥 Validación
    if (!form.email || !form.password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data); // 🔍 ver respuesta

      // ✅ Guardar usuario
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login exitoso");

      // 🔁 Redirección
      navigate("/Dashboard");

    } catch (error) {
      console.log(error.response?.data); // 🔥 ver error real

      alert(
        error.response?.data?.message || "Credenciales incorrectas"
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
      <Container maxWidth="size">
        <Paper elevation={10} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            🔐 Iniciar Sesión
          </Typography>

          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Correo"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                borderRadius: 3,
                backgroundColor: "#000",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Ingresar
            </Button>
          </Box>

          <Typography align="center" sx={{ mt: 3 }}>
            ¿No tienes cuenta?{" "}
            <Link to="/register" style={{ color: "black", fontWeight: "bold" }}>
              Regístrate aquí
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;