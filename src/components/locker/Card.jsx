import { Box } from "@mui/material";

export default function Card({children,sx}){
  const boxsx = {
    border: "2px solid #ddd", // Çerçeve
    borderRadius: "5px", // Köşe yuvarlama
    padding: "16px", // İçerik boşluğu
    margin:"16px",
    backgroundColor: "#f2f2f2", // Arka plan rengi
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    ...sx
    
  };
      return(
        <Box sx={{ flexGrow: 1, ...boxsx }}>
            {children}
        </Box>
      );
}