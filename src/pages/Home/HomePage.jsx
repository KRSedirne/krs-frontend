import React from "react";
import "./HomePage.css";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (  
    <Box sx={{display:"flex" ,height:"100vh" ,position:"relative" ,justifyContent:"center",alignItems:"center"}}>
        <Box
        component="main"
        flexGrow={1}
          ></Box>
           <Typography
          variant="h3"
          color="white"
          sx={{
            marginRight:"10%",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
            fontWeight: "bold",
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          Trakya Üniversitesi Merkez Kütüphanesi
        </Typography>
      </Box>
  );
};

export default Home;