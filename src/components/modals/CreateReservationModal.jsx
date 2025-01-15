import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const CreateReservationModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Rezervasyon Yap
      </Button>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" // Modal'ın max genişliğini ayarlıyoruz
        fullWidth={false} // Modal'ın tam genişlikte olmamasını sağlıyoruz
        sx={{ 
          margin: 'auto', // Modal'ı ekranın ortasına yerleştiriyoruz
          height: '100%', // Yüksekliği artırıyoruz
          width: '%20' // Genişliği otomatik yapıyoruz
        }}
      >
        <DialogTitle>Koltuk Detayları</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Blok: A</Typography>
          <Typography variant="body1">Salon: S1</Typography>
          <Typography variant="body1">Koltuk No: 13</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Rezervasyon yap’a tıkladıktan 15 dakika içerisinde QR’nizi okutun. Aksi takdirde rezervasyonunuz gerçekleşmeyecektir.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Kapat
          </Button>
          <Button onClick={handleClose} color="secondary">
            Rezervasyon Yap
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateReservationModal;
