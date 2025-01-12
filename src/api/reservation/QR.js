import axios from "axios";
import { BaseUrl } from "../constant";


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

export const adminCheckInReservation = async (qrCode) => {
  try {
    const token = localStorage.getItem("authToken");
      const response = await axios.post(`${BaseUrl}/admin/checkqr`, { qrCode },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { userId } = response.data;
      console.log("Kullanıcı ID'si:", userId);

      if (userId) {
          const additionalResponse = await axios.get(`${BaseUrl}/admin/user/${userId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },} );

          // Ekstra yanıtı işleyin
          console.log("Ekstra veri alındı:", additionalResponse.data);
          return additionalResponse.data;
      }
  } catch (error) {
      console.error("Giriş işlemi sırasında hata oluştu:", error.response?.data || error.message);
  }
};