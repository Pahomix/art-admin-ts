import axiosInstance from "../api.config.ts";
import {Question} from "../interfaces/test.ts";

export const TestQuestionsService = {
  getTestQuestions: async (): Promise<Question[]> => {
    try {
      const response = await axiosInstance.get(`/course/test/question`);
      const data: Question[] = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching test questions:", error);
      return [];
    }
  },

  getTestQuestionById: async (id: number): Promise<Question | null> => {
    try {
      const response = await axiosInstance.get(`/course/test/question/${id}`);
      const data: Question = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching test question:", error);
      return null;
    }
  },

  createTestQuestion: async (values: any): Promise<Question | null> => {
    try {
      const response = await axiosInstance.post(`/course/test/question`, values);
      const data: Question = await response.data;
      return data;
    } catch (error) {
      console.error("Error creating test question:", error);
      return null;
    }
  },

  updateTestQuestion: async (id: number, values: FormData): Promise<Question | null> => {
    try {
      const response = await axiosInstance.put(`/course/test/question/${id}`, values);
      const data: Question = await response.data;
      return data;
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
}