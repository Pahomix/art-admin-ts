export interface Test {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  module_id: number;
  title: string;
  Questions: Question[];
}

export interface Question {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  test_id: number;
  content: string;
  options: Option[];
  answer_id: number;
}

export interface Option {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date | null;
  question_id: number;
  option: string;
}