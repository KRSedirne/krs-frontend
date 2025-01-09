import React from "react";
import { Box, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";



export default function Locker (props)  {

  const {
    isBooked,
    isDisabled,
    onClick,
    lockerNum, 
  } = props;
  let lockerStyle={
    position: "relative",
    width: 100,
    height: 150,
    backgroundColor: "#3c3c3c", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border:"10px solid #3c3c3c ",
    borderRadius: 2,
    margin:"5px"
  };
  let lockerStyleUnlocked={
    ...lockerStyle,
    backgroundColor:"#e9e9e9",
    border: '10px solid #574533',
  borderRadius:2  }
  let lockerTopology={position: "absolute",
    color: "white",
    fontWeight: "bold",}
    let lockerUnlockedTopology={
      ...lockerTopology,
      color:"#574533"
    }
  return (
    <Box
    onClick={!isDisabled?onClick:undefined}
      sx={isBooked?lockerStyle:lockerStyleUnlocked
      }
    >
      {isBooked?<LockIcon
        sx={{
          fontSize: 80,
          color: "black",
        }}
      />:undefined}
      <Typography
        variant="h2"
        sx={
          isBooked?lockerTopology:lockerUnlockedTopology
        }
      >
        {lockerNum}
      </Typography>
    </Box>
  );
};

