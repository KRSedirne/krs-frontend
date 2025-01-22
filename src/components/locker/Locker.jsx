import React from "react";
import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export default function Locker (props)  {

  const {
    isBooked,
    isDisabled,
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
    cursor: isDisabled ? "not-allowed" : "pointer", // Kullanılabilirlik kontrolü
  };

  let lockerStyleUnlocked={
    ...lockerStyle,
    backgroundColor:"#FDFDF8",
    border: '3px solid #5D4038',
    borderRadius:1
  }

  let lockerTopology={
    position: "absolute",
    color: "#FDFDF8",
    fontWeight: "bold",
    fontSize:fontSize
  }

  let lockerUnlockedTopology={
    ...lockerTopology,
    color:"#5D4038",
       fontSize:fontSize

  }

  return (
    <Box
      onClick={!isDisabled ? onClick : undefined}
      sx={isBooked ? lockerStyle : lockerStyleUnlocked}
    >
      {/* Kilitli dolaplar için ikon eklendi */}
      {isBooked && (
        <LockIcon
          sx={{
            fontSize: fontSize,
            color: "rgb(42, 60, 80)",
          }}
        />
      )}

      {/* Dolap numarası görsel iyileştirildi */}
      <Typography
        variant="h2"
        sx={isBooked ? lockerTopology : lockerUnlockedTopology}
      >
        {lockerNum}
      </Typography>
    </Box>
  );
};
