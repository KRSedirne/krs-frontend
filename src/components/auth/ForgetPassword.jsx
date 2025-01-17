import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams ve useNavigate kullanılıyor
import { newPasswordSetting } from '../../api/auth/auth.js';
import toast from 'react-hot-toast';
import './Login.css';

import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';

const ForgetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { id } = useParams(); // URL'deki :id parametresini alıyoruz
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Şifreler eşleşmemektedir.");
    }

    try {
      const result = await newPasswordSetting(id, password); // Şifreyi ve ID'yi gönderiyoruz
      toast.success(result.message || "Şifre başarıyla değiştirildi!"); // API'den dönen mesajı gösterebilirsiniz
      navigate('/'); // Başarılı işlemden sonra ana sayfaya yönlendiriyoruz
    } catch (error) {
      // Hata durumunu burada yakalıyoruz
      toast.error(error.message || "Bir hata oluştu! Şifre değiştirilemedi.");
    }
  };

  return (
    <Box className='login-container'>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', gap: 1 }}>
            <div className='login-icon-container'>
              <img
                src="/images/image.png"
                alt="icon"
                className='login-icon'
              />
            </div>
            <Typography align="center" gutterBottom sx={{ fontWeight: 'bold',fontSize:"30px", marginTop: '10px' }}>
              Şifreni Yenile
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              label="Yeni Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Tekrar Yeni Şifre"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Onayla
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgetPasswordPage;
