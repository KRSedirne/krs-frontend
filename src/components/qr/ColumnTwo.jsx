import { Stack, Button,TextField } from '@mui/material';
import QR from './QR';
import React, { useEffect, useState } from "react";
import { getQRCode } from '../../api/reservation/QR';
import { toast } from 'react-toastify';




export default function ColumnTwo() {
  const dummyQR="";
  const  [value,setValue]=useState("");
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await getQRCode();
        setValue(response.qrCode)
      } catch (error) {
        toast.error("no reservation found") // productin error message olması gerek, backend buna göre düzenlenmeli
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
      <TextField  sx={{width:"400px"}} id="outlined-basic" label="QR" variant="outlined" width="300px" onChange={handleValue} value={value} />
          <h2>Lütfen QR Kodunuzu Tarayıcıya Okutunuz</h2>
      <Stack
        direction={'row'}
        spacing={8}
        sx={{
          alignItems: 'center',
        }}
      >
        <Button onClick={handleDownload} variant="contained"
        sx={{
          backgroundColor:"#2A3C50",
        color:"#FDFDF8",
        width:"%100"
      }}>QR İndir</Button>
        <Button  onClick={handleBackToDefault} variant="contained"
        sx={{
          backgroundColor:"#2A3C50",
        color:"#FDFDF8",
        width:"%100"
      }}>Sıfırla</Button>
      </Stack>
    </Stack>
  );
}
