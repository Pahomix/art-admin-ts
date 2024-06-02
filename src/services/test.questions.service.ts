import axiosInstance from "../api.config.ts";
import {Question} from "../interfaces/test.ts";

export const TestQuestionsService = {
  getTestQuestions: async (): Promise<Question[]> => {
    try {
      const response = await axiosInstance.get(`/course/test/question`);
      return response.data;
    } catch (error) {
      console.error("Error fetching test questions:", error);
      return [];
    }
  },

  getTestQuestionById: async (id: number): Promise<Question | null> => {
    try {
      const response = await axiosInstance.get(`/course/test/question/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching test question:", error);
      return null;
    }
  },

  createTestQuestion: async (values: Question): Promise<Question | null> => {
    try {
      const response = await axiosInstance.post(`/course/test/question`, values);
      return response.data;
    } catch (error) {
      console.error("Error creating test question:", error);
      return null;
    }
  },

  updateTestQuestion: async (id: number, values: Question): Promise<Question | null> => {
    try {
      const response = await axiosInstance.put(`/course/test/question/${id}`, values);
      return response.data;
    } catch (error) {
      console.error("Error updating test question:", error);
      return null;
    }
  },

  deleteTestQuestion: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/course/test/question/${id}`);
    } catch (error) {
      console.error("Error deleting test question:", error);
    }
  }
};
