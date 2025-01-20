import QrCodeIcon from '@mui/icons-material/QrCode';
import { Button, Stack } from '@mui/material';


export default function ColumnOne({onOpenManuelDialog }){
    
return(
            <Stack
            direction={'column'}

             sx={{
               backgroundColor: '#FDFDF8',
                alignItems:"center",
                height:"70vh",
            }}>    
       <QrCodeIcon sx={{fontSize:"7rem", padding:"50px 5px 0px 5px",border:""}}/>
            <Button
            variant="contained"
            onClick={onOpenManuelDialog}
            sx={{
                backgroundColor:"#2A3C50",
              color:"#FDFDF8",
              width:"%100"
            }}> Manuel Giriş</Button>
            </Stack>     
);
}