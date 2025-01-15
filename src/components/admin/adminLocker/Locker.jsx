import React from "react";
import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export default function Locker (props)  {

  const {
    isBooked,
    onClick,
    lockerNum,
    width,
    fontSize,
    height 
  } = props;

  // Locker stillerini güncelledim ve MUI'ye daha uyumlu hale getirdim.
  let lockerStyle={
    position: "relative",
    width: width,
    height: height,
    backgroundColor: "#3c3c3c", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border:"3px solid #3c3c3c ",
    borderRadius: 1,
    margin:"1px",
  };
  

  const lockerStyleUnlocked={
    ...lockerStyle,
    backgroundColor:"#e9e9e9",
    border: '3px solid #574533',
    borderRadius:1
  }
  const lockerStyleNew={
    ...lockerStyle,
    border: "3px dashed rgb(28, 85, 123)", // Çizgili sınır
  borderRadius: 1, // Kenar yuvarlama
  margin: "1px",
  cursor: "pointer",
  backgroundColor:"rgba(0,0,0,0)"
  }
  if(!isBooked){
    lockerStyle=lockerStyleUnlocked;
  }
  else if(isBooked==="new"){
    lockerStyle=lockerStyleNew;
  }
  

  const lockerTopology={
    position: "absolute",
    color: "white",
    fontWeight: "bold",
  }

  const lockerUnlockedTopology={
    ...lockerTopology,
    color:"#574533"
  }
  let plusStyle = {
    fontSize: "2rem", // Artı sembolü boyutu
    color: "rgb(28, 85, 123)", // Sembol rengi
  };

  return (
    <Box
    onClick={onClick}
      sx={lockerStyle}
    >
      {/* Kilitli dolaplar için ikon eklendi */}
      {isBooked===true && (
        <LockIcon
          sx={{
            fontSize: fontSize,
            color: "black",
          }}
        />
      )}
{isBooked==="new"?<Typography sx={plusStyle}>+</Typography>:null}
      {/* Dolap numarası görsel iyileştirildi */}
      <Typography
        fontSize={fontSize}
        sx={isBooked ? lockerTopology : lockerUnlockedTopology}
      >
        {isBooked!=="new"?lockerNum:null}
      </Typography>
    </Box>
  );
};
