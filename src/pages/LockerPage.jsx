import { Box } from "@mui/material";
import Locker from "../components/locker/Locker";
import { useEffect, useState, useMemo } from "react";
import LockerDialog from "../components/locker/LockerDialog";
import Grid from "@mui/material/Grid2";

import { getLockers, reserveLocker } from "../api/locker/locker";
import { useNavigate } from "react-router-dom";

export default function LockerPage() {
  const boxsx = {
    border: "2px solid #ddd", // Çerçeve
    borderRadius: "5px", // Köşe yuvarlama
    padding: "16px", // İçerik boşluğu
    backgroundColor: "#f2f2f2", // Arka plan rengi
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Hafif gölge
    alignItems: "center",
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [lockersData, setLockersData] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      alert("Please log in to access lockers.");
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
    <>
      <LockerDialog
        handleClose={handleClose}
        handleClosebySubmit={handleClosebySubmit}
        expaireDate={"01/01/2025"}
        open={open}
      />
      <Box sx={{ flexGrow: 1, ...boxsx }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {lockers}
        </Grid>
      </Box>
    </>
  );
}
