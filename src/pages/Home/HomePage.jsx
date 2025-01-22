import React, { useState } from "react";
import "./HomePage.css";
import { Box, Typography } from "@mui/material";
import CurrentReservationItem from "../../components/reservation/CurrentReservationItem";

const Home = () => {
const [exist,setExist]=useState(false);
const handleExistComponent=(data)=>setExist(data);

  return (  
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',  // Dikey olarak hizalama
        justifyContent: 'center', // Yatayda ortalama
        alignItems: 'center',     // Dikeyde ortalama
        height: '100vh',          // Sayfa yüksekliğini dolduracak şekilde
        padding: '20px',          // Kenarlardan biraz boşluk bırakmak için
      }}
    >
      {/* Trakya Üniversitesi yazısı */}
      <Typography
        variant="h3"
        color="white"
        sx={{
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
          fontWeight: 'bold',
          letterSpacing: '2px',
          textAlign: 'center',
          marginBottom: '20px',  // Aşağıya doğru boşluk eklemek için
        }}
      >
        Trakya Üniversitesi Merkez Kütüphanesi
      </Typography>

      {/* CurrentReservationItem bileşeni */}
    <CurrentReservationItem exist={handleExistComponent}/>
    </Box>
  );
};

export default Home;