import { Button, List, ListItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import SaloonPlan from '../../saloon/SaloonPlan.jsx';
import AdminCreateSaloonModal from '../adminModals/AdminCreateSaloonModal';
import { useNavigate } from 'react-router-dom';
const AdminSaloonItem = ({ block }) => {

    const [isShowAdminCreateSaloonModal, setIsShowAdminCreateSaloonModal] = useState(false);
    const [selectedSaloonId, setSelectedSaloonId] = useState(null);
    const [showSaloonPlan, setShowSaloonPlan] = useState(false);

    const navigate = useNavigate();

    const handleSalonClick = (salonId) => {
        setSelectedSaloonId(salonId); // Tıklanan salonun ID'sini kaydet
        console.log('Tıklanan salon ID:', salonId);
        setShowSaloonPlan(true);
        navigate(`/saloonImage?id=${salonId}`); // Query parametre ile salon ID'sini geçir
    };

  return (
    <div>
        <Typography variant="h6">{block.name}</Typography>
        <List>
            {block.saloon.map((salon, idx) => (
            <ListItem key={idx}>
                <Button variant="contained" color="warning" sx={{ borderRadius: '25px',  margin: '5px', width: '100%' }} onClick={() => handleSalonClick(salon._id)}>
                {salon.saloonName}
                </Button>
               
            </ListItem>
            ))}
            <ListItem>
            <Button variant="contained" color="warning" sx={{ borderRadius: '25px', margin: '5px', width: '100%' }} onClick={() => setIsShowAdminCreateSaloonModal(true)}>
                (+) Salon Ekle
                </Button>
                {isShowAdminCreateSaloonModal && (
                <AdminCreateSaloonModal
                setIsShowAdminCreateSaloonModal={setIsShowAdminCreateSaloonModal}
                blockId={block._id}
              />
                )}
            </ListItem>
        </List>
    </div>
  )
}

export default AdminSaloonItem