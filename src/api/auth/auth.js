import axios from "axios";
import { BaseUrl } from "../constant";

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
