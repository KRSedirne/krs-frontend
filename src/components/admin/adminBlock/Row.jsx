import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
export default function Row(props) {
    const navigate = useNavigate();
    const { row, onDelete,addSaloonModal,onDeleteSaloon } = props;
    const [open, setOpen] = useState(false);

  
    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">
            <Button variant="outlined" size="small" onClick={onDelete} sx={{backgroundColor:"#5D4038",color:"#FDFDF8",fontWeight:"bold"}}>
              Sil
            </Button>
          </TableCell>
  
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div" sx={{color:"rgb(42, 60, 80)",fontWeight:"bold"}}>
                  SALONLAR
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                    <TableCell >
                <Button variant="outlined" size="small" align="left"
                onClick={addSaloonModal}
                sx={
                  { backgroundColor:"#6587AD",
                    color:"#FDFDF8",
                  border:"2px solid #FDFDF8",
                  fontWeight:"Bold"
                  }
                }>
                  Ekle
                </Button></TableCell>
                      <TableCell sx={{color:"rgb(42, 60, 80)",fontWeight:"bold"}}>SALON ADI</TableCell>
                      <TableCell sx={{color:"rgb(42, 60, 80)",fontWeight:"bold"}} align="right">SALON SİL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.saloon.map((saloon) => (
                      <TableRow key={saloon.saloonName}>
                        <TableCell/>
                        <TableCell component="th" scope="row"sx={{textDecoration: "underline",color:"rgba(42, 60, 80,0.9)" }} onClick={()=>{navigate(`/saloonImage?id=${saloon._id}`)}} >
                          {saloon.saloonName}
                        </TableCell>
                        <TableCell align="right">
                          <Button  size="small" sx={{color:"#FDFDF8", backgroundColor:"#F29C13", fontWeight:"bold" }} onClick={()=>onDeleteSaloon(saloon._id,row._id)}>
                            Sil
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
  
      </>
    );
  }
  