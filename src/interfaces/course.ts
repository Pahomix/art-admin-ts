export interface Course {
  ID: number;
  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date | null;
  name: string;
  description: string;
  background_image: string;
}