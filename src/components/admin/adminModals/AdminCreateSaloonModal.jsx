import React, { useState } from 'react';
import { adminAddSaloon } from '../../../api/admin/adminBlock.js';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';

const AdminCreateSaloonModal = ({ setIsShowAdminCreateSaloonModal, blockId ,saloonId}) => {
  const [saloonName, setSaloonName] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const handleClose = () => setIsShowAdminCreateSaloonModal(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!saloonName || !image) {
      alert('Lütfen salon adı ve resim seçiniz!');
      return;
    }

    // FormData oluşturuluyor
    const formData = new FormData();
    formData.append('saloonName', saloonName);
    formData.append('image', image);

    try {
      const response = await adminAddSaloon(formData, blockId);
      console.log('Salon oluşturuldu:', response);
      setSaloonName(response.saloonName);
      setImage(response.image);

      setIsLoading(false)
      alert('Salon başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Error creating saloon:', error);
      alert('Bir hata oluştu, lütfen tekrar deneyin!');
    }
  };

  return (
    <div>
      <Dialog 
        open={true} 
        onClose={handleClose} 
        maxWidth="md" // Yatayda daha geniş bir modal
        fullWidth={true} // Modal genişliğinin tam ekran olmasını sağlıyoruz
        sx={{ 
          margin: 'auto', // Modal'ı ortalayalım
          width: '40%', // Genişliği %70'e ayarlıyoruz
        }}
      >
        <DialogTitle>Salon Ekle</DialogTitle>
        <DialogContent>
          <TextField
            label="Salon Adı"
            fullWidth
            value={saloonName}
            onChange={(e) => setSaloonName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Resim Seç:
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '16px', display: 'block' }}
          />
          {image && (
            <Typography variant="body2" color="textSecondary">
              Yüklenen Resim: {saloonName}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Kapat
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminCreateSaloonModal;
