import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import {getAllBlocks} from '../../api/block'
import SaloonItem from '../../components/saloon/SaloonItem';
import toast from 'react-hot-toast';

const Saloon = () => {

  const creme="#FDFDF8";

  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await getAllBlocks();
      setData(response.blocks);
    } catch (error) {
      toast.error("Yüklenemedi.")
    }
  };
  useEffect(() => {
    
    fetchData();  
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {data?.map((block, index) => (
        <Grid item xs={4} key={index}>
          <Paper elevation={3} sx={{ padding: 2 ,
          backgroundColor:creme
          }}>
            <SaloonItem block={block} key={block._id}/>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Saloon;