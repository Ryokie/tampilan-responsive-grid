import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=20')
      .then((res) => res.json())
      .then((data) => setUsers(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box sx={{ p: 2, backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      
      <Typography variant="h4" color="white" align="center" gutterBottom sx={{ mb: 4 }}>
        Tampilan Responsive
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        
        {users.map((user, index) => (
          <Box 
            key={index}
            sx={{
              width: { xs: '50%', md: '25%' }, 
              padding: 3,                      // [FIX 1] Padding 2 = Jarak antar kotak lebih lega
              boxSizing: 'border-box'
            }}
          >
            <Paper 
              elevation={3}
              sx={{ 
                height: '100%',               // [FIX 2] Tinggi 100% = Kotak otomatis sama tinggi
                p: 2,
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'flex-start', // [FIX 3] Rata Atas = Foto jadi sejajar rapi
                gap: 1,                       // Tambahan: Jarak antar elemen di dalam
                backgroundColor: '#2c2c2c', 
                color: 'white',
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            >
              
              {/* 1. Foto Profil */}
              <Avatar 
                src={user.picture.large} 
                alt={user.name.first}
                sx={{ width: 80, height: 80, mb: 1, border: '3px solid #2196f3' }} 
              />

              {/* 2. Nama Peserta */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', lineHeight: 1.2 }}>
                {user.name.first} {user.name.last}
              </Typography>

              {/* 3. Email */}
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#aaa', 
                  fontSize: '0.8rem', 
                  mb: 1,
                  wordBreak: 'break-all'
                }}
              >
                {user.email}
              </Typography>

              {/* 4. Alamat (Ditekan ke bawah agar rapi) */}
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#2196f3', 
                  marginTop: 'auto' // [TIPS] Ini trik agar alamat selalu di paling bawah
                }}
              >
                {user.location.city}, {user.location.country}
              </Typography>

            </Paper>
          </Box>
        ))}

      </Box>
    </Box>
  );
}

export default App;