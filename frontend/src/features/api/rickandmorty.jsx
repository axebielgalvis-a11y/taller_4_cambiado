import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Alert,
  InputAdornment,
  Paper,
  Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Consumir la API de Rick and Morty
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
        setError(null);
      } catch (err) {
        setError('Error al cargar los personajes. Por favor, intenta de nuevo.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Filtrar personajes basado en el término de búsqueda
  useEffect(() => {
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchTerm, characters]);

  // Manejar cambios en la barra de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Limpiar búsqueda
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Barra de búsqueda separada del header */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Fade in={true} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: 0.5,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="🔍 Busca tu personaje favorito de Rick and Morty..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 10,
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '14px 20px',
                  fontSize: '1rem',
                  '&::placeholder': {
                    color: '#999',
                    fontStyle: 'italic',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#667eea', fontSize: 28 }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <ClearIcon
                      sx={{ color: '#999', cursor: 'pointer', '&:hover': { color: '#f44336' } }}
                      onClick={handleClearSearch}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
        </Fade>
      </Container>

      {/* Contenido principal */}
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <CircularProgress size={60} thickness={4} sx={{ color: '#667eea' }} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1a1a2e' }}>
                👥 Personajes ({filteredCharacters.length})
              </Typography>
              {searchTerm && (
                <Typography variant="body2" component="div"> sx={{ color: '#667eea', fontStyle: 'italic' }}
                  Mostrando resultados para: "{searchTerm}"
                </Typography>
              )}
            </Box>
            
            <Grid container spacing={3}>
              {filteredCharacters.map((character, index) => (
                <Grid  size={{ xs: 12, sm: 6, md: 4 }} key={character.id}>
                  <Fade in={true} timeout={500 + index * 100}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        borderRadius: 3,
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 8
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="320"
                        image={character.image}
                        alt={character.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1, backgroundColor: '#f8f9fa' }}>
                        <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#1a1a2e' }}>
                          {character.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              backgroundColor: 
                                character.status === 'Alive' ? '#4caf50' :
                                character.status === 'Dead' ? '#f44336' : '#ff9800',
                            }}
                          />
                          <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
                            {character.status} - {character.species}
                          </Typography>
                        </Box>
                        <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
                          <strong>📍 Origen:</strong> {character.origin.name}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
                          <strong>⚧ Género:</strong> {character.gender}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>

            {filteredCharacters.length === 0 && (
              <Paper sx={{ p: 6, textAlign: 'center', mt: 4, borderRadius: 3 }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  😢 No se encontraron personajes
                </Typography>
                <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
                  No hay resultados para "{searchTerm}". Intenta con otro nombre.
                </Typography>
              </Paper>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default App;