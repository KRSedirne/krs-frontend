import axios from "axios";
import { BaseUrl } from "../constant";



export const getLockers = async () => {
  try {
    const token = localStorage.getItem("authToken");
    console.log("Token gönderiliyor:", token); // Debug
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
    alert(error.response?.data?.message || "Failed to reserve locker. Please try again.");
  }
};

  