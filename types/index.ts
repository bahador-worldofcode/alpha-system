export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  salary: number;
  image: string;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  client: string;
  deadline: string;
  status: 'todo' | 'in_progress' | 'done';
  budget: number;
  tags: string[];
  created_at: string;
}