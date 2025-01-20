import axios from "axios";
import { BaseUrl } from "../constant.js";

export const adminGetAllSuspendeds = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BaseUrl}/admin/suspendeds`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("api:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const adminDeleteSuspended = async (id) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(`${BaseUrl}/admin/suspended/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}