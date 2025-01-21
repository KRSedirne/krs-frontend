import React, { useEffect, useState} from 'react';
import { getSaloonImages } from '../../api/block.js';
import { getSeatsBySaloonId } from '../../api/seat.js';
import { useLocation } from 'react-router-dom';
import { Box, Button, CircularProgress } from '@mui/material';

const SaloonPlan = () => {
  const location = useLocation(); 
  const [saloonImage, setSaloonImage] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const queryParams = new URLSearchParams(location.search);
  const saloonId = queryParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSaloonImages(saloonId);
        console.log(response);
        setSaloonImage(response.url);

        setImageDimensions({
          width: response.width,
          height: response.height,
        });
      
      const seatsResponse = await getSeatsBySaloonId(saloonId);

      const normalizedSeats = seatsResponse.seats.map((seat) => ({
        _id: seat._id,
        x: (seat.position.x / response.width) * response.width,
        y: (seat.position.y / response.height) * response.height,
        r: seat.position.r,
      }));

      setSeats(normalizedSeats); 

      setLoading(false);
      } catch (error) {
        console.error('Image could not be fetched:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [saloonId]); 

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const handleSeatClick = (seat) => {
    alert(`Koltuk seçildi: ID=${seat._id}`);
  };

  return (
    <Box
    sx={{
    position: 'relative',
    width: `${imageDimensions.width}px`,
    height: `${imageDimensions.height}px`,
    margin: 'auto',
    border: '1px solid black',
  }}
  >
    {/* Salon resmi */}
    <img
      src={saloonImage}
      alt="Saloon"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />

    {/* Koltuk butonları */}
    {seats.map((seat, index) => (
        <Button
          key={index}
          onClick={() => handleSeatClick(seat)}
          variant="contained"
          color="primary"
          sx={{
            position: 'absolute',
            top: `${seat.y}px`,
            left: `${seat.x}px`,
            width: `${seat.r * 2}px`,
            height: `${seat.r * 2}px`,
            minWidth: 0,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        />
      ))}
  </Box>
);
};
export default SaloonPlan;