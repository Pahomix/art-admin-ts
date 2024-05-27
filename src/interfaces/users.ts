import {Course} from "./course.ts";
import {UserProgress} from "./userProgress.ts";

export interface Users {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date | null;
  DeletedAt: Date | null;
  username: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  courses: Course[];
  progress: UserProgress[]
}