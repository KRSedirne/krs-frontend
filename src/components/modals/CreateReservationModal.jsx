import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { getBlockDetails } from '../../api/block';
import { createReservation } from '../../api/reservation/reservation';

const CreateReservationModal = ({ open, onClose, seat }) => {
  const [blockName, setBlockName] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const handleReservation = async () => {
    try {
      setLoading(true);

      const reservationData = {
        seat: seat._id, // Koltuk ID
        block: seat.block, // Blok ID
      };

      // Rezervasyon API çağrısı
      const response = await createReservation(reservationData);
      alert(response.message || 'Reservations created successfully.');
      onClose(); // Modal'ı kapat
    } catch (error) {
      alert(error.response?.data?.message || 'Reservation could not be created.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchBlockName = async () => {
      if (seat && seat.block) {
        setLoading(true);
        try {
          const response = await getBlockDetails(seat.block);
          setBlockName(response.block?.name);
          console.log(response);
        } catch (error) {
          console.error('Block name could not be fetched:', error);
          setBlockName('Bilinmiyor');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBlockName();
  }, [seat]);

  return (
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" // Modal'ın max genişliğini ayarlıyoruz
        fullWidth
        sx={{ 
          margin: 'auto', // Modal'ı ekranın ortasına yerleştiriyoruz
          height: '100%', // Yüksekliği artırıyoruz
          width: '%20' // Genişliği otomatik yapıyoruz
        }}
      >
        <DialogTitle>Koltuk Detayları</DialogTitle>
        <DialogContent>
        {loading ? (
          <Typography>Yükleniyor...</Typography>
        ) : (
          <>
            <Typography variant="body1">Blok Adı: {blockName}</Typography>
            <Typography variant="body1">Salon Adı: {seat?.saloonName || 'Bilinmiyor'}</Typography>
            <Typography variant="body1">Koltuk Numarası: {seat?.seatNumber || 'Bilinmiyor'}</Typography>
          </>
        )}
      </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Kapat
          </Button>
          <Button onClick={handleReservation}
          color="secondary"
          disabled={loading}>
          Rezervasyon Yap
        </Button>
        </DialogActions>
      </Dialog>
  );
};

export default CreateReservationModal;
