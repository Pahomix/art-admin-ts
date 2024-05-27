import {Users} from "./users.ts";

export interface Review {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  course_id: number;
  user_id: number;
  rating: number;
  comment: string;
  user: Users;
}