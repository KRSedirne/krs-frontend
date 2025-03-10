import React, { useState, useEffect } from 'react';
import { login } from '../../api/auth/auth';
import ForgotPasswordModal from '../modals/ForgotPasswodModal.jsx';
import toast from 'react-hot-toast';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css';

import {
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
  Paper,
  Box,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberMeEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    }

    const fetchData = async (data) => {
      try {
        const response = await login(data)

        if (response.success) {
          if (rememberMe) {
            localStorage.setItem('rememberMeEmail', email);
          } else {
            localStorage.removeItem('rememberMeEmail');
          }
          navigate('/profile');
        }
      }
      catch (error) {
        toast.error("Geçersiz işlem... Lütfen tekrar deneyiniz.")
      }
    }
    fetchData(data)

  };


  return (
    <Box className='login-container'>
      <Container component="main" maxWidth="xs" >
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'left', gap: 1 }}>
            <div className='login-icon-container'>
              <img
                src="/images/transparent_logo.png"
                alt="icon" className='login-icon'
              />
            </div>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', marginTop: "10px", color: "#2A3C50" }}>
              Giriş Yap
            </Typography>
          </Box>
          <form onSubmit={handleLogin}>
            {/* Email */}
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Email Adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Remember Me */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Beni Hatırla"
            />

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: "#2A3C50",
                color: "#FDFDF8"
              }}
            >
              Giriş Yap
            </Button>

            {/* Forgot Password Link */}
            <Typography container justifyContent="space-between" sx={{ marginTop: 2 }}>
              <Typography item>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  sx={{ alignSelf: 'center', }}
                  onClick={() => setOpenForgotPasswordModal(true)}
                >
                  Şifremi Unuttum?
                </Link>
              </Typography>
              <Divider sx={{ padding: "20px" }} >veya</Divider>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ textAlign: 'center' }}>
                  Hesabın Yok mu?{' '}
                  <Link
                    href="/register"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Kaydol
                  </Link>
                </Typography>
              </Box>
            </Typography>
          </form>
        </Paper>
      </Container>
      <ForgotPasswordModal
        isOpen={openForgotPasswordModal} // "open" yerine "isOpen" propunu kullanalım
        handleClose={() => setOpenForgotPasswordModal(false)}  // Modal'ı kapat
      />
    </Box>
  );
};

export default LoginPage;
