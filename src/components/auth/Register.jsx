import React, { useState } from 'react';
import './Login.css';
import { register } from '../../api/auth/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }

    const data = {
      name,
      lastname,
      email,
      password,
    };

    const fetchData = async (data) => {
      try {
        const response = await register(data);
        console.log(response);
        navigate('/profile');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData(data);

    console.log('Kayıt olunuyor:', {
      name,
      lastname,
      email,
      password,
    });
  };

  return (
    <Box className='login-container'>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
              gap: 1,
            }}
          >
            <div className='login-icon-container'>
              <img
                src="/images/image.png"
                alt="icon"
                className='login-icon'
              />
            </div>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 'bold', marginTop: '10px' }}
            >
              Kayıt Ol
            </Typography>
          </Box>

          <Typography variant="h6" align="center" sx={{ marginTop: 2, marginBottom: 3 }}>
            Lütfen Kullanıcı Bilgilerinizi Giriniz
          </Typography>

          <form onSubmit={handleRegister}>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="İsim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Soyisim"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />

            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Şifre"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Şifre Onaylama"
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
              Kayıt Ol
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
