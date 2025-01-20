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
    backgroundColor: "#6587AD", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border:"3px solid #6587AD ",
    borderRadius: 1,
    margin:"1px",
  };
  

  const lockerStyleUnlocked={
    ...lockerStyle,
    backgroundColor:"#FDFDF8",
    border: '3px solid #5D4038',
    borderRadius:1
  }
  const lockerStyleNew={
    ...lockerStyle,
    border: "3px dashed #F29C13", // Çizgili sınır
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
    color: "#FDFDF8",
    fontWeight: "bold",
  }

  const lockerUnlockedTopology={
    ...lockerTopology,
    color:"#5D4038"
  }
  let plusStyle = {
    fontSize: "2rem", // Artı sembolü boyutu
    color: "#F29C13", // Sembol rengi
  };

  return (
    <div>
    <Box
    onClick={onClick}
      sx={lockerStyle}
    >
      {/* Kilitli dolaplar için ikon eklendi */}
      {isBooked===true && (
        <LockIcon
          sx={{
            fontSize: fontSize,
            color: "rgb(42, 60, 80)",
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
    </div>
  );
};
