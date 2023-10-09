export interface User {
  id: string;
  name: string;
  email: string;
  password: string;

  boards: { boardId: string; permissionLevel: number }[];
}
