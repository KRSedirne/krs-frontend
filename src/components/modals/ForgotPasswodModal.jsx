import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, IconButton,FormHelperText } from '@mui/material';
import toast from 'react-hot-toast';
import { forgetPassword } from '../../api/auth/auth.js';
import CloseIcon from '@mui/icons-material/Close'; // Çarpı (kapatma) ikonu

const ForgetPasswordModal = ({ isOpen, handleClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading durumu
  const [errorMessage, setErrorMessage] = useState(''); // Hata mesajı

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgetPassword({ email });
      toast.success(response.message);
      handleClose();
      setErrorMessage('');
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Bir şeyler yanlış gitti.');
      setErrorMessage(error.response ? error.response.data.message : 'Bir şeyler yanlış gitti.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={{position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                borderRadius:1,
                boxShadow: 24,p: 4,} }>

        {/* Kapatma butonu */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" component="h2" textAlign="center" mb={2} sx={{ fontWeight: 'bold', textDecoration:"underline", textTransform:"uppercase" }}>
          Şifre Sıfırlama
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="E-posta Adresi"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            error={!!errorMessage}
            helperText={
                <FormHelperText sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                {/* Error varsa errorMessage gösterilecek, yoksa aşağıdaki metin */}
                {errorMessage ? (
                  <span>{errorMessage}</span>
                ) : (
                  <>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>*</span>
                    <span style={{ fontWeight: 'bold' }}> Lütfen e-posta adresinizi girin.</span>
                  </>
                )}
              </FormHelperText>
              }
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isLoading}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Reset Link Gönder'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ForgetPasswordModal;
