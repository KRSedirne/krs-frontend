import React from 'react';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BBlock = () => {

  const navigate = useNavigate();

  return (
   <Container>
      <Box sx={{ textAlign: 'center', margin: '20px 0' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          B Blok
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {/* Salonlar */}
        <Grid item xs={6}>
          <Box
            sx={{
              backgroundColor: 'orange',
              padding: 4,
              textAlign: 'center',
              borderRadius: 2,
              height: '200px', // Yükseklik ekleyerek daha belirgin yapıyoruz
            }}
          >
            <Typography variant="h6">Bilgisayar Odası</Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Box sx={{ marginTop: '20px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
        {/* Orta Alan */}
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Box
            sx={{
              backgroundColor: 'lightgrey',
              height: '100px',
              width: '100%', // Tam genişlik
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 3, // Gölgelendirme ekleyerek daha şık bir görünüm
            }}
          >
            <Typography variant="body1">Orta Alan</Typography>
          </Box>
        </Box>

        {/* B Blok Butonu */}
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Button variant="contained" sx={{ backgroundColor: '#9c27b0', padding: '10px 20px' }} onClick={() => navigate('/ablock')}>
            A Blok
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default BBlock
