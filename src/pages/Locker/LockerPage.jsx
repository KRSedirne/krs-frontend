import { Alert, Box, Pagination, Typography } from "@mui/material";
import Locker from "../../components/locker/Locker";
import { useEffect, useState } from "react";
import LockerDialog from "../../components/locker/LockerDialog";
import Grid from "@mui/material/Grid2";

import { getLockers, reserveLocker } from "../../api/locker/locker";
import { useNavigate } from "react-router-dom";
import Card from "../../components/locker/Card";

export default function LockerPage() {
  
  

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [lockersData, setLockersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("authToken");
  const itemsPerPage =52;

  useEffect(() => {
    if (!token) {
<Alert variant="outlined" severity="warning">
Lütfen giriş yapınız.
</Alert> 
     navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchLockersData = async () => {
      try {
        const data = await getLockers();
        console.log("Fetched lockers data:", data.response); // Log data to check format

        setLockersData(data.response);
      } catch (error) {
        console.error("Locker data couldn't be reached:", error);
        alert(error.message || "Failed to load locker data. Please try again.");
      }
    };
    fetchLockersData();
  }, []);
  const handlePageChange = (event,value) => {
    setCurrentPage(value);
  };
  

  
 
  const sortedArray = Array.isArray(lockersData) ? lockersData.sort((a, b) => a.lockerNumber - b.lockerNumber) : [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLockers = sortedArray.slice(startIndex, startIndex + itemsPerPage);


  let lockers = currentLockers.map((locker) => (
    <Grid item xs={2} sm={4} md={4} key={locker.lockerNumber}>
      <Locker
        isDisabled={locker.isBooked}
        onClick={() => showModal(locker.lockerNumber)}
        isBooked={locker.isBooked}
        lockerNum={locker.lockerNumber}
        width={50}
        height={75}
        fontSize={35}
      />
    </Grid>
  ));
  //sil
  lockersData.forEach((locker) => {
    console.log("lockerNum:", locker.lockerNumber);
  });
  console.log("lockersData:", lockersData);
  const showModal = (lockerNumber) => {
    const locker = lockersData.find((locker) => locker.lockerNumber === lockerNumber);
    if (locker) {
      setSelectedLocker(locker);
      setOpen(true);
      console.log("Selected Locker:", locker);
    } else {
      console.error("Locker not found for lockerNumber:", lockerNumber);
    }
  };
  

  const handleClosebySubmit = async () => {
    try {
      
      const id=selectedLocker._id
      await reserveLocker(id);
      
      // setLockersData((prevLockers) =>
      //   prevLockers.map((locker) =>
      //     locker.lockerNumber === selectedLocker.lockerNumber
      //       ? { ...locker, isBooked: true, user: userId }
      //       : locker
      //   ));
      const data = await getLockers();
      setLockersData(data.response);
      
      setOpen(false);
    } catch (error) {
      console.error("Failed to reserve locker:", error);
      alert(error.message || "Failed to reserve locker. Please try again.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  return (
      <Card sx={{ height: "83vh", display: "flex", flexDirection: "column", backgroundColor:"#FDFDF8" }}>
        <LockerDialog
        handleClose={handleClose}
        handleClosebySubmit={handleClosebySubmit}
        expaireDate={Date.now()}
        open={open}
    />
        <Card sx={{ height: "90%", flexGrow: 1, justifyContent: "center", display: "flex", flexDirection: "column", backgroundColor:"#FDFDF8" }}>
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {lockers}
            
          </Grid>
          <div style={{padding:"10px 0 0 0"}}>
          <Pagination
          count={Math.ceil(lockersData.length / itemsPerPage)} // Toplam sayfa sayısı
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
        </div>
          <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "rgb(42, 60, 80,0.2)", padding: "2px", marginTop: "auto", alignItems: "center", border: "3px solid rgb(42, 60, 80,0.4)" }}>
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
