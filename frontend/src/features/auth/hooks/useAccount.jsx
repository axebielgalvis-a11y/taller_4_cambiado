import { useState, useEffect } from "react";

export const useAccount = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
    background: ""
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("userAccount");
    if (data) {
      const parsed = JSON.parse(data);
      setUser(parsed);
      setForm(parsed);
    }
  }, []);

  // Detectar estado online/offline
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // Validación en tiempo real
  useEffect(() => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Ingresa tu nombre";
    if (!form.email) newErrors.email = "Ingresa un correo";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Correo inválido";
    if (!form.password) newErrors.password = "Ingresa una contraseña";
    else if (form.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    setErrors(newErrors);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, [field]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveUser = () => {
    // Validación manual antes de guardar
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Ingresa tu nombre";
    if (!form.email) newErrors.email = "Ingresa un correo";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Correo inválido";
    if (!form.password) newErrors.password = "Ingresa una contraseña";
    else if (form.password.length < 6) newErrors.password = "Mínimo 6 caracteres";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSnackbar({ open: true, message: "Corrige los errores antes de guardar" });
      return;
    }

    localStorage.setItem("userAccount", JSON.stringify(form));
    setUser(form);
    setSnackbar({ open: true, message: "Cuenta guardada correctamente" });
  };

  const deleteUser = () => {
    localStorage.removeItem("userAccount");
    setUser(null);
    setForm({ name: "", email: "", password: "", image: "", background: "" });
    setSnackbar({ open: true, message: "Cuenta eliminada" });
  };

  const closeSnackbar = () => setSnackbar({ open: false, message: "" });

  return {
    user,
    form,
    errors,
    snackbar,
    isOnline,
    handleChange,
    handleImage,
    saveUser,
    deleteUser,
    closeSnackbar
  };
};
