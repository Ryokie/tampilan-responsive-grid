import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Avatar, TextField, Container, CssBaseline, Button } from '@mui/material';
import DetailUser from './DetailUser';

function Home() {
  // Cek Local Storage langsung saat State dibuat
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('data_peserta_local');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return []; 
    }
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    // Kalau data users masih kosong, Fetch API
    if (users.length === 0) {
      fetch('https://randomuser.me/api/?results=20')
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.results);
          // Simpan di Local Storage
          localStorage.setItem('data_peserta_local', JSON.stringify(data.results));
        })
        .catch((err) => console.error(err));
    }
 }, [users.length]);

  const filteredUsers = users
    .filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      const query = searchTerm.toLowerCase();
      return fullName.includes(query) || email.includes(query);
    })
  
    .sort((a, b) => {
      const nameA = a.name.first.toLowerCase();
      const nameB = b.name.first.toLowerCase();
      
      if (sortOrder === 'asc') {
        return nameA < nameB ? -1 : 1; // Urut A ke Z
      } else {
        return nameA > nameB ? -1 : 1; // Urut Z ke A
      }
    });


const handleUserClick = (user) => {
  navigate('/detail', { state: user });
};


  return (
    <><CssBaseline />
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#1a1a1a', py: 4, m: 0 }}>

      <Container maxWidth="xl">
      
      <Typography variant="h4" color="white" align="center" gutterBottom sx={{ mb: 4 }}>
        Tampilan Responsive
      </Typography>

      {/* KOTAK PENCARIAN */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'center', mb: 6 }}>
        
        {/* Input Search */}
        <TextField 
          variant="outlined"
          placeholder="Cari nama atau email..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: 1, width: { xs: '100%', md: '40%' } }}
        />

        {/* Tombol Sort Baru */}
        <Button 
          variant="contained" 
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          sx={{ height: 56, fontWeight: 'bold' }} 
        >
          Sort ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </Button>

      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
        
        {filteredUsers.map((user, index) => (
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
              onClick={() => handleUserClick(user)} // <--- PINDAHKAN ONCLICK KESINI
              sx={{ 
                height: '100%', 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'flex-start', 
                gap: 1, 
                backgroundColor: '#2c2c2c', 
                color: 'white', 
                textAlign: 'center', 
                borderRadius: 2, 
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                cursor: 'pointer',          // Tambah ini biar ada ikon tangan
                transition: '0.2s',         // Tambah animasi dikit
                '&:hover': { transform: 'scale(1.02)' } 
              }}
            >
              
              {/* Foto Profil */}
              <Avatar src={user.picture.large} alt={user.name.first} sx={{ width: 80, height: 80, mb: 1, border: '3px solid #2196f3' }} />

              {/* Nama */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', lineHeight: 1.2 }}>
                {user.name.first} {user.name.last}
              </Typography>

              {/* No Telp */}
              <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'bold', mb: 0.5 }}>
                📞 {user.phone}
              </Typography>

              {/* Email */}
              <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.8rem', mb: 1, wordBreak: 'break-all' }}>
                {user.email}
              </Typography>

              {/* Alamat (Cukup Typography saja, Box dan Paper tambahannya HAPUS) */}
              <Typography variant="caption" sx={{ color: '#2196f3', marginTop: 'auto' }}>
                  📍 {user.location.city}, {user.location.country}
              </Typography>

              <Typography variant="caption" sx={{ color: '#888', fontSize: '0.7rem', mt: 1 }}>
                  (Klik untuk detail)
              </Typography>

            </Paper>
          </Box>
        ))}

                {filteredUsers.length === 0 && (
          <Typography color="white" align="center" sx={{ width: '100%', mt: 4 }}>
              Tidak ada hasil ditemukan.
          </Typography>
        )}

      </Box>
      </Container>
    </Box>

    </>
  );
}

// INI ADALAH KOMPONEN UTAMA BARU
function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Rute 1: Halaman Depan (Panggil fungsi Home yg tadi kita rename) */}
          <Route path="/" element={<Home />} />

          {/* Rute 2: Halaman Detail (Panggil file DetailUser.jsx) */}
          <Route path="/detail" element={<DetailUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;