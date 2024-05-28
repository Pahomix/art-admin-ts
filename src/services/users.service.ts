import axiosInstance from "../api.config.ts";
import {Users} from "../interfaces/users.ts";

export const UsersService = {
  getUsers: async (): Promise<Users[]> => {
    try {
      const response = await axiosInstance.get('/user');
      const data: Users[] = await response.data.map((item: Users) => {
        if (item.DeletedAt) {
          item.DeletedAt = new Date(item.DeletedAt);
        }
        return item;
      });
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  getUserById: async (id: number): Promise<Users | null> => {
    try {
      const response = await axiosInstance.get(`/user/${id}`);
      const data: Users = await response.data;
      if (data.DeletedAt) {
        data.DeletedAt = new Date(data.DeletedAt);
      }
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },

  deleteUser: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/user/${id}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },

  createUser: async (values: FormData): Promise<Users | null> => {
    try {
      const response = await axiosInstance.post('/user', values);
      const data: Users = await response.data;
      if (data.DeletedAt) {
        data.DeletedAt = new Date(data.DeletedAt);
      }
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  },

  updateUser: async (id: number, values: FormData): Promise<Users | null> => {
    try {
      const response = await axiosInstance.put(`/user/${id}`, values);
      const data: Users = await response.data;
      if (data.DeletedAt) {
        data.DeletedAt = new Date(data.DeletedAt);
      }
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  },
};