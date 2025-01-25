import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper } from '@mui/material';
import { adminGetAllBlocks } from '../../api/admin/adminBlock'; // API fonksiyonunu import ediyoruz
import AdminSaloonItem from '../../components/admin/adminSaloon/AdminSaloonItem';
import AdminCreateBlockItem from '../../components/admin/AdminCreateBlockItem';
import AdminCreateBlockModal from '../../components/admin/adminModals/AdminCreateBlockModal';
import toast from 'react-hot-toast';


const AdminSaloon = () => {
  const [data, setData] = useState([]);
  const [isShowAdminCreateBlockModal, setIsShowAdminCreateBlockModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminGetAllBlocks();
        setData(response.blocks);
      } catch (error) {
        toast.error("Yüklenemedi...");
      }
    };
    fetchData();  
  }, [isShowAdminCreateBlockModal]);

  return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
        {data?.map((block, index) => (
            <Grid item xs={4} key={index}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <AdminSaloonItem block={block} key={block._id} />
            </Paper>
            </Grid>
        ))}
      
        
        <Button sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          position: 'absolute',
          bottom: 16,  // Alt köşe
          right: 16,   // Sağ köşe
          color: 'white',
        }}
        onClick={() => setIsShowAdminCreateBlockModal(true)}
        >
            <AdminCreateBlockItem />
        </Button>
        {isShowAdminCreateBlockModal && (
            <AdminCreateBlockModal setIsShowAdminCreateBlockModal={setIsShowAdminCreateBlockModal} />
        )}
    </Grid>
  );
};
export default AdminSaloon;