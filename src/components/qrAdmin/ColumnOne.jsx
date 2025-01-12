import QrCodeIcon from '@mui/icons-material/QrCode';
import { Button, Stack } from '@mui/material';


export default function ColumnOne({handleState}){
    
return(
            <Stack
            direction={'column'}
            spacing={5}

             sx={{
                alignItems:"center",
                height:"83vh",
            }}>    
       <QrCodeIcon sx={{fontSize:"100px", padding:"50px 0 0 0"}}/>
            <Button> QR TARA</Button>
            </Stack>     
);
}