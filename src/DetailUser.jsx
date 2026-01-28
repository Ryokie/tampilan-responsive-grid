import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, Paper, Button, Grid, Divider, Chip, Stack } from '@mui/material';

const DetailUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const user = location.state;

  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#1a1a1a', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h5" color="white" gutterBottom>Data tidak ditemukan</Typography>
        <Button onClick={() => navigate('/')} variant="contained">Kembali ke Home</Button>
      </Box>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#121212', py: 8, px: 2 }}>
      
      <Button 
        onClick={() => navigate('/')} 
        variant="outlined" 
        sx={{ 
          position: 'fixed', top: 20, left: 20, zIndex: 10, 
          backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', borderColor: '#555',
          backdropFilter: 'blur(5px)', '&:hover': { backgroundColor: '#333' }
        }}
      >
        &larr; Kembali
      </Button>

      <ContainerCard>
        
        {/* HEADER GRADIENT */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', 
          height: 140, 
          position: 'relative',
          borderRadius: '16px 16px 0 0'
        }}>
          <Avatar 
            src={user.picture.large} 
            sx={{ 
              width: 140, height: 140, 
              border: '5px solid #1e1e1e', 
              position: 'absolute', 
              bottom: -70, left: '50%', transform: 'translateX(-50%)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }} 
          />
        </Box>

        {/* IDENTITAS */}
        <Box sx={{ mt: 10, textAlign: 'center', px: 3 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
            {user.name.first} {user.name.last}
          </Typography>
          <Typography variant="body1" sx={{ color: '#aaa', mb: 1 }}>
            {user.location.city}, {user.location.country}
          </Typography>
          
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }}>
            <Chip label={user.gender} color="primary" size="small" sx={{ textTransform: 'capitalize' }} />
            <Chip label={`${user.dob.age} Tahun`} color="success" size="small" />
            <Chip label={user.nat} color="warning" size="small" />
          </Stack>
        </Box>

        <Divider sx={{ backgroundColor: '#333', mb: 4 }} />

        {/* INFORMASI DETAIL */}
        <Grid container spacing={4} sx={{ px: { xs: 3, md: 6 }, pb: 6 }}>
          
          {/* KOLOM KIRI: KONTAK */}
          <Grid item xs={12} md={6}>
            <InfoSection title="Informasi Kontak">
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Telepon" value={user.phone} />
              <InfoRow label="Seluler" value={user.cell} />
            </InfoSection>
          </Grid>

          {/* KOLOM KANAN: PERSONAL */}
          <Grid item xs={12} md={6}>
            <InfoSection title="Detail Pribadi">
              <InfoRow label="Tanggal Lahir" value={formatDate(user.dob.date)} />
              <InfoRow label="Username" value={user.login.username} />
              <InfoRow label="Terdaftar Sejak" value={formatDate(user.registered.date)} />
            </InfoSection>
          </Grid>

          {/* MAPS */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#90caf9', mb: 2, borderLeft: '4px solid #90caf9', pl: 2 }}>
              Lokasi Peta
            </Typography>
            <Box sx={{ width: '100%', height: 300, borderRadius: 3, overflow: 'hidden', border: '1px solid #444' }}>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(user.location.coordinates.longitude)-0.05}%2C${parseFloat(user.location.coordinates.latitude)-0.05}%2C${parseFloat(user.location.coordinates.longitude)+0.05}%2C${parseFloat(user.location.coordinates.latitude)+0.05}&layer=mapnik&marker=${user.location.coordinates.latitude}%2C${user.location.coordinates.longitude}`}
              ></iframe>
            </Box>
            <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block', textAlign: 'center' }}>
               {user.location.street.name} No. {user.location.street.number}, {user.location.state}
            </Typography>
          </Grid>

        </Grid>

      </ContainerCard>
    </Box>
  );
};

// --- KOMPONEN PENDUKUNG ---

const ContainerCard = ({ children }) => (
  <Paper elevation={10} sx={{ 
    maxWidth: 900, mx: 'auto', borderRadius: 4, 
    backgroundColor: '#1e1e1e', overflow: 'hidden' 
  }}>
    {children}
  </Paper>
);

const InfoSection = ({ title, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" sx={{ color: '#90caf9', mb: 2, borderLeft: '4px solid #90caf9', pl: 2 }}>
      {title}
    </Typography>
    {/* Menggunakan Grid agar rapi ke bawah */}
    <Stack spacing={2}> 
      {children}
    </Stack>
  </Box>
);

// [REVISI BAGIAN INI]
// Mengubah Layout jadi 'column' (Atas-Bawah) agar teks tidak nabrak
const InfoRow = ({ label, value }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', // <--- KUNCI PERUBAHANNYA (Atas Bawah)
    borderBottom: '1px solid #333', 
    pb: 1 
  }}>
    {/* Label di Atas (Kecil) */}
    <Typography variant="caption" sx={{ color: '#888', mb: 0.5, letterSpacing: 1 }}>
      {label.toUpperCase()}
    </Typography>
    
    {/* Value di Bawah (Besar & Full Width) */}
    <Typography variant="body1" sx={{ color: 'white', fontWeight: 500, wordBreak: 'break-all' }}>
      {value}
    </Typography>
  </Box>
);

export default DetailUser;