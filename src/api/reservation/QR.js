import axios from "axios";
import { BaseUrl } from "../constant";
import toast from "react-hot-toast";


export const getQRCode = async () => {
  try {
    const token = localStorage.getItem("authToken");
    console.log("Token gönderiliyor:", token); // Debug
    const response = await axios.get(`${BaseUrl}/reservation/qrcode`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Axios Error:", error.response || error.message);
    toast.error("Rezervasyon bulunamadı.")
    throw error.response?.data || { message: "An error occurred." };
  }
};
export const getUserbyQR= async (qrcode)=>{
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${BaseUrl}/admin/checkqr`, qrcode,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to reserve locker:", error);
    alert(error.response?.data?.message || "Failed to reserve locker. Please try again.");
  }
}