import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import ColumnOne from "./components/ColumnOne";
import ColumnTwo from "./components/ColumnTwo";

export default function QRPage() {
    let boxsx={
        border: '2px solid #ddd',
        borderRadius: '5px',     
        padding: '16px',         
        backgroundColor: '#f2f2f2', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
        alignItems: 'center',
        margin:"12px"
      };
  return (
    <div style={{backgroundColor:"black"}}>
    <Box
    sx={{flexGrow:1,...boxsx}}
    >
 
      <Grid container  sx={{justifyContent:"space-evenly"}}>
        <Grid size={2}>
        <Box sx={boxsx}><ColumnOne sx={{
}}/></Box>        </Grid>
        <Grid size={9}>
        <Box sx={boxsx}><ColumnTwo sx={{
}}/></Box> 
        </Grid>
      </Grid>
   
    </Box>
    </div>

        );
}
