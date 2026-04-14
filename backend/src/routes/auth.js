import express from "express";
import User from "../models/user.js"; // ajusta la ruta si es necesario

const router = express.Router();

// 👉 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, lastName, email, phone, password } = req.body;

    // 🔍 Validar campos
    if (!name || !lastName || !email || !phone || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    // 🔍 Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "El correo ya está registrado"
      });
    }

    // 💾 Crear usuario
    const newUser = new User({
      name,
      lastName,
      email,
      phone,
      password
    });

    await newUser.save();

    res.status(201).json({
      message: "Usuario registrado correctamente"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al registrar"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // 🔥 limpiar datos
    email = email.toLowerCase().trim();
    password = password.trim();

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const user = await User.findOne({ email });

    console.log("USER:", user);

    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado"
      });
    }

    // 🔥 convertir a string por seguridad
    if (String(user.password) !== String(password)) {
      return res.status(400).json({
        message: "Contraseña incorrecta"
      });
    }

    res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error en el servidor"
    });
  }
});

// 🔥 OBTENER TODOS LOS USUARIOS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuarios"
    });
  }
});


// 🔥 ELIMINAR USUARIO
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Usuario eliminado"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar usuario"
    });
  }
});


// 🔥 ACTUALIZAR USUARIO
router.put("/users/:id", async (req, res) => {
  try {
    const { name, lastName, email, phone } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      name,
      lastName,
      email,
      phone
    });

    res.json({
      message: "Usuario actualizado"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar usuario"
    });
  }
});
export default router;