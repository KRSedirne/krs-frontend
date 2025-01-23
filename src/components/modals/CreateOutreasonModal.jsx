import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import { createOutreason } from '../../api/reservation/reservation';
import toast from 'react-hot-toast';

const CreateOutreasonModal = ({ setIsShowCreateOutreasonModal, seatReservationId }) => {
  const [type, setType] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');


  const handleClose = () => setIsShowCreateOutreasonModal(false);

  const fetchData = async (id, data) => {
    try {
      const response = await createOutreason(id, data);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleTenMiniuteButton = () => {
    setTime(10);
    setType('short');
  }

  const handleThirtyMiniuteButton = () => {
    setTime(30);
    setType('long');
  }

  const submitHandler = () => {

    if(time === '' || description === '') {
      toast.error('Lütfen tüm alanları doldurunuz.');
    }

    console.log(type + ' ' + time + ' ' + description);
    const data = {
      type: type,
      time: time,
      description: description
    };
    fetchData(seatReservationId, data);
    handleClose();
  }

  

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Mola Seçimi
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Lütfen mola için bir zaman seçin:
          </Typography>
          <Box sx={{  display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center', marginRight: 2, mt: 3}}>
            <Typography style={{ width: '100px', fontSize:'18px', fontWeight:'bold' }}>Description</Typography>
            <TextField sx={{ml:3, mr:6}} width='%100' id="outlined-name-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleTenMiniuteButton()}
            >
              10 Dakika
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleThirtyMiniuteButton()}
            >
              30 Dakika
            </Button>
          </Box>
          <Box sx={{ textAlign: 'right', mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Kapat
            </Button>
            <Button variant="outlined" color="success" onClick={() => submitHandler()}>
              Oluştur
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateOutreasonModal;
