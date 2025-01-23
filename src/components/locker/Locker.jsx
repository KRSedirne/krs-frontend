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
    backgroundColor: "#3c3c3c", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border:"3px solid #3c3c3c ",
    borderRadius: 1,
    margin:"1px",
    cursor: isDisabled ? "not-allowed" : "pointer", // Kullanılabilirlik kontrolü
  };

  let lockerStyleUnlocked={
    ...lockerStyle,
    backgroundColor:"#e9e9e9",
    border: '3px solid #574533',
    borderRadius:1
  }

  let lockerTopology={
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    fontSize:fontSize
  }

  let lockerUnlockedTopology={
    ...lockerTopology,
    color:"#574533", 
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
            color: "black",
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
