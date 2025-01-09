import QrCodeIcon from '@mui/icons-material/QrCode';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';


export default function ColumnOne(){
    
return(
            <Stack
            direction={'column'}
            spacing={5}

             sx={{
                alignItems:"center",
                height:"83vh",
            }}>    
       <QrCodeIcon sx={{fontSize:"100px", padding:"50px 0 0 0"}}/>
            <Button variant="contained">QR Kodum</Button>
            </Stack>     
);
}