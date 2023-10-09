export interface Task {
  id: string;
  title: string;

  usersAllowed: string;
  createdBy: string;

  tasks: string[];
}
