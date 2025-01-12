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

export const adminCreateLocker = async (lockerNumber) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${BaseUrl}/admin/locker/create`, { lockerNumber }, {
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

    const response = await axios.put(
      `${BaseUrl}/admin/locker/reservation/${lockerId}`,
      { email: userEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Locker reserved:", response.data);
    alert(response.data.message || "Locker reserved successfully!");
    return response.data;
  } catch (error) {
    console.error("Failed to reserve locker:", error.response ? error.response.data : error);
    alert(error.response?.data?.message || "Failed to reserve locker. Please try again.");
  }
};

export const adminCancelLockerReservation = async (lockerId ) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(`${BaseUrl}/admin/locker/reservation/cancel/${lockerId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to cancel locker:", error);
    alert(error.response?.data?.message || "Failed to cancel locker. Please try again.");
  }
};

export const expandedLocker = async (lockerId ) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(`${BaseUrl}/admin/locker/update/${lockerId}`, {}, {
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


  