import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { getBlockDetails } from '../../api/block';
import { createReservation } from '../../api/reservation/reservation';
import toast from 'react-hot-toast';

const CreateReservationModal = ({ open, onClose, seat, setIsReservationSuccess }) => {
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
      await createReservation(reservationData);
      toast.success('Reservations başarıyla oluşturulmuştur.');
      onClose(); // Modal'ı kapat
      setIsReservationSuccess(true);
    } catch (error) {
      toast('Rezervasyon yapılamamıştır. Lütfen tekrar deneyiniz.');
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
          width: '%20',
          color:'rgb(251, 254, 252)' // Genişliği otomatik yapıyoruz
        }}
      >
        <DialogTitle sx={{backgroundColor:"#6587AD",color:"rgb(251, 254, 252)", fontWeight:"bold"}}>Koltuk Detayları</DialogTitle>
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
          <Button onClick={onClose} sx={{color:"#6587AD",fontWeight:"bold"}} >
            Kapat
          </Button>
          <Button onClick={handleReservation}
sx={{backgroundColor:"#6587AD",color:"rgb(251, 254, 252)", fontWeight:"bold"}}          disabled={loading}>
          Rezervasyon Yap
        </Button>
        </DialogActions>
      </Dialog>
  );
};

export default CreateReservationModal;