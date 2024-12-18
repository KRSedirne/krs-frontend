import axios from "axios";
import { BaseUrl } from "../constant";

export const getReservation = async () => {
    try {
        const response = await axios.get(`${BaseUrl}/reservation/:id`);
        return response.data;
    } catch (error) {
        throw error;
    }
}