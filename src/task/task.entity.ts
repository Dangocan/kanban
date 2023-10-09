export interface Task {
  id: string;
  title: string;
  status: 0 | 1 | 2;
  description?: string;
  // attachment?: any[];

  boardId: string;

  userInCharge?: string;
  createdBy: string;
}
