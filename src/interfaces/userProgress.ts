export interface UserProgress {
  ID: number
  CreatedAt: Date
  UpdatedAt: Date
  DeletedAt: Date | null
  user_id: number
  course_id: number
  module_id: number
  progress: number
  is_completed: boolean
}