import axios from "axios";
import { BaseUrl } from "../constant";

export const getAllReservations = async () => {
    try {
        const response = await axios.get(`${BaseUrl}/reservations`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getReservation = async () => {
    try {
        const response = await axios.get(`${BaseUrl}/reservation/:id`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

