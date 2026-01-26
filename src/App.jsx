import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Avatar, TextField, Container, CssBaseline, Button, Modal } from '@mui/material';


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', md: 600 },
    bgcolor: '#fff', // Latar putih biar peta jelas
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
  };

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=20')
      .then((res) => res.json())
      .then((data) => setUsers(data.results))
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users
    .filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      const query = searchTerm.toLowerCase();
      return fullName.includes(query) || email.includes(query);
    })
    // --- INI TAMBAHAN LOGIKA SORTINGNYA ---
    .sort((a, b) => {
      const nameA = a.name.first.toLowerCase();
      const nameB = b.name.first.toLowerCase();
      
      if (sortOrder === 'asc') {
        return nameA < nameB ? -1 : 1; // Urut A ke Z
      } else {
        return nameA > nameB ? -1 : 1; // Urut Z ke A
      }
    });


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

              {/* [BARU] No Telepon */}
              <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'bold', mb: 0.5 }}>
                📞 {user.phone}
              </Typography>

              {/* 3. Email */}
              <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.8rem', mb: 1, wordBreak: 'break-all' }}>
                {user.email}
              </Typography>

              {/* 4. Alamat (Dibuat jadi tombol klik) */}
              <Box 
                onClick={() => setSelectedUser(user)} // Klik -> Simpan user ke state
                sx={{ 
                  marginTop: 'auto', 
                  cursor: 'pointer', 
                  p: 1, 
                  borderRadius: 1,
                  transition: '0.2s',
                  '&:hover': { backgroundColor: '#383838', color: '#64b5f6' } 
                }}
              >
                <Typography variant="caption" sx={{ color: 'inherit', textDecoration: 'underline' }}>
                   📍 {user.location.city}, {user.location.country}
                </Typography>
              </Box>
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
    <Modal
      open={selectedUser !== null} 
      onClose={() => setSelectedUser(null)}
    >
      <Box sx={modalStyle}>
        {selectedUser && (
          <>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'black' }}>
              Lokasi: {selectedUser.name.first}
            </Typography>
            
            {/* Peta OpenStreetMap */}
            <Box sx={{ width: '100%', height: '300px', borderRadius: 2, overflow: 'hidden', border: '1px solid #ccc' }}>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(selectedUser.location.coordinates.longitude)-0.01}%2C${parseFloat(selectedUser.location.coordinates.latitude)-0.01}%2C${parseFloat(selectedUser.location.coordinates.longitude)+0.01}%2C${parseFloat(selectedUser.location.coordinates.latitude)+0.01}&layer=mapnik&marker=${selectedUser.location.coordinates.latitude}%2C${selectedUser.location.coordinates.longitude}`}
              ></iframe>
            </Box>

            <Button onClick={() => setSelectedUser(null)} variant="outlined" fullWidth sx={{ mt: 2 }}>
              Tutup
            </Button>
          </>
        )}
      </Box>
    </Modal>

    </>
  );
}

export default App;