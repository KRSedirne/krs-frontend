import  {Stack} from '@mui/material';
import React from "react";

import CameraScanner from './CameraScanner';

export default function ColumnTwo({onUserUpdate}) {
  

  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: 'center',
        height: '70vh',
        backgroundColor: '#FDFDF8',
      }}
    >
      
      <CameraScanner onUserUpdate={onUserUpdate} />
      
     
    </Stack>
  );
}
