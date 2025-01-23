import axios from "axios";
import { UpUrl } from "../constant";


export const adminCreateLocker = async (lockerNumber) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${UpUrl}/locker/create`, { lockerNumber }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      console.error("Failed to add locker:", error);
    }
  };
  export const adminReserveLocker = async (lockerId, userEmail) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("User email:",userEmail)
  
      const response = await axios.put(
        `${UpUrl}/locker/reservation/${lockerId}`,
        { email: userEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Locker reserved:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to reserve locker:", error.response ? error.response.data : error);
    }
  };
  
  export const adminCancelLockerReservation = async (lockerId ) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(`${UpUrl}/locker/reservation/cancel/${lockerId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to find:", error);
    }
  };

  export const adminGetLockerByEmail = async (email) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token);
      const response = await axios.post(`${UpUrl}/locker/email`, {email}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const secondResponse=response.data;
      return secondResponse.response;
    } catch (error) {
      console.error("Failed to find locker:", error);
    }
  };
  
  export const adminExpandedLockerTime = async (lockerId ) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(`${UpUrl}/locker/update/${lockerId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to expand locker date:", error);
    }
  };
  export const adminDeleteLocker=async(lockerId)=>{
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${UpUrl}/locker/delete/${lockerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to delete locker:", error);
    }
  }
  
  