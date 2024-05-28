import {Course} from "../interfaces/course.ts";
import axiosInstance from "../api.config.ts";

export const CoursesService = {
  getCourses: async (): Promise<Course[]> => {
    try {
      const response = await axiosInstance.get('/course');
      const data: Course[] = await response.data.map((item: Course) => {
        if (item.DeletedAt) {
          item.DeletedAt = new Date(item.DeletedAt);
        }
        return item;
      });
      return data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  },

  getCourseById: async (id: number): Promise<Course | null> => {
    try {
      const response = await axiosInstance.get(`/course/${id}`);
      const data: Course = await response.data;
      if (data.DeletedAt) {
        data.DeletedAt = new Date(data.DeletedAt);
      }
      return data;
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  },

  createCourse: async (values: FormData): Promise<Course | null> => {
    try {
      const response = await axiosInstance.post('/course', values);
      const data: Course = await response.data;
      if (data.DeletedAt) {
        data.DeletedAt = new Date(data.DeletedAt);
      }
      return data;
    } catch (error) {
      console.error("Error creating course:", error);
      return null;
    }
  },
  updateCourse: async (id: number, values: FormData): Promise<Course | null> => {
    try {
      const response = await axiosInstance.put(`/course/${id}`, values);
      const data: Course = await response.data;
      if (data.DeletedAt) {
        data.DeletedAt = new Date(data.DeletedAt);
      }
      return data;
    } catch (error) {
      console.error("Error updating course:", error);
      return null;
    }
  },
  deleteCourse: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/course/${id}`);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  },


}