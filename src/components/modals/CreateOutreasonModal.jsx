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
      await createOutreason(id, data);
      toast.success("Mola oluşturulmuştur.");
    } catch (error) {
      toast.error("Mola oluşturulamadı. Lütfen tekrar deneyiniz.");
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
            border: '5px solid #6587AD',
            boxShadow: 24,
            p: 4,
            borderRadius: "5px",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" sx={{backgroundColor:"#6587AD", color:"rgb(251, 254, 252)",fontWeight:"bold", textAlign:"center"}}>
            Mola Seçimi
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Lütfen mola için bir zaman seçin:
          </Typography>
          <Box sx={{  display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center', marginRight: 2, mt: 3}}>
            <Typography style={{ width: '100px', fontSize:'18px', fontWeight:'bold', color:"#2A3C50" }}>Description</Typography>
            <TextField sx={{ml:3, mr:6}} width='%100' id="outlined-name-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
            <Button
              variant="contained"
              sx={{backgroundColor:"#6587AD",color:"rgb(251, 254, 252)", fontWeight:"bold"}}
              onClick={() => handleTenMiniuteButton()}
            >
              10 Dakika
            </Button>
            <Button
              variant="contained"
              sx={{backgroundColor:"#6587AD",color:"rgb(251, 254, 252)", fontWeight:"bold"}}   
                         onClick={() => handleThirtyMiniuteButton()}
            >
              30 Dakika
            </Button>
          </Box>
          <Box sx={{ textAlign: 'right', mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="#2A3C50" onClick={handleClose}>
              Kapat
            </Button>
            <Button backgroundColor="#5D4038" color="rgb(251, 254, 252)"  onClick={() => submitHandler()}>
              Oluştur
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateOutreasonModal;