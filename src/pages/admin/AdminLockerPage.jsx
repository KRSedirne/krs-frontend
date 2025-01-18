import { Box, Button, IconButton, Typography } from "@mui/material";
import Locker from "../../components/admin/adminLocker/Locker";
import { useEffect, useState } from "react";
import LockerDialog from "../../components/admin/adminLocker/LockerDialog";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import Card from "../../components/admin/adminLocker/Card";
import NewLockerDialog from "../../components/admin/adminLocker/NewLockerDialog";
import LockerReservationDialog from "../../components/admin/adminLocker/LockerReservationDialog";
import { getUserAdmin } from "../../api/user/profile";
import { adminCreateLocker,adminReserveLocker,adminCancelLockerReservation,adminExpandedLockerTime, adminDeleteLocker } from "../../api/admin/adminLocker";
import { getLockers } from "../../api/locker/locker";
import { Delete } from "@mui/icons-material";
import LockerDeleteDialog from "../../components/admin/adminLocker/LockerDeleteDialog";


export default function LockerPageAdmin() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [lockersData, setLockersData] = useState([]);
  const [isNewLockerDialogOpen, setIsNewLockerDialogOpen] = useState(false);
  const [isLockerDeleteDialogOpen,setIsLockerDeleteDialogOpen]=useState(false);
  const [isLockerNewReservaitonDialogOpen, setLockerNewReservationDialogOpen] = useState(false);
  const [newLockerNumber, setNewLockerNumber] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [lockerNumbers, setLockerNumbers] = useState([]); // lockerNumbers state
  const token = localStorage.getItem("authToken");
  const [email, setEmail] = useState(null); // New state for storing email


  useEffect(() => {
    if (!token) {
      alert("Lütfen giriş yapınız.");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchLockersData = async () => {
      try {
        const data = await getLockers();
        console.log("Fetched lockers data:", data.response);
        setLockersData(data.response);

        // Doğru şekilde lockerNumbers'ı güncelleme
        if (data.response && data.response.length > 0) {
          setLockerNumbers(data.response.map((locker) => locker.lockerNumber));
        } else {
          setLockerNumbers([]); // Boş bir liste
        }
      } catch (error) {
        console.error("Locker data couldn't be reached:", error);
        alert(error.message || "Failed to load locker data. Please try again.");
      }
    };
    fetchLockersData();
  }, []); // Yalnızca component mount olduğunda çalışacak

  const fetchEmail = async (userId) => {
    try {
      const userData = await getUserAdmin(userId);
      console.log("User data fetched:", userData);  // Log the full response to check the structure
        setEmail(userData.data.email); // Ensure email exists in the response
    } catch (error) {
      console.error("Error fetching user info:", error);
      setEmail(null); // In case of error, set to null
    }
  };
  useEffect(() => {
    if (selectedLocker && selectedLocker.user) {
      fetchEmail(selectedLocker.user); // Only fetch email if _user exists
    } else {
      console.log("No user associated with the selected locker:", selectedLocker);
    }
  }, [selectedLocker]);
  
  const sortedArray = Array.isArray(lockersData)
    ? lockersData.sort((a, b) => a.lockerNumber - b.lockerNumber)
    : [];

  

  const showModal = (lockerNumber) => {
    const locker = lockersData.find((locker) => locker.lockerNumber === lockerNumber);
    if (locker) {
      setSelectedLocker(locker);
      setOpen(true);
    } else {
      console.error("Locker not found for lockerNumber:", lockerNumber);
    }
  };

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

  const closeLockerDeleteDialog = () => {
    setIsLockerDeleteDialogOpen(false);
  };

  const closeLokerReservationDialog = () => {
    setLockerNewReservationDialogOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleClosebySubmit = async () => {
    try {
      const id = selectedLocker._id;
      await adminReserveLocker(id);

      const data = await getLockers();
      setLockersData(data.response);
      setOpen(false);
    } catch (error) {
      console.error("Failed to reserve locker:", error);
      alert(error.message || "Failed to reserve locker. Please try again.");
    }
  };

  const handleClosebySubmitReservation = async (userEmail) => {
    try {
      const id = selectedLocker._id;
      await adminReserveLocker(id, userEmail);

      const data = await getLockers();
      setLockersData(data.response);
      setLockerNewReservationDialogOpen(false);
    } catch (error) {
      console.error("Failed to reserve locker:", error);
      alert(error.message || "Failed to reserve locker. Please try again.");
    }
  };

  const handleNewLockerNumber = (number) => {
    setNewLockerNumber(number);
    closeNewLockerDialog();
  };

  const handleUserEmail = (email) => {
    setUserEmail(email);
    closeLokerReservationDialog();
  };

  const handleCreateNewLocker = async (newLockerNumber) => {
    try {
      if (!newLockerNumber) {
        alert("Lütfen geçerli bir dolap numarası girin.");
        return;
      }

      const response = await adminCreateLocker(Number(newLockerNumber));

      if (response) {
        alert("Dolap başarıyla oluşturuldu!");
        setLockerNumbers((prev) => [...prev, newLockerNumber]);
        const data = await getLockers();
        setLockersData(data.response);
        setIsNewLockerDialogOpen(false); // Yeni dolap numarasını listeye ekle
      }
    } catch (error) {
      console.error("Dolap oluşturulamadı:", error);
      alert(error.message || "Dolap oluşturulurken bir hata oluştu.");
    }
  };
  const handleDeleteLocker = async (lockerId) => {
    try {
      const response = await adminDeleteLocker(lockerId);

      if (response) {
        alert("Dolap başarıyla silindi!");
        const data = await getLockers();
        setLockersData(data.response);
        setIsLockerDeleteDialogOpen(false); 
      }
    } catch (error) {
      console.error("Dolap silinemedi:", error);
      alert(error.message || "Dolap silerken bir hata oluştu.");
    }
  };


  const handleCancel = async (lockerId) => {
    try {
      const result = await adminCancelLockerReservation(lockerId);
      console.log("Rezervasyon iptal edildi:", result);
      const data = await getLockers();
      setLockersData(data.response);
      alert("Rezervasyon başarıyla iptal edildi!");
      setOpen(false);
    } catch (error) {
      console.error("Rezervasyon iptal edilirken hata oluştu:", error);
    }
  };
  
  const handleExpand = async (lockerId) => {
    try {
      const result = await adminExpandedLockerTime(lockerId);
      console.log("Dolap genişletildi:", result);
      const data = await getLockers();
      setLockersData(data.response);
      alert("Dolap başarıyla genişletildi!");
      setOpen(false);

    } catch (error) {
      console.error("Dolap genişletilirken hata oluştu:", error);
    }
  };
  
  
  const lockers = sortedArray.map((locker) => (
  <Grid
    item
    xs={6} // Ekran genişliklerine göre boyutlandırma
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
        sx={{ color: "rgb(28, 85, 123)" }}
      >
        <Delete />
      </IconButton>
    )}
  </Grid>
));


  return (
    <Card sx={{ height: "83vh", display: "flex", flexDirection: "column" }}>
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
        expaireDate={Date.now()} // Passed the correct handler here
      />
      <Card sx={{ height: "90%", flexGrow: 1, justifyContent: "center", display: "flex", flexDirection: "column" }}>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {lockers}
          <Locker
            isDisabled={false}
            isBooked={"new"}
            width={50}
            height={75}
            onClick={openNewLockerDialog}
            existingLockers={lockerNumbers} 
            // Locker component'ine geçiyoruz
          />
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-evenly", backgroundColor: "rgba(22, 22, 22, 0.14)", padding: "2px", marginTop: "auto", alignItems: "center", border: "3px solid rgba(22, 22, 22, 0.41)" }}>
          <Typography variant="body2">Lütfen kiralamak istediğiniz dolabı seçiniz.</Typography>
          <div>
          <Locker isDisabled={true} onClick={null} isBooked={false} lockerNum={undefined} width={25} height={45} fontsize={13.5} />
          <Typography variant="body2">Müsait</Typography>
          </div>
          <div>
          <Locker isDisabled={true} onClick={null} isBooked={true} lockerNum={undefined} width={25} height={45} fontsize={13.5} />
          <Typography variant="body2">Dolu</Typography>
          </div>
        </Box>
      </Card>
    </Card>
  );
}
