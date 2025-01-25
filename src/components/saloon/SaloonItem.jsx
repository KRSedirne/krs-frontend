import { Button, List, ListItem, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SaloonItem = ({ block }) => {
  const darkBlue="rgb(42, 60, 80)";

  const navigate = useNavigate();

  const handleSalonClick = (salonId) => {
    navigate(`/saloonImage?id=${salonId}`);
  };

  return (
    <div>
      <Typography variant="h6"
      sx={
        {
          color:darkBlue,
          fontWeight:"bold",
          backgroundColor:"rgba(242,156,19,0.2)",
                }
      }
      >{block.name}</Typography>
        <List>
          {block.saloon.map((salon, idx) => (
            <ListItem key={idx}>
              <Button
                variant="contained" 
                sx={{
                  borderRadius: '3px',
                  margin: '5px',
                  width: '100%',
                  backgroundColor:darkBlue,
                }}
                onClick={() => handleSalonClick(salon._id)}
              >
                {salon.saloonName}
              </Button>
            </ListItem>
          ))}
        </List>
    </div>
  )
}

export default SaloonItem
