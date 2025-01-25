import { Stack, Button, TextField, Typography } from '@mui/material';
import QR from './QR';
import React, { useEffect, useState } from "react";
import { getQRCode } from '../../api/reservation/QR';
import { toast } from 'react-toastify';




export default function ColumnTwo() {
  const creme = "#FDFDF8";
  const darkBlue = "#2A3C50";
  const blue = "#6587AD"
  const gold = "rgba(242,156,19,0.5)"

  const [value, setValue] = useState("");
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await getQRCode();
        setValue(response.qrCode);
      } catch (error) {
        toast.error("Rezervasyon bulunamadı.")
      }
    }
    fetchData()
  }, []);



  const handleDownload = () => {
    const qrCodeURL = document.getElementById('qrCodeQl')
    const svgData = new XMLSerializer().serializeToString(qrCodeURL);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngData;
      link.download = "qrCode.png";
      link.click();
    }
    img.src = "data:image/svg+xml;base64," + btoa(svgData);

  }
 


  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: 'center',
        height: '78vh',
      }}
    >
      <div
        style={{
          padding: '20px 0 0 0',
        }}
      >
        <div
          style={{
            padding: '10px',
            outline: `5px solid ${gold}`,
            borderRadius: "2px"
          }}
        >
          <div
            style={{
              padding: '10px',
              outline: `5px solid ${blue}`,
              borderRadius: "2px"
            }}
          >
            <div
              style={{
                padding: '10px',
                outline: `5px solid ${darkBlue}`,
                borderRadius: "2px"
              }}
            >
              <QR value={value} id="qrCodeQl" />
            </div>
          </div>
        </div>
      </div>
      <Typography variant='h6'
        sx={{
          color: darkBlue,
        }}> Lütfen QR kodunuzu tarayıcıya okutunuz.</Typography>
      <Typography variant='body2'
        sx={{
          color: darkBlue,
        }}> Rezervasyonunuz saatinden itibaren 15 dakika sonrasına  kadar QR'ınızı okutmazsanız ceza yersiniz.</Typography>
      <Stack
        direction={'row'}
        spacing={8}
        sx={{
          alignItems: 'center',
        }}
      >
        <Button onClick={handleDownload} variant="contained"
          sx={{
            backgroundColor: darkBlue,
            color: creme,
            width: "300px"
          }}>QR İndir</Button>
        
      </Stack>
    </Stack>
  );
}
