import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { adminCreateBlock } from '../../../api/admin/adminBlock';
import toast from 'react-hot-toast';

const AdminCreateBlockModal = ({ setIsShowAdminCreateBlockModal }) => {
  const [blockName, setBlockName] = useState('');

  const handleClose = () => setIsShowAdminCreateBlockModal(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const fetchData = async (blockName) => {
        try {
            const response = await adminCreateBlock(blockName)
            toast.success(response.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    fetchData(blockName)

    setIsShowAdminCreateBlockModal(false);
  }

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
        <DialogTitle>Block Ekle</DialogTitle>
        <DialogContent>
          <TextField
            label="Block Adı"
            fullWidth
            value={blockName}
            onChange={(e) => setBlockName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Kapat
          </Button>
          <Button onClick={submitHandler} color="secondary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminCreateBlockModal;