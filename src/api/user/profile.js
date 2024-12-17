import axios from "axios";
import { BaseUrl } from "../constant";

export const getProfile = async () => {
    try {
        const response = await axios.get(`${BaseUrl}/user/profile`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updatePassword = async (data) => {
    try {
        const response = await axios.put(`${BaseUrl}/user/password/update`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}