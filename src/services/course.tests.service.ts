import {Test} from "../interfaces/test.ts";
import axiosInstance from "../api.config.ts";

export const CourseTestsService = {
  getCourseTestById: async (id: number): Promise<Test | null> => {
    try {
      const response = await axiosInstance.get(`/course/test/${id}`);
      const data: Test = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching course test:", error);
      return null;
    }
  },
  getCourseTests: async (): Promise<Test[]> => {
    try {
      const response = await axiosInstance.get(`/course/test`);
      const data: Test[] = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching course tests:", error);
      return [];
    }
  },

  createCourseTest: async (values: any): Promise<Test | null> => {
    try {
      const response = await axiosInstance.post(`/course/test`, values);
      const data: Test = await response.data;
      return data;
    } catch (error) {
      console.error("Error creating course test:", error);
      return null;
    }
  },

  updateCourseTest: async (id: number, values: FormData): Promise<Test | null> => {
    try {
      const response = await axiosInstance.put(`/course/test/${id}`, values);
      const data: Test = await response.data;
      return data;
    } catch (error) {
      console.error("Error updating course test:", error);
      return null;
    }
  },

  deleteCourseTest: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/course/test/${id}`);
    } catch (error) {
      console.error("Error deleting course test:", error);
    }
  }
}