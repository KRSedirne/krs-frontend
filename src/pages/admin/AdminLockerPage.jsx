import { Box, Button, IconButton, Pagination, Typography } from "@mui/material";
import Locker from "../../components/admin/adminLocker/Locker";
import { useEffect, useState } from "react";
import LockerDialog from "../../components/admin/adminLocker/LockerDialog";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import Card from "../../components/admin/adminLocker/Card";
import NewLockerDialog from "../../components/admin/adminLocker/NewLockerDialog";
import LockerReservationDialog from "../../components/admin/adminLocker/LockerReservationDialog";
import { adminGetUser } from "../../api/user/profile";
import { adminCreateLocker,adminReserveLocker,adminCancelLockerReservation,adminExpandedLockerTime, adminDeleteLocker, adminGetLockerByEmail } from "../../api/admin/adminLocker";
import { getLockers } from "../../api/locker/locker";
import { Delete } from "@mui/icons-material";
import LockerDeleteDialog from "../../components/admin/adminLocker/LockerDeleteDialog";
import toast from "react-hot-toast";


export default function LockerPageAdmin() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [lockersData, setLockersData] = useState([]);
  const [isNewLockerDialogOpen, setIsNewLockerDialogOpen] = useState(false);
  const [isLockerDeleteDialogOpen,setIsLockerDeleteDialogOpen]=useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [isLockerNewReservaitonDialogOpen, setLockerNewReservationDialogOpen] = useState(false);
  const [newLockerNumber, setNewLockerNumber] = useState(null);
  const [lockerNumbers, setLockerNumbers] = useState([]);
  const token = localStorage.getItem("authToken");
  const [email, setEmail] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
 


 
  const itemsPerPage =38;



  useEffect(() => {
    if (!token) {
      toast("Lütfen giriş yapınız.");
      navigate("/login");
    }
  }, [token, navigate]);
  const fetchLockersData = async () => {
    try {
      const data = await getLockers();
      setLockersData(data.response);

      if (data.response && data.response.length > 0) {
        setLockerNumbers(data.response.map((locker) => locker.lockerNumber));
      } else {
        setLockerNumbers([]); 
      }
    } catch (error) {
      console.error("Locker data couldn't be reached:", error);
      toast.error("Dolaplar yüklenemedi");
    }
  };

  useEffect(() => {
    
    fetchLockersData();
  }, []); 

  const fetchEmail = async (userId) => {
    try {
      const userData = await adminGetUser(userId);
        setEmail(userData.data.email); 
    } catch (error) {
      setEmail(null); 
    }
  };
  useEffect(() => {
    if (selectedLocker && selectedLocker.user) {
      fetchEmail(selectedLocker.user); 
    }
  }, [selectedLocker]);
  
  const sortedArray = Array.isArray(lockersData)
    ? lockersData.sort((a, b) => a.lockerNumber - b.lockerNumber)
    : [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentLockers = sortedArray.slice(startIndex, startIndex + itemsPerPage);

  

  const showModalNewLockerReservation = (lockerNumber) => {
    const locker = lockersData.find((locker) => locker.lockerNumber === lockerNumber);
    if (locker) {
      setSelectedLocker(locker);
      setLockerNewReservationDialogOpen(true);
    } else {
      console.error("Locker not found for lockerNumber:", lockerNumber);
    }
  };
  const showModalockerReservation = (lockerNumber) => {
    const locker = lockersData.find((locker) => locker.lockerNumber === lockerNumber);
    if (locker) {
      setSelectedLocker(locker);
      setOpen(true);
    } else {
      console.error("Locker not found for lockerNumber:", lockerNumber);
    }
  };
  const showModalSearch = () => {
      setIsSearchDialogOpen(true);
   
  };
  
  const showModalDeleteLocker = (lockerNumber) => {
    const locker = lockersData.find((locker) => locker.lockerNumber === lockerNumber);
    if (locker) {
      setSelectedLocker(locker);
      setIsLockerDeleteDialogOpen(true);
    } else {
      console.error("Locker not found for lockerNumber:", lockerNumber);
    }
  };


  const openNewLockerDialog = () => {
    setIsNewLockerDialogOpen(true);
  };

  const closeNewLockerDialog = () => {
    setIsNewLockerDialogOpen(false);
  };

  const closeSearchDialog = () => {
    setIsSearchDialogOpen(false);
  };

  const closeLockerDeleteDialog = () => {
    setIsLockerDeleteDialogOpen(false);
  };

  const closeLokerReservationDialog = () => {
    setLockerNewReservationDialogOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePageChange = (event,value) => {
    setCurrentPage(value);
  };
  

  const handleClosebySubmitReservation = async (userEmail) => {
    try {
      const id = selectedLocker._id;
      await adminReserveLocker(id, userEmail);

      const data = await getLockers();
      setLockersData(data.response);
      setLockerNewReservationDialogOpen(false);
      toast.success(`${userEmail} emailine  ${selectedLocker.lockerNumber} numaralı dolap atanmıştır.`)
    } catch (error) {
      toast.error("Dolap rezerve edilemedi. Lütfen tekrar deneyiniz.");
    }
  };
  const handleClosebySubmitSearch = async (email) => {
    try {
      const locker=await adminGetLockerByEmail(email);
      if(locker)
      toast(`${email}'e sahip kullanıcıya ${locker.lockerNumber} numaralı dolap atanmıştır.`);
else{
  toast('Kullanıcıya atanmış dolap bulunamadı');
}
      setIsSearchDialogOpen(false);
    } catch (error) {
      toast.error("Dolap rezerve edilemedi. Lütfen tekrar deneyiniz.");
    }
  };


  const handleNewLockerNumber = (number) => {
    setNewLockerNumber(number);
    closeNewLockerDialog();
  };

  const handleCreateNewLocker = async (newLockerNumber) => {
    try {
      if (!newLockerNumber) {
        toast("Lütfen geçerli bir dolap numarası girin.");
        return;
      }

      const response = await adminCreateLocker(Number(newLockerNumber));

      if (response) {
        toast.success("Dolap başarıyla oluşturuldu!");
        setLockerNumbers((prev) => [...prev, newLockerNumber]);
        const data = await getLockers();
        setLockersData(data.response);
        setIsNewLockerDialogOpen(false);
      }
    } catch (error) {
      console.error("Dolap oluşturulamadı:", error);
      toast.error(error.message || "Dolap oluşturulurken bir hata oluştu.");
    }
  };
  const handleDeleteLocker = async (lockerId) => {
    try {
      const response = await adminDeleteLocker(lockerId);

      if (response) {
        toast.success("Dolap başarıyla silindi!");
        const data = await getLockers();
        setLockersData(data.response);
        setIsLockerDeleteDialogOpen(false); 
      }
    } catch (error) {
      console.error("Dolap silinemedi:", error);
      toast.error(error.message || "Dolap silerken bir hata oluştu.");
    }
  };


  const handleCancel = async (lockerId) => {
    try {
      const result = await adminCancelLockerReservation(lockerId);
      const data = await getLockers();
      setLockersData(data.response);
      toast.success("Rezervasyon başarıyla iptal edildi!");
      setOpen(false);
    } catch (error) {
      toast.error("Rezervasyon iptal edilemedi.");
    }
  };
  
  const handleExpand = async (lockerId) => {
    try {
      const result = await adminExpandedLockerTime(lockerId);

      const data = await getLockers();
      setLockersData(data.response);
      toast.success("Dolap rezervasyonunun sürersi başarıyla uzatıldı!");
      setOpen(false);

    } catch (error) {
      toast.error("Dolap rezervasyounun süresi uzatılamadı.");
    }
  };
  
  
  const lockers = currentLockers.map((locker) => (
  <Grid
    item
    xs={6} 
    sm={4}
    md={3}
    key={locker.lockerNumber}
    sx={{
      display: "flex",
      flexDirection: "column",
     
    }}
  >
    <Locker
      onClick={
        locker.isBooked
          ? () => showModalockerReservation(locker.lockerNumber)
          : () => showModalNewLockerReservation(locker.lockerNumber)
      }
      isBooked={locker.isBooked}
      lockerNum={locker.lockerNumber}
      width={50}
      height={75}
      fontSize={35}
    />
    {!locker.isBooked && (
      <IconButton
        onClick={()=>showModalDeleteLocker(locker.lockerNumber)}
        aria-label="delete"
        size="small"
        sx={{ color: "rgb(42, 60, 80,0.8)" }}
      >
        <Delete />
      </IconButton>
    )}
  </Grid>
));


  return (
    <Card sx={{ height: "83vh", display: "flex", flexDirection: "column", backgroundColor:"#FDFDF8" }}>
      <LockerDialog
  handleClose={handleClose}
  expaireDate={selectedLocker ? selectedLocker.updatedAt : null} 
  handleCancel={() => {
    if (selectedLocker) handleCancel(selectedLocker._id);
  }}
  open={open}
  handleExpand={() => {
    if (selectedLocker) handleExpand(selectedLocker._id);
  }}
  email={email}
  locker={selectedLocker}
/>
      <NewLockerDialog
        handleClose={closeNewLockerDialog}
        handleNewLockerNumber={handleNewLockerNumber}
        open={isNewLockerDialogOpen}
        existingLockers={lockerNumbers}
        onCreateNewLocker={handleCreateNewLocker}
     
      />
      <LockerDeleteDialog
        handleClose={closeLockerDeleteDialog}
        open={isLockerDeleteDialogOpen}
        lockerNumber={
          selectedLocker?selectedLocker.lockerNumber:""
        }
        handleSubmit={() => {
          if (selectedLocker) handleDeleteLocker(selectedLocker._id);
        }}
     
      />
      <LockerReservationDialog
        handleClose={closeLokerReservationDialog}
        handleClosebySubmit={handleClosebySubmitReservation}
        open={isLockerNewReservaitonDialogOpen}
        expaireDate={Date.now()} 
        dialogTitle={"DOLAP REZERVE ET"}
        dialogText={"Rezervasyonu atamak istediğiniz kişinin emailini giriniz..."}
      />
      <LockerReservationDialog
        handleClose={closeSearchDialog}
        handleClosebySubmit={handleClosebySubmitSearch}
        open={isSearchDialogOpen}
        dialogTitle={"DOLAP Numarası Bulma"}
        dialogText={"Rezervasyonu aramak istediğiniz kişinin emailini giriniz..."}
      />
      <Card sx={{ height: "90%", flexGrow: 1, justifyContent: "center", display: "flex", flexDirection: "column", backgroundColor:"#FDFDF8" }}>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {lockers}
          <Locker
            isDisabled={false}
            isBooked={"new"}
            width={50}
            height={75}
            onClick={openNewLockerDialog}
            existingLockers={lockerNumbers} 
          />
        </Grid>
        <Pagination
        count={Math.ceil(lockersData.length / itemsPerPage)} // Toplam sayfa sayısı
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
        <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "rgb(42, 60, 80,0.2)", padding: "2px", marginTop: "auto", alignItems: "center", border: "3px solid rgb(42, 60, 80,0.4)" }}>
          <Button
          sx={{
            backgroundColor:"rgb(42, 60, 80)",
            color:"#FDFDF8"
          }}
          onClick={showModalSearch}
          >Email ile Arama</Button>
          <Typography 
          sx={{
            color:"#5D4038",
            fontWeight:"bold"
          }}
          variant="body2">Lütfen kiralamak istediğiniz dolabı seçiniz.</Typography>
          <div style={ {"display":"flex"}}>
          <div style={ {"padding":"0 5px"}}>
          <Locker isDisabled={true} onClick={null} isBooked={false} lockerNum={undefined} width={25} height={45} fontsize={13.5} />
          <Typography 
          sx={{
            color:"#5D4038"
          }}
          variant="body2">Müsait</Typography>
          </div>
          <div>
          <Locker isDisabled={true} onClick={null} isBooked={true} lockerNum={undefined} width={25} height={45} fontsize={13.5} />
          <Typography 
          sx={{
            color:"#5D4038"
          }}
          variant="body2">Dolu</Typography>
          </div>
          </div>
        </Box>
      </Card>
    </Card>
  );
}
