import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Avatar, Container, Button, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Ikon Hapus

const FavoriteUser = () => {
const [favorites, setFavorites] = useState(() => {
  const savedFavs = localStorage.getItem('my_favorites');
  return savedFavs ? JSON.parse(savedFavs) : [];
});

const navigate = useNavigate();


  // Fungsi Hapus dari Favorite
  const removeFavorite = (emailToRemove) => {
    const newFavs = favorites.filter(user => user.email !== emailToRemove);
    setFavorites(newFavs); // Update tampilan
    localStorage.setItem('my_favorites', JSON.stringify(newFavs)); // Update brankas
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#1a1a1a', py: 4 }}>
      <Container maxWidth="xl">
        
        {/* Tombol Kembali */}
        <Button onClick={() => navigate('/')} variant="outlined" sx={{ mb: 4, color: 'white', borderColor: 'white' }}>
          &larr; Kembali ke Home
        </Button>

        <Typography variant="h4" color="white" align="center" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          ❤️ Favorites
        </Typography>

        {favorites.length === 0 ? (
          <Typography color="#888" align="center" sx={{ mt: 10 }}>
            Belum ada user yang difavoritkan.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((user, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  elevation={3}
                  // Klik kartu tetap ke detail
                  onClick={() => navigate('/detail', { state: user })}
                  sx={{ 
                    p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    backgroundColor: '#2c2c2c', color: 'white', borderRadius: 2, cursor: 'pointer',
                    position: 'relative', '&:hover': { transform: 'scale(1.02)' }, transition: '0.2s'
                  }}
                >
                  {/* Tombol Hapus Kecil di Pojok */}
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation(); // Biar gak pindah ke detail pas klik hapus
                      removeFavorite(user.email);
                    }}
                    sx={{ position: 'absolute', top: 5, right: 5, color: '#f44336' }}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <Avatar src={user.picture.large} sx={{ width: 80, height: 80, mb: 2, border: '2px solid #f44336' }} />
                  <Typography variant="h6" fontWeight="bold">{user.name.first}</Typography>
                  <Typography variant="body2" color="#aaa">{user.email}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteUser;