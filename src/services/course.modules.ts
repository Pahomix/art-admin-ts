import {CourseModule} from "../interfaces/courseModule.ts";
import axiosInstance from "../api.config.ts";

export const CourseModulesService = {
  getCourseModules: async (): Promise<CourseModule[]> => {
    try {
      const response = await axiosInstance.get(`/course/module`);
      const data: CourseModule[] = await response.data.map((item: CourseModule) => {
        if (item.DeletedAt) {
          item.DeletedAt = new Date(item.DeletedAt);
        }
        return item;
      });
      return data;
    } catch (error) {
      console.error("Error fetching course modules:", error);
      return [];
    }
  },

  createCourseModule: async (values: any): Promise<CourseModule | null> => {
    try {
      const response = await axiosInstance.post(`/course/module`, values);
      const data: CourseModule = await response.data;
      if (data.DeletedAt) {
        data.DeletedAt = new Date(data.DeletedAt);
      }
      return data;
    } catch (error) {
      console.error("Error creating course module:", error);
      return null;
    }
  },

  updateCourseModule: async (id: number, values: FormData): Promise<CourseModule | null> => {
    try {
      const response = await axiosInstance.put(`/course/module/${id}`, values);
      const data: CourseModule = await response.data;
      if (data.DeletedAt) {
        data.DeletedAt = new Date(data.DeletedAt);
      }
      return data;
    } catch (error) {
      console.error("Error updating course module:", error);
      return null;
    }
  },

  getCourseModuleById: async (id: number): Promise<CourseModule | null> => {
    try {
      const response = await axiosInstance.get(`/course/module/${id}`);
      const data: CourseModule = await response.data;
      if (data.DeletedAt) {
        data.DeletedAt = new Date(data.DeletedAt);
      }
      return data;
    } catch (error) {
      console.error("Error fetching course module:", error);
      return null;
    }
  },

  deleteCourseModule: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/course/module/${id}`);
    } catch (error) {
      console.error("Error deleting course module:", error);
    }
  },

}