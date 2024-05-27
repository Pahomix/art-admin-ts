import {Users} from "./users.ts";

export interface CourseModuleMaterials {
  ID: number
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: Date | null
  course_id: number
  module_id: number
  title: string
  content: string
  content_url: string
  content_type: string
  users: Users[]
}