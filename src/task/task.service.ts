import { TaskModel } from "./task.entity";
import { UserModel } from "../user/user.entity";
import { BoardModel } from "../board/board.entity";

const TaskService = {
  async createTask(
    title: string,
    description: string | undefined,
    boardId: string,
    userInCharge: string | undefined
  ) {
    if (!title) {
      throw new Error("Title is required");
    }

    const boardIfExist = await BoardModel.findById(boardId);
    const userIfExist = await UserModel.findById(userInCharge);

    if (!boardIfExist) {
      throw new Error("Board not found");
    }
    if (userInCharge && !userIfExist) {
      throw new Error("User not found");
    }

    const newTask = await TaskModel.create({
      title,
      description,
      boardId,
      userInCharge,
    });
    return newTask;
  },

  async getAllByBoardId(boardId: string) {
    const boardIfExist = await BoardModel.findById(boardId);

    if (!boardIfExist) {
      throw new Error("Board not found");
    }

    const tasks = await TaskModel.find({ boardId }).populate({
      path: "userInCharge",
      select: "name",
    });

    return tasks;
  },

  async getDetails(id: string) {
    const taskDetails = await TaskModel.findById(id).populate({
      path: "userInCharge",
      select: "name",
    });

    if (!taskDetails) {
      throw new Error("Task not found");
    }

    return taskDetails;
  },

  async updateTask(
    id: string,
    title: string,
    description: string | undefined,
    boardId: string,
    userInCharge: string | undefined
  ) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        boardId,
        userInCharge,
      },
      { new: true }
    );
    return updatedTask;
  },

  async deleteTask(id: string) {
    return await TaskModel.findOneAndDelete({ _id: id });
  },
};

export { TaskService };
