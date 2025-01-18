import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import ColumnOne from "../../components/admin/qrAdmin/ColumnOne";
import ColumnTwo from "../../components/admin/qrAdmin/ColumnTwo";
import { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import ManuelEntryDialog from "../../components/admin/qrAdmin/ManuelEnteryDialog";
import { adminCheckInReservationManually } from "../../api/admin/adminQR";

export default function QRPageAdmin() {
    let boxsx={
        border: '2px solid #ddd',
        borderRadius: '5px',     
        padding: '16px',         
        backgroundColor: '#f2f2f2', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
        alignItems: 'center',
        margin:"12px"
      };
      const [user, setUser] = useState(null);
      const [open,setOpen]=useState(false);

 


      const capitalize=(str)=>{
        return str.charAt(0).toUpperCase() + str.slice(1);
        }

        const handleOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      const handleUserUpdate = (userData) => {
        setUser({name:capitalize(userData.data.name),lastname:capitalize(userData.data.lastname)});
        console.log(user);
    
      };
      const handleManuelCheckIn = async (data) => {
        console.log(data);
        const user= await adminCheckInReservationManually(data);
        handleUserUpdate(user);
        handleClose();
      };
      
  return (
    
<>
<ManuelEntryDialog 
    handleClose={handleClose}
    open={open}
    handleClosebySubmit={handleManuelCheckIn}/>
{user && user.name && user.lastname && (
                <Alert severity="success">
                    <AlertTitle>Hoşgeldiniz</AlertTitle>
                    {`${user.name} ${user.lastname}`}
                </Alert>
            )}
    <Box
    sx={{flexGrow:1,...boxsx}}
    >
 
      <Grid container  sx={{justifyContent:"space-evenly"}}>
        <Grid size={2}>
        <Box sx={boxsx}><ColumnOne  onOpenManuelDialog={handleOpen} sx={{
}}/></Box>        </Grid>
        <Grid size={9}>
        <Box sx={boxsx} ><ColumnTwo onUserUpdate={handleUserUpdate} sx={{
}}/></Box> 
        </Grid>
      </Grid>
   
    </Box>
</>
        );
}
