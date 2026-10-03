import type { Student } from "@/data/students";

export interface TemplateProps {
  student: Student;
  onAgain: () => void;
  onHome: () => void;
}
