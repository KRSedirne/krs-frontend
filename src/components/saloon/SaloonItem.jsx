import { Button, List, ListItem, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SaloonItem = ({ block }) => {

  const navigate = useNavigate();

  const handleSalonClick = (salonId) => {

    console.log('Tıklanan salon ID:', salonId);
    navigate(`/saloonImage?id=${salonId}`);
  };

  return (
    <div>
      <Typography variant="h6">{block.name}</Typography>
        <List>
          {block.saloon.map((salon, idx) => (
            <ListItem key={idx}>
              <Button
                variant="contained"
                color="warning" 
                sx={{
                  borderRadius: '25px',
                  margin: '5px',
                  width: '100%', 
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
