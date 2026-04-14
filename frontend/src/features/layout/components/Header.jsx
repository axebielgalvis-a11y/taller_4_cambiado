import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Container, useMediaQuery, useTheme, alpha } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import DiamondIcon from "@mui/icons-material/Diamond";
export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 🔥 NUEVO
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  // 🔥 MENU DINÁMICO
  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, link: "/" },
    { text: "Rick and morty", icon: <LocalOfferIcon />, link: "/rickandmorty" },

    !user && { text: "Iniciar Sesión", icon: <PersonIcon />, link: "/login" },

    user && { text: "Dashboard", icon: <PersonIcon />, link: "/dashboard" },
    user && { text: "Cerrar Sesión", icon: <CloseIcon />, action: "logout" }
  ].filter(Boolean);

  return (
    <Box component="header">
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          bgcolor: "#0f172a", 
          borderBottom: "1px solid #10b981",
          boxShadow: "0 1px 3px rgba(16, 185, 129, 0.1)"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", px: { size: 1, sm: 2 }, py: 1 }}>

            {/* Logo */}
            <Box 
              component={NavLink} 
              to="/" 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1,
                textDecoration: "none"
              }}
            >
              <DiamondIcon sx={{ color: "#10b981", fontSize: 58 }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 800, 
                  color: "#10b981",
                  letterSpacing: "-0.5px",
                  "&:hover": { opacity: 0.8 }
                }}
              >
                Gastos diarios
              </Typography>
            </Box>

            {/* Desktop Menu */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={item.link ? NavLink : "button"}
                    to={item.link}
                    onClick={() => {
                      if (item.action === "logout") {
                        localStorage.removeItem("user");
                        navigate("/login");
                      }
                    }}
                    startIcon={item.icon}
                    sx={{ 
                      color: "#FFFFFF", 
                      textTransform: "none", 
                      fontWeight: 500, 
                      fontSize: "0.9rem",
                      px: 2,
                      "&:hover": { 
                        color: "#10b981", 
                        bgcolor: alpha("#10b981", 0.1) 
                      }, 
                      "&.active": { 
                        color: "#10b981",
                        fontWeight: 600
                      } 
                    }}
                  >
                    {item.text}
                    {item.badge > 0 && (
                      <Box 
                        component="span" 
                        sx={{ 
                          ml: 0.8, 
                          bgcolor: "#10b981", 
                          color: "#000000", 
                          fontSize: "0.7rem", 
                          borderRadius: "12px", 
                          px: 0.8, 
                          py: 0.3,
                          fontWeight: 600
                        }}
                      >
                        {item.badge}
                      </Box>
                    )}
                  </Button>
                ))}
              </Box>
            )}

            {/* Mobile Icons */}
            {isMobile && (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton component={NavLink} to="/Favorite" sx={{ color: "#10b981" }}>
                  <Badge badgeContent={0} sx={{ "& .MuiBadge-badge": { bgcolor: "#10b981", color: "#000000" } }}>
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <IconButton component={NavLink} to="/Shopping" sx={{ color: "#10b981" }}>
                  <Badge badgeContent={0} sx={{ "& .MuiBadge-badge": { bgcolor: "#10b981", color: "#000000" } }}>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#10b981" }}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer */}
      <Drawer 
        anchor="right" 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        PaperProps={{ 
          sx: { 
            width: "280px", 
            bgcolor: "#0f172a",
            borderLeft: "1px solid #10b981"
          } 
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#10b981", float: "right", mb: 2 }}>
            <CloseIcon />
          </IconButton>

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={item.link ? NavLink : "button"}
                  to={item.link}
                  onClick={() => {
                    setDrawerOpen(false);

                    if (item.action === "logout") {
                      localStorage.removeItem("user");
                      navigate("/login");
                    }
                  }}
                  sx={{ 
                    color: "#FFFFFF",
                    "&:hover": { 
                      color: "#10b981",
                      bgcolor: alpha("#10b981", 0.1)
                    } 
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Toolbar />
    </Box>
  );
};