import axios from "axios";
import { BaseUrl } from "../constant";
import toast from "react-hot-toast";

export const login = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/login`, data);
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const register = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/register`, data);
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logout = async (data) => {
    try {
        const token = localStorage.getItem('authToken'); 
        if (!token) {
            throw new Error("Token bulunamadı.");
        }

        const response = await axios.post(`${BaseUrl}/logout`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        localStorage.removeItem('authToken');

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Logout sırasında hata:", error.message);
        throw error;
    }
};

export const forgetPassword = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/password/forget`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const newPasswordSetting = async (userId, newPassword) => {
    try {
      const response = await fetch(`${BaseUrl}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newPassword }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data; // Başarılı yanıtı döndür
      } else {
        throw new Error(data.message || 'An unknown error occurred.');
      }
    } catch (error) {
      console.error('API Error:', error);
      throw error; 
    }
  };