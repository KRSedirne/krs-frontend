import axios from "axios";
import { BaseUrl } from "../constant.js";
import { UpUrl } from "../constant.js";

export const adminGetAllBlocks = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${BaseUrl}/admin/blocks`, {
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
        const response = await axios.post(`${BaseUrl}/admin/block/create`, {
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

export const adminAddSaloon = async (responseData, blockId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${UpUrl}/block/saloon/create/${blockId}`, {
        width: responseData.width,
        height: responseData.height,
        saloonName: responseData.saloonName,
        url: responseData.url},
        {headers: {
          Authorization: `Bearer ${token}`,
        }}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
