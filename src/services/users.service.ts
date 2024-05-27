import axiosInstance from "../api.config.ts";
import {Users} from "../interfaces/users.ts";

export const UsersService = {
  async getUsers() {
    try {
      const response = await axiosInstance.get('/users');
      const data = await response.data.map((item: Users) => {
        if (item.DeletedAt) {
          item.DeletedAt = new Date(item.DeletedAt);
        }
        return item;
      });
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
};