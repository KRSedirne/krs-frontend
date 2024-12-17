import React from 'react';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ABlock = () => {

  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ textAlign: 'center', margin: '20px 0' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          A Blok
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {/* Salonlar */}
        <Grid item xs={3}>
          <Box
            sx={{
              backgroundColor: 'orange',
              padding: 4,
              textAlign: 'center',
              borderRadius: 2,
              height: '200px', // Yükseklik ekleyerek daha belirgin yapıyoruz
            }}
          >
            <Typography variant="h6">SALON - 2</Typography>
          </Box>
        </Grid>

        <Grid item xs={3}>
          <Box
            sx={{
              backgroundColor: 'orange',
              padding: 4,
              textAlign: 'center',
              borderRadius: 2,
              height: '200px',
            }}
          >
            <Typography variant="h6">SALON - 1</Typography>
          </Box>
        </Grid>

        <Grid item xs={3}>
          <Box
            sx={{
              backgroundColor: 'orange',
              padding: 4,
              textAlign: 'center',
              borderRadius: 2,
              height: '200px',
            }}
          >
            <Typography variant="h6">SALON - 3</Typography>
          </Box>
        </Grid>
      </Grid>

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
        <Button variant="contained" sx={{ backgroundColor: '#9c27b0', padding: '10px 20px' }} onClick={() => navigate('/bblock')}>
          B Blok
        </Button>
      </Box>
    </Container>
  );
};

export default ABlock;
