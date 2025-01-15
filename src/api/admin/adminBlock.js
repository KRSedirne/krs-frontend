import axios from "axios";
import { UpUrl } from "../constant.js";

export const adminGetAllBlocks = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${UpUrl}/blocks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const adminCreateBlock = async (blockName) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${UpUrl}/block/create`, {
            name: blockName
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const adminAddSaloon = async (formData, blockId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${UpUrl}/block/saloon/create/${blockId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // FormData gönderiminde gerekli
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

