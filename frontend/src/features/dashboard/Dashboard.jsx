import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
  Stack,
  Alert,
  Snackbar
} from "@mui/material";
import { Delete, Edit, Add, AttachMoney, Category, Notes, CalendarToday } from "@mui/icons-material";

const Dashboard = () => {
  // Estado local para los gastos (sin base de datos)
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      concept: "Supermercado",
      amount: 85000,
      category: "Comida",
      date: new Date().toISOString().split('T')[0],
      notes: "Compra semanal"
    },
    {
      id: 2,
      concept: "Cine",
      amount: 15000,
      category: "Entretenimiento",
      date: new Date().toISOString().split('T')[0],
      notes: "Entradas y palomitas"
    },
    {
      id: 3,
      concept: "Gasolina",
      amount: 55000,
      category: "Transporte",
      date: new Date().toISOString().split('T')[0],
      notes: ""
    },
    {
      id: 4,
      concept: "Arriendo",
      amount: 800000,
      category: "Vivienda",
      date: new Date().toISOString().split('T')[0],
      notes: "Pago mensual"
    }
  ]);

  const [form, setForm] = useState({
    concept: "",
    amount: "",
    category: "Comida",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });
  
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [open, setOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Calcular estadísticas desde el estado local
  const calculateStats = (expensesList) => {
    if (!expensesList || expensesList.length === 0) {
      return { total: 0, promedioDiario: 0, categoriaMayor: "Ninguna", cantidadGastos: 0 };
    }

    const total = expensesList.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    const promedioDiario = total / expensesList.length;
    const cantidadGastos = expensesList.length;

    // Calcular categoría con mayor gasto
    const categoryTotals = {};
    expensesList.forEach(exp => {
      const cat = exp.category || "Otros";
      categoryTotals[cat] = (categoryTotals[cat] || 0) + (exp.amount || 0);
    });
    
    let categoriaMayor = "Ninguna";
    let maxAmount = 0;
    Object.entries(categoryTotals).forEach(([cat, amount]) => {
      if (amount > maxAmount) {
        maxAmount = amount;
        categoriaMayor = cat;
      }
    });

    return { total, promedioDiario, categoriaMayor, cantidadGastos };
  };

  const stats = calculateStats(expenses);

  const categories = [
    "Comida",
    "Transporte",
    "Vivienda",
    "Entretenimiento",
    "Salud",
    "Educación",
    "Ropa",
    "Servicios",
    "Otros"
  ];

  // Agregar gasto (solo local)
  const handleAdd = () => {
    // Validaciones
    if (!form.concept.trim()) {
      setSnackbar({ open: true, message: "Por favor ingresa el concepto del gasto", severity: "warning" });
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      setSnackbar({ open: true, message: "Por favor ingresa un monto válido", severity: "warning" });
      return;
    }

    const newExpense = {
      id: Date.now(), // ID único basado en timestamp
      concept: form.concept.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      notes: form.notes || ""
    };

    setExpenses([newExpense, ...expenses]);
    
    // Resetear formulario
    setForm({ 
      concept: "", 
      amount: "", 
      category: "Comida", 
      date: new Date().toISOString().split('T')[0],
      notes: "" 
    });
    
    setSnackbar({ open: true, message: "✅ Gasto agregado exitosamente", severity: "success" });
  };

  // Eliminar gasto (solo local)
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este gasto?")) {
      const updatedExpenses = expenses.filter(exp => exp.id !== id);
      setExpenses(updatedExpenses);
      setSnackbar({ open: true, message: "🗑️ Gasto eliminado exitosamente", severity: "success" });
    }
  };

  // Abrir modal para editar
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setForm({
      concept: expense.concept || "",
      amount: expense.amount || "",
      category: expense.category || "Comida",
      date: expense.date || new Date().toISOString().split('T')[0],
      notes: expense.notes || ""
    });
    setOpen(true);
  };

  // Actualizar gasto (solo local)
  const handleUpdate = () => {
    if (!form.concept.trim() || !form.amount) {
      setSnackbar({ open: true, message: "Por favor completa los campos obligatorios", severity: "warning" });
      return;
    }

    const updatedExpenses = expenses.map(exp => 
      exp.id === editingExpense.id 
        ? { 
            ...exp, 
            concept: form.concept.trim(),
            amount: Number(form.amount),
            category: form.category,
            date: form.date,
            notes: form.notes || ""
          }
        : exp
    );
    
    setExpenses(updatedExpenses);
    setOpen(false);
    setEditingExpense(null);
    
    // Resetear formulario
    setForm({ 
      concept: "", 
      amount: "", 
      category: "Comida", 
      date: new Date().toISOString().split('T')[0],
      notes: "" 
    });
    
    setSnackbar({ open: true, message: "✏️ Gasto actualizado exitosamente", severity: "success" });
  };

  // Filtrar gastos por categoría
  const filteredExpenses = filterCategory === "Todas" 
    ? expenses 
    : expenses.filter(exp => exp.category === filterCategory);

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <Box sx={{ bgcolor: "#f1f5f9", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg">

        {/* Título */}
        <Typography variant="h4" mb={3} fontWeight="800" sx={{ color: "#0f172a" }}>
          💰 Dashboard de Gastos Diarios
        </Typography>

        {/* Tarjetas de Estadísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3, bgcolor: "#10b981", color: "white" }}>
              <AttachMoney sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                ${stats.total.toLocaleString()}
              </Typography>
              <Typography variant="body2">Total Gastado</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3, bgcolor: "#3b82f6", color: "white" }}>
              <Notes sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                {stats.cantidadGastos}
              </Typography>
              <Typography variant="body2">Total de Gastos</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3, bgcolor: "#f59e0b", color: "white" }}>
              <CalendarToday sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                ${Math.round(stats.promedioDiario).toLocaleString()}
              </Typography>
              <Typography variant="body2">Promedio por Gasto</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3, bgcolor: "#8b5cf6", color: "white" }}>
              <Category sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "0.9rem" }}>
                {stats.categoriaMayor}
              </Typography>
              <Typography variant="body2">Categoría principal</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* FORMULARIO PARA AGREGAR GASTO */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="700" mb={2} sx={{ color: "#0f172a" }}>
            ➕ Agregar nuevo gasto
          </Typography>
          
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Concepto *"
                fullWidth
                value={form.concept}
                onChange={(e) => setForm({ ...form, concept: e.target.value })}
                placeholder="Ej: Supermercado, Cine, Gasolina..."
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                label="Monto *"
                type="number"
                fullWidth
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                InputProps={{ startAdornment: "$" }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                label="Categoría"
                select
                fullWidth
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                label="Fecha"
                type="date"
                fullWidth
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Add />}
                sx={{
                  bgcolor: "#10b981",
                  height: "56px",
                  "&:hover": { bgcolor: "#059669" }
                }}
                onClick={handleAdd}
              >
                Agregar
              </Button>
            </Grid>

            <Grid size={12}>
              <TextField
                label="Notas (opcional)"
                fullWidth
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Agrega detalles adicionales..."
                size="small"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* FILTRO POR CATEGORÍA */}
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Typography variant="body2" fontWeight="600">🔍 Filtrar por categoría:</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip 
              label="Todas" 
              onClick={() => setFilterCategory("Todas")}
              sx={{ 
                bgcolor: filterCategory === "Todas" ? "#10b981" : "#e2e8f0",
                color: filterCategory === "Todas" ? "white" : "#0f172a",
                cursor: "pointer"
              }}
            />
            {categories.map((cat) => (
              <Chip 
                key={cat}
                label={cat} 
                onClick={() => setFilterCategory(cat)}
                sx={{ 
                  bgcolor: filterCategory === cat ? "#10b981" : "#e2e8f0",
                  color: filterCategory === cat ? "white" : "#0f172a",
                  cursor: "pointer"
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* LISTA DE GASTOS */}
        <Typography variant="h6" fontWeight="700" mb={2} sx={{ color: "#0f172a" }}>
          📋 Mis Gastos ({filteredExpenses.length})
        </Typography>

        {filteredExpenses.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
            <Typography variant="body1" color="text.secondary">
              {filterCategory !== "Todas" 
                ? `No hay gastos registrados en la categoría "${filterCategory}"` 
                : "No hay gastos registrados. ¡Agrega tu primer gasto!"}
            </Typography>
          </Paper>
        ) : (
          filteredExpenses.map((expense) => (
            <Paper
              key={expense.id}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": { boxShadow: 4, transform: "translateY(-2px)" }
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
                  <Typography fontWeight="bold" sx={{ minWidth: 120 }}>
                    {expense.concept}
                  </Typography>
                  <Chip 
                    label={expense.category} 
                    size="small" 
                    sx={{ bgcolor: "#10b98120", color: "#10b981", fontWeight: 600 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    📅 {formatDate(expense.date)}
                  </Typography>
                  {expense.notes && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
                      📝 {expense.notes.length > 50 ? expense.notes.substring(0, 50) + "..." : expense.notes}
                    </Typography>
                  )}
                </Stack>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography fontWeight="800" sx={{ color: "#10b981", fontSize: "1.1rem", minWidth: 80, textAlign: "right" }}>
                  ${(expense.amount || 0).toLocaleString()}
                </Typography>
                
                <IconButton onClick={() => handleEdit(expense)} sx={{ color: "#3b82f6" }}>
                  <Edit />
                </IconButton>

                <IconButton onClick={() => handleDelete(expense.id)} sx={{ color: "#ef4444" }}>
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          ))
        )}

        {/* MODAL EDITAR */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: "#0f172a", color: "#10b981", fontWeight: 700 }}>
            ✏️ Editar Gasto
          </DialogTitle>

          <DialogContent sx={{ pt: 2 }}>
            <TextField
              margin="dense"
              label="Concepto *"
              fullWidth
              value={form.concept}
              onChange={(e) => setForm({ ...form, concept: e.target.value })}
              sx={{ mt: 2 }}
            />

            <TextField
              margin="dense"
              label="Monto *"
              type="number"
              fullWidth
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              InputProps={{ startAdornment: "$" }}
            />

            <TextField
              margin="dense"
              label="Categoría"
              select
              fullWidth
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>

            <TextField
              margin="dense"
              label="Fecha"
              type="date"
              fullWidth
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              margin="dense"
              label="Notas"
              fullWidth
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              multiline
              rows={2}
            />
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpen(false)} sx={{ color: "#64748b" }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#10b981", "&:hover": { bgcolor: "#059669" } }}
              onClick={handleUpdate}
            >
              Guardar Cambios
            </Button>
          </DialogActions>
        </Dialog>

        {/* SNACKBAR PARA NOTIFICACIONES */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>

      </Container>
    </Box>
  );
};

export default Dashboard;