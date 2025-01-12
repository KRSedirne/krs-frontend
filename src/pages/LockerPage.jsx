import { Box, Typography } from "@mui/material";
import Locker from "../components/locker/Locker";
import { useEffect, useState, useMemo } from "react";
import LockerDialog from "../components/locker/LockerDialog";
import Grid from "@mui/material/Grid2";

import { getLockers, reserveLocker } from "../api/locker/locker";
import { useNavigate } from "react-router-dom";
import Card from "../components/locker/Card";

export default function LockerPage() {
  

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [lockersData, setLockersData] = useState([]);
  const token = localStorage.getItem("authToken");

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
        console.log("Fetched lockers data:", data.response); // Log data to check format

        setLockersData(data.response);
      } catch (error) {
        console.error("Locker data couldn't be reached:", error);
        alert(error.message || "Failed to load locker data. Please try again.");
      }
    };
    fetchLockersData();
  }, []);

  
 
  const sortedArray = Array.isArray(lockersData) ? lockersData.sort((a, b) => a.lockerNumber - b.lockerNumber) : [];
  let lockers = sortedArray.map((locker) => (
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
    <Card 
    sx={{ 
        height: "90vh", 
        display: "flex", 
        flexDirection: "column" 
    }}
>
    <LockerDialog
        handleClose={handleClose}
        handleClosebySubmit={handleClosebySubmit}
        expaireDate={Date.now()}
        open={open}
    />

    {/* Grid bileşeninin içeriğini dikeyde ortalamak için justifyContent kullanıldı */}
    <Card 
        sx={{ 
            height: "90%", 
            flexGrow: 1, 
            justifyContent: "space-between", /* Dikeyde boşluk bırakma */
            display: "flex",  
            flexDirection: "column" /* Tekrar flexDirection eklendi */
        }}
    >
        <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
        >
            {lockers}
           

        </Grid>

        {/* Box bileşenini sayfanın altına itmek için marginTop: auto eklendi */}
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                backgroundColor: "rgba(22, 22, 22, 0.14)",
                padding: "2px",
                marginTop: "auto",
                alignItems:"center" ,
                border:"3px black" 
            }}
        >
          <Typography variant="body2">Lütfen kiralamak istediğiniz dolabı seçiniz.</Typography>
          
            <Locker
                isDisabled={true}
                onClick={null}
                isBooked={false}
                lockerNum={undefined}
                width={25}
                height={45}
                fontsize={13.5}
            />
            <Typography variant="body2">Müsait</Typography>

            <Locker
                isDisabled={true}
                onClick={null}
                isBooked={true}
                lockerNum={undefined}
                width={25}
                height={45}
                fontsize={13.5}
            />
            <Typography variant="body2">Dolu</Typography>
        </Box>
    </Card>
</Card>

  );
}
