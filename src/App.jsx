import { Box, Paper, Typography } from '@mui/material';

function App() {
  const items = Array.from(Array(16).keys());

  return (
    <Box sx={{ p: 2, backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      
      <Typography variant="h4" color="white" align="center" gutterBottom sx={{ mb: 4 }}>
        Tampilan Responsive
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        
        {items.map((index) => (
          <Box 
            key={index}
            sx={{
              width: { xs: '50%', md: '25%' }, 
              padding: 1,                      
              boxSizing: 'border-box'         
            }}
          >
            <Paper 
              elevation={3}
              sx={{ 
                height: 100, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'transparent', 
                border: '2px solid #2196f3',
                color: '#2196f3',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              BOX {index + 1}
            </Paper>
          </Box>
        ))}

      </Box>
    </Box>
  );
}

export default App;