import {Box} from "@mui/material"
import Locker from "./components/Locker";
export default function LockerPage(){
    let boxsx={
        border: '2px solid #ddd', // Çerçeve
        borderRadius: '5px',     // Köşe yuvarlama
        padding: '16px',         // İçerik boşluğu
        backgroundColor: '#f2f2f2', // Arka plan rengi
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Hafif gölge
        alignItems: 'center'
          };
    return(
        <Box
    sx={{flexGrow:1,...boxsx}}
    >
        <Locker onClick={""}></Locker>
    </Box>

    )
}