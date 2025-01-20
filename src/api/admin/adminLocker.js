import axios from "axios";
import { UpUrl } from "../constant";
import toast from "react-hot-toast";


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
      alert(error.response?.data?.message || "Failed to add locker. Please try again.");
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
      toast.success(response.data.message || "Locker reserved successfully!");
      return response.data;
    } catch (error) {
      console.error("Failed to reserve locker:", error.response ? error.response.data : error);
      toast.error(error.response?.data?.message || "Failed to reserve locker. Please try again.");
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

  export const adminGetLockerByEmail = async (email ) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token);
      const response = await axios.get(`${UpUrl}/locker/reservation/email`, {email}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to find locker:", error);
      alert(error.response?.data?.message || "Failed to find locker. Please try again.");
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
      alert(error.response?.data?.message || "Failed to expand lockerdate. Please try again.");
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
      alert(error.response?.data?.message || "Failed to delete locker. Please try again.");
    }
  }
  
  