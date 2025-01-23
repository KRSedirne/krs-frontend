import axios from "axios";
import { BaseUrl } from "./constant.js";

export const getAllSeats = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BaseUrl}/seats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSeatsBySaloonId = async (saloonId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BaseUrl}/seats/saloon/${saloonId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}