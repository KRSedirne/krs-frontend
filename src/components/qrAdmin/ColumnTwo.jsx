import { Stack, Button,TextField } from '@mui/material';
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import CameraScanner from './CameraScanner';

export default function ColumnTwo({onState}) {
  

  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: 'center',
        height: '83vh',
      }}
    >
      
     <CameraScanner/>
      
     
    </Stack>
  );
}
