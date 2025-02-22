import axios from "axios";
import { UpUrl } from "../constant";

export const adminCheckInReservation = async (qrCode) => {
    try {
      const token = localStorage.getItem("authToken");
        const response = await axios.post(`${UpUrl}/checkqr`, { qrCode },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const { userId } = response.data;
  
        if (userId) {
            const additionalResponse = await axios.get(`${UpUrl}/user/${userId}`,{
              headers: {
                Authorization: `Bearer ${token}`,
              },} );
  
            // Ekstra yanıtı işleyin
            return additionalResponse.data;
        }
    } catch (error) {
        console.error("Giriş işlemi sırasında hata oluştu:", error.response?.data || error.message);
    }
  };
  export const adminCheckInReservationManually = async (email) => {
    try {
      const token = localStorage.getItem("authToken");
        const response = await axios.put(`${UpUrl}/checkqr/manuel`, { email },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const { userId } = response.data;  
        if (userId) {
            const additionalResponse = await axios.get(`${UpUrl}/user/${userId}`,{
              headers: {
                Authorization: `Bearer ${token}`,
              },} );
  
            // Ekstra yanıtı işleyin
            return additionalResponse.data;
        }
    } catch (error) {
        console.error("Giriş işlemi sırasında hata oluştu:", error.response?.data || error.message);
    }
  };