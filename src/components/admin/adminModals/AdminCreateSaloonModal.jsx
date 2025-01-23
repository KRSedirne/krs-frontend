import React, { useEffect, useState } from 'react';
import { adminAddSaloon } from '../../../api/admin/adminBlock.js';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';

const AdminCreateSaloonModal = ({ setIsShowAdminCreateSaloonModal, blockId ,saloonId}) => {
  const [saloonName, setSaloonName] = useState('');
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const handleClose = () => setIsShowAdminCreateSaloonModal(false);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Image = await convertToBase64(file);
        setImage(base64Image);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!saloonName || !image) {
      toast.error('Lütfen tüm alanları doldurun!');
      return;
    }
    const requestData = {
      saloonName: saloonName,
      url: image,
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    };
    console.log('requestData:', requestData);

    try {
      const response = await adminAddSaloon(requestData, blockId);
      console.log('Salon oluşturuldu:', response);

      setIsLoading(false)
      handleClose();
      
      toast.success('Salon başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Error creating saloon:', error);
      toast.error('Salon oluşturulurken bir hata oluştu!');
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
           <TextField
            label="Resim Genişliği"
            fullWidth
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Resim Yüksekliği"
            fullWidth
            value={height}
            onChange={(e) => setHeight(e.target.value)}
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