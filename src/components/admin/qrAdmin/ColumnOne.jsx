import QrCodeIcon from '@mui/icons-material/QrCode';
import { Button, Stack } from '@mui/material';


export default function ColumnOne({onOpenManuelDialog }){
    
return(
            <Stack
            direction={'column'}
            spacing={5}

             sx={{
                alignItems:"center",
                height:"78vh",
            }}>    
       <QrCodeIcon sx={{fontSize:"100px", padding:"50px 0 0 0"}}/>
            <Button
            onClick={onOpenManuelDialog}> Manuel Giriş</Button>
            </Stack>     
);
}