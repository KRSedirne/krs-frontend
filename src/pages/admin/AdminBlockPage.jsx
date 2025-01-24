import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { adminDeleteBlock, adminDeleteSaloon, adminGetAllBlocks, adminGetBlock, adminGetSaloon } from '../../api/admin/adminBlock';
import DeleteDialog from '../../components/admin/adminBlock/DeleteDialog';
import toast from 'react-hot-toast';
import AdminCreateBlockModal from '../../components/admin/adminModals/AdminCreateBlockModal';
import AdminCreateSaloonModal from '../../components/admin/adminModals/AdminCreateSaloonModal';
import Row from '../../components/admin/adminBlock/Row';





export default function AdminBlockPage() {

  const [data, setData] = useState([]);
  const [isShowAdminCreateBlockModal, setIsShowAdminCreateBlockModal] = useState(false);
  const [isCreatedBlockSubmitted, setIsCreatedBlockSubmitted] = useState(false);
  const [isDeleteBlockDialogOpen, setIsDeleteBlockDialogOpen] = useState(false);
  const [isDeleteSaloonDialogOpen, setIsDeleteSaloonDialogOpen]=useState(false);
  const [isShowAdminCreateSaloonModal, setIsShowAdminCreateSaloonModal] = useState(false);
  const [isCreatedSaloonSubmitted, setIsCreatedSaloonSubmitted] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedSaloon,setSelectedSaloon]=useState(null);

  const fetchData = async () => {
    try {
      const response = await adminGetAllBlocks();
      setData(response.blocks);
    } catch (error) {
      toast.error("Yüklenilemedi.")
    }
  };

  useEffect(() => {
    fetchData();
    if (isCreatedBlockSubmitted) {
      setIsCreatedBlockSubmitted(false);
    }
    if (isCreatedSaloonSubmitted) {
      setIsCreatedSaloonSubmitted(false);
    }
  }, [isCreatedBlockSubmitted,isCreatedSaloonSubmitted]);

  const handleCloseDeleteBlock = () => {
    setIsDeleteBlockDialogOpen(false);
  }
  const handleCloseDeleteSaloon=()=>{
    setIsDeleteSaloonDialogOpen(false);
  }
  const handleSubmitDeleteBlock = async (blockId) => {
    try {
 
      const response = await adminDeleteBlock(blockId);

      if (response) {
        toast.success("Block başarıyla silindi!");
        setIsDeleteBlockDialogOpen(false);
        await fetchData();
      }
    } catch (error) {
      console.error("Silme işlemi başarısız:", error);
      toast.error("Blok silerken bir hata oluştu.");
    }
  };
  const handleSubmitDeleteSaloon = async (saloonId,blockId) => {
    try {
      const response = await adminDeleteSaloon(saloonId,blockId);
      if (response) {
        toast.success("Saloon başarıyla silindi!");
        setIsDeleteSaloonDialogOpen(false);
        await fetchData();
      }
    } catch (error) {
      toast.error( "Salon silerken bir hata oluştu.");
    }
  };
 
  const showModalDeleteBlock = async (blockId) => {
    const block = await adminGetBlock(blockId);
    setSelectedBlock(block.block);
    if (block) {
      setIsDeleteBlockDialogOpen(true);
    } else {
      console.error("Block not found");
    }
  };
  const showModalDeleteSaloon=async (saloonId,blockId)=>{
    const response=await adminGetSaloon(saloonId,blockId);
    setSelectedBlock(response.block);
    setSelectedSaloon(response.saloon);
    if(response){
      setIsDeleteSaloonDialogOpen(true);
    }
  }

  const showModalCreateSaloon=async(blockId)=>{
    const block = await adminGetBlock(blockId);
    setSelectedBlock(block.block);
    if (block) {
      setIsShowAdminCreateSaloonModal(true);
    } else {
      console.error("Block not found");
    }
  };
  

  return (<div>
    {isDeleteBlockDialogOpen && selectedBlock &&
      (<DeleteDialog
        handleClose={handleCloseDeleteBlock}
        handleSubmit={() => handleSubmitDeleteBlock(selectedBlock._id)}
        open={isDeleteBlockDialogOpen}
        title={"BLOK SİL"}
        backgroundColor={"#5D4038"}
        text={`${selectedBlock.name} adlı blok silinecektir.`}
      />)
    }
    {isDeleteSaloonDialogOpen && selectedSaloon&&selectedBlock&&
      (<DeleteDialog
        handleClose={handleCloseDeleteSaloon}
        handleSubmit={() => handleSubmitDeleteSaloon(selectedSaloon._id,selectedBlock._id)}
        open={isDeleteSaloonDialogOpen}
        backgroundColor={"#F29C13"}
        title={"SALON SİL"}
        text={`${selectedSaloon.saloonName} adlı salon silinecektir.`}
      />)
    }
    {isShowAdminCreateBlockModal && (
      <AdminCreateBlockModal setIsShowAdminCreateBlockModal={setIsShowAdminCreateBlockModal}
        setIsCreatedBlockSubmitted={setIsCreatedBlockSubmitted} />
    )}
    {isShowAdminCreateSaloonModal && selectedBlock&& (
      <AdminCreateSaloonModal
        setIsShowAdminCreateSaloonModal={setIsShowAdminCreateSaloonModal}
        setIsCreatedSaloonSubmitted={setIsCreatedSaloonSubmitted}
        blockId={selectedBlock._id}
      />
    )}
    <TableContainer 
    component={Paper}
    sx={{
      height: '95vh', width: '100%' ,backgroundColor:"#FDFDF8",
    }}
    >
      <Table aria-label="collapsible table"
      >
        <TableHead>
        <TableRow>
        <TableCell>
          <Typography variant='h5'sx={{color:"#6587AD", fontWeight:"bold"}}>BLOKLAR</Typography>
         </TableCell>
        </TableRow>
          <TableRow>
            <TableCell >
              <Button variant="outlined" size="small" 
              onClick={() => setIsShowAdminCreateBlockModal(true)}
                sx={
                  { backgroundColor:"rgb(42, 60, 80)",
                    color:"#FDFDF8",
                  border:"2px solid #FDFDF8",
                  fontWeight:"Bold"
                  }
                }
              >
              EKLE
              </Button></TableCell>
            <TableCell align="left" sx={{color:"rgb(42, 60, 80)",fontWeight:"bold"}}>BLOK ADI</TableCell>
            <TableCell align="right" sx={{color:"rgb(42, 60, 80)",fontWeight:"bold"}}>BLOK SİL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <Row key={row.name} row={row} onDelete={() => showModalDeleteBlock(row._id)}
            addSaloonModal={() => showModalCreateSaloon(row._id)}
            onDeleteSaloon={showModalDeleteSaloon}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
}
/*}*/