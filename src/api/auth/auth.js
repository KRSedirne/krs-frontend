import axios from "axios";
import { BaseUrl } from "../constant";

export const login = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/login`, data);
        const token = response.data.token;
        localStorage.setItem('authToken', token);
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