import {CourseModuleMaterials} from "./courseModuleMaterials.ts";

export interface CourseModule {
  ID: number
  course_id: number
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: Date | null
  title: string
  description: string
  materials: CourseModuleMaterials[]
}