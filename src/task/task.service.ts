import { TaskModel } from "./task.entity";

const TaskService = {
  async createTask(
    title: string,
    description: string,
    boardId: string,
    userInCharge: string
  ) {
    //procurar o board se existe
    //procurar o usuario se existe

    const newTask = await TaskModel.create({
      title,
      description,
      boardId,
      userInCharge,
    });
    return newTask;
  },
};

export { TaskService };
