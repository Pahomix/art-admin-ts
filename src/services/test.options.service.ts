import axiosInstance from "../api.config.ts";
import {Option} from "../interfaces/test.ts";

export const TestOptionsService = {
  getTestOptions: async (): Promise<Option[]> => {
    try {
      const response = await axiosInstance.get(`/course/test/question/option`);
      const data: Option[] = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching test options:", error);
      return [];
    }
  },

  getTestOptionById: async (id: number): Promise<Option | null> => {
    try {
      const response = await axiosInstance.get(`/course/test/question/option/${id}`);
      const data: Option = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching test option:", error);
      return null;
    }
  },
  getOptionsByQuestionId: async (questionId: number): Promise<Option[]> => {
    try {
      const response = await axiosInstance.get(`/course/test/question/${questionId}/option`);
      return response.data;
    } catch (error) {
      console.error("Error fetching options for question:", error);
      return [];
    }
  },
  getOptionsByTestId: async (testId: number): Promise<Option[]> => {
    try {
      const response = await axiosInstance.get(`/course/test/question/${testId}/option`);
      return response.data;
    } catch (error) {
      console.error("Error fetching options for test:", error);
      return [];
    }
  }
}