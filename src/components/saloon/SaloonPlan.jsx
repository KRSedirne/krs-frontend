import React, { useEffect, useState} from 'react';
import { getSaloonImages } from '../../api/block.js';
import { getSeatsBySaloonId } from '../../api/seat.js';
import { useLocation } from 'react-router-dom';
import { Box, Button, CircularProgress } from '@mui/material';
import CreateReservationModal from '../modals/CreateReservationModal';

const SaloonPlan = () => {
  const location = useLocation(); 
  const [saloonImage, setSaloonImage] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [selectedSeat, setSelectedSeat] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReservationSuccess, setIsReservationSuccess] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const saloonId = queryParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSaloonImages(saloonId);
        setSaloonImage(response.url);

        setImageDimensions({
          width: response.width,
          height: response.height,
        });
      
      const seatsResponse = await getSeatsBySaloonId(saloonId);

      const normalizedSeats = seatsResponse.seats.map((seat) => ({
        _id: seat._id,
        isBooked: seat.isBooked,
        block: seat.block,
        seatNumber: seat.seatNumber,
        saloonName: seat.saloonName,
        x: (seat.position.x / response.width) * response.width,
        y: (seat.position.y / response.height) * response.height,
        r: seat.position.r,
      }));

      setSeats(normalizedSeats); 

      setLoading(false);
      if (isReservationSuccess) {
          setIsReservationSuccess(false);
        }
      } catch (error) {
        console.error('Image could not be fetched:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [saloonId, isReservationSuccess]); 
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return; 
    setSelectedSeat(seat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Modal'ı kapat
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
          onClick={() =>  !seat.isBooked && handleSeatClick(seat)} 
          variant="contained"
          disabled={seat.isBooked}
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: seat.isBooked ? 'red' : 'green',
            fontSize: '15px',
            fontWeight: 'bold', 
          }}
          >
            {seat.seatNumber}
          </Button>
      ))}
       <CreateReservationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        seat={selectedSeat}
        setIsReservationSuccess={setIsReservationSuccess}
      />
  </Box>
);
};
export default SaloonPlan;