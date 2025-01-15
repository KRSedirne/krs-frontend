import { Button, List, ListItem, Typography } from '@mui/material'
import React from 'react'

const SaloonItem = ({ block }) => {

    // const handleSalonClick = (salonName, salonImage) => {
    // Salon tıklama işlemi
    // console.log(`Salon Adı: ${salonName}, Salon Resmi: ${salonImage}`);
    // }

  return (
    <div>
      <Typography variant="h6">{block.name}</Typography>
        <List>
          {block.saloon.map((salon, idx) => (
            <ListItem key={idx}>
              <Button
                variant="contained"
                color="warning" // Sarı renk için warning kullanıyoruz
                sx={{
                  borderRadius: '25px', // Köşeleri kıvrımlı yapıyoruz
                  margin: '5px',
                  width: '100%', // Butonun genişliğini salon ismine göre ayarlıyoruz
                }}
                // onClick={() => handleSalonClick(salon.name, salon.image)}
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
