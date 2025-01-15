import { Typography } from '@mui/material'
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AdminCreateBlockItem = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
            <Typography variant="h6">Add Block</Typography> 
            <AddCircleIcon sx={{ fontSize: 40 }} />
        </div>
    </div>
  )
}

export default AdminCreateBlockItem
