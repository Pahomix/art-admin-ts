import axiosInstance from "../api.config.ts";

export const ModuleMaterialsService = {
  getMaterials: async () => {
    try {
      const response = await axiosInstance.get(`/course/module/material`);
      return response.data;
    } catch (error) {
      console.error("Error fetching materials:", error);
      return [];
    }
  },

  getMaterial: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/course/module/material/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching material:", error);
      return null;
    }
  },

  createMaterial: async (values: FormData) => {
    try {
      const response = await axiosInstance.post(`/course/module/material`, values);
      return response.data;
    } catch (error) {
      console.error("Error creating material:", error);
      return null;
    }
  },

  updateMaterial: async (id: number, values: FormData) => {
    try {
      const response = await axiosInstance.put(`/course/module/material/${id}`, values);
      return response.data;
    } catch (error) {
      console.error("Error updating material:", error);
      return null;
    }
  },

  deleteMaterial: async (id: number) => {
    try {
      await axiosInstance.delete(`/course/module/material/${id}`);
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  }

}