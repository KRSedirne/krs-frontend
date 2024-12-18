import React from "react";
import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";



export default function Locker (props)  {

  let booked=props.isBooked;
  let lockerStyle={
    position: "relative",
    width: 100,
    height: 150,
    backgroundColor: "#3c3c3c", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  };
  if(booked){
    
  }
  return (
    <Box
    onClick={props.onClick}
      sx={lockerStyle}
    >
      <LockIcon
        sx={{
          fontSize: 80,
          color: "black",
        }}
      />
      <Typography
        variant="h2"
        sx={{
          position: "absolute",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {props.lockerNum}
      </Typography>
    </Box>
  );
};

