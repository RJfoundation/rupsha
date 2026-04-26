export type UserRole = "student" | "teacher" | "admin";

export type Question = {
  id: number;
  subject: string;
  chapter: string;
  question: string;
  options: string[];
  answer: string;
};

export type ExamResult = {
  id: string;
  userId: string;
  subject: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: Date;
};
