import axios from "axios";
import { UpUrl } from "../constant.js";

export const adminGetAllSuspendeds = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${UpUrl}/suspendeds`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}