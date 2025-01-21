import axios from "axios";
import { BaseUrl } from "../constant";

export const getProfile = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BaseUrl}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updatePassword = async (data) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.put(`${BaseUrl}/user/password/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const adminGetUser = async (userId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BaseUrl}/admin/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}