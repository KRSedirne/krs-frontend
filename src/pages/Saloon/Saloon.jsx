import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import { getAllBlocks } from '../api/block'; // API fonksiyonunu import ediyoruz
import SaloonItem from '../components/saloon/SaloonItem';

const Saloon = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBlocks();
        setData(response.blocks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();  
  }, []);

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {data?.map((block, index) => (
        <Grid item xs={4} key={index}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <SaloonItem block={block} key={block._id}/>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Saloon;