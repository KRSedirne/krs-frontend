import { Stack, Button,TextField } from '@mui/material';
import QR from './QR';
import React, { useEffect, useState } from "react";
import { getReservation } from '../../../api/reservation/QR';
import { toast } from 'react-toastify';




export default function ColumnTwo() {
  const dummyQR="";
  const  [value,setValue]=useState(dummyQR);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await getReservation();
        setValue(response.data.qrCode)


      } catch (error) {
        toast.error(error.response.data.message) // productin error message olması gerek, backend buna göre düzenlenmeli
      }
    }
    fetchData()
  }, []);
  


  const handleDownload=()=>{
    const qrCodeURL=document.getElementById('qrCodeQl')
    const svgData=new XMLSerializer().serializeToString(qrCodeURL);
    const canvas=document.createElement("canvas");
    const ctx=canvas.getContext("2d");
    const img=new Image();
    img.onload=()=>{
      canvas.width=img.width;
      canvas.height=img.height;
      ctx.drawImage(img,0,0);
      const pngData=canvas.toDataURL("image/png");
      const link=document.createElement("a");
      link.href=pngData;
      link.download="qrCode.png";
      link.click();
    }
    img.src = "data:image/svg+xml;base64," + btoa(svgData);

  }
  const handleValue = (event) => {
    setValue(event.target.value);
  };

  const handleBackToDefault=()=>{
    setValue(dummyQR);
  }
    
  


  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: 'center',
        height: '83vh',
      }}
    >
      <div
        style={{
          padding: '30px 0 0 0',
        }}
      >
        <div
          style={{
            padding: '20px',
            outline: '5px solid black',
            borderRadius:"15px"
          }}
        >
          <QR value={value} id="qrCodeQl" />
        </div>
      </div>
      <TextField  sx={{width:"400px"}} id="outlined-basic" label="QR" variant="outlined" fullWidth="300px" onChange={handleValue} value={value} />
          <h2>Lütfen QR Kodunuzu Tarayıcıya Okutunuz</h2>
      <Stack
        direction={'row'}
        spacing={8}
        sx={{
          alignItems: 'center',
        }}
      >
        <Button onClick={handleDownload} variant="contained">QR İndir</Button>
        <Button  onClick={handleBackToDefault} variant="contained">Sıfırla</Button>
      </Stack>
    </Stack>
  );
}
