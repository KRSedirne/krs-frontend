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
export const adminGetBlock = async (id) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${UpUrl}/block/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const adminDeleteBlock=async(id)=>{
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${UpUrl}/block/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
        console.log(error);
      console.error("Failed to delete block:", error);
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
  export const adminGetSaloon = async (saloonId,blockId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${UpUrl}/block/${blockId}/saloon/${saloonId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
  }
    export const adminDeleteSaloon = async (saloonId,blockId) => {
      try {
          const token = localStorage.getItem('authToken');
          const response = await axios.delete(`${UpUrl}/block/${blockId}/saloon/delete/${saloonId}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          return response.data;
      } catch (error) {
          throw error;
      }}
   