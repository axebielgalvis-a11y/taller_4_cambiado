import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// 🔥 Middlewares
app.use(cors());
app.use(express.json());

// 🔌 Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado 🍃"))
  .catch((error) => console.log(error));

// 🧪 Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// 🔐 Rutas
app.use("/api/auth", authRoutes);

// 🚀 Servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});