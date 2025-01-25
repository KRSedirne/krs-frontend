import axios from "axios";
import { BaseUrl, UpUrl } from "../constant";
import toast from "react-hot-toast";



export const getLockers = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${BaseUrl}/lockers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error.response || error.message);
    throw error.response?.data || { message: "An error occurred." };
  }
};

export const reserveLocker = async (lockerId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(`${BaseUrl}/locker/reservation/${lockerId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to reserve locker:", error);
    toast.error("Dolap rezerve edilemedi.");
  }
};
export const getCurrentLockerReservation = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BaseUrl}/locker/reservation/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}



  