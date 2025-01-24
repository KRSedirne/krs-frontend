import React, { useState } from 'react';
import { adminAddSaloon } from '../../../api/admin/adminBlock.js';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';

const AdminCreateSaloonModal = ({ setIsShowAdminCreateSaloonModal,setIsCreatedSaloonSubmitted, blockId }) => {
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
      toast('Lütfen salon adı ve resim seçiniz!');
      return;
    }
    const requestData = {
      saloonName: saloonName,
      url: image,
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    };

    try {
      const response = await adminAddSaloon(requestData, blockId);
      setIsLoading(false);
      setIsCreatedSaloonSubmitted(true);
      handleClose();
      toast.success('Salon başarıyla oluşturuldu!');
    } catch (error) {
      toast.error('Bir hata oluştu, lütfen tekrar deneyin!');
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
          width: '40%',
          color:"#FDFDF8"// Genişliği %70'e ayarlıyoruz
        }}
      >
        <DialogTitle
        sx={{backgroundColor:"#6587AD",color:"#FDFDF8",fontWeight:"bold"}}
        >Salon Ekle</DialogTitle>
        <DialogContent>
          <TextField
            label="Salon Adı"
            fullWidth
            value={saloonName}
            onChange={(e) => setSaloonName(e.target.value)}
            sx={{ marginTop:1,
              marginBottom: 2,
              color:"rgb(42, 60, 80)"
             }}
          />
           <TextField
            label="Resim Genişliği"
            fullWidth
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            sx={{ marginBottom: 2,color:"rgb(42, 60, 80)"}}
          />
          <TextField
            label="Resim Yüksekliği"
            fullWidth
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            sx={{ marginBottom: 2,color:"rgb(42, 60, 80)" }}
          />
          <Typography variant="body2" sx={{ marginBottom: 1,color:"rgb(42, 60, 80)" }}>
            Resim Seç:
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '16px', display: 'block', }}
          />
          {image && (
            <Typography variant="body2" 
            sx={{color:"rgb(42, 60, 80)"}}>
              Yüklenen Resim: {saloonName}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"rgb(42, 60, 80)"}}>
            Kapat
          </Button>
          <Button onClick={handleSubmit} sx={{backgroundColor:"#6587AD",color:"#FDFDF8",fontWeight:"bold"}}>
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminCreateSaloonModal;