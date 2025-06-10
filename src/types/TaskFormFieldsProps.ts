// src/types/TaskFormFieldsProps.ts

export interface TaskFormFieldsProps {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  dueDate: string;
  setDueDate: (v: string) => void;
  statusOptions: string[];
}
