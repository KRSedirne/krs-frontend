import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { updatePassword } from '../../api/user/profile';
import toast from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UpdatePasswordModal = ({ setIsShowUpdatePasswordModal }) => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleClose = () => setIsShowUpdatePasswordModal(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    const fetchData = async (data) => {
        try {
            const response = await updatePassword(data)
            toast.success("Şifre başarıyla güncellendi.")
        } catch (error) {
            toast.error("Şifre güncellenirken hata oluştu. Lütfen tekrar deneyiniz.")
        }
    }
    fetchData(data)

    setIsShowUpdatePasswordModal(false);
  }

  return (
    <div>
      <Modal
          open={true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off"> 
            <Box sx={{  display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center', marginRight: 2}}>
              <Typography style={{ width: '100px', fontSize:'20px', fontWeight:'bold' }}>Old Password</Typography>
              <TextField id="outlined-name-input" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center', marginRight: 2 }}>
              <Typography style={{ width: '100px', fontSize:'20px', fontWeight:'bold' }}>New Password</Typography>
              <TextField id="outlined-surname-input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            </Box>  
            <Button variant="contained" color="primary" style={{marginTop: 10, display: 'block', marginLeft: 'auto', marginRight: 'auto'}} onClick={submitHandler}>
              Update Password
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default UpdatePasswordModal
