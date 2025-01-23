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

export const getCurrentSeatReservation = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BaseUrl}/reservation/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createReservation = async (data) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${BaseUrl}/reservation/create`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const cancelReservation = async (id) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(`${BaseUrl}/reservation/cancel/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createOutreason = async (id, data) => {
    try {
        console.log("outreason ID: ", id);
        console.log("outreason data: ", data);
        const token = localStorage.getItem('authToken');
        const response = await axios.put(`${BaseUrl}/reservation/outreason/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const remainReservation = async (id, time) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.put(`${BaseUrl}/reservation/remain/${id}`, time, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}